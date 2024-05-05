import supertest from "supertest";
import { CleaningTest } from "./test-util";
import { web } from "../src/app/web";
import Cookies from "js-cookie";

describe("POST /auth/token", () => {
  beforeAll(async () => {
    await CleaningTest.insert();
  });
  
  afterAll(async () => {
    Cookies.remove("token");
    await CleaningTest.delete();
  });

  it('should return 200 OK', async () => {

    const response = await supertest(web)
      .post('/auth/token')
      .set("Authorization", `Basic ${CleaningTest.TEMPLATE_UUID[0]}:${CleaningTest.TEMPLATE_UUID[1]}`)

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.header["set-cookie"]).toBeDefined();
  });

  it('should return 401', async () => {
    const response = await supertest(web)
    .post('/auth/token')
    .set("Authorization", `Basic invalid_client_id:${CleaningTest.TEMPLATE_UUID[1]}`)
  
    expect(response.status).toBe(401);
    expect(response.header["set-cookie"]).toBeUndefined();
  })
});
