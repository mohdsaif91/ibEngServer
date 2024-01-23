const nodemailer = require("nodemailer");

const Inquery = require("./inqueryModal");

const getInqueries = (req, res) => {
  try {
  } catch (error) {
    res.status(500).send(error);
  }
};

const addInquery = async (req, res) => {
  try {
    const { message, name, email, phone = "" } = req.body;
    console.log(message, name, email);
    if (message === "" || name === "" || email === "") {
      res.status(400).send("all the fields is required");
    } else {
      //   Inquery.insertMany({ ...req.body })
      //     .then((insertRes) => {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        // host: "smtpout.secureserver.net",
        // secure: true,
        // secureConnection: false, // TLS requires secureConnection to be false
        // requireTLS: true,
        // port: 465,
        auth: {
          user: process.env.SENDER_MAIL_ID,
          pass: process.env.SENDER_MAIL_PASSWORD,
        },
      });
      const mailOption = {
        from: process.env.SENDER_MAIL_ID,
        to: email,
        subject: `New Inquery for IB ENG`,
        html: `
          <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body {
        margin: 0;
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
          "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      }
      .container {
        padding: 32px;
      }
      .heading-hero {
        text-align: center;
        margin: 24px 0;
        font-size: 32px;
        padding-bottom: 8px;
        border-bottom: 1px solid #333;
      }
      .footer-container {
        padding-top: 8px;
        border-top: 1px solid #333;
      }
      .message-container {
        margin: 32px 0;
      }
      .user-data {
        font-size: 20px;
        padding: 8px 16px 8px 8px;
      }
      @media (max-width: 430px) {
        .container {
          padding: 8px;
        }
      }
      .hero-img {
        height: 250px;
        background-position: center center;
        background-size: contain;
        background-image: url("http://localhost/src/newMail.png");
        background-repeat: no-repeat;
      }
      a {
        text-decoration: none;
        color: black;
      }
      .messag-data {
        font-size: 20px;
        padding: 8px 16px 8px 8px;
      }
      .underline {
        text-decoration: underline;
        margin-right: 8px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="hero-img"></div>
      <div class="contact-container">
        <div class="heading-hero">Contact details</div>
        <div class="user-data"><span class="underline">Name:</span> ${name}</div>
        <div class="user-data">
          <span class="underline">Email:</span> ${email}
        </div>
        <div class="user-data">
          <span class="underline"> Phone Number: </span>
          <a className="phone" href="tel:${phone}"> ${phone} </a>
        </div>
      </div>
      <div class="message-container">
        <div class="messag-data">
          <span class="underline">Messsage:</span>
          ${message}
        </div>
      </div>
      <div class="footer-container"></div>
    </div>
  </body>
</html>`,
      };
      transporter.sendMail(mailOption, (err, info) => {
        if (err) {
          throw err;
        } else {
          res.status(200).send(req.body);
        }
      });
      // })
      // .catch((err) => {
      //   throw err;
      // });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getInqueries,
  addInquery,
};
