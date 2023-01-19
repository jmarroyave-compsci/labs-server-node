import { loginWithGoogle, loginWithGoogleCallback, logout } from "../../entities/auth";
import { findByGoogleId, findById, insert } from "../../entities/user";

export default {
	auth: {
		loginWithGoogle,
		loginWithGoogleCallback,
		logout,
	},
	user: {
		findById,
		findByGoogleId,
		insert,
	},
};
