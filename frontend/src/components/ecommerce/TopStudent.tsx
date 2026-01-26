"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useStatistic } from "@/context/StatisticContext";
import { useState } from "react";

export default function TopStudent() {
  const { topStudents, isLoading } = useStatistic();
  const [selectedGroup, setSelectedGroup] = useState<string>("A");

  const groups = ["A", "A1", "B", "C"];

  const handleGroupChange = (group: string) => {
    setSelectedGroup(group);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Top 10 Students
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-1 dark:border-gray-700 dark:bg-gray-800">
            {groups.map((group) => (
              <button
                key={group}
                onClick={() => handleGroupChange(group)}
                disabled={group !== "A"}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${selectedGroup === group
                  ? "bg-primary-50 text-primary-600 dark:bg-primary-500 dark:text-white"
                  : group === "A"
                    ? "text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/[0.03]"
                    : "text-gray-400 cursor-not-allowed dark:text-gray-600"
                  }`}
              >
                Group {group}
              </button>
            ))}
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      ) : (
        <div className="overflow-x-auto -mx-4 sm:-mx-6">
          <div className="inline-block min-w-full align-middle px-4 sm:px-6">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                <TableRow>
                  <TableCell
                    isHeader
                    className="py-3 px-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Student ID
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 px-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Full Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 px-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Mathematics
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 px-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Physics
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 px-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Chemistry
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 px-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Total Score
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {topStudents && topStudents.length > 0 ? (
                  topStudents.map((student, index) => (
                    <TableRow key={student.sbd} className="">
                      <TableCell className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-500">
                            <span className="text-sm font-semibold text-primary-600 dark:text-white">
                              {index + 1}
                            </span>
                          </div>
                          <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {student.sbd}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 px-3 text-gray-800 text-theme-sm dark:text-white/90">
                        {student.fullName || "N/A"}
                      </TableCell>
                      <TableCell className="py-3 px-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {student.toan !== null ? student.toan.toFixed(2) : "N/A"}
                      </TableCell>
                      <TableCell className="py-3 px-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {student.vat_li !== null ? student.vat_li.toFixed(2) : "N/A"}
                      </TableCell>
                      <TableCell className="py-3 px-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {student.hoa_hoc !== null ? student.hoa_hoc.toFixed(2) : "N/A"}
                      </TableCell>
                      <TableCell className="py-3 px-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-400">
                          {student.total !== null ? student.total.toFixed(2) : "N/A"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="py-8 px-3 text-center text-gray-500 dark:text-gray-400">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
