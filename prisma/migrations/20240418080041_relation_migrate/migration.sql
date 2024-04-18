/*
  Warnings:

  - Added the required column `currency_symbol` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `merchant_id` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `currency_symbol` VARCHAR(191) NOT NULL,
    ADD COLUMN `customer_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `merchant_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `transaction_headers` (
    `transaction_id` VARCHAR(191) NOT NULL,
    `customer_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`transaction_id`, `customer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_merchant_id_fkey` FOREIGN KEY (`merchant_id`) REFERENCES `merchants`(`merchant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_currency_symbol_fkey` FOREIGN KEY (`currency_symbol`) REFERENCES `currencies`(`currency_symbol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_headers` ADD CONSTRAINT `transaction_headers_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_headers` ADD CONSTRAINT `transaction_headers_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`transaction_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
