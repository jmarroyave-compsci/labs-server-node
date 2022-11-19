import log from 'common/log';
import mongo from "./models/mongo"

export async function app_info(){
	try{
		return{
			ticks : [],				
			current: (await getTrendInfo()),
		};
	} catch (ex){
		console.error(ex)
		return {error: ex};
	}
}

export async function app_config(key){
	return null;
}

export async function getTrendInfo(trendId=null){
	console.log("getTrendInfo", trendId);
	var result;
	try{
		if(!trendId){
  			result = await mongo.find("online", "stackexchange", "tops", {default: true}, {projection : {_id:0}}); 
  			trendId = result[0]._tickId;
		}

		log.info(trendId)
		result = await mongo.findOne("online", "stackexchange", "trend_ticks", {id: trendId})
  		return result;
	} catch (ex){
		console.error(ex)
		return {error: ex};
	}	
}

export async function tops(chunk, trendId = null, view = null){
	try{
		console.log("Getting data for views", view, trendId, chunk)
	  	var data  = {}, result;
	  	var sortBy = {};
	  	var info = await getTrendInfo(trendId);

	  	trendId = info.id;
	  	result = await mongo.find("online", "stackexchange", "tops", {tickId : trendId}, {projection : {_id:0}}, sortBy);
	  	console.log(result)
		for(var i in result[0].data){
			var item = result[0].data[i];
			data[item.name] = item.data.slice(0, chunk);
		}

		if(!view)
			return {info: info, topics: data};
		else 
			return {info: info, topics: data[view]};
	} catch (ex){
		console.error(ex)
		return {error: ex};
	}
}

export async function dashboard(){
	try{
	  var result = await mongo.find("online", "stackexchange", "dashboard", {}, {projection : {_id:0, last_day: 1, questions: 1, questions_progress: 1, topics: 1}});
	  return result[0];
	} catch (ex){
		console.error(ex)
		return {error: ex};
	}
}

export async function topic(topicId){
	try{
	  var result = await mongo.find("online", "stackexchange", "topic", {id: topicId}, {projection : {_id: 0}});
	  return result[0];
	} catch (ex){
		console.error(ex)
		return {error: ex};
	}
}

export async function topic_alias(topicId){
	try{
	  var result = await mongo.find("online", "stackexchange", "topic_alias", {topic_id: topicId}, {projection : {_id: 0, topic_id: 0}}, {tick : 1}, 100);
	  return result;
	} catch (ex){
		console.error(ex)
		return {error: ex};
	}
}

export async function topic_versions(topicId){
	try{
	  var result = await mongo.find("online", "stackexchange", "topic_versions", {topic_id: topicId}, {projection : {_id: 0, topic_id: 0}}, {tick : 1}, 100);
	  return result;
	} catch (ex){
		console.error(ex)
		return {error: ex};
	}
}

export async function topic_lex_relations(topicId){
	try{
	  var result = await mongo.find("online", "stackexchange", "topic_lex_relations", {topic_id: topicId}, {projection : {_id: 0, topic_id: 0}}, {tick : 1}, 25);
	  return result;
	} catch (ex){
		console.error(ex)
		return {error: ex};
	}
}

export async function trend(trendId){
	try{
	  var result = await mongo.find("online", "stackexchange", "trends", {tick_id : trendId}, {projection : {_id:0}}, null, null);
	  return result[0];
	} catch (ex){
		console.error(ex)
		return {error: ex};
	}
}


export async function trend_topics(trendId){
	try{
		return {
			info: await getTrendInfo(trendId),
			topics: await mongo.find("online", "stackexchange", "topic_timeline", {tick_id : trendId}, {projection : {_id:0}}, {total : -1}, 500), 
		}
	} catch (ex){
		console.error(ex)
		return {error: ex};
	}
}

export async function topic_history(trendId, topicId){
	try{
	  var result = await mongo.find("online", "stackexchange", "topic_timeline", {tick_id : {'$lte' : trendId}, topic_id: topicId}, {projection : {_id:0, tick: 1, period: 1, total: 1, neighbors: 1}}, {tick : 1}, 100);
	  return result;
	} catch (ex){
		console.error(ex)
		return {error: ex};
	}
}

export async function info_microsoft(max){
	try{
	  var result = await mongo.find("online", "stackexchange", "info_microsoft", {}, {projection : {_id:0, id: 1, text: 1, total: 1}}, {}, max);
	  return result;
	} catch (ex){
		console.error(ex)
		return {error: ex};
	}
}

export async function info_timeline(max){
	try{
	  var result = await mongo.find("online", "stackexchange", "info_history", {}, {projection : {_id:0, id: 1, total: 1, first_time: 1}}, {first_time: -1}, max);
	  return result;
	} catch (ex){
		console.error(ex)
		return {error: ex};
	}
}

export async function topic_neighbors(trendId, topicId){
	try{
		return {
			info: await getTrendInfo(trendId),
  			topics: await mongo.find("online", "stackexchange", "topic_relations", {topic1_id: topicId}, {projection : {topic2_id: 1, weight: 1}}, {weight: -1}, 100),
			};
	} catch (ex){
		console.error(ex)
		return {error: ex};
	}
}

export async function topic_suggest(q){
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
