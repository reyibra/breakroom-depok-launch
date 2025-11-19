interface VideoPlayerProps {
  videoSrc: string;
  posterSrc?: string;
  className?: string;
  aspectRatio?: "portrait" | "landscape" | "square";
}

const VideoPlayer = ({ 
  videoSrc, 
  posterSrc, 
  className = "",
  aspectRatio = "landscape" 
}: VideoPlayerProps) => {
  const aspectClasses = {
    portrait: "aspect-[9/16]", // TikTok/Instagram Reels style
    landscape: "aspect-video", // 16:9
    square: "aspect-square" // 1:1
  };

  return (
    <div className={`relative w-full rounded-lg overflow-hidden shadow-lg ${className}`}>
      <div className={`${aspectClasses[aspectRatio]} flex items-center justify-center bg-black`}>
        <video
          controls
          autoPlay
          loop
          muted
          className="w-full h-full object-contain"
          poster={posterSrc}
          preload="metadata"
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
          Browser Anda tidak mendukung video player.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
