import CONFIG from "common/config";
import * as Service from 'common/service'
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: CONFIG.PLUGINS.GOOGLE_AUTH.CLIENT_ID,
      clientSecret: CONFIG.PLUGINS.GOOGLE_AUTH.SECRET,
      callbackURL: CONFIG.SERVER.getServerURL('/admin/1.0/auth/login/google/callback'),
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      //console.log(profile)
      var created = false

      const defaultUser = {
        name: profile.displayName,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        locale: profile.locale,
        provider: { google: profile.id, },
      };

      var user = await Service.invoke({ 
        service: "admin", 
        version: "1.0", 
        entity: "user",
        operation: "findByGoogleId",
        params: { id : profile.id }, 
        req: req,
      })

      if(!user) {
        created = true
        user = await Service.invoke({ 
          service: "admin", 
          version: "1.0", 
          entity: "user",
          operation: "insert",
          params: defaultUser, 
          req: req,
        })
      }

      //console.log(user, "created:", created)

      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {  
  //console.log("PASSPORT", "serializeUser", user)
  process.nextTick(function() {
    const suser = user.id.toString()
    //console.log("SerializeUser", suser)
    return done(null, suser);
  });
});

passport.deserializeUser(async (id, done) => {
  //console.log("PASSPORT", "deserializeUser", id)
  process.nextTick(async function() {
    const user = await Service.invoke({ 
      service: "admin", 
      version: "1.0", 
      entity: "user",
      operation: "findById",
      params: { id: id } 
    })

    //console.log("DeserializeUser", id, user)
    return done(null, user);
  })
});
