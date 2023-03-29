import { getUserInfo, isAdmin, loginWithGoogle, loginWithGithub, logout } from "../../entities/auth";
import { openAI as queryOpenAI } from "../../entities/query";

const endpoints = {
	"/query/openai" : {
		endpoint: "/query/openai",
		method: 'post',
		contentType: "application/json",
		handler: queryOpenAI,
	},
	"/auth/login/google" : {
		contentType: "handler",
		handler: loginWithGoogle,
	},
	"/auth/login/github" : {
		contentType: "handler",
		handler: loginWithGithub,
	},
	"/auth/logout" : {
		contentType: "handler",
		handler: logout,
	},
	"/auth/me" : {
		contentType: "handler",
		handler: getUserInfo,
	},
	"/auth/is-admin" : isAdmin,
}

export default endpoints;