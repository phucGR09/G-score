-- CreateTable
CREATE TABLE "statistics_summary" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "statistics_summary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "statistics_summary_subject_idx" ON "statistics_summary"("subject");

-- CreateIndex
CREATE UNIQUE INDEX "statistics_summary_subject_level_key" ON "statistics_summary"("subject", "level");
