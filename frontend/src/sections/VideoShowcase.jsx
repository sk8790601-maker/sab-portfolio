import { useMemo, useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import VideoCard from '../components/VideoCard';
import VideoModal from '../components/VideoModal';
import { VIDEO_CATEGORIES, VIDEOS } from '../data/videos';

export default function VideoShowcase() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const visibleVideos = useMemo(() => {
    if (activeCategory === 'All') return VIDEOS;
    return VIDEOS.filter((v) => v.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="videos"
      className="bg-grid-dark relative overflow-hidden bg-obsidian py-24 text-canvas md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          watermark="WORLDS"
          kicker="3D Animation, Motion & Brand Stories"
          title="IMMERSIVE EXPERIENCES"
          description="Explore brand storytelling, commercial motion and 3D product animation. Hover to preview or open the full player."
          theme="dark"
          align="left"
          rightSlot={
            <div className="rounded-full border border-white/15 bg-charcoal px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-lime">
              MP4 · Fullscreen Player
            </div>
          }
        />

        {/* Category Filter Tabs */}
        <div className="mb-10 flex flex-wrap gap-2 border-y border-white/10 py-4">
          {VIDEO_CATEGORIES.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  active
                    ? 'bg-lime font-semibold text-obsidian'
                    : 'border border-white/12 bg-charcoal text-muted-light hover:border-lime/50 hover:text-canvas'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Showcase Notice */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-2 border-l-2 border-lime bg-charcoal px-4 py-2.5">
          <p className="font-mono text-[11px] text-muted-light">
            FEATURED VIDEO WORK: Hover on desktop for a silent preview or open a video
            for audio, playback and fullscreen controls.
          </p>
          <span className="font-mono text-[11px] text-lime">
            {visibleVideos.length} Video {visibleVideos.length === 1 ? 'Clip' : 'Clips'}
          </span>
        </div>

        {/* Video Gallery Grid */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {visibleVideos.map((video, idx) => (
            <VideoCard
              key={video._id}
              video={video}
              index={idx}
              onSelect={(v) => setSelectedVideo(v)}
            />
          ))}
        </div>
      </div>

      {/* Click-to-Play Video Modal */}
      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </section>
  );
}
