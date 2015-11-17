/* 
 * Copyright (C) 2015 bonome
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var q = require("q");
var SqueezeServer = require('squeezenode');
var config = require(__dirname + '/config/config.json');

if (config.host == null || config.host === '') {
    config.host = 'http://127.0.0.1';
}
if (config.port == null || config.port === '') {
    config.port = 9000;
}

var squeeze = new SqueezeServer(config.host, config.port);

module.exports.config = config;

/**
 * return the player instance of a player name or null if it's not exist
 * 
 * @param {String} name
 * @return promise
 */
function playerIdByName(name) {
    var deferred = q.defer();
    var found = false;
    squeeze.getPlayers(function (reply) {
        for (var id in reply.result) {
            if (reply.result[id].name === name) {
                found = true;
                deferred.resolve(squeeze.players[reply.result[id].playerid]);
            }
        }
        if (!found) {
            deferred.reject(null);
        }
    });
    return deferred.promise;
}
;
module.exports.squeeze = squeeze;

module.exports.get = function (playerName) {
    if (playerName == null) {
        playerName = config.player;
    }
    var deferred = q.defer();
    squeeze.on('register', function () {
        squeeze.getPlayers(function (reply) {
            if (reply.ok) {
                playerIdByName(playerName).then(function (player) {
                    deferred.resolve(player);
                }).catch(function () {
                    console.log('Error occured! Specified player does not exist'.red);
                    deferred.reject('Error occured! Specified player does not exist');
                });
            }
        });
    });
    return deferred.promise;
};
