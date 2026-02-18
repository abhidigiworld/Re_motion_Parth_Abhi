import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { FINAL_END, FINAL_START } from "./timeline";
import { Particles, SceneProps } from "./shared";

export const FinalScene: React.FC<SceneProps> = ({ frame }) => {
  const local = frame - FINAL_START;
  const borderProgress = interpolate(local, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleOp = interpolate(local, [40, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const brandOp = interpolate(local, [90, 145], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subOp = interpolate(local, [140, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(local, [190, FINAL_END - FINAL_START], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 40% 20%, #112d4c 0%, #061327 65%, #030913 100%)",
      }}
    >
      <Particles frame={local + 300} opacity={0.55} />

      <svg width={1280} height={720} style={{ position: "absolute", inset: 0 }}>
        <rect
          x={120}
          y={128}
          width={1040 * borderProgress}
          height={464 * borderProgress}
          rx={28}
          fill="none"
          stroke="rgba(175,206,248,0.55)"
          strokeWidth={2}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          top: 238,
          width: "100%",
          textAlign: "center",
          color: "#eaf4ff",
          opacity: titleOp,
          fontSize: 58,
          fontWeight: 600,
        }}
      >
        From Complexity to Clarity
      </div>
      <div
        style={{
          position: "absolute",
          top: 324,
          width: "100%",
          textAlign: "center",
          color: "#d8eaff",
          opacity: brandOp,
          fontSize: 48,
          fontWeight: 500,
        }}
      >
        Cognizant + Veeva Vault
      </div>
      <div
        style={{
          position: "absolute",
          top: 394,
          width: "100%",
          textAlign: "center",
          color: "rgba(214,232,255,0.84)",
          opacity: subOp,
          fontSize: 28,
        }}
      >
        Transforming Life Sciences Architecture
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: fadeOut,
          background: "#000000",
        }}
      />
    </AbsoluteFill>
  );
};
