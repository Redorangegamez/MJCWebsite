import * as Players from '../../../models/userModel';

export default {
    formatName(format: string) {
        switch (format) {
            case Constants.GAME_TYPE.JAPANESE:
                return "Japanese";
            case Constants.GAME_TYPE.UPPER_JAPANESE:
                return "Upper Japanese";
            case Constants.GAME_TYPE.HONG_KONG:
                return "Hong Kong";
            default:
                logInvalidFormat(format);
                return "Unknown";
        }
    },

    // getPlayer(format: string, criteria) {
    //     return standardizePlayerStatistics(format, Players.findOne(criteria));
    // },

    /**
     * Retrieve the player collection sorted by the relevant ELO with standard statistics
     * @param[in] format The Constants.GAME_TYPE game format to used
     * @param[in] rankingSort The mongoDB collections sort option to use
     * @returns A list of players sorted by rankingSort
     */
    getPlayers(format: string, rankingSort: object) {
        let hasPlayedGames:{[key:string]: object;}= {};
        switch (format) {
            case Constants.GAME_TYPE.JAPANESE:
                hasPlayedGames["japaneseGamesPlayed"] = { $gt: 0 };
                break;
            case Constants.GAME_TYPE.UPPER_JAPANESE:
                hasPlayedGames["upperJapaneseGamesPlayed"] = { $gt: 0 };
                break;
            case Constants.GAME_TYPE.HONG_KONG:
                hasPlayedGames["hongKongGamesPlayed"] = { $gt: 0 };
                break;
            default:
                logInvalidFormat(format);
        }
        return {};//Players.find(hasPlayedGames, { sort: rankingSort }).map((player: object) => standardizePlayerStatistics(format, player));
    }
}

/**
 * Take a player's database entry and convert it into standard statistics
 * @param[in] format The Constants.GAME_TYPE game format to use
 * @param[in] player The player to calculate statistics for
 * @returns A formated player object with all relevant statistics
 */
// function standardizePlayerStatistics(format: string, player: object) {
//     let formatPlayer = {};
//
//     /* Gate against invalid formats */
//     if (!Object.keys(Constants.GAME_TYPE).includes(format)) {
//         logInvalidFormat(format);
//         return formatPlayer;
//     }
//
//     let gamesPlayed = player[format + "GamesPlayed"];
//     let wonHands = player[format + "HandsWin"];
//     let dealinHands = player[format + "HandsLose"];
//     let totalHands = player[format + "HandsTotal"];
//     let totalPoints = player[format + "WinPointsTotal"];
//     let weightedPositionSum =
//         1 * player[format + "FirstPlaceSum"] +
//         2 * player[format + "SecondPlaceSum"] +
//         3 * player[format + "ThirdPlaceSum"] +
//         4 * player[format + "FourthPlaceSum"];
//
//     /* Calculate standard statistics */
//     /* We can always assume gamesPlayed and totalHands both > 0, but not other stats */
//     if (format === Constants.GAME_TYPE.JAPANESE || format === Constants.GAME_TYPE.UPPER_JAPANESE) {
//         formatPlayer["name"] = player["japaneseLeagueName"];
//     } else {
//         formatPlayer["name"] = player["hongKongLeagueName"];
//     }
//     let name = player["name"].split(" ");
//     formatPlayer["preferredName"] = name[0];
//     formatPlayer["elo"] = player[format + "Elo"];
//     formatPlayer["gamesPlayed"] = gamesPlayed;
//     formatPlayer["handWinRate"] = (wonHands / totalHands * 100).toFixed(2);
//     formatPlayer["dealinRate"] = (dealinHands / totalHands * 100).toFixed(2);
//     formatPlayer["averageHandScore"] = ((wonHands > 0) ? totalPoints / wonHands : 0).toFixed(2);
//     formatPlayer["averagePosition"] = (weightedPositionSum / gamesPlayed).toFixed(2);
//     formatPlayer["flyRate"] = (player[format + "BankruptTotal"] / gamesPlayed * 100).toFixed(2);
//     formatPlayer["chomboTotal"] = player[format + "ChomboTotal"];
//
//     if (format === Constants.GAME_TYPE.JAPANESE || format === Constants.GAME_TYPE.UPPER_JAPANESE){
//         let riichiTotal = player[format + "RiichiTotal"];
//         formatPlayer["riichiRate"] = (riichiTotal / totalHands * 100).toFixed(2);
//         formatPlayer["riichiWinRate"] = ((riichiTotal > 0) ? (player[format + "WinRiichiTotal"] / riichiTotal * 100) : 0).toFixed(2);
//         formatPlayer["averageHandDora"] = ((wonHands > 0) ? player[format + "WinDoraTotal"] / wonHands : 0).toFixed(2);
//         formatPlayer["averageDealInSize"] = ((dealinHands > 0) ? player[format + "DealInTotal"]/dealinHands : 0).toFixed(2);
//         formatPlayer["dealInAfterRiichiRate"] = ((riichiTotal > 0) ? player[format + "DealInAfterRiichiTotal"]/riichiTotal * 100 : 0).toFixed(2);
//         formatPlayer["selfDrawRate"] = ((wonHands > 0) ? player[format + "SelfDrawTotal"] / wonHands * 100 : 0).toFixed(2);
//         formatPlayer["riichiEV"] = ((riichiTotal > 0) ? (player[format + "RiichiEV"] / riichiTotal) : 0).toFixed(2);
//     }
//     if (format === Constants.GAME_TYPE.UPPER_JAPANESE) {
//         formatPlayer["softCappedElo"] = Number(1500 + ((player[format + "Elo"] - 1500) * (25/(Math.max(gamesPlayed, 25))))).toFixed(3);
//     }
//     formatPlayer["id"] = player["_id"];
//     return formatPlayer;
// };

/**
 * Print out a console warning saying format is invalid
 * @param[in] format The format to warn about
 */
function logInvalidFormat(format:string) {
    console.warn("Format '" + format + "' is invalid")
}
