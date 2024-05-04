-- CreateTable
CREATE TABLE `Merchant` (
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
CREATE TABLE `Wallet` (
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
CREATE TABLE `Account` (
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
CREATE TABLE `Transaction` (
    `transaction_id` VARCHAR(191) NOT NULL,
    `transaction_type` VARCHAR(191) NOT NULL,
    `transaction_date` DATETIME(3) NOT NULL,
    `transaction_amount` DOUBLE NOT NULL,
    `transaction_status` VARCHAR(191) NOT NULL,
    `transaction_note` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `created_by` VARCHAR(191) NOT NULL,
    `updated_by` VARCHAR(191) NOT NULL,
    `merchant_id` VARCHAR(191) NOT NULL,
    `wallet_id` VARCHAR(191) NOT NULL,
    `account_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Auth` (
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
ALTER TABLE `Account` ADD CONSTRAINT `Account_merchant_id_fkey` FOREIGN KEY (`merchant_id`) REFERENCES `Merchant`(`merchant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_wallet_id_fkey` FOREIGN KEY (`wallet_id`) REFERENCES `Wallet`(`wallet_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_merchant_id_fkey` FOREIGN KEY (`merchant_id`) REFERENCES `Merchant`(`merchant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_wallet_id_fkey` FOREIGN KEY (`wallet_id`) REFERENCES `Wallet`(`wallet_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `Account`(`account_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
