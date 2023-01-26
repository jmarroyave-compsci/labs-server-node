import { logout, getUserInfo } from "../../entities/auth";
import { loginWithGoogle } from "../../entities/auth-google";
import { findByGoogleId, findById, insert as insertUser } from "../../entities/user";
import { insert as insertLog } from "../../entities/log";

export default {
	auth: {
		loginWithGoogle,
		logout,
		getUserInfo,
	},
	user: {
		findById,
		findByGoogleId,
		insert: insertUser,
	},
	log: {
		insert: insertLog,		
	}
};
