import {RowDataPacket} from "mysql2"

export interface IGame extends RowDataPacket {
    "gameId": string // GUID,
    "gameType": Constants.GAME_TYPE,
    "playerIds": string[], // PlayerIds,
    "isDeleted": boolean //default false,
    "gamePlayers":
        [{
            "playerId": string,
            "points": number,
            "startingElo": number,
            "eloChange": number,
            "position": number // 0, 1, 2, 3
        }],
    "gameState": Constants.GAME_STATE,
    "hands": [
        {
            "handNum": number,
            "roundNum": number // 0-15,
            "bonusNum": number,
            "handResultType": string,
            "isHandPending": boolean, // default true until finalized,
            "pointDelta": number[], // size 4,
            "handAdditionalDetails": object, // of type IHandDetails,
            "riichiPlayers": number[],
            "openedPlayers": number[],
        }
    ],
    "creationTimestamp": number,
    "lastUpdatedTimestamp": number,

}
