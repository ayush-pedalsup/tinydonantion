const { getUser, getAllUser } = require("../controller/user");

module.exports = (router) => {
  router.get("/getUser", getUser);
  router.get("/getAllUser", getAllUser);
};
