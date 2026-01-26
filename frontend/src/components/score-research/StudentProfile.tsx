"use client";
import React, { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { scoreApi } from "@/services/scoreApi";
import { StudentScoreResponse } from "@/types/api.types";
import { IoSearch, IoPersonCircle } from "react-icons/io5";
import StudentMetaCard from "./StudentMetaCard";
import StudentScoreDetail from "./StudentScoreDetail";
import StudentStatistics from "./StudentStatistics";

export default function StudentProfile() {
  const [searchQuery, setSearchQuery] = useState("");
  const [studentData, setStudentData] = useState<StudentScoreResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 500);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter student ID");
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await scoreApi.getStudentScores(searchQuery.trim());
      setStudentData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Student information not found");
      setStudentData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter student ID..."
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-12 text-sm font-medium text-gray-700 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <IoSearch className="h-5 w-5" />
          </button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-500 dark:text-red-400">{error}</p>
        )}
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      ) : studentData ? (
        <div className="space-y-6">
          <StudentMetaCard studentData={studentData} />

          <div className="grid grid-cols-12 gap-6">

            <div className="col-span-12 xl:col-span-7">
              <StudentScoreDetail studentData={studentData} />
            </div>

            <div className="col-span-12 xl:col-span-5">
              <StudentStatistics studentData={studentData} />
            </div>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="flex flex-col items-center justify-center py-20">
          <IoPersonCircle className="mb-4 h-20 w-20 text-gray-300 dark:text-gray-600" />
          <p className="text-gray-500 dark:text-gray-400">
            Student information not found
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <IoSearch className="mb-4 h-20 w-20 text-gray-300 dark:text-gray-600" />
          <p className="text-gray-500 dark:text-gray-400">
            Enter student ID to search exam scores
          </p>
        </div>
      )}
    </div>
  );
}
