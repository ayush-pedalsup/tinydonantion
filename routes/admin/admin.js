const { dashboard } = require("../../controller/admin/dashboard");
const {
  update,
  remove,
  getOne,
  getAll,
  add,
} = require("../../controller/admin/nonProfit");
const {
  getAllDonation,
  getDonation,
  getDonationByUser,
  changeTransactionStatus,
  getAllUsersByDonation,
} = require("../../controller/admin/transaction");

const {
  getUser,
  getAllUser,
  restrictUser,
  updateUser,
} = require("../../controller/admin/user");

const { signin, signup } = require("../../controller/admin/admin");
module.exports = (router) => {
  router.get("/dashboard", dashboard);

  router.post("/updateNonProfit", update);
  router.delete("/removeNonProfit", remove);
  router.get("/getNonProfit", getOne);
  router.get("/getAllNonProfit", getAll);
  router.post("/addNonProfit",add);

  router.get("/getAllDonation", getAllDonation);
  router.get("/getDonation", getDonation);
  router.get("/getDonationByUser", getDonationByUser);
  router.post("/changeTransactionStatus", changeTransactionStatus);
  router.post("/getAllUsersByDonation", getAllUsersByDonation);

  router.get("/getUser", getUser);
  router.get("/getAllUser", getAllUser);
  router.post("/restrictUser", restrictUser);
  router.post("/updateUser", updateUser);

  router.post("/signin", signin);
  router.post("/signup", signup);
};
