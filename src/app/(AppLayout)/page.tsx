export default function page() {
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="absolute top-0 z-10 h-full w-full bg-black/40" />
      <video
        autoPlay
        className="absolute top-0 min-h-screen object-cover"
        loop
        muted
        playsInline
        preload="auto"
      >
        <source
          src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_webm.webm"
          type="video/webm"
        />
      </video>
    </div>
  );
}
