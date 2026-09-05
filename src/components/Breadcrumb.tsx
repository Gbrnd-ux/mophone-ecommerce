export function Breadcrumb({ items }: { items: { label: string; path?: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-[12px] text-[#6b6459] mb-8">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-[#6b6459]/40">/</span>}
          {item.path ? (
            <a
              href={`#${item.path}`}
              className="hover:text-[#0f0e0d] transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-[#0f0e0d]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
