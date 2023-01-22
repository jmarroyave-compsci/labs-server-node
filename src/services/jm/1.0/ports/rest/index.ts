import { getUserInfo, loginWithGoogle, loginWithGoogleCallback, logout } from "../../entities/auth";

const endpoints = {
	"/auth/login/google/callback" : {
		contentType: "handler",
		handler: loginWithGoogleCallback,
	},
	"/auth/login/google" : {
		contentType: "handler",
		handler: loginWithGoogle,
	},
	"/auth/logout" : {
		contentType: "handler",
		handler: logout,
	},
	"/auth/me" : {
		contentType: "handler",
		handler: getUserInfo,
	},
}

export default endpoints;
