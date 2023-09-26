const { getUser, getAllUser,restrictUser } = require("../../controller/mobile/user");
const {isRestricted}=require("../../middleware/login")
module.exports = (router) => {
  router.get("/getUser", getUser);
  router.get("/getAllUser", getAllUser);
  router.post("/restrictUser",restrictUser);
};
