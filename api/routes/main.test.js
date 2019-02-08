const request = require("supertest");
const app = require("../../app");

// ROOT PATH /
describe("Test root path", () => {
  test("It should respond the default json response via GET", () => {
    return request(app)
      .get("/")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message");
      });
  });
});
