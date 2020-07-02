const OkResponse = require("./http/ok-response");
const NotFoundResponse = require("./http/not-found-response");
const InternalServerErrorResponse = require("./http/internal-server-error-response");

module.exports = class ControllerBase {
  ok(data) {
    return new OkResponse(data);
  }
  notFound(message) {
    return new NotFoundResponse({ message });
  }
  internalServerError(message) {
    return new InternalServerErrorResponse({ message });
  }
}