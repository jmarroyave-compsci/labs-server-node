import { getDocs, getSpecs } from "common/docs";
import { videoGameGet, videoGamesGet, tvShowsListGet, tvShowsListsGet, tvShowGet, tvShowsGet, movieGet, moviesGet } from "../../entities/Entity";
import { getTopic, get } from "../../entities/Topic";
import { awards, remakes, peopleDirectors, peopleProducers, peopleWriters, peopleActors } from "../../entities/Stories";
import { searchResultsGet, searchSuggestionsGet } from "../../entities/Search";
import { podcastGet, podcastsGet, podcastMusicGet } from "../../entities/Podcast";
import { personGet, peopleGet } from "../../entities/Person";
import { movieFestivalGet, movieFestivalsGet } from "../../entities/MovieFestival";
import { dashboardTVGet, dashboardHomeGet, dashboardGamesGet, dashboardMoviesGet, dashboardPeopleGet, dashboardPodcastsGet, dashboardMovieFestivals } from "../../entities/Dashboard";
import { addComment } from "../../entities/Comments";

const endpoints = {
	"/" : {
		contentType: "text/plain",
		handler: getDocs( { version: "2.0"} ),
	},
	"/specs" : {
		contentType: "text/plain",
		handler: getSpecs( "series", "1.0" ),
	},
	"/api/video-games/:id" : videoGameGet,
	"/api/video-games" : videoGamesGet,
	"/api/tv-shows" : tvShowsGet,
	"/api/tv-shows/:id" : tvShowGet,
	"/api/tv-shows/lists" : tvShowsListsGet,
	"/api/tv-shows/list/:list" : tvShowsListGet,
	"/api/topics/:topic" : getTopic,
	"/api/topics" : get,
	"/api/stories/movies/topics/:topic" : getTopic, 
	"/api/stories/movies/topics" : get, 
	"/api/stories/movies/awards" : awards, 
	"/api/stories/movies/remakes" : remakes, 
	"/api/stories/movies/directors" : peopleDirectors, 
	"/api/stories/movies/producers" : peopleProducers, 
	"/api/stories/movies/writers" : peopleWriters, 
	"/api/stories/movies/actors" : peopleActors, 
	"/api/search/results" : searchResultsGet, 
	"/api/search/suggestions" : searchSuggestionsGet, 
	"/api/podcasts/category/music" : podcastMusicGet, 
	"/api/podcasts/:id" : podcastGet, 
	"/api/podcasts" : podcastsGet, 
	"/api/people/:id" : personGet, 
	"/api/people" : peopleGet, 
	"/api/movies/:id" : movieGet, 
	"/api/movies" : moviesGet, 
	"/api/movie-festivals/:id" : movieFestivalGet, 
	"/api/dashboard/home" : dashboardHomeGet, 
	"/api/dashboard/movies" : dashboardMoviesGet, 
	"/api/dashboard/movies-festivals" : dashboardMovieFestivals, 
	"/api/dashboard/podcasts" : dashboardPodcastsGet, 
	"/api/dashboard/people" : dashboardPeopleGet, 
	"/api/dashboard/video-games" : dashboardGamesGet, 
	"/api/dashboard/tv-shows" : dashboardTVGet, 
	"/api/comments" : addComment, 
}

export default endpoints;
