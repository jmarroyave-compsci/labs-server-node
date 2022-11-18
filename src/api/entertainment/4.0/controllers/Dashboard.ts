import * as Service from '../services/DashboardService';

export async function dashboardHomeGet( query, params, session ){
  return await Service.dashboardHomeGet( {} );
};

export async function dashboardMoviesGet( query, params, session ){
  return await Service.dashboardMoviesGet( {} );
};

export async function dashboardPodcastsGet( query, params, session ){
  return await Service.dashboardPodcastsGet( {} );
};

export async function dashboardPeopleGet( query, params, session ){
  return await Service.dashboardPeopleGet( {} );
};

export async function dashboardGamesGet( query, params, session ){
  return await Service.dashboardGamesGet( {} );
};

export async function dashboardTVGet( query, params, session ){
  return await Service.dashboardTVGet( {} );
};

export async function dashboardMovieFestivals( query, params, session ){
  return await Service.dashboardMovieFestivals( {} );
};