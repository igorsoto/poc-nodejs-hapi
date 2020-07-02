const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");

const { GetByIdContract, UserCreateContract, UserResponseContract } = require("./contracts");

class Server {
  constructor(usersController) {
    this.usersController = usersController;
  }

  async init() {
    const server = Hapi.server({
      port: 3000,
      host: "localhost"
    });

    const swaggerOptions = {
      info: {
        title: "Documentação de API de Usuários",
        version: "1.0.0",
      }
    };

    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      }
    ]);

    server.route({
      method: "GET",
      path: "/users/{id}",
      options: {
        handler: async (request, handler) => {
          const id = request.params.id;
          const response = await this.usersController.get(id);
          return handler.response(response.data).code(response.statusCode);
        },
        description: "GET /users/{id}",
        notes: "Obtém um usuário por ID",
        tags: ["api"],
        validate: {
          params: GetByIdContract
        },
        plugins: {
          "hapi-swagger": {
            responses: {
              200: {
                schema: UserResponseContract
              }
            }
          }
        },
      }
    });

    server.route({
      method: "POST",
      path: "/users",
      options: {
        handler: async (request, handler) => {
          const user = request.payload;
          const response = await this.usersController.post(user);
          return handler.response(response.data).code(response.statusCode);
        },
        validate: {
          payload: UserCreateContract
        },
        description: "POST /users",
        notes: "Cria um usuário",
        tags: ["api"],
        plugins: {
          "hapi-swagger": {
            responses: {
              200: {
                schema: UserResponseContract
              }
            }
          }
        },
      }
    });

    await server.start();
    console.log("Server running on %s", server.info.uri);
  }
}

module.exports = Server;