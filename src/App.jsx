import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GalaxyExplorer from './components/GalaxyExplorer';
import TodayInSpace from './components/TodayInSpace';

function Footer() {
  return (
    <footer id="about" className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-400 text-sm">© {new Date().getFullYear()} Cosmic Odyssey — An educational universe simulator.</p>
        <div className="text-slate-400 text-sm">
          Built with love for the stars.
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-fuchsia-500/30 selection:text-white">
      <Navbar />
      <Hero />
      <GalaxyExplorer />
      <TodayInSpace />
      <Footer />
    </div>
  );
}
