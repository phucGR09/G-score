"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { useStatistic } from "@/context/StatisticContext";
import { IoChevronDown } from "react-icons/io5";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

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

const SCORE_CATEGORIES = ["Excellent (≥8)", "Good (6-8)", "Average (4-6)", "Weak (<4)"];

export default function SubjectDistributionReport() {
  const { statistics, isLoading } = useStatistic();
  const [selectedSubject, setSelectedSubject] = useState<string>("toan");
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);

  const subjects = useMemo(() => {
    if (!statistics) return [];
    return Object.keys(statistics);
  }, [statistics]);

  const chartData = useMemo(() => {
    if (!statistics || !selectedSubject || !statistics[selectedSubject]) {
      return [0, 0, 0, 0];
    }
    const subjectStats = statistics[selectedSubject];
    return [
      subjectStats.excellent,
      subjectStats.good,
      subjectStats.average,
      subjectStats.poor,
    ];
  }, [statistics, selectedSubject]);

  const options: ApexOptions = {
    colors: ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 8,
        borderRadiusApplication: "end",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
      formatter: (val: number) => {
        return val.toLocaleString("vi-VN");
      },
      style: {
        fontSize: "12px",
        fontWeight: "600",
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: SCORE_CATEGORIES,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Number of Students",
        style: {
          fontSize: "14px",
          fontWeight: 600,
        },
      },
      labels: {
        formatter: (val: number) => {
          return val.toLocaleString("vi-VN");
        },
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val.toLocaleString("vi-VN")} students`,
      },
    },
    legend: {
      show: false,
    },
  };

  const series = [
    {
      name: "Quantity",
      data: chartData,
    },
  ];

  function toggleSubjectDropdown() {
    setIsSubjectDropdownOpen(!isSubjectDropdownOpen);
  }

  function closeSubjectDropdown() {
    setIsSubjectDropdownOpen(false);
  }

  function handleSubjectChange(subject: string) {
    setSelectedSubject(subject);
    closeSubjectDropdown();
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="flex items-center justify-center h-[350px]">
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between mb-6 gap-3">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
          Score Distribution Report by Level
        </h3>

        <div className="relative inline-block">
          <button
            onClick={toggleSubjectDropdown}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          >
            {SUBJECT_NAMES[selectedSubject] || selectedSubject}
            <IoChevronDown className="w-4 h-4" />
          </button>
          <Dropdown
            isOpen={isSubjectDropdownOpen}
            onClose={closeSubjectDropdown}
            className="w-48 p-2 max-h-60 overflow-y-auto"
          >
            {subjects.map((subject) => (
              <DropdownItem
                key={subject}
                onItemClick={() => handleSubjectChange(subject)}
                className={`flex w-full font-normal text-left rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300 ${selectedSubject === subject
                  ? "bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-300"
                  : "text-gray-500 dark:text-gray-400"
                  }`}
              >
                {SUBJECT_NAMES[subject] || subject}
              </DropdownItem>
            ))}
          </Dropdown>
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-success-50 p-3 dark:bg-success-500/10">
          <p className="text-xs text-success-600 dark:text-success-400">Excellent</p>
          <p className="text-lg font-bold text-success-700 dark:text-success-300">
            {chartData[0].toLocaleString("vi-VN")}
          </p>
        </div>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-600/10 p-3 dark:bg-primary-500/10">
          <p className="text-xs text-blue-600 dark:text-white/90">Good</p>
          <p className="text-lg font-bold text-blue-700 dark:text-white/90">
            {chartData[1].toLocaleString("vi-VN")}
          </p>
        </div>
        <div className="rounded-lg bg-warning-50 p-3 dark:bg-warning-500/10">
          <p className="text-xs text-warning-600 dark:text-warning-400">Average</p>
          <p className="text-lg font-bold text-warning-700 dark:text-warning-300">
            {chartData[2].toLocaleString("vi-VN")}
          </p>
        </div>
        <div className="rounded-lg bg-error-50 p-3 dark:bg-error-500/10">
          <p className="text-xs text-error-600 dark:text-error-400">Weak</p>
          <p className="text-lg font-bold text-error-700 dark:text-error-300">
            {chartData[3].toLocaleString("vi-VN")}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
}
