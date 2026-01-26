"use client";
import React from "react";
import { StudentScoreResponse } from "@/types/api.types";

interface StudentScoreDetailProps {
  studentData: StudentScoreResponse;
}

const SUBJECT_NAMES: { [key: string]: string } = {
  toan: "Mathematics",
  vat_li: "Physics",
  hoa_hoc: "Chemistry",
  sinh_hoc: "Biology",
  ngu_van: "Literature",
  ngoai_ngu: "Foreign Language",
  lich_su: "History",
  dia_li: "Geography",
  gdcd: "Civics",
};

export default function StudentScoreDetail({ studentData }: StudentScoreDetailProps) {
  const scores = studentData.scores;

  const scoreItems = [
    { key: "toan", value: scores.toan },
    { key: "vat_li", value: scores.vat_li },
    { key: "hoa_hoc", value: scores.hoa_hoc },
    { key: "sinh_hoc", value: scores.sinh_hoc },
    { key: "ngu_van", value: scores.ngu_van },
    { key: "ngoai_ngu", value: scores.ngoai_ngu, extra: scores.ma_ngoai_ngu },
    { key: "lich_su", value: scores.lich_su },
    { key: "dia_li", value: scores.dia_li },
    { key: "gdcd", value: scores.gdcd },
  ];

  const getScoreColor = (score: number | null) => {
    if (score === null) return "text-gray-400 dark:text-gray-400";
    if (score >= 8) return "text-success-600 dark:text-success-300";
    if (score >= 6) return "text-primary-600 dark:text-white";
    if (score >= 4) return "text-warning-600 dark:text-warning-300";
    return "text-error-600 dark:text-error-300";
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <h4 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
        Subject Scores
      </h4>

      <div className="space-y-3">
        {scoreItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {SUBJECT_NAMES[item.key]}
              </span>
              {item.extra && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({item.extra})
                </span>
              )}
            </div>
            <span className={`text-lg font-semibold ${getScoreColor(item.value)}`}>
              {item.value !== null ? item.value.toFixed(2) : "—"}
            </span>
          </div>
        ))}
      </div>

      {studentData.average !== null && (
        <div className="mt-6 rounded-lg bg-primary-50 px-4 py-3 dark:bg-primary-500/10">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Average Score
            </span>
            <span className="text-xl font-bold text-primary-600 dark:text-white">
              {studentData.average.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
