/*
  Warnings:

  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `auth` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `merchant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_merchant_id_fkey`;

-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_wallet_id_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_account_id_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_merchant_id_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_wallet_id_fkey`;

-- DropTable
DROP TABLE `account`;

-- DropTable
DROP TABLE `auth`;

-- DropTable
DROP TABLE `merchant`;

-- DropTable
DROP TABLE `transaction`;

-- DropTable
DROP TABLE `wallet`;

-- CreateTable
CREATE TABLE `merchants` (
    `merchant_id` VARCHAR(191) NOT NULL,
    `merchant_name` VARCHAR(191) NOT NULL,
    `merchant_email` VARCHAR(191) NOT NULL,
    `merchant_phone` VARCHAR(191) NOT NULL,
    `merchant_address` VARCHAR(191) NOT NULL,
    `merchant_website` VARCHAR(191) NOT NULL,
    `merchant_logo` VARCHAR(191) NOT NULL,
    `redirect_url` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `created_by` VARCHAR(191) NOT NULL,
    `updated_by` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`merchant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wallets` (
    `wallet_id` VARCHAR(191) NOT NULL,
    `wallet_name` VARCHAR(191) NOT NULL,
    `wallet_balance` DOUBLE NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `created_by` VARCHAR(191) NOT NULL,
    `updated_by` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`wallet_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts` (
    `account_id` VARCHAR(191) NOT NULL,
    `account_name` VARCHAR(191) NOT NULL,
    `account_type` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `created_by` VARCHAR(191) NOT NULL,
    `updated_by` VARCHAR(191) NOT NULL,
    `merchant_id` VARCHAR(191) NOT NULL,
    `wallet_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `transaction_id` VARCHAR(191) NOT NULL,
    `transaction_type` VARCHAR(191) NOT NULL,
    `transaction_date` DATETIME(3) NOT NULL,
    `transaction_amount` DOUBLE NOT NULL,
    `transaction_status` VARCHAR(191) NOT NULL,
    `transaction_note` VARCHAR(191) NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `created_by` VARCHAR(191) NOT NULL,
    `updated_by` VARCHAR(191) NOT NULL,
    `account_id` VARCHAR(191) NOT NULL,
    `client_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auths` (
    `client_id` VARCHAR(191) NOT NULL,
    `client_secret` VARCHAR(191) NOT NULL,
    `apps_name` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `created_by` VARCHAR(191) NOT NULL,
    `updated_by` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`client_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_merchant_id_fkey` FOREIGN KEY (`merchant_id`) REFERENCES `merchants`(`merchant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_wallet_id_fkey` FOREIGN KEY (`wallet_id`) REFERENCES `wallets`(`wallet_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`account_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `auths`(`client_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
