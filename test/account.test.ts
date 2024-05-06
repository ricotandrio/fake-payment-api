import supertest from "supertest";
import { UtilTest } from "./test-util";
import { web } from "../src/app/web";
import { logger } from "../src/app/logging";

describe('POST /account', () => {
  beforeAll(async () => {
    await UtilTest.createAuth();  
    await UtilTest.createMerchant();
  });

  afterAll(async () => {
    await UtilTest.deleteAll();
  });

  it('should return 201: Account is Created', async () => {
    const token_request = await supertest(web)
      .post('/auth/token')
      .set("Authorization", `Basic ${UtilTest.TEMPLATE_UUID[0]}:${UtilTest.TEMPLATE_UUID[1]}`);

    const token = token_request.body.token;

    const response = await supertest(web)
      .post('/account')
      .send({
        "account_name": "Account Test",
        "account_type": "Payment Account",
        "wallet_name": "GOLD Wallet",
        "merchant_id": UtilTest.TEMPLATE_UUID[3]
      })
      .set('Authorization', `Bearer ${token}`);
    
    logger.debug(response.body);
    expect(response.body.code).toBe(201);
    expect(response.body.data).toBeDefined();    
  });

  it('should return 400: Validation Error', async () => {
    const token_request = await supertest(web)
      .post('/auth/token')
      .set("Authorization", `Basic ${UtilTest.TEMPLATE_UUID[0]}:${UtilTest.TEMPLATE_UUID[1]}`);
    
    const token = token_request.body.token;
    
    const response = await supertest(web)
      .post('/account')
      .send({
        "account_name": "",
        "account_type": "Payment Account",
        "wallet_name": "",
        "merchant_id": UtilTest.TEMPLATE_UUID[2]
      })
      .set('Authorization', `Bearer ${token}`);
    
    logger.debug(response.body);
    expect(response.body.code).toBe(400);
  });
});