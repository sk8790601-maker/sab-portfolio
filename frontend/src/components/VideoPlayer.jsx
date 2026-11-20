import { useEffect, useRef, useState } from 'react';
import {
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RefreshCw,
  Volume2,
  VolumeX,
} from 'lucide-react';

function formatSeconds(sec) {
  if (!Number.isFinite(sec) || sec < 0) return '00:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/**
 * Reusable VideoPlayer supporting:
 * - Local / Cloudinary MP4 playback with custom accessible controls
 * - YouTube embeds (with instant local fallback toggle)
 * - Vimeo embeds (with instant local fallback toggle)
 */
export default function VideoPlayer({ video, autoPlay = true }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const isEmbed = video?.sourceType === 'youtube' || video?.sourceType === 'vimeo';
  const [useLocalFallback, setUseLocalFallback] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activeMp4Src =
    video?.sourceType === 'mp4' ? video.videoUrl : video?.fallbackMp4 || '';
  const showMp4Player = !isEmbed || useLocalFallback;

  useEffect(() => {
    setUseLocalFallback(false);
    setHasError(false);
    setIsLoading(true);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    setIsMuted(true);
  }, [video?._id, autoPlay]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !autoPlay || !showMp4Player) return;
    // Muted inline playback is permitted more widely in mobile browsers and previews.
    let cancelled = false;
    el.muted = true;
    setIsMuted(true);
    el.play().catch(() => {
      if (!cancelled) {
        setIsPlaying(false);
        setIsLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [video?._id, autoPlay, showMp4Player, hasError]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  useEffect(() => {
    if (!isLoading || hasError || !showMp4Player) return;
    // Never leave a failed or stalled network request behind an endless spinner.
    const timer = window.setTimeout(() => {
      const el = videoRef.current;
      if (el && el.readyState < 2) {
        setIsLoading(false);
        setIsPlaying(false);
        setHasError(true);
      }
    }, 15000);
    return () => window.clearTimeout(timer);
  }, [isLoading, hasError, showMp4Player, video?._id]);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => setIsPlaying(true)).catch(() => {
        setIsPlaying(false);
        setIsLoading(false);
        if (el.error) setHasError(true);
      });
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
  };

  const handleSeek = (e) => {
    const el = videoRef.current;
    if (!el || !duration) return;
    const nextTime = Number(e.target.value);
    el.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const toggleFullscreen = async () => {
    const node = containerRef.current;
    if (!node) return;
    try {
      if (!document.fullscreenElement) {
        await node.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fallback for browsers limiting fullscreen on custom containers
      if (videoRef.current?.requestFullscreen) {
        videoRef.current.requestFullscreen().catch(() => {});
      }
    }
  };

  const embedUrl =
    video?.sourceType === 'youtube'
      ? `https://www.youtube.com/embed/${video.embedId}?autoplay=1&rel=0&modestbranding=1`
      : video?.sourceType === 'vimeo'
        ? `https://player.vimeo.com/video/${video.embedId}?autoplay=1&title=0&byline=0&portrait=0`
        : '';

  return (
    <div ref={containerRef} className="w-full overflow-hidden bg-black">
      <div className="relative aspect-video w-full bg-obsidian">
        {showMp4Player ? (
          <>
            {!hasError && activeMp4Src ? (
              <video
                key={activeMp4Src}
                ref={videoRef}
                src={activeMp4Src}
                preload="auto"
                poster={video?.posterUrl}
                autoPlay={autoPlay}
                muted={isMuted}
                loop
                playsInline
                onLoadedMetadata={(e) => {
                  setDuration(e.currentTarget.duration || 0);
                  setIsLoading(false);
                }}
                onCanPlay={() => setIsLoading(false)}
                onPlaying={() => { setIsLoading(false); setIsPlaying(true); }}
                onWaiting={() => setIsLoading(true)}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime || 0)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={() => {
                  setIsLoading(false);
                  setHasError(true);
                }}
                onClick={togglePlay}
                className={`h-full w-full cursor-pointer ${
                  video?.aspectRatio === '9:16' ? 'bg-obsidian object-contain' : 'object-cover'
                }`}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
                <img
                  src={video?.posterUrl}
                  alt={video?.title}
                  className="max-h-56 w-auto rounded object-contain opacity-65"
                />
                <p className="font-mono text-xs uppercase tracking-widest text-muted-light">
                  Video could not load. Please retry playback.
                </p>
                <button
                  type="button"
                  onClick={() => { setHasError(false); setIsLoading(true); }}
                  className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2 text-xs font-semibold text-obsidian"
                >
                  <RefreshCw className="h-4 w-4" /> Retry video
                </button>
              </div>
            )}

            {isLoading && !hasError && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-lime border-t-transparent" />
              </div>
            )}

            {/* Custom Video Control Bar */}
            {!hasError && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 pb-3.5 pt-8">
                <input
                  type="range"
                  min={0}
                  max={duration || 1}
                  step={0.05}
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Seek video timeline"
                  className="mb-3 h-1 w-full cursor-pointer appearance-none rounded-full bg-white/25 accent-lime"
                />

                <div className="flex items-center justify-between gap-4 text-canvas">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-lime text-obsidian transition-transform hover:scale-105"
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4 fill-current" />
                      ) : (
                        <Play className="h-4 w-4 translate-x-0.5 fill-current" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-canvas transition-colors hover:border-lime hover:text-lime"
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </button>

                    <span className="font-mono text-xs tabular-nums text-white/85">
                      {formatSeconds(currentTime)} / {formatSeconds(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isEmbed && (
                      <button
                        type="button"
                        onClick={() => setUseLocalFallback(false)}
                        className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/80 hover:border-lime hover:text-lime"
                      >
                        Try Embed
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-canvas transition-colors hover:border-lime hover:text-lime"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <iframe
            src={embedUrl}
            title={video?.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            className="h-full w-full border-0"
          />
        )}
      </div>

      {/* Helper footer bar for YouTube / Vimeo entries */}
      {isEmbed && !useLocalFallback && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-charcoal px-4 py-2.5 text-xs text-muted-light">
          <span>
            Streaming {video.sourceType === 'youtube' ? 'YouTube' : 'Vimeo'} embed player
            (sample external ID).
          </span>
          {video.fallbackMp4 && (
            <button
              type="button"
              onClick={() => setUseLocalFallback(true)}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-lime hover:underline"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Play Local MP4 Demo</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
