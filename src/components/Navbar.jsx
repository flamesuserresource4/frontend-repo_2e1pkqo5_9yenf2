import { useState, useEffect } from 'react';
import { Rocket, Home, BookOpen, Telescope, Settings } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Home', icon: Home, href: '#home' },
    { label: 'Explore', icon: Telescope, href: '#explore' },
    { label: 'Learn', icon: BookOpen, href: '#learn' },
    { label: 'Simulator', icon: Rocket, href: '#simulator' },
    { label: 'About', icon: Settings, href: '#about' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${
      scrolled ? 'backdrop-blur-md bg-slate-900/60 border-b border-white/10' : 'bg-transparent'
    }`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-fuchsia-500 grid place-items-center shadow-lg shadow-fuchsia-500/20">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-white tracking-wide">Cosmic Odyssey</span>
        </div>
        <ul className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="text-slate-200/90 hover:text-white flex items-center gap-2 transition-colors">
                <l.icon className="h-4 w-4" />
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#explore"
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors"
        >
          Explore
          <Telescope className="h-4 w-4" />
        </a>
      </nav>
    </header>
  );
}
