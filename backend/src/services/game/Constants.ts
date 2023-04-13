// A class/namespace of commonly used Constants
namespace Constants {
    // Title
    export const MAHJONG_CLUB_LEAGUE = "Mahjong Club League";

    // Universal hands per round in a four player game
    export const HANDS_PER_ROUND = 4;

    // The maximum hand size in a Hong Kong game
    export const HKG_MAX_HAND_SIZE = 13;

    // The starting number of points in a Hong Kong game
    export const HKG_START_POINTS = 750;

    // Points paid out for a mistake in a Hong Kong game
    export const HKG_MISTAKE_POINTS = 600;

    // The number of rounds in a Hong Kong game
    export const HKG_NUM_ROUNDS = 4;

    // The number of hands in a Hong Kong game
    export const HKG_NUM_HANDS = HKG_NUM_ROUNDS * HANDS_PER_ROUND;

    // The maximum hand size in a Japanese game (yakuman)
    // Hands may be bigger; but must be a multiple of this value
    export const JPN_MAX_HAND_SIZE = 13;

    // The maximum yakuman multiple in a Japanese game
    export const PN_MAX_YAKUMAN_MULTIPLE = 5;

    // The starting number of points in a Japanese game
    export const JPN_START_POINTS = 25000;

    // The number of points distributed upon a tenpai round
    // from noten players to tenpai ones in a Japanese game
    export const JPN_TENPAI_PAYOUT = 3000;

    // The required number of points of any one player to
    // end a game at the end of "South" round in a Japanese
    // game
    export const JPN_END_POINTS = 30000;

    // Base points for a "mangan" hand in a Japanese game
    export const JPN_MANGAN_BASE_POINTS = 2000;

    // Points added for every bonus round in a Japanese game
    export const JPN_BONUS_POINTS = 300;

    // Points added or deducted for a riichi stick in a
    // Japanese game
    export const JPN_RIICHI_POINTS = 1000;

    // Points paid out for a mistake in a Japanese game
    export const JPN_MISTAKE_POINTS = 12000;

    // The number of rounds in a Japanese game
    export const JPN_NUM_ROUNDS = 2;

    // The number of hands in a Japanese game
    export const JPN_NUM_HANDS = JPN_NUM_ROUNDS * HANDS_PER_ROUND;

    // constants for defining the ELO calculation operation
    export const ELO_CALCULATOR_N = 2000;
    export const ELO_CALCULATOR_EXP = 5;

    // Score adjustment for Hong Kong ending scores
    // Calculated as analogous to Japanese system
    export const HKG_SCORE_ADJUSTMENT = [
        450,
        150,
        -150,
        -450
    ];

    // Score adjustment for Japanese ending scores
    // Calculated as
    // 1st = 100,000 - 2nd - 3rd - 4th - 1st = 15,000
    // 2nd = 2nd - 30,000 + 10,000 = 5,000
    // 3rd = 3rd - 30,000 + 0 = -5,000
    // 4th = 4th - 30,000 - 10,000 = -15,000
    export const JPN_SCORE_ADJUSTMENT = [
        15000,
        5000,
        -5000,
        -15000
    ];

    // Placeholder value to establish a player select button
    // That has no player selected
    export const NO_PERSON = "no one";

    // The default text to display for player buttons/fields
    // When no player has been selected
    export const DEFAULT_EAST = "Select East!";
    export const DEFAULT_SOUTH = "Select South!";
    export const DEFAULT_WEST = "Select West!";
    export const DEFAULT_NORTH = "Select North!";

    // An enum of game types for shared yet slightly altered
    // rules.  Possibly add more if ever decided to
    export namespace GAME_TYPE {
        // Hong Kong Old Style
        export const HONG_KONG = "hongKong";
        // Japanese Riichi Style
        export const JAPANESE = "japanese";
        // Japanese Riichi upper league
        export const UPPER_JAPANESE = "upperJapanese";
    }

    // Round End Conditions
    export const DEAL_IN = "dealin";
    export const SELF_DRAW = "selfdraw";
    export const NO_WIN = "nowin";
    export const RESTART = "restart";
    export const PAO = "pao";
    export const MISTAKE = "mistake";

    // Direction export constants
    export const EAST = "east";
    export const SOUTH = "south";
    export const WEST = "west";
    export const NORTH = "north";

    export function WINDS() {
        return [EAST, SOUTH, WEST, NORTH];
    }

    // Hong Kong HTML forms
    // Be careful as some of these are hardcoded in HTML!
    export const HKG_DEAL_IN = "hkg_dealin";
    export const HKG_SELF_DRAW = "hkg_selfdraw";
    export const HKG_NO_WIN = "hkg_nowin";
    export const HKG_MISTAKE = "hkg_mistake";
    export const HKG_PAO = "hkg_pao";

    // Japanese HTML forms
    // Be careful as some of these are hardcoded in HTML!
    export const JPN_DEAL_IN = "jpn_dealin";
    export const JPN_SELF_DRAW = "jpn_selfdraw";
    export const JPN_NO_WIN = "jpn_nowin";
    export const  JPN_RESTART = "jpn_restart";
    export const JPN_MISTAKE = "jpn_mistake";
    export const JPN_DEAL_IN_PAO = "jpn_dealin_pao";

    export namespace PRIORITY {
        export const east = 3;
        export const south = 2;
        export const west = 1;
        export const north = 0;
    }

    export namespace GAME_STATE {
        export const PENDING_CONFIRM = "pending_confirm";
        export const IN_PROGRESS = "in_progress";
        export const COMPLETED = "completed";
        export const ABANDONED = "abandoned";
        export const DELETED = "deleted";
    }
}