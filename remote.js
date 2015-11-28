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
(function () {
    var player = require('./_player');

    var keyMethod = 2;
    var keyPlayer = 3;
    var playerName = null;

    var cmdName = process.argv[0].substr(process.argv[0].lastIndexOf("/") + 1);
    if (cmdName !== "node" && cmdName !== "nodejs") {
        keyMethod = 1;
        keyPlayer = 2;
    }

    if (process.argv[keyMethod] == null) {
        console.log("The first parameter (action) is missing, please type : playPause, next, previous, volUp, volDown or mute.");
        return;
    }
    if (process.argv[keyPlayer] != null) {
        playerName = process.argv[keyPlayer];
    }
    console.log(playerName);

    player.get(playerName).then(function (player) {
        if (process.argv[keyMethod] === 'test') {
            player.getMode(function (mode){
               console.log(mode); 
            });
        }else if (process.argv[keyMethod] === 'playPause') {
            player.getStatus(function (status) {
                if (status.result.mode === 'pause' || status.result.mode === 'stop') {
                    player.play();
                } else if (status.result.mode === 'play') {
                    player.pause();
                }
            });
        } else if (process.argv[keyMethod] === 'play') {
            player.play();
        } else if (process.argv[keyMethod] === 'pause') {
            player.pause();
        } else if (process.argv[keyMethod] === 'next') {
            player.next();
        } else if (process.argv[keyMethod] === 'previous') {
            player.previous();
        } else if (process.argv[keyMethod] === 'volUp') {
            player.setVolume('+' + config.incVol);
        } else if (process.argv[keyMethod] === 'volDown') {
            player.setVolume('-' + config.incVol);
        } else if (process.argv[keyMethod] === 'mute') {
            player.setVolume(0);
        }
    }).catch(function (err) {
        console.log(err);
    });

})();