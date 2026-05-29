import Link from "next/link";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

interface LinkButtonProps {
  href: string;
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  className?: string;
}

const classes: Record<Variant, string> = {
  primary:
    "bg-[var(--gold)] text-black hover:bg-[var(--gold-hover)] font-medium",
  outline:
    "border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black font-medium",
  ghost:
    "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-2)]",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

function base(variant: Variant = "primary", size: Size = "md") {
  return `inline-flex items-center justify-center rounded-sm transition-colors ${classes[variant]} ${sizes[size]}`;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={`${base(variant, size)} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: LinkButtonProps) {
  return (
    <Link href={href} className={`${base(variant, size)} ${className}`}>
      {children}
    </Link>
  );
}
