import Cookies from "js-cookie";
import { prismaClient } from "../src/app/database";

export class CleaningTest {

  static TEMPLATE_UUID = [
    "6ca18406-629c-4ed4-8e26-9ff338041dfe",
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
    await prismaClient.transaction.deleteMany({
      where: {
        account_id: {
          in: [
            "123456",
            "08123456789"
          ]
        }
      }
    });
 
    // Delete Account
    await prismaClient.account.deleteMany({
      where: {
        account_id: {
          in: [
            "123456",
            "08123456789"
          ]
        }
      }
    });

    // Delete Merchant
    await prismaClient.merchant.deleteMany({
      where: {
        merchant_id: {
          in: [
            this.TEMPLATE_UUID[3],
            this.TEMPLATE_UUID[4]
          ]
        }
      }
    });

    // Delete Wallet
    await prismaClient.wallet.deleteMany({
      where: {
        wallet_id: {
          in: [
            this.TEMPLATE_UUID[5],
            this.TEMPLATE_UUID[6]
          ]
        }
      }
    });

    // Delete Auth
    await prismaClient.auth.delete({
      where: {
        client_id: this.TEMPLATE_UUID[0]
      }
    });

  }

  static async insert() {

    // Insert Merchant
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

    // Insert Wallet
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

    // Insert Auth
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

    // Insert Account
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

  static async cleaningBefore() {
    Cookies.remove("token");
    await this.insert();
  }

  static async cleaningAfter() {
    Cookies.remove("token");
    await this.delete();
  }

}