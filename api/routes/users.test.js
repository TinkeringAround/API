const request = require("supertest");
const app = require("../../app");
const jwt = require("jsonwebtoken");

const user = {
  email: "test@test.de",
  password: "test123"
};

// USER PATHS /users
describe("Test /users paths", () => {
  test("It should respond with 200 via GET", () => {
    return request(app)
      .get("/api/v1/users")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(200);
        expect(response.body.hasOwnProperty("routes")).toBeTruthy();
      });
  });

  test("It should respond with 404 via POST", () => {
    return request(app)
      .post("/api/v1/users")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });
});

// /users/signup
describe("Test /users/signup path", () => {
  test("It should respond 404 via GET", () => {
    return request(app)
      .get("/api/v1/users/signup")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
        expect(response.body.hasOwnProperty("time")).toBeTruthy();
      });
  });

  test("It should respond 500 via POST - no valid body", () => {
    return request(app)
      .post("/api/v1/users/signup")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty("error");
        expect(response.body.hasOwnProperty("time")).toBeTruthy();
      });
  });

  test("It should respond 201 via POST - non-existing User", () => {
    return request(app)
      .post("/api/v1/users/signup")
      .send({ email: user.email, password: user.password })
      .set("Content-Type", "application/json")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("email");
        expect(response.body.hasOwnProperty("time")).toBeTruthy();
      });
  });

  test("It should respond 409 via POST - existing User", () => {
    return request(app)
      .post("/api/v1/users/signup")
      .send({ email: user.email, password: user.password })
      .set("Content-Type", "application/json")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(409);
        expect(response.body).toHaveProperty("message");
        expect(response.body.hasOwnProperty("time")).toBeTruthy();
      });
  });
});

// /users/login
describe("Test /users/login path", () => {
  test("It should respond 404 via GET", () => {
    return request(app)
      .get("/api/v1/users/login")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error"));
        expect(response.body).toHaveProperty("time");
      });
  });

  test("It should respond 500 via POST - no valid body", () => {
    return request(app)
      .post("/api/v1/users/login")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty("error");
        expect(response.body).toHaveProperty("time");
      });
  });

  test("It should respond 200 via POST - existing User", () => {
    return request(app)
      .post("/api/v1/users/login")
      .send({ email: user.email, password: user.password })
      .set("Content-Type", "application/json")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("time");
      });
  });

  test("It should respond 401 via POST - non-existing User", () => {
    return request(app)
      .post("/api/v1/users/login")
      .send({ email: "fake@fake.de", password: user.password })
      .set("Content-Type", "application/json")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("message");
        expect(response.body).not.toHaveProperty("token");
        expect(response.body).toHaveProperty("time");
      });
  });

  test("It should respond 401 via POST - existing User, wrong password", () => {
    return request(app)
      .post("/api/v1/users/login")
      .send({ email: user.email, password: "fakePassword" })
      .set("Content-Type", "application/json")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("message");
        expect(response.body).not.toHaveProperty("token");
        expect(response.body).toHaveProperty("time");
      });
  });
});

// /users/:id
describe("Test /users/:userID path", () => {
  // Login User first to receive userID and token, then delete user
  test("It should respond 200 via DELETE - existing User", () => {
    return request(app)
      .post("/api/v1/users/login")
      .send({ email: user.email, password: user.password })
      .set("Content-Type", "application/json")
      .then(response => {
        const decoded = jwt.decode(response.body.token);
        const userID = decoded.userId;

        return request(app)
          .delete("/api/v1/users/" + userID)
          .set({ authorization: "Bearer " + response.body.token })
          .then(response => {
            expect(response).not.toBeNull();
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("message");
            expect(response.body).toHaveProperty("time");
          });
      });
  });
});
