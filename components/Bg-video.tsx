"use client";

import { useRef } from "react";

const videoSrc = "/background-video.mp4";

export function BackgroundVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        src={videoSrc}
        className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}
