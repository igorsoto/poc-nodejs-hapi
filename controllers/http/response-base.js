module.exports = class ResponseBase {
  constructor(statusCode, data) {
    this.statusCode = statusCode;
    this.data = data;
  }
}