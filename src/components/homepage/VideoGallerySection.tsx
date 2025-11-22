import { Play } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";

export const VideoGallerySection = () => {
  return (
    <section id="videos" className="py-12 md:py-20 px-4 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 md:mb-12 space-y-2 md:space-y-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Play className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            <h3 className="text-lg md:text-xl font-semibold text-primary">
              Video Gallery
            </h3>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-gradient">
            Lihat Pengalaman Breakroom
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          <div className="col-span-1 md:col-span-2 w-full">
            <VideoPlayer
              videoSrc="/videos/breakroom-horizontal.mp4"
              className="w-full aspect-video"
            />
          </div>
          
          <VideoPlayer
            videoSrc="/videos/tiktok-vertical.mp4"
            className="w-full aspect-[9/16]"
          />
          <VideoPlayer
            videoSrc="/videos/tiktok-vertical-2.mp4"
            className="w-full aspect-[9/16]"
          />
        </div>
      </div>
    </section>
  );
};
