import request from "supertest";
import app from "../app.js";
import { connect, closeDatabase, clearDatabase } from "./helpers/testDb.js";

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

const registerAndlogin = async (email="testuser@example.com" )=> {
  await request(app).post('/api/auth/signup').send({
    username: "testuser",
    email: email,
    password: "password123",
  });
  const res = await request(app).post('/api/auth/login').send({
    email: email,
    password: "password123",
  });
  return res.body.token;
};

const samplePlayer ={
  playerName: "Virat Kohli",
  runs: 12000,
  strikeRate: 90.5,
  internationalStatus: "Active",
};

const fakeId = "64b8f1e2f1e2f1e2f1e2f1e2"; // A valid ObjectId format but not in the database

describe("GET /api/players", ()=> {
  it("returns 401 if no token is provided", async () =>{
    const res = await request(app).get('/api/players');
    expect(res.statusCode).toBe(401);
  })
  it('returns 401 for a malformed authorization header', async () => {
    const res = await request(app).get('/api/players').set('Authorization', 'token invalid');
    expect(res.statusCode).toBe(401);

  })
    
     it("returns 401 for an invalid token", async () => {
    const res = await request(app).get("/api/players").set("Authorization", "Bearer invalidtoken");
    expect(res.statusCode).toBe(401);
  });

  it('retuns only the players created by the logged-in user', async () => {
    const token1 = await registerAndlogin("user1@example.com");
    const token2 = await registerAndlogin("user2@example.com");
    await request(app).post('/api/players').set('Authorization', `Bearer ${token1}`).send(samplePlayer);
    await request(app).post('/api/players').set('Authorization', `Bearer ${token2}`).send(samplePlayer);
    const res = await request(app).get('/api/players').set('Authorization', `Bearer ${token1}`);
    expect(res.body.players.length).toBe(1);
})

})

describe("POST /api/players", () => {
  it("returns 401 without a token", async () => {
    const res = await request(app).post("/api/players").send(samplePlayer);
    expect(res.statusCode).toBe(401);
  });

  it("creates a player and returns 201 with a valid token", async () => {
    const token = await registerAndlogin();
    const res = await request(app).post("/api/players").set("Authorization", `Bearer ${token}`).send(samplePlayer);
    expect(res.statusCode).toBe(201);
    expect(res.body.player.playerName).toBe("Virat Kohli");
  });

  it("returns 400 when required fields are missing", async () => {
    const token = await registerAndlogin();
    const res = await request(app).post("/api/players").set("Authorization", `Bearer ${token}`).send({ playerName: "No Stats" });
    expect(res.statusCode).toBe(400);
  });
});

describe("GET /api/players/:id", () => {
  it("returns a single player owned by the user", async () => {
    const token = await registerAndlogin();
    const createRes = await request(app).post("/api/players").set("Authorization", `Bearer ${token}`).send(samplePlayer);
    const playerId = createRes.body.player._id;

    const res = await request(app).get(`/api/players/${playerId}`).set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.player._id).toBe(playerId);
  });

  it("returns 404 for a non-existent player id", async () => {
    const token = await registerAndlogin();
    const res = await request(app).get(`/api/players/${fakeId}`).set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });

  it("returns 404 when requesting another user's player", async () => {
    const tokenA = await registerAndlogin("a@example.com");
    const tokenB = await registerAndlogin("b@example.com");
    const createRes = await request(app).post("/api/players").set("Authorization", `Bearer ${tokenA}`).send(samplePlayer);
    const playerId = createRes.body.player._id;

    const res = await request(app).get(`/api/players/${playerId}`).set("Authorization", `Bearer ${tokenB}`);
    expect(res.statusCode).toBe(404);
  });
  it("returns 400 for a malformed player id", async () => {
  const token = await registerAndlogin();
  const res = await request(app).get("/api/players/not-a-valid-id").set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toBe(400);
});

});

describe("PUT /api/players/:id", () => {
  it("updates a player owned by the user", async () => {
    const token = await registerAndlogin();
    const createRes = await request(app).post("/api/players").set("Authorization", `Bearer ${token}`).send(samplePlayer);
    const playerId = createRes.body.player._id;

    const res = await request(app).put(`/api/players/${playerId}`).set("Authorization", `Bearer ${token}`).send({ runs: 15000 });
    expect(res.statusCode).toBe(200);
    expect(res.body.player.runs).toBe(15000);
  });

  it("returns 404 for a non-existent player id", async () => {
    const token = await registerAndlogin();
    const res = await request(app).put(`/api/players/${fakeId}`).set("Authorization", `Bearer ${token}`).send({ runs: 1 });
    expect(res.statusCode).toBe(404);
  });

  it("returns 403 when updating another user's player", async () => {
    const tokenA = await registerAndlogin("a@example.com");
    const tokenB = await registerAndlogin("b@example.com");
    const createRes = await request(app).post("/api/players").set("Authorization", `Bearer ${tokenA}`).send(samplePlayer);
    const playerId = createRes.body.player._id;

    const res = await request(app).put(`/api/players/${playerId}`).set("Authorization", `Bearer ${tokenB}`).send({ runs: 1 });
    expect(res.statusCode).toBe(403);
  });

  it("ignores a client-supplied ownerId and does not reassign the player", async () => {
  const token = await registerAndlogin();
  const createRes = await request(app).post("/api/players").set("Authorization", `Bearer ${token}`).send(samplePlayer);
  const playerId = createRes.body.player._id;
  const originalOwnerId = createRes.body.player.ownerId;

  const res = await request(app)
    .put(`/api/players/${playerId}`)
    .set("Authorization", `Bearer ${token}`)
    .send({ runs: 1, ownerId: "000000000000000000000001" });

  expect(res.statusCode).toBe(200);
  expect(res.body.player.ownerId).toBe(originalOwnerId);
});

});

describe("DELETE /api/players/:id", () => {
  it("deletes a player owned by the user", async () => {
    const token = await registerAndlogin();
    const createRes = await request(app).post("/api/players").set("Authorization", `Bearer ${token}`).send(samplePlayer);
    const playerId = createRes.body.player._id;

    const res = await request(app).delete(`/api/players/${playerId}`).set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  it("returns 404 for a non-existent or unauthorized player id", async () => {
    const token = await registerAndlogin();
    const res = await request(app).delete(`/api/players/${fakeId}`).set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });
});