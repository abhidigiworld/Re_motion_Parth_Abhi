import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { TRANSFORM_START } from "./timeline";
import { Particles, SceneProps } from "./shared";

export const TransformationScene: React.FC<SceneProps> = ({ frame }) => {
  const local = frame - TRANSFORM_START;
  const navySpread = interpolate(local, [40, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const navyFade = interpolate(local, [100, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textOpacity = interpolate(local, [12, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(165deg, #dfe4ea 0%, #d2dae3 100%)",
      }}
    >
      <Particles frame={local + 50} opacity={0.35} />

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: 44,
          color: "#f4f8ff",
          opacity: textOpacity,
          textAlign: "center",
          fontWeight: 500,
          textShadow: "0 10px 24px rgba(6,20,39,0.55)",
        }}
      >
        What if everything was unified?
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 1200 * navySpread,
          height: 1200 * navySpread,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(31,79,128,0.5) 0%, rgba(23,67,110,0.2) 45%, rgba(14,40,70,0.05) 70%, rgba(10,28,50,0) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: navyFade,
          background:
            "radial-gradient(circle at 50% 40%, #1a3658 0%, #07172d 66%, #050d1f 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
