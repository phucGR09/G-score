"use client";
import SubjectDistributionReport from "@/components/report/SubjectDistributionReport";
import { Metadata } from "next";
import React from "react";

export default function ReportPage() {
  return (
    <div className="space-y-6">
      <SubjectDistributionReport />
    </div>
  );
}
