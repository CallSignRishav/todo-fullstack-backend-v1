import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";

const postTodo: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.route({
    method: "POST",

    url: "/",

    schema: {
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

      const createTodo = await fastify.prisma.todo.create({
        data: bodyData,
      });

      reply.send(createTodo);
    },
  });
};

export default postTodo;
