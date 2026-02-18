import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { SCENE_3_START } from "./timeline";
import { Particles, SceneProps } from "./shared";

type IconType = "gear" | "search" | "check";

const DatabaseIcon: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  return (
    <svg
      width={76}
      height={74}
      viewBox="0 0 76 74"
      style={{ position: "absolute", left: x, top: y }}
    >
      <defs>
        <linearGradient id="db-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9ea5ad" />
          <stop offset="100%" stopColor="#7f8790" />
        </linearGradient>
        <linearGradient id="db-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e7e8ea" />
          <stop offset="100%" stopColor="#cfd2d6" />
        </linearGradient>
      </defs>
      <ellipse cx="38" cy="12" rx="28" ry="10" fill="url(#db-top)" />
      <path d="M10 12 V48 C10 53 22 58 38 58 C54 58 66 53 66 48 V12" fill="url(#db-body)" />
      <ellipse cx="38" cy="48" rx="28" ry="10" fill="#d8dadd" stroke="#9fa4ab" strokeWidth="1.2" />
      <path d="M10 26 C10 31 22 36 38 36 C54 36 66 31 66 26" fill="none" stroke="#b4b8be" strokeWidth="1.4" />
      <path d="M10 38 C10 43 22 48 38 48 C54 48 66 43 66 38" fill="none" stroke="#b4b8be" strokeWidth="1.4" />
    </svg>
  );
};

const OrangeIcon: React.FC<{ type: IconType; x: number; y: number }> = ({
  type,
  x,
  y,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 62,
        height: 62,
        borderRadius: 999,
        background: "#f39b1d",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 10px 18px rgba(243,155,29,0.28)",
      }}
    >
      <svg width={34} height={34} viewBox="0 0 34 34">
        {type === "gear" ? (
          <>
            <circle cx="17" cy="17" r="7.5" fill="none" stroke="#fff" strokeWidth="2.7" />
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (Math.PI * 2 * i) / 8;
              const x1 = 17 + Math.cos(a) * 10.5;
              const y1 = 17 + Math.sin(a) * 10.5;
              const x2 = 17 + Math.cos(a) * 14.2;
              const y2 = 17 + Math.sin(a) * 14.2;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              );
            })}
          </>
        ) : null}
        {type === "search" ? (
          <>
            <circle cx="14" cy="14" r="8.5" fill="none" stroke="#fff" strokeWidth="2.8" />
            <line x1="20" y1="20" x2="29" y2="29" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" />
          </>
        ) : null}
        {type === "check" ? (
          <polyline
            points="8,18 15,25 27,10"
            fill="none"
            stroke="#fff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}
      </svg>
    </div>
  );
};

const DataCluster: React.FC<{
  title: string;
  icon: IconType;
  left: number;
  top: number;
  appear: number;
  frame: number;
}> = ({ title, icon, left, top, appear, frame }) => {
  const local = frame - appear;
  const opacity = interpolate(local, [0, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: 348,
        height: 272,
        opacity,
      }}
    >
      <OrangeIcon type={icon} x={143} y={0} />
      <div
        style={{
          position: "absolute",
          top: 76,
          width: "100%",
          textAlign: "center",
          fontSize: 24,
          fontWeight: 700,
          lineHeight: 1.1,
          color: "#687a92",
          zIndex: 5,
          textShadow: "0 1px 0 rgba(255,255,255,0.75)",
        }}
      >
        {title}
      </div>

      <DatabaseIcon x={136} y={116} />

      <div
        style={{
          position: "absolute",
          left: 98,
          top: 112,
          width: 152,
          height: 102,
          borderRadius: 999,
          border: "2px dotted rgba(132,146,165,0.52)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 224,
          width: "100%",
          textAlign: "center",
          fontSize: 22,
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: 0.1,
          color: "#131a23",
          zIndex: 5,
          textShadow: "0 1px 0 rgba(255,255,255,0.7)",
        }}
      >
        Complaints Information
      </div>
    </div>
  );
};

const FlowSquares: React.FC<{
  x: number;
  y: number;
  frame: number;
  opacity: number;
}> = ({ x, y, frame, opacity }) => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => {
        const a = ((Math.PI * 2) / 6) * i + frame / 22;
        const px = x + Math.cos(a) * 22;
        const py = y + Math.sin(a) * 14;
        return (
          <div
            key={`${x}-${y}-${i}`}
            style={{
              position: "absolute",
              left: px - 7,
              top: py - 6,
              width: 14,
              height: 12,
              borderRadius: 2,
              background: "rgba(255,255,255,0.95)",
              border: "1.5px solid #f39b1d",
              opacity,
            }}
          />
        );
      })}
    </>
  );
};

