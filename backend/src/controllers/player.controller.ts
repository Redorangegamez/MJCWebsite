import {NextFunction, Request, Response} from "express";
import createError from "http-errors";
import {loginSchema, registerSchema} from "../validation/player.validation";
import {createPlayer, findAllPlayers, findPlayerByUsername} from "../services/player.service";
import {generateToken} from "../auth/jwt";
import bcrypt from "bcryptjs";

const registerHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    registerSchema.validate(req.body).then(() => createPlayer(req.body)).then((player) => {
        if (!player) {
            throw new Error("Error creating player")
        }

        const token = generateToken(player.id)
        const {password, ...playerOmitted} = player;
        res.json({
            player: {authToken: token, ...playerOmitted}
        })
    }).catch((err: any) => {
        next(createError.BadRequest(err.message))
    })
}

const loginHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    loginSchema.validate(req.body).then(() => findPlayerByUsername(req.body.username)).then((player) => {
        if (player && bcrypt.compareSync(req.body.password, player.password)) {
            const token = generateToken(player.id)
            const {password, ...playerOmitted} = player;
            res.json({
                player: {authToken: token, ...playerOmitted}
            })
        } else {
            next(createError.Unauthorized("Username or password is incorrect"))
        }
    }).catch(() => {
        next(createError.Unauthorized("Username or password is incorrect"))
    })
}

const getPlayerNamesHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const gameType = req.params.gameType

    let query = {}
    if (gameType === "jp") {
        query = {
            where: {
                japaneseQualified: true
            }
        }
    } else if (gameType === "hk") {
        query = {
            where: {
                hongKongQualified: true
            }
        }
    }

    findAllPlayers(query).then((players) => {
        const playerNames = players.map((player) => player.username)
        res.json({playerNames})
    }).catch((err: any) => {
        next(createError.InternalServerError(err.message))
    })
}

const getPlayerLeaderboardHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const gameType = req.params.gameType

    let query = {}
    if (gameType === "jp") {
        query = {
            where: {
                japaneseQualified: true
            }
        }
    } else if (gameType === "hk") {
        query = {
            where: {
                hongKongQualified: true
            }
        }
    } else {
        next(createError.BadRequest("Invalid game type"))
    }

    findAllPlayers(query).then((players) => {
        const playerElos = players.map((player) => {
            let elo = 1500
            if (gameType === "jp") {
                elo = player.japaneseElo
            } else if (gameType === "hk") {
                elo = player.hongKongElo
            }

            return {
                username: player.username,
                elo
            }
        })
        res.json({players: playerElos})
    }).catch((err: any) => {
        next(createError.InternalServerError(err.message))
    })
}

export {registerHandler, loginHandler, getPlayerNamesHandler, getPlayerLeaderboardHandler}
