import React from "react";
import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { END_SLIDE_END, END_SLIDE_START } from "./timeline";
import { typed } from "./shared";

export const CognizantWatermark: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const moveProgress = interpolate(frame, [160, 220], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const startLeft = width / 2 - 260;
  const startTop = height / 2 - 90;
  const cornerLeft = interpolate(moveProgress, [0, 1], [startLeft, 32]);
  const cornerTop = interpolate(moveProgress, [0, 1], [startTop, 28]);
  const cornerScale = interpolate(moveProgress, [0, 1], [1, 0.82]);
  const endMove = interpolate(frame, [END_SLIDE_START, END_SLIDE_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const left = interpolate(endMove, [0, 1], [cornerLeft, startLeft]);
  const top = interpolate(endMove, [0, 1], [cornerTop, startTop]);
  const scale = interpolate(endMove, [0, 1], [cornerScale, 1.18]);
  let whiteTextMix = 0;
  if (frame >= 220 && frame < 280) {
    whiteTextMix = interpolate(frame, [220, 280], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  } else if (frame >= 280 && frame < 600) {
    whiteTextMix = 1;
  } else if (frame >= 600 && frame < 660) {
    whiteTextMix = interpolate(frame, [600, 660], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  } else if (frame >= 660 && frame < 1100) {
    whiteTextMix = 0;
  } else if (frame >= 1100 && frame < 1180) {
    whiteTextMix = interpolate(frame, [1100, 1180], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  } else if (frame >= 1180 && frame < END_SLIDE_START) {
    whiteTextMix = 1;
  } else if (frame >= END_SLIDE_START && frame < END_SLIDE_START + 40) {
    whiteTextMix = interpolate(frame, [END_SLIDE_START, END_SLIDE_START + 40], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  } else if (frame >= END_SLIDE_START + 40) {
    whiteTextMix = 0;
  }

  const text = typed("Cognizant", (frame - 30) / 4.5);
  const subOpacity = interpolate(frame, [100, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleColor = `rgba(${Math.round(
    interpolate(whiteTextMix, [0, 1], [10, 234]),
  )},${Math.round(interpolate(whiteTextMix, [0, 1], [38, 244]))},${Math.round(
    interpolate(whiteTextMix, [0, 1], [68, 255]),
  )},1)`;
  const subtitleColor = `rgba(${Math.round(
    interpolate(whiteTextMix, [0, 1], [10, 214]),
  )},${Math.round(interpolate(whiteTextMix, [0, 1], [38, 232]))},${Math.round(
    interpolate(whiteTextMix, [0, 1], [68, 255]),
  )},${interpolate(whiteTextMix, [0, 1], [0.88, 0.9])})`;

  const logoX = interpolate(frame, [0, 24], [-80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const logoScale = interpolate(frame, [0, 24], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: 520,
        zIndex: 50,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 74,
            height: 62,
            transform: `translateX(${logoX}px) scale(${logoScale})`,
            filter: "drop-shadow(0 8px 20px rgba(16,60,103,0.22))",
          }}
        >
          <Img
            src={staticFile("Logo_cognizant.png")}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div
          style={{
            fontFamily: "Avenir Next, Segoe UI, Tahoma, sans-serif",
            fontWeight: 600,
            fontSize: 44,
            color: titleColor,
            letterSpacing: 0.2,
            minHeight: 60,
          }}
        >
          {text}
        </div>
      </div>
      <div
        style={{
          width: 360,
          marginLeft: 90,
          marginTop: 4,
          fontFamily: "Avenir Next, Segoe UI, Tahoma, sans-serif",
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: 0.2,
          color: subtitleColor,
          opacity: subOpacity,
          textAlign: "left",
        }}
      >
        ISG Life Science
      </div>
    </div>
  );
};
