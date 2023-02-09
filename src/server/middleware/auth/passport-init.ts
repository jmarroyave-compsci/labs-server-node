import CONFIG from 'common/config'
import * as Service from 'common/service'
import passport from "passport";
import passportJwt from "passport-jwt";
import ExtractJwt = passportJwt.ExtractJwt;
import StrategyJwt = passportJwt.Strategy;

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: CONFIG.PLUGINS.JWT.SECRET,
    },
    async function (jwtPayload, done) {
      console.log("PASSPORT", jwtPayload)
      const user = await Service.invoke({ 
        service: "admin", 
        version: "1.0", 
        entity: "user",
        operation: "findById",
        params: { id: jwtPayload.id } 
      })
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {  
  //console.log("PASSPORT", "serializeUser", user)
  process.nextTick(function() {
    console.log(user)
    const suser = user?.id?.toString()
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
