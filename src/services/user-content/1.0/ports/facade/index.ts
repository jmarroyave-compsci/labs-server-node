import { insert as insertHistory } from "../../entities/history";
import { insert as insertComment, get as getComments, deleteOne as deleteComment, reply as replyComment, getReplies as getCommentReplies } from "../../entities/comments";
import { insert as insertMessage, deleteOne as deleteMessage } from "../../entities/messages";
import { get as getVotes, upVote, neutralVote, downVote } from "../../entities/votes";

export default {
	history: {
		insert : insertHistory,
	},
	messages: {
		insert : insertMessage,
		deleteOne : deleteMessage,
	},
	comments: {
		insert : insertComment,
		reply : replyComment,
		get : getComments,
		getReplies : getCommentReplies,
		deleteOne : deleteComment,
	},
	votes: {
		upVote,
		downVote,
		neutralVote,
		get : getVotes,
	},
};
