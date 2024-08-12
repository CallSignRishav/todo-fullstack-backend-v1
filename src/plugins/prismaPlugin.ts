import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async (fastify, options) => {
  const prisma = new PrismaClient({
    log: ["error", "warn"],
  });

  await prisma.$connect();

  fastify.decorate("prisma", prisma);

  fastify.addHook("onClose", async (fastify) => {
    fastify.log.info("disconnecting Prisma from DB");
    await fastify.prisma.$disconnect();
  });
});

export default prismaPlugin;
