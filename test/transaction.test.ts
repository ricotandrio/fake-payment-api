import supertest from "supertest";
import { UtilTest } from "./test-util";
import { web } from "../src/app/web";
import Cookies from "js-cookie";
import { logger } from "../src/app/logging";

describe('POST /transaction', () => {
  beforeEach(async () => {
    await UtilTest.insert();
  });
  
  afterEach(async () => {
    await UtilTest.deleteAll();
  });

  it('should return 201', async () => {
    const token_request = await supertest(web)
      .post('/auth/token')
      .set("Authorization", `Basic ${UtilTest.TEMPLATE_UUID[0]}:${UtilTest.TEMPLATE_UUID[1]}`);
    
    const token = token_request.body.token;
    logger.debug(token);

    const response = await supertest(web).post('/transaction')
      .send({
        "transaction_type": "DEBIT",
        "transaction_date": "2023-05-05T05:10:08.000Z",
        "transaction_amount": 1000,
        "transaction_note": "Test Transaction",
        "user": {
          "user_id": UtilTest.TEMPLATE_UUID[2],
          "user_email": "usertest@mail.com",
          "user_name": "User Test"
        },
        "account_id": "123456"
      })
      .set('Authorization', `Bearer ${token}`);


    logger.debug(response.body.message);
    expect(response.status).toBe(201);
  });


});