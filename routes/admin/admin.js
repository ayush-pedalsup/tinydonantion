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
  router.get("/dashboard",isAuthorized ,dashboard);

  router.post("/updateNonProfit",isAuthorized ,update);
  router.delete("/removeNonProfit",isAuthorized ,remove);
  router.get("/getNonProfit/:id", isAuthorized,getOne);
  router.get("/getAllNonProfit", isAuthorized,getAll);
  router.post("/addNonProfit", isAuthorized,add);

  router.get("/getAllDonation",isAuthorized ,getAllDonation);
  router.post("/getDonation",isAuthorized ,getDonation);
  router.post("/getDonationByUser",isAuthorized ,getDonationByUser);
  router.post("/changeTransactionStatus",isAuthorized ,changeTransactionStatus);
  router.get("/getAllUsersByDonation",isAuthorized ,getAllUsersByDonation);
  router.get("/getUsersWithoutDonations",isAuthorized ,getUsersWithoutDonations);

  router.get("/getUser",isAuthorized ,getUser);
  router.get("/getAllUser",isAuthorized ,getAllUser);
  router.post("/restrictUser",isAuthorized ,restrictUser);
  router.post("/updateUser",isAuthorized ,updateUser);

  router.post("/signin", signin);
  router.post("/signup", signup);
};
