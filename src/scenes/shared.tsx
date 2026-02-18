import React from "react";
import { AbsoluteFill } from "remotion";

export type SceneProps = {
  frame: number;
};

export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export const typed = (text: string, count: number) =>
  text.slice(0, clamp(Math.floor(count), 0, text.length));

export const glassStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.15)",
  backdropFilter: "blur(24px)",
  boxShadow: "0 12px 32px rgba(158,197,255,0.12), 0 0 18px rgba(255,255,255,0.08)",
  borderRadius: 24,
};

export const veevaLogoSrc = `data:image/svg+xml,${encodeURIComponent(`
<svg width="420" height="132" viewBox="0 0 420 132" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.96"/>
      <stop offset="100%" stop-color="#d7e9ff" stop-opacity="0.9"/>
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="416" height="128" rx="28" fill="url(#g)" fill-opacity="0.08" stroke="#b8d2ff" stroke-opacity="0.45"/>
  <circle cx="78" cy="66" r="34" fill="#f5f9ff" fill-opacity="0.88"/>
  <path d="M63 51 L78 84 L93 51" stroke="#234f8f" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <text x="136" y="78" font-size="44" font-family="Segoe UI, Tahoma, sans-serif" font-weight="700" fill="#ecf4ff" fill-opacity="0.96">Veeva</text>
</svg>
`)}`;

const particles = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  x: (i * 97) % 1280,
  y: (i * 173) % 720,
  size: 1.6 + (i % 3),
  speed: 0.1 + (i % 5) * 0.05,
  alpha: 0.08 + (i % 4) * 0.04,
}));

export const Particles: React.FC<{ frame: number; opacity?: number }> = ({
  frame,
  opacity = 1,
}) => {
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity }}>
      {particles.map((p) => {
        const dy = Math.sin((frame * p.speed + p.id * 17) / 20) * 12;
        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y + dy,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: `rgba(215,233,255,${p.alpha})`,
              boxShadow: "0 0 10px rgba(190,220,255,0.25)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
