import { getUserInfo, isAdmin, loginWithGoogle, loginWithGithub, logout } from "../../entities/auth";
import { insert as insertComment, getAll as getAllComments, deleteOne as deleteComment, getAllReplies as getAllCommentReplies, reply as replyComment } from "../../entities/comments";
import { insert as insertMessages, deleteOne as deleteMessages } from "../../entities/messages";
import { upVote, downVote, neutralVote, get as getVotes } from "../../entities/votes";

const endpoints = {
	"/votes/:owner" : getVotes,
	"/votes/:owner/up" : upVote,
	"/votes/:owner/down" : downVote,
	"/votes/:owner/neutral" : neutralVote,
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
	"/comments/:id/reply" : replyComment,
	"/comments/:id/replies" : getAllCommentReplies,
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
	"/messages/:id" : {
		method: 'delete',
		contentType: "application/json",
		handler: deleteMessages,
	},
	"/messages-post" : {
		endpoint: "/messages",
		method: 'post',
		contentType: "application/json",
		handler: insertMessages,
	},
}

export default endpoints;