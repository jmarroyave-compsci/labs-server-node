import * as service from "../repositories/all";

export async function home( query, params, session ){
  try{
    var result = {
      app: (await service.app_info()),
      dashboard: (await service.dashboard()),
      lists : (await service.tops(5)),
      info_history:   (await service.info_timeline(5)),
      info_microsoft:   (await service.info_microsoft(5)),
    };
    return result;
  } catch(ex){
    console.error(ex)
    return {error: ex};
  }

  return {};
};


export async function view( query, params, session ){
  var trend = query.trend
  var view = params.view
  try{
    const app_info = await service.app_info();
    trend = app_info.current.id;
    var result = {
      app :   (app_info),
      view:   view,
      list :  (await service.tops(100, trend, view)),
    }
    return result;      
  } catch(ex){
    console.error(ex)
    return {error: ex};
  }
  return {};
}


export async function topic(query, params, session){
  var trend = query.trend
  var topic = params.topic
  try{
    const app_info = await service.app_info();
    trend = app_info.current.id;
    topic = decodeURIComponent(topic);
    var result = {
      app: (app_info),
      topic : (await service.topic(topic)),
      related: (await service.topic_neighbors(trend, topic)),
      history: (await service.topic_history(trend, topic)),
      alias: (await service.topic_alias(topic)),
      lex_relations: (await service.topic_lex_relations(topic)),
      versions: (await service.topic_versions(topic)),        
    }
    return result;      
  } catch(ex){
    console.error(ex)
    return {error: ex};
  }
  return {};
}

export async function info_new(query, params, session){
  try{
    var result = {
      app:    (await service.app_info()),
      trend:  (await service.getTrendInfo()),
      info:   (await service.info_timeline(500)),
    }
    return result;      
  } catch(ex){
    console.error(ex)
    return {error: ex};
  }
  return {};
}

export async function info_java(query, params, session){
  try{
    var result = {
      app:    (await service.app_info()),
      trend:  (await service.getTrendInfo()),
      info:   (await service.info_timeline(500)),
    }
    return result;      
  } catch(ex){
    console.error(ex)
    return {error: ex};
  }
  return {};
}

export async function info_android(query, params, session){
  try{
    var result = {
      app:    (await service.app_info()),
      trend:  (await service.getTrendInfo()),
      info:   (await service.info_timeline(500)),
    }
    return result;      
  } catch(ex){
    console.error(ex)
    return {error: ex};
  }
  return {};
}

export async function info_history(query, params, session){
  try{
    var result = {
      app:    (await service.app_info()),
      trend:  (await service.getTrendInfo()),
      info:   (await service.info_timeline(500)),
    }
    return result;      
  } catch(ex){
    console.error(ex)
    return {error: ex};
  }
  return {};
}

export async function info_microsoft(query, params, session){
  try{
    var result = {
      app:    (await service.app_info()),
      trend:  (await service.getTrendInfo()),
      info:   (await service.info_microsoft(250)),
    }
    return result;      
  } catch(ex){
    console.error(ex)
    return {error: ex};
  }
  return {};
}

export async function  trend(query, params, session){
  var trend = params.trend
  try{
    const app_info = await service.app_info();
    trend = app_info.current.id;
    var result = {
      app: (app_info),
      details : (await service.trend(trend)),
      list: (await service.trend_topics(trend)),
    }
    return result;      
  } catch(ex){
    console.error(ex)
    return {error: ex};
  }
  return {};
}

export async function status(){
  try{
    var result = {
      app: (await service.app_info()),
      dashboard: (await service.dashboard()),
    };
    return result;
  } catch(ex){
    console.error(ex)
    return {error: ex};
  }

  return {};
}
