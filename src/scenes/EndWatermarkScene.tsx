import React from "react";
import { AbsoluteFill } from "remotion";
import { SceneProps } from "./shared";

export const EndWatermarkScene: React.FC<SceneProps> = () => {
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(150deg, #ffffff 0%, #f3f5f8 100%)",
      }}
    />
  );
};
