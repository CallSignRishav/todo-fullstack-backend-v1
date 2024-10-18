import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";

const deleteRead: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.route({
    method: "PATCH",

    url: "/read/:id",

    schema: {
      params: Type.Object({
        id: Type.String(),
      }),

      body: Type.Object({
        isCompleted: Type.Boolean(),
      }),

      //   response: {
      //     "2xx": Type.Object({
      //       count: Type.Number(),
      //     }),
      //   },
    },

    handler: async (request, reply) => {
      const bodyData = await request.body;

      const todoId = await request.params;

      const readTodo = await fastify.prisma.todo.update({
        where: todoId,

        data: bodyData,
      });

      reply.send(readTodo);
    },
  });
};

export default deleteRead;
