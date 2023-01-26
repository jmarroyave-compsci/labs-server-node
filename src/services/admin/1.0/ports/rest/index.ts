import { getUserInfo } from "../../entities/auth";
import { loginWithGoogleCallback, loginGoogleError, loginGoogleSuccess } from "../../entities/auth-google";

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
	"/me" : {
		contentType: "handler",
		handler: getUserInfo,
	},
}

export default endpoints;
