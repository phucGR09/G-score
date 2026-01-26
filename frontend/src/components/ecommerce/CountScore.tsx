"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { MoreDotIcon } from "@/icons";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useState, useMemo } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { useStatistic } from "@/context/StatisticContext";
import { IoChevronDown } from "react-icons/io5";

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

export default function CountScore() {
  const { countScores, isLoading } = useStatistic();
  const [selectedSubject, setSelectedSubject] = useState<string>("toan");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);

  const subjects = useMemo(() => {
    if (!countScores) return [];
    return Object.keys(countScores);
  }, [countScores]);

  const chartData = useMemo(() => {
    if (!countScores || !selectedSubject || !countScores[selectedSubject]) {
      return [];
    }
    return countScores[selectedSubject];
  }, [countScores, selectedSubject]);

  const options: ApexOptions = {
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 330,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      title: {
        text: "Score Range",
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      title: {
        text: "Number of Scores",
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        show: true,
      },
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
  };

  const series = [
    {
      name: "Quantity",
      data: chartData,
    },
  ];

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

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
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="flex items-center justify-center h-[330px]">
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between mb-4 gap-3">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
          Score Distribution by Range
        </h3>

        <div className="flex items-center gap-2 sm:gap-3">
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
      </div>

      <div className="flex-1 min-h-0 w-full pb-5">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={330}
        />
      </div>
    </div>
  );
}
