import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";

/**  @type {import('fastify').FastifyPluginAsync} */

const getSingleTodo: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.route({
    method: "GET",

    url: "/:id",

    schema: {
      params: Type.Object({
        id: Type.String(),
      }),

      response: {
        "2xx": Type.Object({
          id: Type.String(),
          todoName: Type.String(),
        }),
      },
    },

    handler: async (request, reply) => {
      const todoId = request.params;

      const myTodo = await fastify.prisma.todo.findUniqueOrThrow({
        where: todoId,
      });

      reply.send({ id: myTodo?.id, todoName: myTodo?.todoName });
    },
  });
};

export default getSingleTodo;
