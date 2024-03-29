import passport from 'passport';
import "./passport-init"
import "./passport-google-sso";
import "./passport-github-sso";

export const init = ( app ) => {
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(passport.authorize('session'));
}