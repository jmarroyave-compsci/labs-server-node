import { getUserInfo, loginWithGoogle, logout } from "../../entities/auth";
import { insert as insertComment, getAll as getAllComments, deleteOne as deleteComment } from "../../entities/comments";
import { upVote, downVote } from "../../entities/votes";

const endpoints = {
	"/votes/up/:owner" : upVote,
	"/votes/down/:owner" : downVote,
	"/comments/:id" : {
		method: 'delete',
		contentType: "application/json",
		handler: deleteComment,
	},
	"/comments-post" : {
		endpoint: "/comments",
		method: 'post',
		contentType: "application/json",
		handler: insertComment,
	},
	"/comments-get" : {
		endpoint: "/comments",
		method: 'get',
		contentType: "application/json",
		handler: getAllComments,
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
