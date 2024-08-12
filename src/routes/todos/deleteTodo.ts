import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";

const deleteTodo: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.route({
    method: "DELETE",
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
      const todoId = await request.params;

      const delTodo = await fastify.prisma.todo.delete({
        where: todoId,
      });

      reply.send(delTodo);
    },
  });
};

export default deleteTodo;
