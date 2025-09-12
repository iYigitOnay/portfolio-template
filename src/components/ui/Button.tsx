import Link from "next/link";

type Props = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export function Button({
  href,
  onClick,
  children,
  variant = "primary",
}: Props) {
  const base = "inline-block rounded-2xl px-5 py-2.5 transition";
  const cls =
    variant === "primary"
      ? `${base} text-white bg-[var(--color-primary)] hover:opacity-90`
      : `${base} border border-[var(--color-border)] hover:bg-[var(--color-border)]/20`;

  if (href)
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
