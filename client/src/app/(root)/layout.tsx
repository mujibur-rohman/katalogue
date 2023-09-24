import type { Metadata } from "next";
import Navbar from "./components/navbar";

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
    <div>
      <Navbar />
      {children}
    </div>
  );
}
