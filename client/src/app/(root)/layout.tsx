import type { Metadata } from "next";
import Navbar from "./components/navbar";
import SubNavbar from "./components/sub-navbar";
import React from "react";

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
      <Navbar />
      <SubNavbar />
      {children}
    </React.Fragment>
  );
}