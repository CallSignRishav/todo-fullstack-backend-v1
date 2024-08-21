import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";

const deleteRead: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.route({
    method: "DELETE",

    url: "/read",

    schema: {
      response: {
        "2xx": Type.Object({
          count: Type.Number(),
        }),
      },
    },

    handler: async (request, reply) => {
      const deleteCompleted = await fastify.prisma.todo.deleteMany({
        where: {
          isCompleted: true,
        },
      });

      reply.send(deleteCompleted);
    },
  });
};

export default deleteRead;
