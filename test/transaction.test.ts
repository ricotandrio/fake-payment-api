import supertest from "supertest";
import { CleaningTest } from "./test-util";
import { web } from "../src/app/web";
import Cookies from "js-cookie";

describe('POST /transaction', () => {
  beforeEach(async () => {
    await CleaningTest.insert();
  });
  
  afterEach(async () => {
    Cookies.remove("token");
    await CleaningTest.delete();
  });

  it('should return 201', async () => {
    const token = await supertest(web)
      .post('/auth/token')
      .set("Authorization", `Basic ${CleaningTest.TEMPLATE_UUID[0]}:${CleaningTest.TEMPLATE_UUID[1]}`)
    
    const response = await supertest(web).post('/transaction')
      .send({
        "transaction_type": "DEBIT",
        "transaction_date": "2023-05-05T05:10:08.000Z",
        "transaction_amount": 1000,
        "transaction_note": "Test Transaction",
        "user": {
          "user_id": CleaningTest.TEMPLATE_UUID[2],
          "user_email": "usertest@mail.com",
          "user_name": "User Test"
        },
        "account_id": "123456"
      })
      .set('Cookie', token.header["set-cookie"])
      
    console.log(response.body);
    expect(response.status).toBe(201);
  });


});