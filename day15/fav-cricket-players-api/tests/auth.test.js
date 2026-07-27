import request from "supertest";
import app from "../app.js";
import { connect, closeDatabase, clearDatabase } from "./helpers/testDb.js";

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe("POST /api/auth/signup", () => {
    it('returns 400 if username is missing or password is missing', async () => {
        const res = await request(app).post('/api/auth/signup').send({ username: 'testuser', email: 'testuser@example.com' })
        expect(res.statusCode).toBe(400)
    })
    it('creates a new user and returns 201 if username and password are provided', async () => {
        const res = await request(app).post('/api/auth/signup').send({ username: 'ttestuser', email: 'testuser@example.com', password: 'password123' })
        expect(res.statusCode).toBe(201)
    })
    it('returns 409 if the email is already registered', async () => {
        await request(app).post('/api/auth/signup').send({
            username: 'first', email: 'dupe@example.com', password: 'secret123',
        })
        const res = await request(app).post('/api/auth/signup').send({
            username: 'second', email: 'dupe@example.com', password: 'secret123',
        })
        expect(res.statusCode).toBe(409)
    })
    it("returns 400 if username is shorter than the minimum length", async () => {
        const res = await request(app).post("/api/auth/signup").send({
            username: "ab",
            email: "shortname@example.com",
            password: "secret123",
        });
        expect(res.statusCode).toBe(400);
    });
});

describe("POST /api/auth/login", () => {
        beforeEach(async () => {
            await request(app).post('/api/auth/signup').send({
                username: "rajesh",
                email: "rajesh@example.com",
                password: "secret123",
            })
        })
        it('returns 400 if email or password is missing ', async () => {
            const res = await request(app).post('/api/auth/login').send({ email: 'testuser@example.com' })
            expect(res.statusCode).toBe(400)
        })

        it('returns 200 if email and password are provided and  valid', async () => {
            const res = await request(app).post('/api/auth/login').send({ email: 'rajesh@example.com', password: 'secret123' })
            expect(res.statusCode).toBe(200)

        })
        it('returns 401 if the user does not exist', async () => {
            const res = await request(app).post('/api/auth/login').send({
                email: 'nobody@example.com', password: 'whatever',
            })
            expect(res.statusCode).toBe(401)
        })

        it('returns 401 if the password is wrong', async () => {
            const res = await request(app).post('/api/auth/login').send({
                email: 'rajesh@example.com', password: 'wrongpassword',
            })
            expect(res.statusCode).toBe(401)
        })
});

describe("GET /api/players", () => {
    beforeEach(async () => {
        await request(app).post('/api/auth/signup').send({
            username: "rajesh",
            email: "rajesh@example.com",
            password: "secret123",
        })
    })
    it('returns 200 if auth token is provided', async () => {
        const loginRes = await request(app).post('/api/auth/login').send({ email: 'rajesh@example.com', password: 'secret123' })
        const token = loginRes.body.token;
        const res = await request(app).get('/api/players').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200)
    })
});

describe("GET /api/players/:id", () => { });

describe("POST /api/players", () => { });
