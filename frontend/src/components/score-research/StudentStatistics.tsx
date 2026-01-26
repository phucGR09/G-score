"use client";
import React, { useState, useMemo } from "react";
import { StudentScoreResponse } from "@/types/api.types";
import { IoChevronDown } from "react-icons/io5";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

interface StudentStatisticsProps {
  studentData: StudentScoreResponse;
}

const GROUP_DEFINITIONS: {
  [key: string]: {
    name: string;
    subjects: ("toan" | "vat_li" | "hoa_hoc" | "sinh_hoc" | "ngu_van" | "lich_su" | "dia_li")[];
  };
} = {
  A: {
    name: "Group A",
    subjects: ["toan", "vat_li", "hoa_hoc"],
  },
  A1: {
    name: "Group A1",
    subjects: ["toan", "vat_li", "ngu_van"],
  },
  B: {
    name: "Group B",
    subjects: ["toan", "sinh_hoc", "hoa_hoc"],
  },
  C: {
    name: "Group C",
    subjects: ["ngu_van", "lich_su", "dia_li"],
  },
};

export default function StudentStatistics({ studentData }: StudentStatisticsProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>("A");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const groupTotal = useMemo(() => {
    const group = GROUP_DEFINITIONS[selectedGroup];
    if (!group) return null;

    const scores = studentData.scores;
    let total = 0;
    let validCount = 0;

    group.subjects.forEach((subject) => {
      const score = scores[subject];
      if (score !== null) {
        total += score;
        validCount++;
      }
    });

    return validCount === group.subjects.length ? total : null;
  }, [selectedGroup, studentData]);

  const getScoreLevel = (total: number | null) => {
    if (total === null) return { text: "Insufficient", color: "text-gray-500 dark:text-gray-400", whiteColor: "text-gray-900 dark:text-white/70" };
    if (total >= 24) return { text: "Excellent", color: "text-success-600 dark:text-success-400", whiteColor: "text-gray-900 dark:text-white/90" };
    if (total >= 18) return { text: "Good", color: "text-primary-600 dark:text-primary-400", whiteColor: "text-gray-900 dark:text-white/90" };
    if (total >= 12) return { text: "Average", color: "text-warning-600 dark:text-warning-400", whiteColor: "text-gray-900 dark:text-white/90" };
    return { text: "Weak", color: "text-error-600 dark:text-error-400", whiteColor: "text-gray-900 dark:text-white/90" };
  };

  const scoreLevel = getScoreLevel(groupTotal);

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function closeDropdown() {
    setIsDropdownOpen(false);
  }

  function handleGroupChange(group: string) {
    setSelectedGroup(group);
    closeDropdown();
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Group Total Score
        </h4>

        <div className="relative inline-block">
          <button
            onClick={toggleDropdown}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          >
            {GROUP_DEFINITIONS[selectedGroup].name}
            <IoChevronDown className="h-4 w-4" />
          </button>
          <Dropdown
            isOpen={isDropdownOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            {Object.entries(GROUP_DEFINITIONS).map(([key, group]) => (
              <DropdownItem
                key={key}
                onItemClick={() => handleGroupChange(key)}
                className={`flex w-full font-normal text-left rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300 ${selectedGroup === key
                  ? "bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-300"
                  : "text-gray-500 dark:text-gray-400"
                  }`}
              >
                {group.name}
              </DropdownItem>
            ))}
          </Dropdown>
        </div>
      </div>

      <div className="space-y-4">
        {/* Group Subjects */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
          <p className="mb-3 text-xs font-medium text-gray-500 dark:text-gray-400">
            Subjects
          </p>
          <div className="space-y-2">
            {GROUP_DEFINITIONS[selectedGroup].subjects.map((subject) => {
              const score = studentData.scores[subject];
              const subjectNames: { [key: string]: string } = {
                toan: "Mathematics",
                vat_li: "Physics",
                hoa_hoc: "Chemistry",
                sinh_hoc: "Biology",
                ngu_van: "Literature",
                lich_su: "History",
                dia_li: "Geography",
              };

              return (
                <div key={subject} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {subjectNames[subject]}
                  </span>
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    {score !== null ? score.toFixed(2) : "—"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Total Score */}
        <div className="rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 p-6 text-center">
          <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white/80">Total Score</p>
          <p className="mb-1 text-4xl font-bold text-gray-900 dark:text-white">
            {groupTotal !== null ? groupTotal.toFixed(2) : "—"}
          </p>
          <p className={`text-sm font-medium ${scoreLevel.whiteColor}`}>
            {scoreLevel.text}
          </p>
        </div>
      </div>
    </div>
  );
}
