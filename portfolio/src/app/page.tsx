"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = imageRef.current;

    if (!image) return;

    // Set initial position to the center
    const imageWidth = 100; // Image width in pixels
    const imageHeight = 100; // Image height in pixels
    let x = (window.innerWidth - imageWidth) / 2;
    let y = (window.innerHeight - imageHeight) / 2;
    let vx = (Math.random() - 0.5) * 4;
    let vy = (Math.random() - 0.5) * 4;

    const animate = () => {
      // Update the position
      x += vx;
      y += vy;

      // Bounce off the edges
      if (x + imageWidth > window.innerWidth || x < 0) {
        vx = -vx;
      }
      if (y + imageHeight > window.innerHeight || y < 0) {
        vy = -vy;
      }

      // Apply the transformation
      if (image) {
        image.style.transform = `translate(${x}px, ${y}px)`;
      }

      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Handle resizing
    const handleResize = () => {
      // Re-center the image on resize
      x = Math.min(x, window.innerWidth - imageWidth);
      y = Math.min(y, window.innerHeight - imageHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-0">
      <div className="relative w-full h-full">
        <div ref={imageRef} className="absolute">
          <Image
            src="/IMG_0429mini_bw_energetic (1).png"
            alt="Bouncing Image"
            width={100}
            height={100}
            priority
          />
        </div>
      </div>
    </main>
  );
}
