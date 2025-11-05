import { useEffect, useState } from 'react';
import { CalendarDays, ExternalLink } from 'lucide-react';

export default function TodayInSpace() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchAPOD() {
      try {
        setLoading(true);
        const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('Failed to fetch NASA APOD');
        const json = await res.json();
        setData(json);
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAPOD();
    return () => controller.abort();
  }, []);

  return (
    <section id="learn" className="relative py-20 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-5 w-5 text-fuchsia-400" />
          <h2 className="text-3xl font-bold text-white">Today in Space</h2>
        </div>
        <p className="mt-2 text-slate-300">Daily cosmic facts and imagery from NASA's open data.</p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          {loading && (
            <div className="p-8 text-slate-300">Loading the cosmos...</div>
          )}
          {error && (
            <div className="p-8 text-rose-300">{error}</div>
          )}
          {data && (
            <div className="grid lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto lg:h-full bg-black">
                {data.media_type === 'image' ? (
                  <img src={data.url} alt={data.title} className="h-full w-full object-cover" />)
                  : (
                  <iframe title={data.title} src={data.url} className="h-full w-full" allow="fullscreen; encrypted-media" />
                )}
              </div>
              <div className="p-6 lg:p-8">
                <h3 className="text-white text-2xl font-semibold">{data.title}</h3>
                <p className="mt-2 text-slate-300 text-sm">{data.date}</p>
                <p className="mt-4 text-slate-200 leading-relaxed">{data.explanation}</p>
                <a href={data.hdurl || data.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-fuchsia-300 hover:text-fuchsia-200">
                  View Source <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
