const {
  getAllDonation,
  getDonation,
  uploadTribute,
} = require("../../controller/mobile/donation");
const { uploadImage } = require("../../middleware/uploadImage");

module.exports = (router) => {
  router.get("/getAllDonation", getAllDonation);
  router.get("/getDonation", getDonation);
  //router.post("/saveDonation",saveDonation)
  router.post("/uploadTribute", uploadImage.single("icon"), uploadTribute);
};
