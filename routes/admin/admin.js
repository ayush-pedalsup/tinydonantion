const { dashboard } = require("../../controller/admin/dashboard");
const {
  update,
  remove,
  getOne,
  getAll,
} = require("../../controller/admin/nonProfit");
const {
  getAllDonation,
  getDonation,
} = require("../../controller/admin/transaction");
module.exports = (router) => {
  router.get("/dashboard", dashboard);
  router.post("/updateNonProfit", update);
  router.delete("/removeNonProfit", remove);
  router.get("/getNonProfit", getOne);
  router.get("/getAllNonProfit", getAll);
  router.get("/getAllDonation", getAllDonation);
  router.get("/getDonation", getDonation);
};
