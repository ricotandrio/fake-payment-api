import supertest from "supertest";
import { UtilTest } from "./test-util";
import { web } from "../src/app/web";
import { logger } from "../src/app/logging";

describe('POST /app', () => {
  afterAll(async () => {
    await UtilTest.deleteAll();
  });

  it('should return 201: Application created', async () => {
    const response = await supertest(web)
      .post('/app')
      .send({
        apps_name: 'Test Application',
      });

    logger.debug(response.body);
    expect(response.body.code).toBe(201);
    expect(response.body.data).toHaveProperty('client_id');
    expect(response.body.data).toHaveProperty('client_secret');
  });

  it('should return 400: Application name is required', async () => {
    const response = await supertest(web)
      .post('/app')
      .send({});
    
    logger.debug(response.body);
    expect(response.body.code).toBe(400);
  });
})