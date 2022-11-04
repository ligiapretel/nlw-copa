import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    //Para visualizar as queries no terminal
    log: ["query"],
});

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    });

    //Configurando qual origem poderá acessar o back-end
    await fastify.register(cors,{
        origin: true,
    });

    //Primeira rota
    fastify.get("/pools/count", async () => {
        //Fazendo a contagem de bolões
        const count = await prisma.pool.count()

        return { count }
    });
    
    await fastify.listen({ port: 3333 });
}

bootstrap();