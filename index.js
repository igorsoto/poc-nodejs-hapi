const Server = require("./server");
const mariadb = require('mariadb');

const UserRepository = require("./repositories/users-repository");
const UsersController = require("./controllers/users-controller");

const pool = mariadb.createPool({
  database: "poc",
  host: "localhost",
  port: 3307,
  user: "root",
  password: "",
  connectionLimit: 5
});

const usersController = new UsersController(new UserRepository(pool));

const server = new Server(usersController);

(async () => await server.init())();

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
