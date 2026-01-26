-- CreateTable
CREATE TABLE "score_range_summary" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "score_range" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "score_range_summary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "score_range_summary_subject_idx" ON "score_range_summary"("subject");

-- CreateIndex
CREATE UNIQUE INDEX "score_range_summary_subject_score_range_key" ON "score_range_summary"("subject", "score_range");
