import { useEffect } from "react";

interface TikTokEmbedProps {
  videoUrl: string;
  username: string;
}

const TikTokEmbed = ({ videoUrl, username }: TikTokEmbedProps) => {
  useEffect(() => {
    // Load TikTok embed script
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="flex justify-center">
      <blockquote
        className="tiktok-embed"
        cite={videoUrl}
        data-video-id={videoUrl.split("/video/")[1]?.split("?")[0]}
        style={{ maxWidth: "605px", minWidth: "325px" }}
      >
        <section>
          <a
            target="_blank"
            rel="noopener noreferrer"
            title={`@${username}`}
            href={videoUrl}
          >
            @{username}
          </a>
        </section>
      </blockquote>
    </div>
  );
};

export default TikTokEmbed;
