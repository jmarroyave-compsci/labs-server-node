import { get as getMessages } from "../../entities/admin/messages";
import { get as getLog, count as countLog } from "../../entities/admin/log";

export default {
	"admin.messages": {
		get: getMessages,
	},
	"admin.log": {
		get: getLog,		
		count: countLog,		
	},
};