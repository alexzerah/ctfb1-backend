import server from "../app.js";
import request from "supertest";
process.env.TEST_PORT = "4000";

console.log(process.env.TEST_PORT);

afterAll((done) => {
    server.close(done);
});

describe("auth", () => {
    test("register should return 200 for valid input", async () => {
        const res = await request(server)
            .post("/auth/register")
            .send({ username: "test", password: "test" });

        expect(res.statusCode).toBe(200);
    });
    test("register should return 400 for invalid input", async () => {
        const res = await request(server).post("/auth/register").send({});

        expect(res.statusCode).toBe(400);
    });

});
