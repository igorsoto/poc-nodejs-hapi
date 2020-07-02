const ResponseBase = require("./response-base");

module.exports = class InternalServerErrorResponse extends ResponseBase {
  constructor(data) {
    super(500, data)
  }
}