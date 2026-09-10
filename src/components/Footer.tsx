export function Footer() {
  return (
    <footer className="bg-[#0f0e0d] text-[#f5f2ee] px-6 lg:px-10 pt-14 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-2xl font-light mb-3">
              Mophone<span className="text-[#c8a97e]">.</span>
            </p>
            <p className="text-[13px] text-white/50 leading-relaxed max-w-[200px]">
              The latest in mobile tech and premium accessories.
            </p>
          </div>
          {[
            {
              title: "Shop",
              links: [
                { label: "Smartphones", path: "/category/Smartphones" },
                { label: "Tablets", path: "/category/Tablets" },
                { label: "Accessories", path: "/category/Accessories" },
                { label: "New Arrivals", path: "/category/New Arrivals" },
              ],
            },
            {
              title: "Help",
              links: [
                { label: "Buying Guide", path: "/info/buying-guide" },
                { label: "Shipping & Returns", path: "/info/shipping" },
                { label: "FAQ", path: "/info/faq" },
                { label: "Contact Us", path: "/info/contact" },
              ],
            },
            {
              title: "Company",
              links: [
                { label: "About", path: "/info/about" },
                { label: "Sustainability", path: "/info/sustainability" },
                { label: "Careers", path: "/info/careers" },
                { label: "Press", path: "/info/press" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-medium tracking-widest uppercase text-[#c8a97e] mb-6">
                {col.title}
              </h4>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={`#${link.path}`}
                      className="text-[13px] text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-medium tracking-widest uppercase text-white/40">
          <p>© 2026 Mophone. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://instagram.com/mophone" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://pinterest.com/mophone" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Pinterest</a>
            <a href="https://tiktok.com/@mophone" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
