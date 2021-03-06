var request = require("request");

var spotify = require('spotify');

var Twitter = require("twitter");

var fs = require("fs");

var twitterKeys = require("./keys.js");

var client = Twitter({
	consumer_key: '8dcsMR8mIeFvJ4bAnD6vxcsW8',
  	consumer_secret: '5VZKmm7JYCUDh5as5djECuMQG9kr9bIUobXqUK5ZSTlKDq4Aan',
  	access_token_key: '381249560-abdNEKjsPZ0wPirakVf6MO8FfptisNep6uYrBHVo',
  	access_token_secret: 'KP5y6jhJKuekWT8eh9GPNqlr4BGmWqrbozYBB9ep1ftDF'
});

var action = process.argv[2];
var input = "";
input = process.argv[3];

var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&r=json";

function muskTweets() {


  // https://dev.twitter.com/rest/reference/get/statuses/user_timeline
  client.get('statuses/user_timeline', { screen_name: 'elonmusk', count: 20 }, function(error, tweets, response) {
  	for (var i = 0; i < tweets.length; i++){
  		console.log("--------------");
    	console.log(tweets[i].text);

  	}
    
  });
};

function spotifySearch () {

	spotify.search({ type: 'track', query: input }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
    console.log("Song Title: " + data.tracks.items[0].name);
    console.log("Preview Link: " + data.tracks.items[0].preview_url);
    console.log("Album Title: " + data.tracks.items[0].album.name);
});
}


function movieLookup () {

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {
  	// console.log(JSON.parse(body));
  	console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors/Actresses: " + JSON.parse(body).Actors);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
  };
});
};


function doWhatItSays () {

fs.readFile("random.txt", "utf8", function(error, data) {

  var dataArr = data.split(",");

  action = dataArr[0];
  input = dataArr[1];
  switchStatement();
});
};

function switchStatement(){

switch(action) {
    case "musk-tweets":
        muskTweets()
        break;
    case "spotify-this-song":
        spotifySearch()
        break;
    case "movie-this":
    	movieLookup()
    	break;
    case "do-what-it-says":
    	doWhatItSays()
    	break;
    default:
        console.log("Not a recognized command.")
};
};


switchStatement();

// muskTweets();
// spotifySearch();
// movieLookup();