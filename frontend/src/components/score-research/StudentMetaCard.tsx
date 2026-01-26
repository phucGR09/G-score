"use client";
import React from "react";
import { StudentScoreResponse } from "@/types/api.types";
import { IoPersonCircle } from "react-icons/io5";

interface StudentMetaCardProps {
  studentData: StudentScoreResponse;
}

export default function StudentMetaCard({ studentData }: StudentMetaCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="flex items-center gap-4">
        <IoPersonCircle className="h-16 w-16 text-primary-500 dark:text-primary-400" />
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {studentData.fullName || "N/A"}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            SBD: {studentData.sbd}
          </p>
        </div>
      </div>
    </div>
  );
}
