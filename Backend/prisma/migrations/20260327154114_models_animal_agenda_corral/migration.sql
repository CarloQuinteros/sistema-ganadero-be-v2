-- CreateEnum
CREATE TYPE "PriceType" AS ENUM ('POR_PUNTA', 'POR_KILO');

-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "age_at_entry" INTEGER NOT NULL,
    "weight_at_entry" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION DEFAULT 0,
    "purchase_date" TIMESTAMP(3),
    "ear_tag" INTEGER NOT NULL,
    "vaccines" TEXT[],
    "purpose" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" TEXT NOT NULL,
    "updated_by_id" TEXT,
    "corral_id" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "deactivated_at" TIMESTAMP(3),
    "target_weight" DOUBLE PRECISION DEFAULT 1.4,
    "price_type" "PriceType" NOT NULL DEFAULT 'POR_KILO',
    "entry_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "corral" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "corral_number" INTEGER NOT NULL,

    CONSTRAINT "corral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agenda" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "name" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "is_client" BOOLEAN NOT NULL DEFAULT false,
    "is_provider" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agenda_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "corral_corral_number_key" ON "corral"("corral_number");

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_corral_id_fkey" FOREIGN KEY ("corral_id") REFERENCES "corral"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "agenda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
