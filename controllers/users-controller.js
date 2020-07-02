const ControllerBase = require("./controller-base");

module.exports = class UsersController extends ControllerBase {
  constructor(usersRepository) {
    super();
    this.usersRepository = usersRepository;
  }

  async get(id) {
    const user = await this.usersRepository.get(id);

    if (!user) {
      return this.notFound("User was not found.");
    }

    return this.ok(user);
  }

  async post(user) {
    const createdUser = await this.usersRepository.create(user);

    if (!createdUser) {
      return this.internalServerError("Fail to create user");
    }

    return this.ok(createdUser);
  }
}
