const ResponseBase = require("./response-base");

module.exports = class NotFoundResponse extends ResponseBase {
  constructor(data) {
    super(404, data)
  }
}