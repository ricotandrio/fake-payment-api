import { UtilTest } from "./util.test";
import { CreateTransactionRequest } from "../src/models/requests/transaction-request";
import { TransactionService } from "../src/services/transaction-service";

describe('POST /api/transaction', () => {
  afterEach(async () => {
    await UtilTest.deleteTransaction();
  });

  it('should return 201', async () => {
    const createTransactionRequest: CreateTransactionRequest = {
      payment_type: "credit_card",
      transaction_detail: {
        order_id: "ORD123456",
        amount: "100.00"
      },
      customer_detail: {
        customer_id: "CUS789",
        customer_name: "John Doe",
        customer_email: "john.doe@example.com",
        customer_phone: "123-456-7890"
      },
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" 
    };
    
    const response = await TransactionService.create(createTransactionRequest);

    expect(response.code).toBe(201);
  });

  it('should return 400', async () => {
    const createTransactionRequest: CreateTransactionRequest = {
      payment_type: "credit_card",
      transaction_detail: {
        order_id: "",
        amount: "100.00"
      },
      customer_detail: {
        customer_id: "CUS789",
        customer_name: "John Doe",
        customer_email: "",
        customer_phone: "123-456-7890"
      },
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    };

    try {
      await TransactionService.create(createTransactionRequest);
    } catch(e) {
      expect(e.code).toBe(400);
    }
  });



});
