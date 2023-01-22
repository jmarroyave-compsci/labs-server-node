import { loginWithGoogle, loginWithGoogleCallback, logout, getUserInfo } from "../../entities/auth";
import { findByGoogleId, findById, insert } from "../../entities/user";

export default {
	auth: {
		loginWithGoogle,
		loginWithGoogleCallback,
		logout,
		getUserInfo,
	},
	user: {
		findById,
		findByGoogleId,
		insert,
	},
};
