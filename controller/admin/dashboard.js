const { handleError, sendres } = require("../../utils/helper");
const { Donation } = require("../../models/donation");
const { NonProfit } = require("../../models/NonProfit");
const { User } = require("../../models/User");

const dashboard = async (req, res) => {
  try {
    const totalUser = await User.count({});
    const totalDonation = await Donation.count({});
    const totalNonProfit = await NonProfit.count({});
    const amountArray = await Donation.find({}).select("amount");
    const totalAmount = amountArray.reduce((accumulator, current) => {
      return accumulator + current.amount;
    }, 0);
    return sendres(
      200,
      { totalUser, totalDonation, totalNonProfit, totalAmount },
      res
    );
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = { dashboard };
