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
  usr.search({type: 'track', query})
     .then(({tracks: { items }}) => {
      const { artists, preview_url, name } = items;
      items.filter(({preview_url}) => preview_url !== null)
            .forEach(({ album, artists, preview_url, name })=> {
              let band = artists[0].name, alb = album.name;
              let res = JSON.stringify({ band, album: alb, song: name, preview_url},null, 2);
              console.log(res);
            })
    })
}

[, , cmd, ...input] = process.argv;


switch (cmd) {
  case 'my-tweets':
    fetchTweets(new Twitter(twitterKeys));
    break;
  case 'spotify-this-song':
    let str = input.join(' '),
        user = new Spotify(spotifyKeys);
    fetchSongs(user, str);
  default:
    console.log(cmd, 'defualt');
}
