import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { CognizantWatermark } from "./scenes/CognizantWatermark";
import { SceneDataHub } from "./scenes/SceneDataHub";
import { EndWatermarkScene } from "./scenes/EndWatermarkScene";
import { FinalScene } from "./scenes/FinalScene";
import { SceneFour } from "./scenes/SceneFour";
import { SceneOne } from "./scenes/SceneOne";
import { SceneThree } from "./scenes/SceneThree";
import { SceneTwo } from "./scenes/SceneTwo";
import { TransformationScene } from "./scenes/TransformationScene";
import {
  DATA_HUB_END,
  DATA_HUB_START,
  END_SLIDE_END,
  END_SLIDE_START,
  FINAL_END,
  FINAL_START,
  SCENE_1_END,
  SCENE_1_START,
  SCENE_2_END,
  SCENE_2_START,
  SCENE_3_END,
  SCENE_3_START,
  SCENE_4_END,
  SCENE_4_START,
  TRANSFORM_END,
  TRANSFORM_START,
} from "./scenes/timeline";

const AUDIO_SRC = staticFile("Transcriptspeech.mp3");

// Approximate source narration cuts (in source-audio frames @ 30fps).
// These are stretched per scene using playbackRate so each section fits scene timing.
const AUDIO_CUTS = {
  scene1: { from: 0, to: 200 },
  scene2: { from: 180, to: 400 },
  scene3: { from: 360, to: 860 },
  transform: { from: 840, to: 960 },
  // Tuned to avoid Scene 4 voice cut in the middle.
  scene4: { from: 960, to: 1290 },
  final: { from: 1340, to: 1545 },
  end: { from: 1545, to: 1620 },
} as const;

const getRate = (srcFrom: number, srcTo: number, sceneDur: number) =>
  (srcTo - srcFrom) / sceneDur;

export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        fontFamily: "Avenir Next, Segoe UI, Tahoma, sans-serif",
        overflow: "hidden",
      }}
    >
      <Sequence from={SCENE_1_START} durationInFrames={SCENE_1_END - SCENE_1_START}>
        <SceneOne frame={frame} />
      </Sequence>

      <Sequence from={SCENE_2_START} durationInFrames={SCENE_2_END - SCENE_2_START}>
        <SceneTwo frame={frame} />
      </Sequence>

      <Sequence from={SCENE_3_START} durationInFrames={SCENE_3_END - SCENE_3_START}>
        <SceneThree frame={frame} />
      </Sequence>

      <Sequence
        from={TRANSFORM_START}
        durationInFrames={TRANSFORM_END - TRANSFORM_START}
      >
        <TransformationScene frame={frame} />
      </Sequence>

      <Sequence from={SCENE_4_START} durationInFrames={SCENE_4_END - SCENE_4_START}>
        <SceneFour frame={frame} />
      </Sequence>

      <Sequence from={DATA_HUB_START} durationInFrames={DATA_HUB_END - DATA_HUB_START}>
        <SceneDataHub frame={frame} />
      </Sequence>

      <Sequence from={FINAL_START} durationInFrames={FINAL_END - FINAL_START}>
        <FinalScene frame={frame} />
      </Sequence>

      <Sequence from={END_SLIDE_START} durationInFrames={END_SLIDE_END - END_SLIDE_START}>
        <EndWatermarkScene frame={frame} />
      </Sequence>

      <Sequence durationInFrames={END_SLIDE_END}>
        <CognizantWatermark />
      </Sequence>

      <Sequence durationInFrames={END_SLIDE_END}>
        <Audio src={staticFile("bg_music.mp3")} volume={0.05} loop />
      </Sequence>

      <Sequence from={SCENE_1_START} durationInFrames={SCENE_1_END - SCENE_1_START}>
        <Audio
          src={AUDIO_SRC}
          startFrom={AUDIO_CUTS.scene1.from}
          endAt={AUDIO_CUTS.scene1.to}
          playbackRate={getRate(AUDIO_CUTS.scene1.from, AUDIO_CUTS.scene1.to, SCENE_1_END - SCENE_1_START)}
        />
      </Sequence>
      <Sequence from={SCENE_2_START} durationInFrames={SCENE_2_END - SCENE_2_START}>
        <Audio
          src={AUDIO_SRC}
          startFrom={AUDIO_CUTS.scene2.from}
          endAt={AUDIO_CUTS.scene2.to}
          playbackRate={getRate(AUDIO_CUTS.scene2.from, AUDIO_CUTS.scene2.to, SCENE_2_END - SCENE_2_START)}
        />
      </Sequence>
      <Sequence from={SCENE_3_START} durationInFrames={SCENE_3_END - SCENE_3_START}>
        <Audio
          src={AUDIO_SRC}
          startFrom={AUDIO_CUTS.scene3.from}
          endAt={AUDIO_CUTS.scene3.to}
          playbackRate={getRate(AUDIO_CUTS.scene3.from, AUDIO_CUTS.scene3.to, SCENE_3_END - SCENE_3_START)}
        />
      </Sequence>
      <Sequence from={TRANSFORM_START} durationInFrames={TRANSFORM_END - TRANSFORM_START}>
        <Audio
          src={AUDIO_SRC}
          startFrom={AUDIO_CUTS.transform.from}
          endAt={AUDIO_CUTS.transform.to}
          playbackRate={getRate(AUDIO_CUTS.transform.from, AUDIO_CUTS.transform.to, TRANSFORM_END - TRANSFORM_START)}
        />
      </Sequence>
      <Sequence from={SCENE_4_START} durationInFrames={SCENE_4_END - SCENE_4_START}>
        <Audio
          src={AUDIO_SRC}
          startFrom={AUDIO_CUTS.scene4.from}
          endAt={AUDIO_CUTS.scene4.to}
          playbackRate={getRate(AUDIO_CUTS.scene4.from, AUDIO_CUTS.scene4.to, SCENE_4_END - SCENE_4_START)}
        />
      </Sequence>
      <Sequence from={DATA_HUB_START} durationInFrames={DATA_HUB_END - DATA_HUB_START}>
        <Audio src={staticFile("data.mp3")} />
      </Sequence>
      <Sequence from={FINAL_START} durationInFrames={FINAL_END - FINAL_START}>
        <Audio
          src={AUDIO_SRC}
          startFrom={AUDIO_CUTS.final.from}
          endAt={AUDIO_CUTS.final.to}
          playbackRate={getRate(AUDIO_CUTS.final.from, AUDIO_CUTS.final.to, FINAL_END - FINAL_START)}
        />
      </Sequence>
      
    </AbsoluteFill>
  );
};
