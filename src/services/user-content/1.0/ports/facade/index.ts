import { insert as insertHistory } from "../../entities/history";
import { insert as insertComment, getAll as getAllComments, deleteOne as deleteComment } from "../../entities/comments";
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
		getAll : getAllComments,
		deleteOne : deleteComment,
	},
	votes: {
		upVote,
		downVote,
		neutralVote,
		get : getVotes,
	},
};
