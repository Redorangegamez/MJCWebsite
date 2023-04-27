import {Season} from "@prisma/client";
import prisma from "../db";

const getCurrentSeason = async (): Promise<Season> => {
    const season = await prisma.season.findFirst({
        where: {
            endDate: null
        }
    })

    if (!season) {
        throw new Error("No season in progress")
    }

    return season
}

const findAllSeasons = async (): Promise<Season[]> => {
    const desc: 'asc' | 'desc' = 'desc'
    return prisma.season.findMany({
        orderBy: {
            startDate: desc
        }
    })
}

const createSeason = async (seasonName: string, startDate: Date): Promise<Season> => {
    return prisma.season.create({
        data: {
            name: seasonName,
            startDate: startDate
        }
    })
}

export {getCurrentSeason, findAllSeasons, createSeason}
