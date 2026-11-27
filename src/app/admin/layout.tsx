import type { Metadata } from "next";

export const metadata: Metadata = { title: "Panel", robots: { index: false, follow: false } };

export default function AdminRoot({ children }: LayoutProps<"/admin">) {
  return <div className="admin">{children}</div>;
}
