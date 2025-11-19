interface VideoPlayerProps {
  videoSrc: string;
  posterSrc?: string;
  className?: string;
}

const VideoPlayer = ({ videoSrc, posterSrc, className = "" }: VideoPlayerProps) => {
  return (
    <div className={`relative w-full rounded-lg overflow-hidden shadow-lg ${className}`}>
      <video
        controls
        className="w-full h-full object-cover"
        poster={posterSrc}
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
        Browser Anda tidak mendukung video player.
      </video>
    </div>
  );
};

export default VideoPlayer;
