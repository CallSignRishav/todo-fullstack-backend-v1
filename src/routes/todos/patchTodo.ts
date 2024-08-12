import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";

const patchTodo: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.route({
    method: "PATCH",

    url: "/:id",

    schema: {
      params: Type.Object({
        id: Type.String(),
      }),

      body: Type.Object({
        todoName: Type.String(),
      }),

      response: {
        "2xx": Type.Object({
          id: Type.String(),
          todoName: Type.String(),
        }),
      },
    },

    handler: async (request, reply) => {
      const bodyData = await request.body;

      const todoId = await request.params;

      const updateTodo = await fastify.prisma.todo.update({
        where: todoId,

        data: bodyData,
      });

      reply.send(updateTodo);
    },
  });
};

export default patchTodo;
