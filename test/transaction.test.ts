import supertest from "supertest";
import { UtilTest } from "./test-util";
import { web } from "../src/app/web";
import { logger } from "../src/app/logging";

beforeEach(async () => {
  await UtilTest.insert();
});

afterEach(async () => {
  await UtilTest.deleteAll();
});

describe('POST /transaction', () => {
  
  it('should return 201: Transaction Created', async () => {
    const token_request = await supertest(web)
      .post('/auth/token')
      .set("Authorization", `Basic ${UtilTest.TEMPLATE_UUID[0]}:${UtilTest.TEMPLATE_UUID[1]}`);
    
    const token = token_request.body.token;

    const response = await supertest(web)
      .post('/transaction')
      .send({
        "transaction_type": "DEBIT",
        "transaction_date": "2023-05-05T05:10:08.000Z",
        "transaction_amount": 1000,
        "transaction_note": "Test Transaction",
        "user": {
          "user_id": UtilTest.TEMPLATE_UUID[9],
          "user_email": "usertest@mail.com",
          "user_name": "User Test"
        },
        "account_id": "123456"
      })
      .set('Authorization', `Bearer ${token}`);
      
    logger.debug(response.body.message);
    expect(response.body.code).toBe(201);
  });
  
});

describe('GET /transaction/:transaction_id', () => {
  
  it('should return 200: Transaction Found', async () => {
    const token_request = await supertest(web)
      .post('/auth/token')
      .set("Authorization", `Basic ${UtilTest.TEMPLATE_UUID[0]}:${UtilTest.TEMPLATE_UUID[1]}`);
    
    const token = token_request.body.token;

    const transaction = await supertest(web).post('/transaction')
      .send({
        "transaction_type": "DEBIT",
        "transaction_date": "2023-05-05T05:10:08.000Z",
        "transaction_amount": 1000,
        "transaction_note": "Test Transaction",
        "user": {
          "user_id": UtilTest.TEMPLATE_UUID[9],
          "user_email": "usertest@mail.com",
          "user_name": "User Test"
        },
        "account_id": "123456"
      })
      .set('Authorization', `Bearer ${token}`);

    const response = await supertest(web)
      .get(`/transaction/${transaction.body.data.transaction_id}`)
      .set('Authorization', `Bearer ${token}`);

    logger.debug(response.body.message);
    expect(response.body.code).toBe(200);
  });

  it('should return 404: Transaction Not Found', async () => {
    const token_request = await supertest(web)
      .post('/auth/token')
      .set("Authorization", `Basic ${UtilTest.TEMPLATE_UUID[0]}:${UtilTest.TEMPLATE_UUID[1]}`);
    
    const token = token_request.body.token;

    const response = await supertest(web)
      .get(`/transaction/${UtilTest.TEMPLATE_UUID[10]}`)
      .set('Authorization', `Bearer ${token}`);

    logger.debug(response.body.message);
    expect(response.body.code).toBe(404);
  });

});

describe('GET /transactions:client_id', () => {
    
  it('should return 200: Transactions Found', async () => {
    const token_request = await supertest(web)
      .post('/auth/token')
      .set("Authorization", `Basic ${UtilTest.TEMPLATE_UUID[0]}:${UtilTest.TEMPLATE_UUID[1]}`);
    
    const token = token_request.body.token;

    const response = await supertest(web)
      .get(`/transactions/${UtilTest.TEMPLATE_UUID[0]}`)
      .set('Authorization', `Bearer ${token}`);

    logger.debug(response.body.message);
    expect(response.body.code).toBe(200);
  });

});

describe('GET /transactions/qr/:transaction_id', () => {
  
  it('should return 200: Transaction QR Code Generated', async () => {
    const token_request = await supertest(web)
      .post('/auth/token')
      .set("Authorization", `Basic ${UtilTest.TEMPLATE_UUID[0]}:${UtilTest.TEMPLATE_UUID[1]}`);
    
    const token = token_request.body.token;

    const transaction = await supertest(web).post('/transaction')
    .send({
      "transaction_type": "DEBIT",
      "transaction_date": "2023-05-05T05:10:08.000Z",
      "transaction_amount": 1000,
      "transaction_note": "Test Transaction",
      "user": {
        "user_id": UtilTest.TEMPLATE_UUID[9],
        "user_email": "usertest@mail.com",
        "user_name": "User Test"
      },
      "account_id": "123456"
    })
    .set('Authorization', `Bearer ${token}`);

    const response = await supertest(web)
      .get(`/transactions/qr/${transaction.body.data.transaction_id}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.type).toBe('image/png');
    expect(response.status).toBe(200);
  });

  it('should return 404: Transaction Not Found', async () => {
    const token_request = await supertest(web)
      .post('/auth/token')
      .set("Authorization", `Basic ${UtilTest.TEMPLATE_UUID[0]}:${UtilTest.TEMPLATE_UUID[1]}`);
    
    const token = token_request.body.token;

    const response = await supertest(web)
      .get(`/transactions/qr/${UtilTest.TEMPLATE_UUID[10]}`)
      .set('Authorization', `Bearer ${token}`);

    logger.debug(response.body.message);
    expect(response.body.code).toBe(404);
  });
});