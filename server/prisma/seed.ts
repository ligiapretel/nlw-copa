import { PrismaClient } from "@prisma/client"

//Conexão com o banco
const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            email: "john.doe@gmail.com",
            avatarUrl: "https://github.com/ligiapretel.png",
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: "Example Pool",
            code: "BOL123",
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })
    
   await prisma.game.create({
        data: {
            date: "2022-11-10T12:00:00.937Z",
            firstTeamCountryCode: "DE",
            secondTeamCountryCode: "BR",
        }
    })

    await prisma.game.create({
        data: {
            date: "2022-11-12T12:00:00.937Z",
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "AR",

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,
                    
                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                    }
                }

            }
        }
    })
}

main()