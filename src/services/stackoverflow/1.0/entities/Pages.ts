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