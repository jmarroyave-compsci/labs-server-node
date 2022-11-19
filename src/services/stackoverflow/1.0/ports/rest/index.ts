import * as pages from '../../entities/Pages'

const endpoints = {
	"/pages/home" : pages.home,
	"/pages/view/:view" : pages.view,
	"/pages/topic/:topic" : pages.topic,
	"/pages/info_history" : pages.info_history,
	"/pages/info_microsoft" : pages.info_microsoft,
	"/pages/status" : pages.status,	
}

export default endpoints;
