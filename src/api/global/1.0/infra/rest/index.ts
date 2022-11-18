import { getInfo } from "../../controllers/Info";
import { getHello } from "../../controllers/Info";

const endpoints = {
	"/info" : getInfo,
	"/hello" : getHello,
}

export default endpoints;
