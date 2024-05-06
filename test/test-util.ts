import { prismaClient } from "../src/app/database";

export class UtilTest {

  static TEMPLATE_UUID = [
    "6ca18406-629c-4ed4-9e26-9ff338041dfe",
    "6ca18406-629c-4ed4-8e26-9ff338041dfd",
    "6ca18406-629c-4ed4-8e26-9ff338041efe",
    "6ca18406-629c-4ed4-8e26-9ff338041dff",
    "6ca18406-629c-4ed4-8e26-9ff338041d00",
    "6ca18406-629c-4ed4-8e26-9ff338041d01",
    "6ca18406-629c-4ed4-8e26-9ff338041d02",
    "6ca18406-629c-4ed4-8e26-9ff338041d03",
    "6ca18406-629c-4ed4-8e26-9ff338041d04",
    "6ca18406-629c-4ed4-8e26-9ff338041d05",
  ];

  static async delete() {

    // Delete Transaction
    const transactionsExist = await prismaClient.transaction.findMany({
      where: {
        account_id: {
          in: ["123456", "08123456789"]
        }
      }
    });

    if (transactionsExist.length > 0) {
      await prismaClient.transaction.deleteMany({
        where: {
          account_id: {
            in: ["123456", "08123456789"]
          }
        }
      });
    }

    // Delete Auth
    const authExists = await prismaClient.auth.findUnique({
      where: {
        client_id: this.TEMPLATE_UUID[0]
      }
    });

    if (authExists) {
      await prismaClient.auth.delete({
        where: {
          client_id: this.TEMPLATE_UUID[0]
        }
      });
    }
    
    // Delete Account
    const accountsExist = await prismaClient.account.findMany({
      where: {
        account_id: {
          in: ["123456", "08123456789"]
        }
      }
    });

    if (accountsExist.length > 0) {
      await prismaClient.account.deleteMany({
        where: {
          account_id: {
            in: ["123456", "08123456789"]
          }
        }
      });
    }

    // Delete Merchant
    const merchantsExist = await prismaClient.merchant.findMany({
      where: {
        merchant_id: {
          in: [this.TEMPLATE_UUID[3], this.TEMPLATE_UUID[4]]
        }
      }
    });

    if (merchantsExist.length > 0) {
      await prismaClient.merchant.deleteMany({
        where: {
          merchant_id: {
            in: [this.TEMPLATE_UUID[3], this.TEMPLATE_UUID[4]]
          }
        }
      });
    }

    // Delete Wallet
    const walletsExist = await prismaClient.wallet.findMany({
      where: {
        wallet_id: {
          in: [this.TEMPLATE_UUID[5], this.TEMPLATE_UUID[6]]
        }
      }
    });

    if (walletsExist.length > 0) {
      await prismaClient.wallet.deleteMany({
        where: {
          wallet_id: {
            in: [this.TEMPLATE_UUID[5], this.TEMPLATE_UUID[6]]
          }
        }
      });
    }

  }

  static async deleteAll() {
    await prismaClient.transaction.deleteMany();
    await prismaClient.auth.deleteMany();
    await prismaClient.account.deleteMany();
    await prismaClient.merchant.deleteMany();
    await prismaClient.wallet.deleteMany();
  }

  static async insert() {

    // Insert Auth
    this.createAuth();

    // Insert Merchant
    this.createMerchant();

    // Insert Wallet
    this.createWallet();

    // Insert Account
    this.createAccount(); 
  }

  static async createAuth() {
    await prismaClient.auth.create({
      data: {
        client_id: this.TEMPLATE_UUID[0],
        client_secret: this.TEMPLATE_UUID[1],
        apps_name: "Meja Belajar",
        is_active: true,
        updated_at: new Date(),
        created_by: "Meja Belajar",
        updated_by: "Meja Belajar"
      }
    });
  }

  static async createMerchant() {
    await prismaClient.merchant.createMany({
      data: [
        {
          merchant_id: this.TEMPLATE_UUID[3],
          merchant_name: "Digital Bank",
          merchant_email: "payment@digitalbank.com",
          merchant_phone: "08123456789",
          merchant_address: "Street 1, Konoha Village",
          merchant_website: "https://digitalbank.com",
          merchant_logo: "https://digitalbank.com/logo",
          redirect_url: "https://digitalbank.com/redirect",
          is_active: true,
          updated_at: new Date(),
          created_by: "Digital Bank",
          updated_by: "Digital Bank"
        },
        {
          merchant_id: this.TEMPLATE_UUID[4],
          merchant_name: "Tech Solutions",
          merchant_email: "info@techsolutions.com",
          merchant_phone: "0987654321",
          merchant_address: "Main Street, Central City",
          merchant_website: "https://techsolutions.com",
          merchant_logo: "https://techsolutions.com/logo",
          redirect_url: "https://techsolutions.com/redirect",
          is_active: true,
          updated_at: new Date(),
          created_by: "Tech Solutions",
          updated_by: "Tech Solutions",
        }
      ],
      skipDuplicates: true
    });
  }

  static async createWallet() {
    await prismaClient.wallet.createMany({
      data: [
        {
          wallet_id: this.TEMPLATE_UUID[5],
          wallet_name: "Digital Bank Account",
          wallet_balance: 1000000,
          is_active: true,
          updated_at: new Date(),
          created_by: "Digital Bank",
          updated_by: "Digital Bank"
        },
        {
          wallet_id: this.TEMPLATE_UUID[6],
          wallet_name: "Tech Solutions eWallet",
          wallet_balance: 500000,
          is_active: true,
          updated_at: new Date(),
          created_by: "Tech Solutions",
          updated_by: "Tech Solutions"
        }
      ],
      skipDuplicates: true
    });
  }

  static async createAccount() {
    await prismaClient.account.createMany({
      data: [
        {
          account_id: "123456",
          account_name: "Digital Bank Account",
          account_type: "BANK",
          merchant_id: this.TEMPLATE_UUID[3],
          wallet_id: this.TEMPLATE_UUID[5],
          is_active: true,
          updated_at: new Date(),
          created_by: "Digital Bank",
          updated_by: "Digital Bank"
        },
        {
          account_id: "08123456789",
          account_name: "Tech Solutions e-Wallet",
          account_type: "EWALLET",
          merchant_id: this.TEMPLATE_UUID[4],
          wallet_id: this.TEMPLATE_UUID[6],
          is_active: true,
          updated_at: new Date(),
          created_by: "Tech Solutions",
          updated_by: "Tech Solutions"
        }
      ],
      skipDuplicates: true
    });
  }

}