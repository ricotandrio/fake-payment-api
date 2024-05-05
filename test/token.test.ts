import supertest from "supertest";
import { UtilTest } from "./test-util";
import { web } from "../src/app/web";
import Cookies from "js-cookie";

describe("POST /auth/token", () => {
  beforeAll(async () => {
    await UtilTest.insert();
  });
  
  afterAll(async () => {
    Cookies.remove("token");
    await UtilTest.delete();
  });

  it('should return 200 OK', async () => {

    const response = await supertest(web)
      .post('/auth/token')
      .set("Authorization", `Basic ${UtilTest.TEMPLATE_UUID[0]}:${UtilTest.TEMPLATE_UUID[1]}`)

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.header["set-cookie"]).toBeDefined();
  });

  it('should return 401', async () => {
    const response = await supertest(web)
    .post('/auth/token')
    .set("Authorization", `Basic invalid_client_id:${UtilTest.TEMPLATE_UUID[1]}`)
  
    expect(response.status).toBe(401);
    expect(response.header["set-cookie"]).toBeUndefined();
  })
});
