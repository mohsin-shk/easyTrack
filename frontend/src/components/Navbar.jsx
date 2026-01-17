import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = ["Deals", "Price Drop", "Track", "About", "Contact"];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">

        {/* Logo */}
        <div className="text-xl font-bold text-indigo-400">PricePulse</div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm">
          {links.map(l => (
            <span key={l} className="hover:text-indigo-400 cursor-pointer">
              {l}
            </span>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10">
          {links.map(l => (
            <div key={l} className="px-6 py-4 border-b border-white/10 hover:bg-white/5">
              {l}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
