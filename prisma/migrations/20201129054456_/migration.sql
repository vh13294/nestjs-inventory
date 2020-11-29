-- CreateTable
CREATE TABLE `archives` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `product_id` INT NOT NULL,
    `location_id` INT NOT NULL,
    `customer_id` INT,
    `supplier_id` INT,
    `date` DATETIME(3) NOT NULL,
    `quantity` INT NOT NULL,
    `comment` VARCHAR(191),
    `created_by` INT NOT NULL,
    `created_at` DATETIME(3),
    `updated_at` DATETIME(3),
INDEX `archives_created_by_foreign`(`created_by`),
INDEX `archives_customer_id_foreign`(`customer_id`),
INDEX `archives_location_id_foreign`(`location_id`),
INDEX `archives_product_id_foreign`(`product_id`),
INDEX `archives_supplier_id_foreign`(`supplier_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `customers` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `khmer` VARCHAR(191),
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    `created_at` DATETIME(3),
    `updated_at` DATETIME(3),
UNIQUE INDEX `customers.name_unique`(`name`),
UNIQUE INDEX `customers.khmer_unique`(`khmer`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `inventories` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `product_id` INT NOT NULL,
    `location_id` INT NOT NULL,
    `customer_id` INT,
    `supplier_id` INT,
    `date` DATETIME(3) NOT NULL,
    `quantity` INT NOT NULL,
    `comment` VARCHAR(191),
    `created_by` INT NOT NULL,
    `created_at` DATETIME(3),
    `updated_at` DATETIME(3),
    `deleted_at` DATETIME(3),
INDEX `inventories_created_by_foreign`(`created_by`),
INDEX `inventories_customer_id_foreign`(`customer_id`),
INDEX `inventories_location_id_foreign`(`location_id`),
INDEX `inventories_product_id_foreign`(`product_id`),
INDEX `inventories_supplier_id_foreign`(`supplier_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `locations` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    `created_at` DATETIME(3),
    `updated_at` DATETIME(3),
UNIQUE INDEX `locations.name_unique`(`name`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `products` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `khmer` VARCHAR(191) NOT NULL,
    `low_stock_warning` INT NOT NULL,
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    `created_at` DATETIME(3),
    `updated_at` DATETIME(3),
UNIQUE INDEX `products.name_unique`(`name`),
UNIQUE INDEX `products.khmer_unique`(`khmer`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `suppliers` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `khmer` VARCHAR(191),
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    `created_at` DATETIME(3),
    `updated_at` DATETIME(3),
UNIQUE INDEX `suppliers.name_unique`(`name`),
UNIQUE INDEX `suppliers.khmer_unique`(`khmer`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `api_token` VARCHAR(191),
    `registered_at` DATETIME(3),
    `created_at` DATETIME(3),
    `updated_at` DATETIME(3),
UNIQUE INDEX `users.email_unique`(`email`),
UNIQUE INDEX `users.api_token_unique`(`api_token`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `invoice_items` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `invoice_id` INT NOT NULL,
    `inventory_id` INT NOT NULL,
    `unit_id` INT NOT NULL,
    `price_USD` DECIMAL(65,30),
    `price_riel` INT,
    `created_at` DATETIME(3),
    `updated_at` DATETIME(3),
    `deleted_at` DATETIME(3),
INDEX `invoice_items_inventory_id_foreign`(`inventory_id`),
INDEX `invoice_items_invoice_id_foreign`(`invoice_id`),
INDEX `invoice_items_unit_id_foreign`(`unit_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `invoices` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `status` ENUM('draft', 'active') NOT NULL DEFAULT 'active',
    `customer_id` INT,
    `customer_name_no_id` VARCHAR(191),
    `notes` VARCHAR(191),
    `draft_items` JSON,
    `paid_at` DATETIME(3),
    `created_by` INT NOT NULL,
    `created_at` DATETIME(3),
    `updated_at` DATETIME(3),
    `deleted_at` DATETIME(3),
INDEX `invoices_created_by_foreign`(`created_by`),
INDEX `invoices_customer_id_foreign`(`customer_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `prices` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `product_id` INT NOT NULL,
    `unit_id` INT NOT NULL,
    `effective_date` DATETIME(3) NOT NULL,
    `price_USD` DECIMAL(65,30),
    `price_riel` INT,
    `created_by` INT NOT NULL,
    `created_at` DATETIME(3),
    `updated_at` DATETIME(3),
UNIQUE INDEX `prices_product_id_unit_id_effective_date_unique`(`product_id`,
`unit_id`,
`effective_date`),
INDEX `prices_created_by_foreign`(`created_by`),
INDEX `prices_unit_id_foreign`(`unit_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `units` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `amount` DECIMAL(65,30) NOT NULL,
    `unit` ENUM('g', 'kg', 'tonne', 'mL', 'L') NOT NULL,
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    `created_at` DATETIME(3),
    `updated_at` DATETIME(3),
UNIQUE INDEX `units_amount_unit_unique`(`amount`,
`unit`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- AddForeignKey
ALTER TABLE `archives` ADD FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `archives` ADD FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `archives` ADD FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `archives` ADD FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `archives` ADD FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `inventories` ADD FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `inventories` ADD FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `inventories` ADD FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `inventories` ADD FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `inventories` ADD FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `invoice_items` ADD FOREIGN KEY (`inventory_id`) REFERENCES `inventories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `invoice_items` ADD FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `invoice_items` ADD FOREIGN KEY (`unit_id`) REFERENCES `units`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `invoices` ADD FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `invoices` ADD FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `prices` ADD FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `prices` ADD FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `prices` ADD FOREIGN KEY (`unit_id`) REFERENCES `units`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
