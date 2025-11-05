import { useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Play, Pause } from 'lucide-react';

export default function Hero() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggleAudio = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play();
      setPlaying(true);
    }
  };

  return (
    <section id="home" className="relative min-h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/0CT1-dbOQTa-XJKt/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-950/60 to-slate-950" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Explore the Cosmos
          </h1>
          <p className="mt-4 text-slate-300 text-lg">
            An immersive, educational journey from galaxy clusters to planetary surfaces. Learn, simulate, and discover your place in the universe.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#explore"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 text-white shadow-lg shadow-fuchsia-500/20"
            >
              Start Exploring
            </a>
            <button
              onClick={toggleAudio}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-white hover:bg-white/10 transition-colors"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              Ambient Music
            </button>
            <audio ref={audioRef} loop>
              <source src="https://cdn.pixabay.com/download/audio/2022/03/23/audio_c6f9469b2d.mp3?filename=space-ambient-110241.mp3" type="audio/mpeg" />
            </audio>
          </div>
        </div>
      </div>
    </section>
  );
}
