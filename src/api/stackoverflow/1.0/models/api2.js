//frameworks/API v.0.1
const api = require('../api');

class Service {
	async app_info(){
		return api.app_info();
	}

	async app_config(key){
		return api.app_config(key);
	}

	async pages_home(){
		try{
			var result = {
				app: (await this.app_info()),
				dashboard: (await api.dashboard()),
				lists : (await api.tops(5)),
				info_history: 	(await api.info_timeline(5)),
				info_microsoft: 	(await api.info_microsoft(5)),
			};
			return result;
		} catch(ex){
			console.error(ex)
			return {error: ex};
		}

		return {};
	}

	async pages_status(){
		try{
			var result = {
				app: (await this.app_info()),
				dashboard: (await api.dashboard()),
			};
			return result;
		} catch(ex){
			console.error(ex)
			return {error: ex};
		}

		return {};
	}

	async pages_topic(trend, topic){
		try{
			const app_info = await this.app_info();
			trend = app_info.current.id;
			topic = decodeURIComponent(topic);
			var result = {
				app: (app_info),
				topic : (await this.topic(topic)),
				related: (await this.topic_neighbors(trend, topic)),
				history: (await this.topic_history(trend, topic)),
				alias: (await api.topic_alias(topic)),
				lex_relations: (await api.topic_lex_relations(topic)),
				versions: (await api.topic_versions(topic)),				
			}
			return result;			
		} catch(ex){
			console.error(ex)
			return {error: ex};
		}
		return {};
	}
	async pages_info_new(){
		try{
			var result = {
				app: 		(await this.app_info()),
				trend: 	(await api.getTrendInfo()),
				info: 	(await api.info_timeline(500)),
			}
			return result;			
		} catch(ex){
			console.error(ex)
			return {error: ex};
		}
		return {};
	}

	async pages_info_java(){
		try{
			var result = {
				app: 		(await this.app_info()),
				trend: 	(await api.getTrendInfo()),
				info: 	(await api.info_timeline(500)),
			}
			return result;			
		} catch(ex){
			console.error(ex)
			return {error: ex};
		}
		return {};
	}

	async pages_info_android(){
		try{
			var result = {
				app: 		(await this.app_info()),
				trend: 	(await api.getTrendInfo()),
				info: 	(await api.info_timeline(500)),
			}
			return result;			
		} catch(ex){
			console.error(ex)
			return {error: ex};
		}
		return {};
	}

	async pages_info_history(){
		try{
			var result = {
				app: 		(await this.app_info()),
				trend: 	(await api.getTrendInfo()),
				info: 	(await api.info_timeline(500)),
			}
			return result;			
		} catch(ex){
			console.error(ex)
			return {error: ex};
		}
		return {};
	}

	async pages_info_microsoft(){
		try{
			var result = {
				app: 		(await this.app_info()),
				trend: 	(await api.getTrendInfo()),
				info: 	(await api.info_microsoft(250)),
			}
			return result;			
		} catch(ex){
			console.error(ex)
			return {error: ex};
		}
		return {};
	}

	async pages_trend(trend){
		try{
			const app_info = await this.app_info();
			trend = app_info.current.id;
			var result = {
				app: (app_info),
				details : (await api.trend(trend)),
				list: (await api.trend_topics(trend)),
			}
			return result;			
		} catch(ex){
			console.error(ex)
			return {error: ex};
		}
		return {};
	}

	async pages_view(trend, view){
		try{
			const app_info = await this.app_info();
			trend = app_info.current.id;
			var result = {
				app : 	(app_info),
				view: 	view,
				list : 	(await api.tops(100, trend, view)),
			}
			return result;			
		} catch(ex){
			console.error(ex)
			return {error: ex};
		}
		return {};
	}

	async tops(){
		return api.tops(5);
	}

	async topic(topic){
		topic = decodeURIComponent(topic);
		return api.topic(topic);
	}

	async topic_history(trend, topic){
		topic = decodeURIComponent(topic);
		trend = parseInt(trend);
		return api.topic_history(trend, topic);
	}

	async topic_neighbors(trend, topic){
		topic = decodeURIComponent(topic);
		trend = parseInt(trend);
		return api.topic_neighbors(trend, topic);
	}

	async topic_suggest(q){
		return api.topic_suggest(q);
	}

}

const data = new Service();
module.exports = data;

