const request = require('supertest');
const app = require('./app');

describe('Test GET root path', () => {
    test('It should respond the default json response', () => {
        return request(app).get("/").then(response => {
            expect(response).not.toBeNull();
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('message');
        })
    });
})