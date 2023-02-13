import CONFIG from "common/config";
import * as Service from 'common/service'
import passport from "passport";
import { Strategy as GitHubStrategy } from 'passport-github'

passport.use(new GitHubStrategy({
    clientID: CONFIG.PLUGINS.GITHUB_AUTH.CLIENT_ID,
    clientSecret: CONFIG.PLUGINS.GITHUB_AUTH.SECRET,
    callbackURL: CONFIG.SERVER.getURL('/admin/1.0/auth/login/github/callback'),
  },
  async (req, accessToken, refreshToken, profile, done) => {
    var created = false

    console.log("GITHUB", profile)

    const defaultUser = {
      name: profile.displayName,
      email: profile.emails[0].value,
      picture: profile.photos[0].value,
      locale: profile.locale ?? "en",
      provider: { github: profile.id, },
    };

    var user = await Service.invoke({ 
      service: "admin", 
      version: "1.0", 
      entity: "user",
      operation: "findByGithubId",
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

    console.log(user, "created:", created)
    return done(null, user);
  }
));


