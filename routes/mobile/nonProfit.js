const {
  add,
  update,
  remove,
  getOne,
  getAll,
  uploadlogo,
} = require("../../controller/mobile/nonprofit");
const { uploadImage } = require("../../middleware/uploadImage");
module.exports = (router) => {
  router.post("/addNonProfit", add);
  router.post("/updateNonProfit", update);
  router.delete("/removeNonProfit", remove);
  router.get("/getNonProfit", getOne);
  router.get("/getAllNonProfit", getAll);
  router.post("/uploadLogo", uploadImage.single("icon"), uploadlogo);
};
