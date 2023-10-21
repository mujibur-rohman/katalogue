import type { Metadata } from "next";
import Navbar from "./components/navbar";
import SubNavbar from "./components/sub-navbar";
import React from "react";
import SUB_MENUS from "@/lib/constants/sub-menus";

export const metadata: Metadata = {
  title: "Katalogue",
  description: "Catalogue management app",
};

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <div className="sticky top-0">
        <Navbar />
        <SubNavbar />
      </div>
      {children}
    </React.Fragment>
  );
}
