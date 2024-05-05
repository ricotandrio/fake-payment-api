import supertest from "supertest";
import { UtilTest } from "./test-util";
import { web } from "../src/app/web";
import Cookies from "js-cookie";

describe('POST /merchant', () => {
  beforeEach(async () => {
    await UtilTest.createAuth();  
  });

  afterEach(async () => {
    Cookies.remove("token");
    await UtilTest.deleteAll();
  });

  it('should return 201', async () => {

    const token = await supertest(web)
      .post('/auth/token')
      .set("Authorization", `Basic ${UtilTest.TEMPLATE_UUID[0]}:${UtilTest.TEMPLATE_UUID[1]}`)
    
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
      .set('Cookie', token.header["set-cookie"])

    expect(response.status).toBe(201);
    expect(response.body.data).toBeDefined();
  });

  it('should return 500', async () => {
    const response = await supertest(web)
      .post('/merchant')
      .send({
        "merchant_name": "Merchant Test",
      });
    
    expect(response.status).toBe(500);
  });
});

describe('GET /merchant', () => {
  beforeEach(async () => {
    await UtilTest.createAuth();
    await UtilTest.createMerchant();
  });

  afterEach(async () => {
    Cookies.remove("token");
    await UtilTest.deleteAll();
  });

  it('should return 200', async () => {

    const token = await supertest(web)
      .post('/auth/token')
      .set("Authorization", `Basic ${UtilTest.TEMPLATE_UUID[0]}:${UtilTest.TEMPLATE_UUID[1]}`)
    
    const response = await supertest(web)
      .get(`/merchant/${UtilTest.TEMPLATE_UUID[3]}`)
      .set('Cookie', token.header["set-cookie"])

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.merchant_id).toBe(UtilTest.TEMPLATE_UUID[3]);
  });

  it('should return 500', async () => {
    const token = await supertest(web)
    .post('/auth/token')
    .set("Authorization", `Basic ${UtilTest.TEMPLATE_UUID[0]}:${UtilTest.TEMPLATE_UUID[1]}`)
  
    const response = await supertest(web)
      .get('/merchant')
      .set('Cookie', token.header["set-cookie"]);
    
    expect(response.status).toBe(404);
  });
});

