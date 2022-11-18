//frameworks/API v.0.1
const fs = require('fs');
const api 	= require('../../../libs/api');
const mongo = require('../../../libs/mongodb');

class Service {
	async app_info(){
		try{
			return{
				ticks : [],				
				current: (await this.getTrendInfo()),
			};
		} catch (ex){
			console.error(ex)
			return {error: ex};
		}
	}

	async app_config(key){
		return null;
	}

	async getTrendInfo(trendId){
		console.log("getTrendInfo", trendId);
		var result;
		try{
			if(!trendId){
	  			result = await mongo.find("online", "stackexchange", "tops", {default: true}, {projection : {_id:0}});
	  			console.log(result);
	  			trendId = result[0]._tickId;
			}

  			result = await mongo.find("online", "stackexchange", "trend_ticks", {id: trendId}, {projection : {_id:0, id : 1, ini : 1, end: 1, period: 1}}),
  			console.log(result);
	  		return result[0];
		} catch (ex){
			console.error(ex)
			return {error: ex};
		}	
	}

	async tops(chunk, trendId = null, view = null){
		try{
			console.log("Getting data for views", view, trendId, chunk)
		  	var data  = {};
		  	var sortBy = {};
		  	var info = await this.getTrendInfo(trendId);

		  	trendId = info.id;
		  	var result = await mongo.find("online", "stackexchange", "tops", {tickId : trendId}, {projection : {_id:0}}, sortBy);

		  	console.log(result);

			for(var i in result[0].data){
				var item = result[0].data[i];
				data[item.name] = item.data.slice(0, chunk);
			}

		  	console.log(data);

			if(!view)
				return {info: info, topics: data};
			else 
				return {info: info, topics: data[view]};
		} catch (ex){
			console.error(ex)
			return {error: ex};
		}
	}

	async dashboard(){
		try{
		  var result = await mongo.find("online", "stackexchange", "dashboard", {}, {projection : {_id:0, last_day: 1, questions: 1, questions_progress: 1, topics: 1}});
		  return result[0];
		} catch (ex){
			console.error(ex)
			return {error: ex};
		}
	}

	async topic(topicId){
		try{
		  var result = await mongo.find("online", "stackexchange", "topic", {id: topicId}, {projection : {_id: 0}});
		  return result[0];
		} catch (ex){
			console.error(ex)
			return {error: ex};
		}
	}

	async topic_alias(topicId){
		try{
		  var result = await mongo.find("online", "stackexchange", "topic_alias", {topic_id: topicId}, {projection : {_id: 0, topic_id: 0}}, {tick : 1}, 100);
		  return result;
		} catch (ex){
			console.error(ex)
			return {error: ex};
		}
	}

	async topic_versions(topicId){
		try{
		  var result = await mongo.find("online", "stackexchange", "topic_versions", {topic_id: topicId}, {projection : {_id: 0, topic_id: 0}}, {tick : 1}, 100);
		  return result;
		} catch (ex){
			console.error(ex)
			return {error: ex};
		}
	}

	async topic_lex_relations(topicId){
		try{
		  var result = await mongo.find("online", "stackexchange", "topic_lex_relations", {topic_id: topicId}, {projection : {_id: 0, topic_id: 0}}, {tick : 1}, 25);
		  return result;
		} catch (ex){
			console.error(ex)
			return {error: ex};
		}
	}

	async trend(trendId){
		try{
		  var result = await mongo.find("online", "stackexchange", "trends", {tick_id : trendId}, {projection : {_id:0}});
		  return result[0];
		} catch (ex){
			console.error(ex)
			return {error: ex};
		}
	}


	async trend_topics(trendId){
		try{
			return {
				info: await this.getTrendInfo(trendId),
				topics: await mongo.find("online", "stackexchange", "topic_timeline", {tick_id : trendId}, {projection : {_id:0}}, {total : -1}, 500), 
			}
		} catch (ex){
			console.error(ex)
			return {error: ex};
		}
	}

	async topic_history(trendId, topicId){
		try{
		  var result = await mongo.find("online", "stackexchange", "topic_timeline", {tick_id : {'$lte' : trendId}, topic_id: topicId}, {projection : {_id:0, tick: 1, period: 1, total: 1, neighbors: 1}}, {tick : 1}, 100);
		  return result;
		} catch (ex){
			console.error(ex)
			return {error: ex};
		}
	}

	async info_microsoft(max){
		try{
		  var result = await mongo.find("online", "stackexchange", "info_microsoft", {}, {projection : {_id:0, id: 1, text: 1, total: 1}}, {}, max);
		  return result;
		} catch (ex){
			console.error(ex)
			return {error: ex};
		}
	}

	async info_timeline(max){
		try{
		  var result = await mongo.find("online", "stackexchange", "info_history", {}, {projection : {_id:0, id: 1, total: 1, first_time: 1}}, {first_time: -1}, max);
		  return result;
		} catch (ex){
			console.error(ex)
			return {error: ex};
		}
	}

	async topic_neighbors(trendId, topicId){
		try{
			return {
				info: await this.getTrendInfo(trendId),
	  			topics: await mongo.find("online", "stackexchange", "topic_relations", {topic1_id: topicId}, {projection : {topic2_id: 1, weight: 1}}, {weight: -1}, 100),
  			};
		} catch (ex){
			console.error(ex)
			return {error: ex};
		}
	}

	async topic_suggest(q){
		try{		
			if(!q || q.toString().trim().length === 0) return [];

			var resp = [];
			var result = await mongo.find("online", "stackexchange", "topic", {id: {"$regex" : `^${q}`}}, {projection : {id: 1}}, {id: 1}, 10);
			for(var i = 0; i < result.length; i++)
				resp.push(result[i].id);
		  return resp;
		} catch (ex){
			console.error(ex)
			return {error: ex};
		}
	}

}

const data = new Service();
module.exports = data;

