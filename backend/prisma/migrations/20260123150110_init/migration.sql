-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "sbd" TEXT NOT NULL,
    "full_name" TEXT,
    "toan" DOUBLE PRECISION,
    "vat_li" DOUBLE PRECISION,
    "hoa_hoc" DOUBLE PRECISION,
    "sinh_hoc" DOUBLE PRECISION,
    "ngu_van" DOUBLE PRECISION,
    "ngoai_ngu" DOUBLE PRECISION,
    "ma_ngoai_ngu" TEXT,
    "lich_su" DOUBLE PRECISION,
    "dia_li" DOUBLE PRECISION,
    "gdcd" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_sbd_key" ON "students"("sbd");
