-- CreateTable
CREATE TABLE `transactions` (
    `transaction_id` VARCHAR(191) NOT NULL,
    `transaction_status` VARCHAR(191) NOT NULL,
    `transaction_amount` DOUBLE NOT NULL,
    `transaction_date` DATETIME(3) NOT NULL,
    `transaction_updated` DATETIME(3) NOT NULL,
    `payment_method` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `merchants` (
    `merchant_id` VARCHAR(191) NOT NULL,
    `merchant_name` VARCHAR(191) NOT NULL,
    `merchant_email` VARCHAR(191) NOT NULL,
    `merchant_phone` VARCHAR(191) NOT NULL,
    `merchant_address` VARCHAR(191) NOT NULL,
    `merchant_country` VARCHAR(191) NOT NULL,
    `merchant_fee` DOUBLE NOT NULL,

    PRIMARY KEY (`merchant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customers` (
    `customer_id` VARCHAR(191) NOT NULL,
    `customer_name` VARCHAR(191) NOT NULL,
    `customer_email` VARCHAR(191) NOT NULL,
    `customer_phone` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`customer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `currencies` (
    `currency_symbol` VARCHAR(191) NOT NULL,
    `currency_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`currency_symbol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
