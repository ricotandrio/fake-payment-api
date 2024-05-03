import supertest from "supertest";
import { web } from "../src/app/web";
import { CleaningTest } from "./test-util";

describe("POST /auth/token", () => {
  afterEach(async () => {
    await CleaningTest.delete()
  });

  it('should return 200 OK', async () => {
    await CleaningTest.insert()

    const response = await supertest(web)
      .post('/auth/token')
      .send({
        user_id: "testuser",
        client_secret: "testsecret",
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("token_id");
  });

})