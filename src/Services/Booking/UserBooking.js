const RoomModal = require("../Room/RoomModal");
const BookingModal = require("./UserBookingModal");
const ActualRoom = require("../Rooms/RoomsModal");

const addBooking = async (req, res, next) => {
  try {
    const {
      fullName,
      familyMember,
      identityProof,
      bookingFrom,
      bookingTill,
      mobileNumber,
    } = req.body;
    if (
      fullName === "" ||
      familyMember === 0 ||
      bookingFrom === "" ||
      bookingTill === "" ||
      mobileNumber === ""
    ) {
      res.status(400).send("Please send the required data");
      res.end();
      return;
    }

    const userBookingModal = await BookingModal.insertMany({
      fullName,
      familyMember,
      identityProof,
      bookingFrom,
      bookingTill,
      mobileNumber,
    });
    if (!userBookingModal) {
      res.status(500).send("insert Operation failed for User room booking");
      res.end();
      return;
    }
    const updatedArray = [];
    const actualRooms = await ActualRoom.find({});
    let finalFamilyNum = familyMember;
    if (familyMember !== 0 && actualRooms) {
      actualRooms.map(async (m) => {
        let Obj = m.bookerIds;
        const bookedNumber = m.bookerIds.length;
        const availableBed = m.noOfBed - bookedNumber;
        if (availableBed > 0) {
          for (let i = 0; i < availableBed; i++) {
            if (finalFamilyNum > 0) {
              finalFamilyNum = finalFamilyNum - 1;
              Obj.push({
                id: userBookingModal[0]._id,
                bookingFrom,
                bookingTill,
              });
            }
          }
          console.log(m.noOfBed > Obj.length, " <>? ");
          updatedArray.push({
            _id: m._id,
            roomNumber: m.roomNumber,
            noOfBed: m.noOfBed,
            // availabel: availableBed > 1,
            availabel: m.noOfBed > Obj.length,
            used: m.used,
            bookedFrom: m.bookedFrom,
            bookedTill: m.bookedTill,
            bookerIds: [...Obj],
            bhavanId: m.bhavanId,
          });
        }
      });

      let count = 0;
      updatedArray.map(async (updateM) => {
        await ActualRoom.findByIdAndUpdate(
          { _id: updateM._id },
          {
            availabel: updateM.availabel,
            used: updateM.used,
            bookedFrom: updateM.bookedFrom,
            bookedTill: updateM.bookedTill,
            bookerIds: [...updateM.bookerIds],
          }
        )
          .then((res) => {
            console.log(res, " <>?");
          })
          .catch((err) => {
            res.status(500).send("insert Operation failed for Room booking");
            res.end();
            return;
          });
      });
      console.log(count, " <>?");
      const remaningMemberinsert = await BookingModal.findByIdAndUpdate(
        {
          _id: userBookingModal[0]._id,
        },
        {
          memberAllotted: familyMember - finalFamilyNum,
        }
      );
      if (!remaningMemberinsert) {
        res
          .status(500)
          .send("insert Operation failed for User booking remaining member");
        res.end();
        return;
      }
      res.status(200).send("insert Operation Sucessfull");
    } else {
      res.status(400).send("Getting room data failed");
      res.end();
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getBookedRooms = async (req, res) => {
  try {
    await BookingModal.find({})
      .then((dbRes) => {
        res.status(200).send(dbRes);
      })
      .catch((err) => {
        throw "get room bboking operation failed";
      });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const deleteBooking = async (req, res) => {
  try {
    if (req.params.deleteId) {
      // await ActualRoom.find({}).then()
      // await BookingModal.findById(req.params.deleteId).then((deleteDataRes) => {
      //   console.log(deleteDataRes);
      //   res.status(200).send(req.params.deleteId);
      // });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  addBooking,
  getBookedRooms,
  deleteBooking,
};

// const bookRoomsForPeople = (
//   familyNumber,
//   roomArrData,
//   bookerId,
//   bookingFrom,
//   bookingTill
// ) => {
//   // let familyMemberNum = familyNumber;
//   if (familyNumber > 0) {
//     familyNumber = familyNumber - 1;
//     console.log("COUNT <>? ", familyNumber);
//     bookRoomsForPeople(
//       familyNumber,
//       roomArrData,
//       bookerId,
//       bookingFrom,
//       bookingTill
//     );
//   } else {
//     console.log(roomArrData, " <>? ", familyNumber, " ELASE");
//     return roomArrData;
//   }
// };
