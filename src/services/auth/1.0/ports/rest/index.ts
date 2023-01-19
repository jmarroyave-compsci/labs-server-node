import { getUserInfo, loginWithGoogle, loginWithGoogleCallback, loginWithGoogleSuccess, loginWithGoogleError, logout } from "../../entities/auth";

const endpoints = {
	"/login/google/callback" : {
		contentType: "handler",
		handler: loginWithGoogleCallback,
	},
	"/login/google" : {
		contentType: "handler",
		handler: loginWithGoogle,
	},
	"/login/google/success" : loginWithGoogleSuccess,
	"/login/google/error" : loginWithGoogleError,
	"/logout" : logout,
	"/me" : getUserInfo,
}

export default endpoints;
