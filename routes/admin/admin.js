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
  getUsersWithoutDonations,
} = require("../../controller/admin/transaction");

const {
  getUser,
  getAllUser,
  restrictUser,
  updateUser,
} = require("../../controller/admin/user");
const { isAuthorized } = require("../../middleware/isAuthorized");

const { signin, signup } = require("../../controller/admin/admin");
module.exports = (router) => {
  router.get("/dashboard", dashboard);

  router.post("/updateNonProfit", update);
  router.delete("/removeNonProfit", remove);
  router.get("/getNonProfit/:id", getOne);
  router.get("/getAllNonProfit", getAll);
  router.post("/addNonProfit", add);

  router.get("/getAllDonation", getAllDonation);
  router.post("/getDonation", getDonation);
  router.post("/getDonationByUser", getDonationByUser);
  router.post("/changeTransactionStatus", changeTransactionStatus);
  router.get("/getAllUsersByDonation", getAllUsersByDonation);
  router.get("/getUsersWithoutDonations", getUsersWithoutDonations);

  router.get("/getUser", getUser);
  router.get("/getAllUser", getAllUser);
  router.post("/restrictUser", restrictUser);
  router.post("/updateUser", updateUser);

  router.post("/signin", signin);
  router.post("/signup", signup);
};