export const SceneThree: React.FC<SceneProps> = ({ frame }) => {
  const local = frame - SCENE_3_START;
  const darkToLight = interpolate(local, [0, 52], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const line1 = interpolate(local, [155, 245], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2 = interpolate(local, [215, 305], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line3 = interpolate(local, [275, 360], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const riskOpacity = interpolate(local, [350, 400, 470, 479], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const riskPanelOpacity = interpolate(local, [350, 402], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const riskText1 = interpolate(local, [406, 430], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const riskText2 = interpolate(local, [434, 454], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const riskText3 = interpolate(local, [458, 476], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const structureOpacity = interpolate(local, [340, 376], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ulDb = { x: 220, y: 292 };
  const urDb = { x: 1060, y: 292 };
  const qaDb = { x: 640, y: 548 };
  const dbRadius = 42;

  const getEdgePoints = (
    from: { x: number; y: number },
    to: { x: number; y: number },
    progress: number,
  ) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const sx = from.x + ux * dbRadius;
    const sy = from.y + uy * dbRadius;
    const ex = to.x - ux * dbRadius;
    const ey = to.y - uy * dbRadius;
    return {
      x1: sx,
      y1: sy,
      x2: sx + (ex - sx) * progress,
      y2: sy + (ey - sy) * progress,
    };
  };

  const p1 = getEdgePoints(ulDb, urDb, line1);
  const p2 = getEdgePoints(urDb, qaDb, line2);
  const p3 = getEdgePoints(qaDb, ulDb, line3);
  const m1 = { x: (ulDb.x + urDb.x) / 2, y: (ulDb.y + urDb.y) / 2 };
  const m2 = { x: (urDb.x + qaDb.x) / 2, y: (urDb.y + qaDb.y) / 2 };
  const m3 = { x: (qaDb.x + ulDb.x) / 2, y: (qaDb.y + ulDb.y) / 2 };

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #eceff3 0%, #e4e9ef 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: darkToLight,
          background:
            "radial-gradient(circle at 40% 20%, #1f3f66 0%, #07162c 65%, #030c1d 100%)",
        }}
      />
      <Particles frame={local + 160} opacity={darkToLight * 0.55} />

      <div style={{ position: "absolute", inset: 0, opacity: structureOpacity }}>
        <div
          style={{
            position: "absolute",
            top: 24,
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            color: "#2d4767",
          }}
        >
          <div style={{ fontSize: 52, fontWeight: 600 }}>Before Veeva Vault</div>
          <div style={{ fontSize: 24, opacity: 0.9 }}>
            Disconnected Systems. Manual Coordination.
          </div>
        </div>

        <DataCluster
          title="Customer Service"
          icon="gear"
          left={42}
          top={124}
          appear={24}
          frame={local}
        />
        <DataCluster
          title="Regulatory Affairs"
          icon="search"
          left={890}
          top={124}
          appear={110}
          frame={local}
        />
        <DataCluster
          title="Quality Assurance"
          icon="check"
          left={466}
          top={382}
          appear={196}
          frame={local}
        />

        <svg width={1280} height={720} style={{ position: "absolute", inset: 0 }}>
          <defs>
            <marker
              id="arrow-dot"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 8 3.5, 0 7" fill="rgba(108,125,145,0.9)" />
            </marker>
          </defs>
          <line
            x1={p1.x1}
            y1={p1.y1}
            x2={p1.x2}
            y2={p1.y2}
            opacity={line1 > 0.02 ? 1 : 0}
            stroke="rgba(108,125,145,0.9)"
            strokeWidth={3}
            strokeDasharray="10 9"
            markerEnd="url(#arrow-dot)"
          />
          <line
            x1={p2.x1}
            y1={p2.y1}
            x2={p2.x2}
            y2={p2.y2}
            opacity={line2 > 0.02 ? 1 : 0}
            stroke="rgba(108,125,145,0.9)"
            strokeWidth={3}
            strokeDasharray="10 9"
            markerEnd="url(#arrow-dot)"
          />
          <line
            x1={p3.x1}
            y1={p3.y1}
            x2={p3.x2}
            y2={p3.y2}
            opacity={line3 > 0.02 ? 1 : 0}
            stroke="rgba(108,125,145,0.9)"
            strokeWidth={3}
            strokeDasharray="10 9"
            markerEnd="url(#arrow-dot)"
          />
        </svg>

        <FlowSquares x={m1.x} y={m1.y} frame={local + 3} opacity={line1 * structureOpacity} />
        <FlowSquares x={m2.x} y={m2.y} frame={local + 11} opacity={line2 * structureOpacity} />
        <FlowSquares x={m3.x} y={m3.y} frame={local + 19} opacity={line3 * structureOpacity} />

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 14,
            textAlign: "center",
            color: "#687e97",
            fontSize: 52,
            fontWeight: 600,
          }}
        >
          Multiple Systems
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 620,
          height: 214,
          transform: "translate(-50%, -50%)",
          opacity: riskPanelOpacity * riskOpacity,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(233,241,252,0.95), rgba(219,232,248,0.9))",
            border: "1px solid rgba(64,94,129,0.28)",
            boxShadow: "0 10px 24px rgba(28,52,81,0.16)",
            clipPath:
              "polygon(5% 0%, 95% 0%, 100% 20%, 100% 80%, 95% 100%, 5% 100%, 0% 80%, 0% 20%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 32,
            textAlign: "center",
            color: "#2b4768",
            fontSize: 36,
            fontWeight: 700,
            opacity: riskText1 * riskOpacity,
          }}
        >
          Data is scattered
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 88,
            textAlign: "center",
            color: "#2b4768",
            fontSize: 36,
            fontWeight: 700,
            opacity: riskText2 * riskOpacity,
          }}
        >
          Teams work manually
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 144,
            textAlign: "center",
            color: "#2b4768",
            fontSize: 36,
            fontWeight: 700,
            opacity: riskText3 * riskOpacity,
          }}
        >
          Higher compliance risk
        </div>
      </div>
    </AbsoluteFill>
  );
};
