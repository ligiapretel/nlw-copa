import Fastify from "fastify";
import cors from "@fastify/cors";
import { z } from "zod";//Biblioteca para validação de dados
import { PrismaClient } from "@prisma/client";
import ShortUniqueId from "short-unique-id";//Biblioteca para gerar o códgio do bolão aleatório

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
        const count = await prisma.pool.count();

        return { count };
    });

    fastify.get("/users/count", async () => {
        //Fazendo a contagem de usuários
        const count = await prisma.user.count();

        return { count };
    });

    fastify.get("/guesses/count", async () => {
        //Fazendo a contagem de palpites
        const count = await prisma.guess.count();

        return { count };
    });

    //Rota para criar um bolão
    fastify.post("/pools", async (request, reply) => {
        //Validando campo title para que não seja null 
        const createPoolBody = z.object({
            title: z.string(),
        });

        //Recebendo título do bolão
        const { title } = createPoolBody.parse(request.body);

        //Gerando o código do bolão com 6 caracteres
        const generate = new ShortUniqueId({ length: 6 });
        const code = String(generate()).toUpperCase();

        //Criando o bolão
        await prisma.pool.create({
            data: {
                title,
                code
            }
        });

        return reply.status(201).send({ code });

       ;
    });
    
    //O host é para funcionar no mobile
    await fastify.listen({ port: 3333, /*host: "0.0.0.0"*/ });
}

bootstrap();