import supertest from "supertest";
import { CleaningTest } from "./test-util";
import { web } from "../src/app/web";

describe("POST /auth/token", () => {
  beforeAll(async () => {
    await CleaningTest.insert()
  });

  afterAll(async () => {
    await CleaningTest.delete()
  });

  it('should return 200 OK', async () => {

    const response = await supertest(web)
      .post('/auth/token')
      .set("Authorization", `Basic ${CleaningTest.TEMPLATE_UUID[0]}:${CleaningTest.TEMPLATE_UUID[1]}`)
      .send({
        user_id: CleaningTest.TEMPLATE_UUID[2],
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it('should return 401 Unauthorized', async () => {

    const response = await supertest(web)
      .post('/auth/token')
      .send({
        user_id: CleaningTest.TEMPLATE_UUID[2],
      });

    expect(response.status).toBe(401);
  });

  it('should return 401 Unauthorized', async () => {

    const response = await supertest(web)
      .post('/auth/token')
      .set("Authorization", `${CleaningTest.TEMPLATE_UUID[0]}:${CleaningTest.TEMPLATE_UUID[1]}`)
      .send({
        user_id: CleaningTest.TEMPLATE_UUID[2],
      });

    expect(response.status).toBe(401);
  });

  it('should return 401 Unauthorized', async () => {
    const response = await supertest(web)
      .post('/auth/token')
      .set("Authorization", `Basic ${CleaningTest.TEMPLATE_UUID[0]}:${CleaningTest.TEMPLATE_UUID[1]}`)
      .send();

    expect(response.status).toBe(401);
  });
});

describe("GET /auth/token/:token/:user_id", () => {
  beforeAll(async () => {
    await CleaningTest.insert()
  });

  afterAll(async () => {
    await CleaningTest.delete()
  });

  it('should return 200 OK', async () => {

    const token = await supertest(web)
      .post('/auth/token')
      .set("Authorization", `Basic ${CleaningTest.TEMPLATE_UUID[0]}:${CleaningTest.TEMPLATE_UUID[1]}`)
      .send({
        user_id: CleaningTest.TEMPLATE_UUID[2],
      });

    const response = await supertest(web)
      .get(`/auth/token/${token.body.token}/${CleaningTest.TEMPLATE_UUID[2]}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user_id");
  });

  it('should return 401 Unauthorized', async () => {
    const token = await supertest(web)
      .post('/auth/token')
      .set("Authorization", `Basic ${CleaningTest.TEMPLATE_UUID[0]}:${CleaningTest.TEMPLATE_UUID[1]}`)
      .send({
        user_id: CleaningTest.TEMPLATE_UUID[2],
      });

    const response = await supertest(web)
      .get(`/auth/token/${token.body.token}/${CleaningTest.TEMPLATE_UUID[3]}`);
    
    expect(response.status).toBe(401);
  });

  it('should return 500 not valid token', async () => {
    const response = await supertest(web)
      .get(`/auth/token/invalid_token/${CleaningTest.TEMPLATE_UUID[2]}`);
    
    expect(response.status).toBe(500);
  });
});