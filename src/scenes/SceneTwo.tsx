import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useVideoConfig,
} from "remotion";
import { SCENE_2_START } from "./timeline";
import {
  glassStyle,
  SceneProps,
  typed,
  Particles,
} from "./shared";

export const SceneTwo: React.FC<SceneProps> = ({ frame }) => {
  const local = frame - SCENE_2_START;
  const { fps } = useVideoConfig();

  const logoPop = spring({
    frame: local,
    fps,
    config: { damping: 130, stiffness: 120 },
  });
  const logoScale = interpolate(logoPop, [0, 1], [0.9, 1]);
  const logoOpacity = interpolate(local, [0, 35], [0, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleText = typed("Veeva Vault", (local - 95) / 3.8);

  const taglineOpacity = interpolate(local, [195, 235], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lightenOut = interpolate(local, [315, 360], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 40% 20%, #1f3f66 0%, #07162c 65%, #030c1d 100%)",
      }}
    >
      <Particles frame={local} opacity={0.9} />

      <div
        style={{
          position: "absolute",
          top: 180,
          left: "50%",
          transform: `translateX(-50%) scale(${logoScale})`,
          opacity: logoOpacity,
          width: 190,
          height: 130,
          overflow: "visible",
        }}
      >
        <Img
          src={staticFile("Veeva-logo-Social.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            opacity: 0.95,
            filter: "drop-shadow(0 8px 20px rgba(124,170,234,0.35))",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 362,
          left: "50%",
          transform: "translateX(-50%)",
          color: "#eef6ff",
          fontFamily: "Avenir Next, Segoe UI, Tahoma, sans-serif",
          fontSize: 72,
          fontWeight: 600,
          letterSpacing: 0.8,
          minWidth: 470,
          textAlign: "center",
          textShadow: "0 8px 22px rgba(89,137,198,0.3)",
        }}
      >
        {titleText}
      </div>

      <div
        style={{
          ...glassStyle,
          position: "absolute",
          top: 486,
          left: "50%",
          transform: "translateX(-50%)",
          padding: "16px 28px",
          opacity: taglineOpacity,
          color: "#dbeaff",
          fontFamily: "Avenir Next, Segoe UI, Tahoma, sans-serif",
          fontSize: 28,
          letterSpacing: 0.3,
        }}
      >
        Powering Innovation in Life Sciences
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: lightenOut,
          background:
            "linear-gradient(180deg, rgba(236,239,243,0.92) 0%, rgba(228,233,239,0.96) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
