const request = require("supertest");
const app = require("./app");

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

describe("Test /user path", () => {
  test("It should respond error via GET", () => {
    return request(app)
      .get("/user")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
      });
  });

  // POST /user/signup
});
