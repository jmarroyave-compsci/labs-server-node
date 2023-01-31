import { insert as insertHistory } from "../../entities/history";
import { insert as insertComment, getAll as getAllComments, deleteOne as deleteComment } from "../../entities/comments";
import { get as getVotes, upVote, neutralVote, downVote } from "../../entities/votes";

export default {
	history: {
		insert : insertHistory,
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
