const ObjectId = require("mongodb").ObjectId;
const { S3Client, S3 } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const { v4: uuidv4 } = require("uuid");

const Property = require("./propertyModal");

const Bucket = process.env.BUCKET;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.REGION;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

const client = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});

const addProperty = (req, res) => {
  try {
    if (req.files.length > 0) {
      const imgNameArray = [];
      let count = 0;
      const mainImage = req.files[0];
      let fileName = mainImage.originalname.split(".");
      const myFileType = fileName[fileName.length - 1];
      const Key = `${uuidv4()}.${myFileType}`;
      let mainImageName = Key;

      new Upload({
        client: new S3Client({
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          },
          region: process.env.REGION,
        }),
        params: {
          ACL: "public-read-write",
          Bucket: process.env.BUCKET,
          Key,
          Body: mainImage.buffer,
          ContentType: mainImage.mimeType,
        },
      })
        .done()
        .then(() => {
          req.files.map((m) => {
            let fileName = m.originalname.split(".");
            const myFileType = fileName[fileName.length - 1];
            const Key = `${uuidv4()}.${myFileType}`;
            new Upload({
              client: new S3Client({
                credentials: {
                  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                },
                region: process.env.REGION,
              }),
              params: {
                ACL: "public-read-write",
                Bucket: process.env.BUCKET,
                Key,
                Body: m.buffer,
                ContentType: m.mimeType,
              },
            })
              .done()
              .then((data) => {
                imgNameArray.push(Key);
                console.log(req.files.length, "===", count);
                if (req.files.length === imgNameArray.length) {
                  Property.insertMany({
                    projectName: req.body.projectName,
                    description: req.body.description,
                    images: imgNameArray,
                    mainImage: mainImageName,
                  })
                    .then((data) => {
                      res.status(201).send({
                        projectName: req.body.name,
                        description: req.body.description,
                        images: imgNameArray,
                        mainImage: mainImageName,
                        _id: data[0]._id,
                      });
                    })
                    .catch((err) => {
                      throw err;
                    });
                }
              });
          });
        });
    } else {
      res.status(400).json("Please provide the imag");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getPropertyList = async (req, res) => {
  try {
    await Property.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updatePropety = async (req, res) => {
  try {
    console.log("API Called Update");
    const {
      _id,
      projectName,
      description,
      previousMainImage,
      removedImg = [],
      mainImageChange = false,
      subImageChange = false,
      img,
    } = req.body;
    if (projectName === "" || description === "") {
      res.status(400).send("Project data is invalid");
    }
    if (req.files) {
      let mainImageName = "";
      if (mainImageChange) {
        let fileName = mainImage.originalname.split(".");
        const myFileType = fileName[fileName.length - 1];
        mainImageName = `${uuidv4()}.${myFileType}`;
        req.body.mainImage = mainImageName;
        processMainImage(req.files[0], mainImageName, previousMainImage);
      }
      if (subImageChange) {
        const newSubImage = [];
        req.files.map((m) => {
          let fileName = m.originalname.split(".");
          const myFileType = fileName[fileName.length - 1];
          const newSubImageName = `${uuidv4()}.${myFileType}`;
          newSubImage.push(newSubImageName);
          processSubImages(m, res, newSubImageName);
        });
        req.body.images = [...req.body.img, ...newSubImage];
      }
      dbOperation(_id, req.body, res);
    } else {
      removedImg.length > 0 &&
        removedImg.forEach((imgItem) => removeOnlySubImage(imgItem, res));
      dbOperation(_id, req.body, res);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { mainImage, images, _id } = req.body;
    [mainImage, ...images].map((m) => {
      const deleteParams = {
        Bucket,
        Key: m,
      };
      s3.deleteObject(deleteParams).then(async (res) => {
        console.log("image deleted");
      });
    });
    await Property.deleteOne({ _id: _id })
      .then((resData) => {
        return res.status(200).json("property Deleted");
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  addProperty,
  getPropertyList,
  updatePropety,
  deleteProperty,
};

function removeOnlySubImage(imgData, httpRes) {
  try {
    const deleteParms = {
      Bucket,
      Key: imgData,
    };
    s3.deleteObject(deleteParms)
      .then((res) => {
        console.log("img deleted");
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    return httpRes.status(500).send(error);
  }
}

async function dbOperation(id, Obj, httpRes) {
  await Property.updateOne({ _id: new ObjectId(id) }, Obj)
    .then((mongoDbRes) => {
      console.log(mongoDbRes);
      console.log("updated");
      return httpRes.status(201).send("document is updated");
    })
    .catch((err) => {
      throw err;
    });
}

async function processSubImages(projectImages, httpRes, subImageName) {
  try {
    new Upload({
      client: new S3Client({
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
        region: process.env.REGION,
      }),
      params: {
        ACL: "public-read-write",
        Bucket: process.env.BUCKET,
        Key: subImageName,
        Body: projectImages.buffer,
        ContentType: projectImages.mimeType,
      },
    })
      .done()
      .then((data) => {
        console.log("Image Uploaded");
      });
  } catch (error) {
    return httpRes.status(500).send(error);
  }
}

async function processMainImage(mainImage, mainImageName, previousImage) {
  console.log(mainImage, " MAIN");
  console.log(previousImage, " Prev");
  let fileName = mainImage.originalname.split(".");
  const myFileType = fileName[fileName.length - 1];
  const deleteParams = {
    Bucket,
    Key: previousImage,
  };
  console.log("1 <>?");
  try {
    s3.deleteObject(deleteParams)
      .then(async (res) => {
        const updateParams = {
          Bucket: process.env.BUCKET,
          Key: `${uuidv4()}.${myFileType}`,
          Body: mainImage.buffer,
          ACL: "public-read-write",
        };
        s3.putObject(updateParams)
          .then((res) => {
            // const { _id } = ogData;
            // ogData.mainImage = mainImageName;
            // console.log(mainImageName, " After S3 operation");
            // dbOperation(_id, ogData, httpResponse);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        console.log(err);
        return httpResponse.status(500).send(err);
      });
  } catch (error) {
    console.log(error);
  }
}
