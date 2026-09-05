import { NAV_LINKS } from "../data/categories";

function CartIcon({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button onClick={onClick} className="relative cursor-pointer group" aria-label="Open cart">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-[#0f0e0d] group-hover:text-[#c8a97e] transition-colors"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-[#c8a97e] text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}

export function Header({
  cartItemCount,
  onCartClick,
  onSearchClick,
  menuOpen,
  setMenuOpen,
  navigate,
}: {
  cartItemCount: number;
  onCartClick: () => void;
  onSearchClick: () => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  navigate: (path: string) => void;
}) {
  return (
    <header className="sticky top-0 z-50 bg-[#f5f2ee]/95 backdrop-blur-sm border-b border-[#0f0e0d]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#/"
          onClick={(e) => { e.preventDefault(); navigate("/"); }}
          className="font-display text-2xl font-light tracking-tight text-[#0f0e0d]"
        >
          Mophone<span className="text-[#c8a97e]">.</span>
        </a>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const path = `/category/${link}`;
            return (
              <a
                key={link}
                href={`#${path}`}
                onClick={(e) => { e.preventDefault(); navigate(path); setMenuOpen(false); }}
                className="text-[12px] font-medium tracking-widest uppercase text-[#0f0e0d] hover:text-[#c8a97e] transition-colors"
              >
                {link}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button
            onClick={onSearchClick}
            className="hidden md:flex items-center gap-1.5 text-[12px] text-[#0f0e0d] hover:text-[#c8a97e] transition-colors cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span className="tracking-widest uppercase font-medium">Search</span>
          </button>
          <CartIcon count={cartItemCount} onClick={onCartClick} />
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#f5f2ee] border-t border-[#0f0e0d]/10 px-6 py-4 flex flex-col gap-4 animate-fade-in">
          {NAV_LINKS.map((link) => {
            const path = `/category/${link}`;
            return (
              <a
                key={link}
                href={`#${path}`}
                onClick={(e) => { e.preventDefault(); navigate(path); setMenuOpen(false); }}
                className="text-[13px] font-medium tracking-widest uppercase text-[#0f0e0d]"
              >
                {link}
              </a>
            );
          })}
          <button
            onClick={() => { onSearchClick(); setMenuOpen(false); }}
            className="text-[13px] font-medium tracking-widest uppercase text-[#0f0e0d] text-left flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            Search
          </button>
        </div>
      )}
    </header>
  );
}
