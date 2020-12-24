var request = require('request')
var _ = require('lodash')

const STEAM_KEY = process.env.STEAM_TOKEN
const mySteamID = "76561198424270946"
const polloID= "76561198253766347"
const jermID =  "76561198853484289"
const ehabID = "76561198416237896"
let data_map = [];

function getOwnedGames(id) {
    let url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_KEY}&steamid=${id}&format=json&include_appinfo=true`
    request(
        { method: 'GET',
            uri: url,
            gzip: true
        }
        , function (error, response, body) { 
            let data = body ? JSON.parse(body) : {};
            let game_count = data.response.game_count;
            let games_data = data.response.games;
            parseGamesList(games_data ,game_count, id)

        }
    )
}


function parseGamesList(gamesArray, count, id) {
    var game_names = []
    gamesArray.forEach( game => {
        game_names.push(game.name);
    })
    data_map.push(game_names)
    var commonGames = _.intersection(data_map[0], data_map[1], data_map[2]);
    console.log(commonGames[getRandomInt(commonGames.length - 1)])

}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}



getOwnedGames(mySteamID);
getOwnedGames(polloID);
getOwnedGames(jermID);
getOwnedGames(ehabID);