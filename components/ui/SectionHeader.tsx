interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      {label && (
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[var(--gold)]">
          {label}
        </p>
      )}
      <h2 className="font-serif text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-[var(--foreground-muted)] sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
