const passport = require("passport");
const isLoggedIn = require("../middleware/login");
const {
  authFailure,
  authProtected,
  logout,
  initialize,
  authenticate,
} = require("../controller/user");
module.exports = (router) => {
  router.get(
    "/auth/google",initialize);
  router.get(
    "/auth/google/callback",authenticate );
  router.get("/auth/google/failure", authFailure);
  router.get("/auth/protected", authProtected);
  router.get("/auth/logout", logout);
};
