import * as pages from '../../entities/Pages'
import * as topics from '../../entities/Topics'

const endpoints = {
	"/pages/home" : pages.home,
	"/pages/view/:view" : pages.view,
	"/pages/topic/:topic" : pages.topic,
	"/pages/info_history" : pages.info_history,
	"/pages/info_microsoft" : pages.info_microsoft,
	"/pages/status" : pages.status,	
	"/topic/suggest" : topics.suggest,	
}

export default endpoints;
