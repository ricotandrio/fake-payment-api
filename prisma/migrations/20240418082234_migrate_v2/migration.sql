/*
  Warnings:

  - Added the required column `currency_symbol` to the `merchants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `merchants` ADD COLUMN `currency_symbol` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `merchants` ADD CONSTRAINT `merchants_currency_symbol_fkey` FOREIGN KEY (`currency_symbol`) REFERENCES `currencies`(`currency_symbol`) ON DELETE RESTRICT ON UPDATE CASCADE;
