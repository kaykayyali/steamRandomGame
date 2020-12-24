var request = require('request')
var lodash = require('lodash')
const STEAM_KEY = process.env.STEAM_TOKEN
const mySteamID = "76561198424270946"
const polloID= "76561198253766347"
const jermID =  "76561198853484289"
let data_map = {};

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
    data_map[id] = {
        count: count,
        games: gamesArray
    }
    gamesArray.forEach( game => {
        // console.log(game.name);
    })
    console.log(data_map)
}




getOwnedGames(mySteamID);
getOwnedGames(polloID);
getOwnedGames(jermID);