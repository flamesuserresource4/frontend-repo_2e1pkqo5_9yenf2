import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, ZoomIn, ZoomOut, Info } from 'lucide-react';

const celestialData = [
  {
    id: 'milky-way',
    name: 'Milky Way',
    type: 'Galaxy',
    facts: {
      Formation: 'Formed over 13.6 billion years through mergers of smaller protogalaxies and gas accretion.',
      Structure: 'Barred spiral with four major arms, a central bar, and a supermassive black hole (Sagittarius A*).',
      'Fun Facts': 'You are about 27,000 light-years from the center, orbiting at ~220 km/s.',
    },
  },
  {
    id: 'andromeda',
    name: 'Andromeda',
    type: 'Galaxy',
    facts: {
      Formation: 'Grew via accretion and mergers, similar to the Milky Way.',
      Structure: 'Massive spiral galaxy on a collision course with the Milky Way.',
      'Fun Facts': 'Expected to merge with the Milky Way in ~4–5 billion years.',
    },
  },
  {
    id: 'sol',
    name: 'Sun',
    type: 'Star',
    facts: {
      Formation: 'Collapsed from a giant molecular cloud 4.6 billion years ago.',
      Structure: 'Layers include core, radiative zone, convective zone, photosphere, chromosphere, corona.',
      'Fun Facts': 'Contains 99.86% of the Solar System’s mass.',
    },
  },
  {
    id: 'earth',
    name: 'Earth',
    type: 'Planet',
    facts: {
      Formation: 'Accreted from the protoplanetary disk around the early Sun.',
      Structure: 'Iron core, silicate mantle, crust, hydrosphere, atmosphere.',
      'Fun Facts': 'Only known world with life and surface liquid water.',
    },
  },
];

function OrbitDemo() {
  return (
    <div className="relative h-64 w-full grid place-items-center">
      <div className="absolute h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.8)]" />
      <div className="absolute h-40 w-40 rounded-full border border-white/10 animate-[spin_18s_linear_infinite]" />
      <div className="absolute h-56 w-56 rounded-full border border-white/10 animate-[spin_36s_linear_infinite]" />
      <div className="absolute h-72 w-72 rounded-full border border-white/10 animate-[spin_72s_linear_infinite]" />
      <div className="absolute h-2 w-2 rounded-full bg-blue-400 animate-[spin_18s_linear_infinite]" style={{ transformOrigin: '140px 0' }} />
      <div className="absolute h-2 w-2 rounded-full bg-pink-400 animate-[spin_36s_linear_infinite]" style={{ transformOrigin: '224px 0' }} />
      <div className="absolute h-2 w-2 rounded-full bg-green-400 animate-[spin_72s_linear_infinite]" style={{ transformOrigin: '288px 0' }} />
    </div>
  );
}

function InfoPanel({ selected }) {
  const [tab, setTab] = useState('Formation');
  const tabs = ['Formation', 'Structure', 'Fun Facts'];

  if (!selected) return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-slate-300">
      <div className="flex items-center gap-2 text-white"><Info className="h-4 w-4"/> Select an object to learn more.</div>
      <p className="mt-2 text-sm">Tip: Try the mini challenge below!</p>
    </div>
  );

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-white text-xl font-semibold">{selected.name}</h3>
      <p className="text-slate-400 text-sm">{selected.type}</p>
      <div className="mt-4 flex gap-2 text-sm">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-3 py-1 border ${tab === t ? 'bg-white/20 text-white border-white/30' : 'bg-white/5 text-slate-300 border-white/10'}`}
          >
            {t}
          </button>
        ))}
      </div>
      <p className="mt-4 text-slate-200 leading-relaxed">{selected.facts[tab]}</p>
    </div>
  );
}

export default function GalaxyExplorer() {
  const [zoom, setZoom] = useState(1);
  const [selected, setSelected] = useState(null);
  const [foundMW, setFoundMW] = useState(false);

  const visibleObjects = useMemo(() => {
    if (zoom < 1.3) return celestialData.filter(d => d.type === 'Galaxy');
    if (zoom < 1.7) return celestialData.filter(d => d.type !== 'Planet');
    return celestialData;
  }, [zoom]);

  return (
    <section id="explore" className="relative py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Interactive Universe View</h2>
            <p className="mt-2 text-slate-300 max-w-2xl">Zoom across scales, click objects to learn, and watch orbits in motion. This is a stylized preview to inspire your journey through the cosmos.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-slate-300">
            <ZoomOut className="h-4 w-4" />
            <input
              type="range"
              min="1"
              max="2"
              step="0.01"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="accent-fuchsia-500"
            />
            <ZoomIn className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          <motion.div
            className="col-span-2 rounded-xl border border-white/10 bg-white/5 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2 text-slate-200">
                <Clock className="h-4 w-4" />
                Time-lapse & Orbits
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <span className="hidden sm:inline">Scale: {zoom.toFixed(2)}x</span>
                <button
                  onClick={() => setZoom((z) => Math.max(1, z - 0.1))}
                  className="rounded-full bg-white/10 px-2 py-1"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
                  className="rounded-full bg-white/10 px-2 py-1"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div
                className="relative mx-auto aspect-video max-w-3xl rounded-lg bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_60%),radial-gradient(ellipse_at_center,rgba(217,70,239,0.12),transparent_40%)] border border-white/10 overflow-hidden"
                style={{ perspective: '1200px' }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ scale: zoom }}
                  animate={{ rotateZ: 0 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                >
                  <OrbitDemo />
                </motion.div>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
              </div>

              <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleObjects.map((obj) => (
                  <button
                    key={obj.id}
                    onClick={() => {
                      setSelected(obj);
                      if (obj.id === 'milky-way') setFoundMW(true);
                    }}
                    className={`group rounded-xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10 transition ${selected?.id === obj.id ? 'ring-1 ring-fuchsia-500/50' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{obj.name}</p>
                        <p className="text-slate-400 text-sm">{obj.type}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-white transition" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <InfoPanel selected={selected} />
            <div className="rounded-xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/10 p-6">
              <h4 className="text-white font-semibold">Mini Challenge</h4>
              <p className="mt-2 text-slate-300 text-sm">Find the Milky Way!</p>
              <p className="mt-2 text-slate-300 text-sm">{foundMW ? 'Nice! You found our home galaxy.' : 'Hint: It is a barred spiral galaxy.'}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
