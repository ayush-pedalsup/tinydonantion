const mongoose = require("mongoose");
const { Schema } = mongoose;

const nonProfitSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    summary: {
      type: String,
    },
    url: {
      type: String,
    },
    logo: {
      type: String,
    },
  },
  {
    collection: "NonProfits",
    timestamps: true,
    skipVersioning: true,
    versionKey: false,
  }
);
nonProfitSchema.methods.sanitize = function () {
  var NonProfit = this;
  NonProfit = NonProfit.toObject();
  delete NonProfit.createdAt;
  delete NonProfit.updatedAt;
  return NonProfit;
};

const NonProfit = mongoose.model("NonProfits", nonProfitSchema);

module.exports = { NonProfit };
