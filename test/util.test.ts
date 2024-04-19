import { prismaClient } from '../src/app.database';

export class UtilTest {
  static async deleteTransaction() {
    await prismaClient.transaction.deleteMany({
      where: {
        customer: {
          customer_name: "test"
        }
      }
    });

    await prismaClient.customer.deleteMany({
      where: {
        customer_name: "test"
      }
    });
  }
}