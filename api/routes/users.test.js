const request = require("supertest");
const app = require("../../app");
require("dotenv").config();

// USER PATHS /users
describe("Test /users paths", () => {
  test("It should respond with 200 via GET", () => {
    return request(app)
      .get("/api/" + process.env.API_VERSION + "/users")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(200);
        expect(response.body.hasOwnProperty("requests")).toBeTruthy();
      });
  });

  test("It should respond with 404 via POST", () => {
    return request(app)
      .post("/api/" + process.env.API_VERSION + "/users")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond with 404 via PUT", () => {
    return request(app)
      .put("/api/" + process.env.API_VERSION + "/users")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond with 404 via PATCH", () => {
    return request(app)
      .patch("/api/" + process.env.API_VERSION + "/users")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond with 404 via DELETE", () => {
    return request(app)
      .delete("/api/" + process.env.API_VERSION + "/users")
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
      .get("/api/" + process.env.API_VERSION + "/users/signup")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond 200 via POST", () => {
    return request(app)
      .post("/api/" + process.env.API_VERSION + "/users/signup")
      .send({ email: "test@test.de", password: "test123" })
      .set("Accept", "application/json")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message");
      });
  });

  test("It should respond 500 via POST", () => {
    return request(app)
      .post("/api/" + process.env.API_VERSION + "/users/signup")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty("error");
      });
  });

  test("It should respond with 404 via PUT", () => {
    return request(app)
      .put("/api/" + process.env.API_VERSION + "/users/signup")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond with 404 via PATCH", () => {
    return request(app)
      .patch("/api/" + process.env.API_VERSION + "/users/signup")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond with 404 via DELETE", () => {
    return request(app)
      .delete("/api/" + process.env.API_VERSION + "/users/signup")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });
});

// /users/login
describe("Test /users/login path", () => {
  test("It should respond 404 via GET", () => {
    return request(app)
      .get("/api/" + process.env.API_VERSION + "/users/login")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond 200 via POST", () => {
    return request(app)
      .post("/api/" + process.env.API_VERSION + "/users/login")
      .send({ email: "test@test.de", password: "test123" })
      .set("Accept", "application/json")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("token");
      });
  });

  test("It should respond 500 via POST", () => {
    return request(app)
      .post("/api/" + process.env.API_VERSION + "/users/login")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty("error");
      });
  });

  test("It should respond with 404 via PUT", () => {
    return request(app)
      .put("/api/" + process.env.API_VERSION + "/users/login")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond with 404 via PATCH", () => {
    return request(app)
      .patch("/api/" + process.env.API_VERSION + "/users/login")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond with 404 via DELETE", () => {
    return request(app)
      .delete("/api/" + process.env.API_VERSION + "/users/login")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });
});

// /users/logout
describe("Test /users/login path", () => {
  test("It should respond 404 via GET", () => {
    return request(app)
      .get("/api/" + process.env.API_VERSION + "/users/logout")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond 200 via POST", () => {
    return request(app)
      .post("/api/" + process.env.API_VERSION + "/users/logout")
      .send({ email: "test@test.de", token: "token" })
      .set("Accept", "application/json")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message");
      });
  });

  test("It should respond 401 via POST", () => {
    return request(app)
      .post("/api/" + process.env.API_VERSION + "/users/logout")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("error");
      });
  });

  test("It should respond with 404 via PUT", () => {
    return request(app)
      .put("/api/" + process.env.API_VERSION + "/users/logout")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond with 404 via PATCH", () => {
    return request(app)
      .patch("/api/" + process.env.API_VERSION + "/users/logout")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond with 404 via DELETE", () => {
    return request(app)
      .delete("/api/" + process.env.API_VERSION + "/users/logout")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });
});
