class ResponseBase {
  constructor(statusCode, data) {
    this.statusCode = statusCode;
    this.data = data;
  }
}

class OkResponse extends ResponseBase {
  constructor(data) {
    super(200, data)
  }
}

class NotFoundResponse extends ResponseBase {
  constructor(data) {
    super(404, data)
  }
}

class InternalServerErrorResponse extends ResponseBase {
  constructor(data) {
    super(500, data)
  }
}

class ControllerBase {
  ok(data) {
    return new OkResponse(data);
  }
  notFound(message) {
    return new NotFoundResponse({ message });
  }
  internalServerError(message) {
    return new this.internalServerError({ message });
  }
}

class UsersController extends ControllerBase {
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
    const affectedRows = await this.usersRepository.create(user);

    if (!affectedRows) {
      return this.internalServerError("Fail to create user");
    }

    return this.ok(user);
  }
}

module.exports = UsersController;
