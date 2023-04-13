import GameTypeUtils from './utils/GameTypeUtils';

export var HandScoreCalculator = {
    jpn: {
        dealinDelta: jpnDealinDelta,
        selfDrawDelta: jpnSelfDrawDelta,
        mistakeDelta: jpnMistakeDelta
    }
};

/**
 * Calculates the change in points as a result of a deal-in hand
 * Uses the formula from:
 * https://en.wikipedia.org/wiki/Japanese_Mahjong_scoring_rules
 *
 * @param {Number} points - the total number of points in hand
 * @param {Number} fu - the fu value of the hand
 * @param {Number} bonus - the current round bonus
 * @param {string} dealerWind - the true wind of the current dealer
 * @param {string} winnerWind - the winning seat true wind
 * @param {string} loserWind - the losing seat true wind
 * @param {Number} riichiSticks - the number of riichi sticks won
 * @return {Object} containing the point difference for each seat
 */
function jpnDealinDelta(points: number, fu: number, bonus: number, dealerWind: string, winnerWind: string, loserWind: string, riichiSticks: number) {
    let winds:{[key:string]: number;}= {};
    Constants.WINDS().forEach((w: string) => winds[w] = 0);

    let handValue:number;
    let bonusPoints:number = bonus * Constants.JPN_BONUS_POINTS;

    // The multiplier is for whether it's a dealer victory
    let multiplier:number = (winnerWind != dealerWind) ? 4 : 6;

    // Check to see if you have to count basic points
    if (points < 5) {
        if (fu === 20 || (points === 1 && fu === 25)) {
            throw RangeError("Invalid points/fu combination");
        } else {
            // Calculate hand value, if it's above a mangan, cap it there
            let manganPayout = Constants.JPN_MANGAN_BASE_POINTS * multiplier;
            handValue = Math.ceil((fu * Math.pow(2, 2 + points)) * multiplier / 100) * 100;
            handValue = (handValue > manganPayout) ? manganPayout : handValue;
        }
    } else {
        handValue = manganValue(points) * multiplier;
    }

    // Add everything together to finalize total
    winds[winnerWind] = handValue + bonusPoints + (riichiSticks * Constants.JPN_RIICHI_POINTS);
    winds[loserWind] = -(handValue + bonusPoints);

    return winds;
}

/**
 * Calculates the change in points as a result of a self-drawn hand
 * Uses the formula from https://en.wikipedia.org/wiki/Japanese_Mahjong_scoring_rules
 *
 * @param {Number} points - the total number of han + dora
 * @param {Number} fu - the fu value of the hand
 * @param {Number} bonus - the current round bonus
 * @param {string} dealerWind - the true wind of the current dealer
 * @param {string} winnerWind - the winning seat true wind
 * @param {Number} riichiSticks - the total number of thrown riichi sticks
 * @return {Object} containing the point difference for each seat
 */
function jpnSelfDrawDelta(points: number, fu: number, bonus: number, dealerWind: string, winnerWind: string, riichiSticks: number) {
    let winds:{[key:string]: number;}= {};
    Constants.WINDS().forEach(w => winds[w] = 0);
    let basicPoints: number, nonDealerPays: number, dealerPays: number;
    let bonusPoints: number= bonus * Constants.JPN_BONUS_POINTS;
    let individualBonusPayout: number = bonusPoints / 3;

    // Check to see if you have to count basic points
    if (points < 5) {
        if ((points === 1 && (fu === 20 || fu === 25)) || (points === 2 && fu === 25)) {
            throw RangeError("Invalid points/fu combination");
        } else {
            // Calculate hand value, if it's above a mangan, cap it there
            basicPoints = fu * Math.pow(2, 2 + points);
            basicPoints = basicPoints < Constants.JPN_MANGAN_BASE_POINTS ? basicPoints : Constants.JPN_MANGAN_BASE_POINTS;
        }
    } else {
        basicPoints = manganValue(points);
    }
    nonDealerPays = Math.ceil(basicPoints / 100 * (dealerWind === winnerWind ? 2 : 1)) * 100;
    dealerPays = Math.ceil(basicPoints / 100 * 2) * 100;

    // Everyone loses except the winner
    Object.keys(winds).forEach(v => winds[v] = -(nonDealerPays + individualBonusPayout));

    // If dealer wins, everyone pays dealer amount, otherwise dealer pays differently
    if (winnerWind === dealerWind) {
        winds[dealerWind] = (nonDealerPays * 3)
            + (bonusPoints)
            + (riichiSticks * Constants.JPN_RIICHI_POINTS);
    } else {
        winds[dealerWind] = -(dealerPays + individualBonusPayout)
        winds[winnerWind] = dealerPays
            + (nonDealerPays * 2)
            + (bonusPoints)
            + (riichiSticks * Constants.JPN_RIICHI_POINTS);
    }

    return winds;
}

/**
 * Calculates the point difference as the result of a mistaken hand
 * @param {string} loser - the losing seat true wind
 * @return {Object} containing the point difference for each seat
 */
function jpnMistakeDelta(loser:string) {
    let winds:{[key:string]: number;}= {};
    Constants.WINDS().forEach(w => winds[w] = Constants.JPN_MISTAKE_POINTS / 3);

    winds[loser] = -Constants.JPN_MISTAKE_POINTS;
    return winds;
};

/**
 * Calculates the total base points  for high value hands
 * @param {Number} points - total points in hand
 * @returns {Number} representing number of base points as the result of a certain point threshold,
 *                   must be greater than mangan minimum points
 */
function manganValue(points: number) {
    let multiplier: number;
    switch (true) {
        case (points === 5): multiplier = 1; break;
        case (points <= 7): multiplier = 1.5; break;
        case (points <= 10): multiplier = 2; break;
        case (points <= 12): multiplier = 3; break;
        // After 13 points is hit, we only see multiples of 13
        case (points === 13): multiplier = 4; break;
        case (points === 26): multiplier = 4 * 2; break;
        case (points === 39): multiplier = 4 * 3; break;
        case (points === 52): multiplier = 4 * 4; break;
        case (points === 65): multiplier = 4 * 5; break;
        default: multiplier = 1; break;
    }
    return Constants.JPN_MANGAN_BASE_POINTS * multiplier;
};
