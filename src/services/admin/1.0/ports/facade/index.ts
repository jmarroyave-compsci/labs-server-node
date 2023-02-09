import { logout, getUserInfo } from "../../entities/auth";
import { loginWithGoogle } from "../../entities/auth-google";
import { loginWithGithub } from "../../entities/auth-github";
import { findByGoogleId, findByGithubId, findById, insert as insertUser } from "../../entities/user";
import { insert as insertLog } from "../../entities/log";

export default {
	auth: {
		loginWithGoogle,
		loginWithGithub,
		logout,
		getUserInfo,
	},
	user: {
		findById,
		findByGoogleId,
		findByGithubId,
		insert: insertUser,
	},
	log: {
		insert: insertLog,		
	}
};
