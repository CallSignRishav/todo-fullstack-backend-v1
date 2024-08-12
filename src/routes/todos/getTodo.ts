import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";

/**  @type {import('fastify').FastifyPluginAsync} */

const getTodo: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.route({
    method: "GET",

    url: "/",

    schema: {
      response: {
        "2xx": Type.Array(
          Type.Object({
            id: Type.String(),
            todoName: Type.String(),
          })
        ),
      },
    },

    handler: async (request, reply) => {
      const allTodo = await fastify.prisma.todo.findMany();

      reply.send(allTodo);
    },
  });
};

export default getTodo;
