import type { Metadata } from "next";
import { LabBar } from "./_lib/lab-bar";
import "./_lib/lab.css";

export const metadata: Metadata = {
  title: "Lab",
  robots: { index: false, follow: false },
};

export default function LabLayout({ children }: LayoutProps<"/lab">) {
  return (
    <>
      {children}
      <div className="lab-spacer" aria-hidden />
      <LabBar />
    </>
  );
}
