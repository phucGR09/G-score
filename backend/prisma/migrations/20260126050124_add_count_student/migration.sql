-- CreateTable
CREATE TABLE "count_student" (
    "id" SERIAL NOT NULL,
    "total_students" INTEGER NOT NULL,
    "invalid_students" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "count_student_pkey" PRIMARY KEY ("id")
);
