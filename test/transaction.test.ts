import supertest from "supertest";

import { CleaningTest } from "./test-util";
import { web } from "../src/app/web";
import Cookies from "js-cookie";

describe('POST /transaction', () => {
  beforeEach(async () => {
    await CleaningTest.cleaningBefore();
  });

  afterEach(async () => {
    await CleaningTest.cleaningAfter();
  });

  it('should return 201', async () => {

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
      .set('Cookie', ['token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNmNhMTg0MDYtNjI5Yy00ZWQ0LThlMjYtOWZmMzM4MDQxZGZlIiwiaWF0IjoxNzE0ODg1OTgwLCJleHAiOjE3MTQ4OTMxODB9.ibsw9-C3MZT6i9Zg8UAhNHGQ9mZsYoDc9GenuS5w3jI; Max-Age=7; Path=/; Expires=Sun, 05 May 2024 05:13:08 GMT; HttpOnly'])
      
    console.log(response.body);
    expect(response.status).toBe(201);
  });


});