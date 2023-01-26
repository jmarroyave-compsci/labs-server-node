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
