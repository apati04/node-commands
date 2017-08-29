const Twitter = require('twitter');
const request = require('request');
const Spotify = require('node-spotify-api');
const { twitterKeys, spotifyKeys } = require('./keys');


const fetchTweets = (usr, q = {screen_name: 'apatipak8'}) => {
  usr.get('statuses/user_timeline', q, (err, tweets) => {
    tweets.forEach(({ text }, i) => console.log(`@${q.screen_name} : ${text}`));
  });
}

const fetchSongs = (usr, query) => {
  console.log(usr);
  usr.search({type: 'track', query}).then((err, data)=>console.log(data, query));
}

function liri([, , cmd, ...input] = process.argv) {
  switch (cmd) {
    case 'my-tweets':
      fetchTweets(new Twitter(twitterKeys));
      break;
    case 'spotify-this-song':
      let str = input.join(' ');
      fetchSongs(str);
    default:
      console.log(cmd, 'defualt');
  }
}
// ititialize program
liri();
