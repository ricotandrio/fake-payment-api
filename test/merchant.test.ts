import supertest from "supertest";
import { UtilTest } from "./test-util";
import { web } from "../src/app/web";
import { logger } from "../src/app/logging";

describe('POST /merchant', () => {
  beforeEach(async () => {
    await UtilTest.createAuth();  
  });

  afterEach(async () => {
    await UtilTest.deleteAll();
  });

  it('should return 201: Merchant is Created', async () => {

    const token_request = await supertest(web)
      .post('/auth/token')
      .set("Authorization", `Basic ${UtilTest.TEMPLATE_UUID[0]}:${UtilTest.TEMPLATE_UUID[1]}`);
    
    const token = token_request.body.token;

    const response = await supertest(web)
      .post('/merchant')
      .send({
        "merchant_name": "Merchant Test",
        "merchant_email": "merchant_test@mail.com",
        "merchant_phone": "081234567890",
        "merchant_address": "Merchant Address",
        "merchant_website": "https://merchant.com",
        "merchant_logo": "https://merchant.com/logo",
        "redirect_url": "https://merchant.com/redirect"
      })
      .set('Authorization', `Bearer ${token}`);
    

    logger.debug(response.body);
    expect(response.body.code).toBe(201);
    expect(response.body.data).toBeDefined();
  });

  it('should return 401: Token is Not Provided', async () => {
    const response = await supertest(web)
      .post('/merchant')
      .send({
        "merchant_name": "Merchant Test",
      });
    
    logger.debug(response.body);
    expect(response.body.code).toBe(401);
  });
});

describe('GET /merchant', () => {
  beforeEach(async () => {
    await UtilTest.createAuth();
    await UtilTest.createMerchant();
  });

  afterEach(async () => {
    await UtilTest.deleteAll();
  });

  it('should return 200: Merchant is Found', async () => {

    const token_request = await supertest(web)
      .post('/auth/token')
      .set("Authorization", `Basic ${UtilTest.TEMPLATE_UUID[0]}:${UtilTest.TEMPLATE_UUID[1]}`);
    
    const token = token_request.body.token;

    const response = await supertest(web)
      .get(`/merchant/${UtilTest.TEMPLATE_UUID[3]}`)
      .set('Authorization', `Bearer ${token}`);

    logger.debug(response.body);
    expect(response.body.code).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.merchant_id).toBe(UtilTest.TEMPLATE_UUID[3]);
  });

  it('should return 404: Merchant is Not Exists', async () => {
    const token_request = await supertest(web)
    .post('/auth/token')
    .set("Authorization", `Basic ${UtilTest.TEMPLATE_UUID[0]}:${UtilTest.TEMPLATE_UUID[1]}`)
    
    const token = token_request.body.token;
    
    const response = await supertest(web)
      .get('/merchant/invalid_id')
      .set('Authorization', `Bearer ${token}`);

    logger.debug(response.body);
    expect(response.body.code).toBe(404);
  });
});

