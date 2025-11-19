import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoPlayerProps {
  videoSrc: string;
  posterSrc?: string;
  className?: string;
  aspectRatio?: "portrait" | "landscape" | "square";
  title?: string;
}

const VideoPlayer = ({ 
  videoSrc, 
  posterSrc, 
  className = "",
  aspectRatio = "landscape",
  title 
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const aspectClasses = {
    portrait: "aspect-[9/16]", // TikTok/Instagram Reels style
    landscape: "aspect-video", // 16:9
    square: "aspect-square" // 1:1
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div 
      className={`group relative w-full rounded-xl overflow-hidden transition-all duration-500 hover:scale-[1.02] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-caution opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
      
      <div className={`${aspectClasses[aspectRatio]} relative flex items-center justify-center bg-black rounded-xl overflow-hidden shadow-2xl`}>
        <video
          ref={videoRef}
          loop
          muted={isMuted}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          poster={posterSrc}
          preload="metadata"
          playsInline
          onClick={togglePlay}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={videoSrc} type="video/mp4" />
          Browser Anda tidak mendukung video player.
        </video>

        {/* Glass morphism overlay with controls */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
            isHovered || !isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Play/Pause button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className={`bg-primary/90 backdrop-blur-md p-6 rounded-full border-2 border-white/20 shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-primary ${
                isPlaying && !isHovered ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
              }`}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-primary-foreground" fill="currentColor" />
              ) : (
                <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
              )}
            </button>
          </div>

          {/* Bottom controls bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center justify-between bg-black/40 backdrop-blur-md rounded-lg px-4 py-3 border border-white/10">
              {title && (
                <span className="text-white text-sm font-medium flex-1 mr-4 truncate">
                  {title}
                </span>
              )}
              <button
                onClick={toggleMute}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
