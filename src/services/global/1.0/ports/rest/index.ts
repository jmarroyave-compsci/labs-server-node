import { getInfo } from "../../entities/Info";
import { getHello } from "../../entities/Info";

const endpoints = {
	"/info" : getInfo,
	"/hello" : getHello,
}

export default endpoints;
