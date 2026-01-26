import type { Metadata } from "next";
import React from "react";
import CountScore from "@/components/ecommerce/CountScore";
import CountStudent from "@/components/ecommerce/CountStudent";
import TopStudent from "@/components/ecommerce/TopStudent";

export const metadata: Metadata = {
  title:
    "Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is the Dashboard page for TailAdmin Dashboard Template",
};

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 xl:col-span-7">
        <CountScore />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <CountStudent />
      </div>

      <div className="col-span-12">
        <TopStudent />
      </div>
    </div>
  );
}
