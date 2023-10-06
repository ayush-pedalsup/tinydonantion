const { handleError, sendres } = require("../../utils/helper");
const { Donation } = require("../../models/donation");
const User  = require("../../models/User");

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

const getDonationByUser = async (req, res) => {
  try {
    const email = req.body;
    const findDonation = await Donation.find({ donatorEmail: email });
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

const changeTransactionStatus = async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      const findTransaction = await Donation.find({ donatorEmail: email });
      if (findTransaction) {
        const updateTranscation = await Donation.updateOne(
          { donatorEmail: email },
          { $set: { transferStatus: "Transferred" } },
          { new: true }
        ).exec();
        if (updateTranscation) {
          sendres(200, { message: "Status set to transferred" }, res);
        }
      }
      sendres(
        400,
        { message: "Not able to find the Donation related to the email" },
        res
      );
    }
    sendres(400, { message: "email is required" }, res);
  } catch (err) {
    handleError(err, res);
  }
};

const getAllUsersByDonation = async (req, res) => {
  try {
    const uniqueDonatorEmails = await Donation.aggregate([
      {
        $group: {
          _id: "$donatorEmail",
        },
      },
    ]);
    if (uniqueDonatorEmails.length > 0) {
      const uniqueEmails = uniqueDonatorEmails.map((entry) => entry._id);
      const usersWithDonations = await User.find({
        email: { $in: uniqueEmails },
      });

      if (usersWithDonations.length > 0) {
        return sendres(200, { usersWithDonations }, res);
      }
    }
    return sendres(400, { message: "No users found with donations" }, res);
  } catch (err) {
    handleError(err, res);
  }
};

const getUsersWithoutDonations = async (req, res) => {
  try {
    const uniqueDonatorEmails = await Donation.aggregate([
      {
        $group: {
          _id: "$donatorEmail",
        },
      },
    ]);
    const uniqueEmails = uniqueDonatorEmails.map((entry) => entry._id);
    const allUsers = await User.find({});
    const usersWithoutDonations = allUsers.filter(
      (user) => !uniqueEmails.includes(user.email)
    );
    if (usersWithoutDonations.length > 0) {
      return sendres(200, { usersWithoutDonations }, res);
    }
    return sendres(400, { message: "No users found without donations" }, res);
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  getDonation,
  getAllDonation,
  getDonationByUser,
  changeTransactionStatus,
  getAllUsersByDonation,
  getUsersWithoutDonations,
};
