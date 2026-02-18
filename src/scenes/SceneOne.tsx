import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { SCENE_1_END } from "./timeline";
import { SceneProps } from "./shared";

export const SceneOne: React.FC<SceneProps> = ({ frame }) => {
  const zoom = interpolate(frame, [0, SCENE_1_END], [1, 1.03]);

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${zoom})`,
        background: "linear-gradient(150deg, #ffffff 0%, #f3f5f8 100%)",
      }}
    />
  );
};
