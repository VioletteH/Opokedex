import request from "supertest";
import app from "../index.js"; 

describe("GET /pokemons", () => {
  it("doit retourner un tableau de pokemons", async () => {
    const response = await request(app).get("/pokemons");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("GET /pokemons/:id", () => {
  it("doit retourner un pokemon existant", async () => {
    const res = await request(app).get("/pokemons/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
  });

  it("doit retourner 404 pour un pokemon inexistant", async () => {
    const res = await request(app).get("/pokemons/9999");
    expect(res.statusCode).toBe(404);
  });
});
