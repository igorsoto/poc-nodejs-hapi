const ResponseBase = require("./response-base");

module.exports = class OkResponse extends ResponseBase {
  constructor(data) {
    super(200, data)
  }
}