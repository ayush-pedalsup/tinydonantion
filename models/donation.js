const mongoose = require("mongoose");
const { Schema } = mongoose;

const donationSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    nonProfit: {
      type: String,
      required: true,
    },
    timestamps: {
      type: Date,
      required: true,
    },
    tributeName: {
      type: String,
      required: true,
    },
    razorpayPaymentInfo: {
      type: Object,
      required: true,
    },
    tributeImage: {
      type: String,
      required: true,
    },
    donationStatus: {
      type: String,
      required: true,
    },
    transferStatus: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Donations",
    timestamps: true,
    skipVersioning: true,
    versionKey: false,
  }
);

const Donation = mongoose.model("donation", donationSchema);

module.exports = { Donation };
