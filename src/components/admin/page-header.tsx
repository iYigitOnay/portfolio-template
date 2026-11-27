import Link from "next/link";

export function PageHeader({ title, action }: { title: string; action?: { href: string; label: string } }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <h1 className="admin-title text-4xl">{title}</h1>
      {action ? <Link className="a-btn" href={action.href}>{action.label}</Link> : null}
    </div>
  );
}
