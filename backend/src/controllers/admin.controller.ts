import {Request, Response} from "express";

const getAdminHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({message: "Admin"})
    } catch (error) {
        throw error
    }
}

export {getAdminHandler}
