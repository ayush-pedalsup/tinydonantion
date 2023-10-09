const { handleError, sendres } = require("../../utils/helper");
const { Donation } = require("../../models/donation");

const getDonation = async (req, res) => {
  try {
    const { nonProfit } = req.body;
    if (nonProfit) {
      const findDonation = await Donation.find({ nonProfit });
      if (findDonation) {
        return sendres(200, { findDonation }, res);
      }
      return sendres(400, {
        message: "there is no donation related to this non profit",
      });
    }
    return sendres(200, { message: "Name of non profit is required" });
  } catch (err) {
    handleError(err, res);
  }
};
const getAllDonation = async (req, res) => {
  try {
    const findDonation = await Donation.find();
    if (findDonation) {
      return sendres(200, { findDonation }, res);
    }
    return sendres(400, {
      message: "there is no donation related to this non profit",
    });
  } catch (err) {
    handleError(err, res);
  }
};

const uploadTribute = (req, res) => {
  try {
    let file = req.file;
    return sendres(
      200,
      { link: file.location, uploaded: file.originalname },
      res
    );
  } catch (err) {
    handleError(err, res);
  }
};

// const saveDonation = async (req, res) => {
//   try {
//     const {
//       amount,
//       tributeName,
//       nonProfit,
//       timeStamp,
//       razorpayPaymentInfo,
//       tributeImage,
//       donationStatus,
//       transferStatus,
//       donatorEmail,
//     } = req.body;

//     const donation = await Donation.create({
//       amount,
//       tributeName,
//       nonProfit,
//       timeStamp,
//       razorpayPaymentInfo,
//       tributeImage,
//       donationStatus,
//       transferStatus,
//       donatorEmail,
//     });

//     return res.status(200).json({ message: "donation created" });
//   } catch (err) {
//     handleError(err, res);
//   }
// };


module.exports = {
  getDonation,
  getAllDonation,
  uploadTribute,
};
