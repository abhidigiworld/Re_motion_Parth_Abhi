import React from "react";
import { AbsoluteFill, interpolate, spring, useVideoConfig } from "remotion";
import { DATA_HUB_START } from "./timeline";
import { Particles, SceneProps } from "./shared";

const polarToCartesian = (cx: number, cy: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
};

const getSlicePath = (startAngle: number, endAngle: number, radius: number) => {
  const start = polarToCartesian(0, 0, radius, endAngle);
  const end = polarToCartesian(0, 0, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M",
    0,
    0,
    "L",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    "Z",
  ].join(" ");
};

export const SceneDataHub: React.FC<SceneProps> = ({ frame }) => {
  const local = frame - DATA_HUB_START;
  const { fps } = useVideoConfig();

  const startDelay = 10;
  const sliceDuration = 24;

  const s1 = spring({ frame: local - startDelay, fps, config: { stiffness: 70, damping: 14 } });
  const s2 = spring({
    frame: local - (startDelay + sliceDuration),
    fps,
    config: { stiffness: 70, damping: 14 },
  });
  const s3 = spring({
    frame: local - (startDelay + sliceDuration * 2),
    fps,
    config: { stiffness: 70, damping: 14 },
  });
  const borderDraw = interpolate(
    local,
    [startDelay + sliceDuration * 3, startDelay + sliceDuration * 3 + 40],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const titleOpacity = interpolate(local, [44, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sub1 = interpolate(local, [78, 102], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sub2 = interpolate(local, [102, 126], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sub3 = interpolate(local, [126, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const floatY = Math.sin(local / 35) * 8;
  const rotX = Math.sin(local / 80) * 3 + 8;
  const rotY = Math.cos(local / 90) * 3;

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 35% 25%, #183a61 0%, #08192f 62%, #040d20 100%)",
      }}
    >
      <Particles frame={local + 140} opacity={0.58} />

      <div
        style={{
          position: "absolute",
          left: 94,
          top: 120,
          width: 520,
          height: 520,
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(${floatY}px)`,
        }}
      >
        <svg viewBox="-260 -260 520 520" style={{ width: 500, height: 500, overflow: "visible" }}>
          <defs>
            <linearGradient id="hub-orange-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8a43b" />
              <stop offset="100%" stopColor="#f08212" />
            </linearGradient>
            <linearGradient id="hub-orange-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f39b1d" />
              <stop offset="100%" stopColor="#dd7f09" />
            </linearGradient>
            <linearGradient id="hub-orange-3" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#f7aa48" />
              <stop offset="100%" stopColor="#f39b1d" />
            </linearGradient>
          </defs>

          <path d={getSlicePath(0, 120 * s1, 190)} fill="url(#hub-orange-1)" stroke="rgba(255,255,255,0.35)" strokeWidth={2} />
          <path d={getSlicePath(120, 120 + 120 * s2, 190)} fill="url(#hub-orange-2)" stroke="rgba(255,255,255,0.35)" strokeWidth={2} />
          <path d={getSlicePath(240, 240 + 120 * s3, 190)} fill="url(#hub-orange-3)" stroke="rgba(255,255,255,0.35)" strokeWidth={2} />

          <circle cx="0" cy="0" r="30" fill="#e9edf2" />
          <text x="0" y="10" textAnchor="middle" fill="#8b97a6" fontSize="42" fontWeight={700}>
            +
          </text>

          <text x="-84" y="-58" textAnchor="middle" fill="white" fontSize="26" fontWeight={700}>
            Data
          </text>
          <text x="88" y="-58" textAnchor="middle" fill="white" fontSize="26" fontWeight={700}>
            Content
          </text>
          <text x="0" y="118" textAnchor="middle" fill="white" fontSize="26" fontWeight={700}>
            Agents
          </text>

          <circle
            cx="0"
            cy="0"
            r="218"
            fill="none"
            stroke="rgba(199,213,232,0.7)"
            strokeWidth={5}
            strokeDasharray="1369"
            strokeDashoffset={1369 - 1369 * borderDraw}
            transform="rotate(-90)"
          />
        </svg>
      </div>

      <div style={{ position: "absolute", left: 700, top: 186, width: 500 }}>
        <div style={{ opacity: titleOpacity, color: "#f4f8ff", fontSize: 56, fontWeight: 700 }}>
          Data, Content, Agents
        </div>

        <div style={{ marginTop: 46, opacity: sub1, color: "#f39b1d", fontSize: 40, fontWeight: 700 }}>
          Agentic AI
          <span style={{ color: "#eef5ff", fontWeight: 500 }}> built into Vault Platform</span>
        </div>
        <div style={{ height: 1, marginTop: 24, background: "rgba(214,230,248,0.34)" }} />

        <div style={{ marginTop: 26, opacity: sub2, color: "#eef5ff", fontSize: 40, fontWeight: 500 }}>
          Direct, secure
          <span style={{ color: "#f39b1d", fontWeight: 700 }}> content and data access</span>
        </div>
        <div style={{ height: 1, marginTop: 24, background: "rgba(214,230,248,0.34)" }} />

        <div style={{ marginTop: 26, opacity: sub3, color: "#eef5ff", fontSize: 40, fontWeight: 500 }}>
          Configure Veeva AI Agents
          <span style={{ color: "#f39b1d", fontWeight: 700 }}> for custom workflows</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

