const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const User = require("./models/User");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      console.log("Google Profile:", profile);
      const { given_name, family_name, sub, email } = profile;
      if (email) {
        await User.create({
          firstName: given_name,
          lastName: family_name,
          socialAuth: sub,
          email,
        });
      }
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
