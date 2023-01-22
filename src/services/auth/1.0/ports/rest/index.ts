import { getUserInfo, loginWithGoogle, loginWithGoogleCallback, logout, loginGoogleError, loginGoogleSuccess } from "../../entities/auth";

const endpoints = {
	"/login/google/error" : {
		contentType: "handler",
		handler: loginGoogleError,
	},
	"/login/google/success" : {
		contentType: "handler",
		handler: loginGoogleSuccess,
	},
	"/login/google/callback" : {
		contentType: "handler",
		handler: loginWithGoogleCallback,
	},
	"/login/google" : {
		contentType: "handler",
		handler: loginWithGoogle,
	},
	"/auth/logout" : {
		contentType: "handler",
		handler: logout,
	},
	"/me" : {
		contentType: "handler",
		handler: getUserInfo,
	},
}

export default endpoints;
