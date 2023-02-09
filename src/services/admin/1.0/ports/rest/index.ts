import { getUserInfo } from "../../entities/auth";
import { loginWithGoogleCallback, loginGoogleError, loginGoogleSuccess } from "../../entities/auth-google";
import { loginWithGithubCallback, loginGithubError, loginGithubSuccess } from "../../entities/auth-github";

const endpoints = {
	"/auth/login/google/error" : {
		contentType: "handler",
		handler: loginGoogleError,
	},
	"/auth/login/google/success" : {
		contentType: "handler",
		handler: loginGoogleSuccess,
	},
	"/auth/login/google/callback" : {
		contentType: "handler",
		handler: loginWithGoogleCallback,
	},
	"/auth/login/github/error" : {
		contentType: "handler",
		handler: loginGithubError,
	},
	"/auth/login/github/success" : {
		contentType: "handler",
		handler: loginGithubSuccess,
	},
	"/auth/login/github/callback" : {
		contentType: "handler",
		handler: loginWithGithubCallback,
	},
	"/me" : {
		contentType: "handler",
		handler: getUserInfo,
	},
}

export default endpoints;
