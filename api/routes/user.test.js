const request = require("supertest");
const app = require("../../app");

// USER PATHS /user
describe("Test /user paths", () => {
  test("It should respond with 404 via GET", () => {
    return request(app)
      .get("/user")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond with 404 via POST", () => {
    return request(app)
      .post("/user")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond with 404 via PUT", () => {
    return request(app)
      .put("/user")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond with 404 via PATCH", () => {
    return request(app)
      .patch("/user")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond with 404 via DELETE", () => {
    return request(app)
      .delete("/user")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });
});

// /user/signup
describe("Test /user/signup path", () => {
  test("It should respond 404 via GET", () => {
    return request(app)
      .get("/user/signup")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond 200 via POST", () => {
    return request(app)
      .post("/user/signup")
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
      .post("/user/signup")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty("error");
      });
  });

  test("It should respond with 404 via PUT", () => {
    return request(app)
      .put("/user/signup")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond with 404 via PATCH", () => {
    return request(app)
      .patch("/user/signup")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond with 404 via DELETE", () => {
    return request(app)
      .delete("/user/signup")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });
});

// /user/login
describe("Test /user/login path", () => {
  test("It should respond 404 via GET", () => {
    return request(app)
      .get("/user/login")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond 200 via POST", () => {
    return request(app)
      .post("/user/login")
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
      .post("/user/login")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty("error");
      });
  });

  test("It should respond with 404 via PUT", () => {
    return request(app)
      .put("/user/login")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond with 404 via PATCH", () => {
    return request(app)
      .patch("/user/login")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond with 404 via DELETE", () => {
    return request(app)
      .delete("/user/login")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });
});

// /user/logout
describe("Test /user/login path", () => {
  test("It should respond 404 via GET", () => {
    return request(app)
      .get("/user/logout")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond 200 via POST", () => {
    return request(app)
      .post("/user/logout")
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
      .post("/user/logout")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("error");
      });
  });

  test("It should respond with 404 via PUT", () => {
    return request(app)
      .put("/user/logout")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond with 404 via PATCH", () => {
    return request(app)
      .patch("/user/logout")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });

  test("It should respond with 404 via DELETE", () => {
    return request(app)
      .delete("/user/logout")
      .then(response => {
        expect(response).not.toBeNull();
        expect(response.statusCode).toBe(404);
        expect(response.body.hasOwnProperty("error")).toBeTruthy();
      });
  });
});
