import DBDashboard from '../models/dashboard';

export const dashboardGet = async function( params ) {
  let result = {};
  result = await DBDashboard.findOne().select(`last_update people actors directors movies countries genres types years_released years_added -_id __v`);
  if( result == null)
    result = {}
  return result
};

