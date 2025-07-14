import request from "supertest";
import app from "../index.js"; 

describe("GET /types", () => {
  it("doit retourner un tableau de types", async () => {
    const response = await request(app).get("/types");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("GET /types/:id", () => {
  it("doit retourner un tableau de pokemons associés au type existant", async () => {
    const res = await request(app).get("/types/1");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true); 
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("doit retourner 404 pour un type inexistant", async () => {
    const res = await request(app).get("/types/9999");
    expect(res.statusCode).toBe(404);
  });
});
