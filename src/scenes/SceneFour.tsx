import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { SCENE_4_START } from "./timeline";
import { Particles, SceneProps } from "./shared";

const OrangeIcon: React.FC<{ x: number; y: number; symbol: "gear" | "search" | "check"; opacity: number }> = ({
  x,
  y,
  symbol,
  opacity,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 82,
        height: 82,
        borderRadius: 999,
        background: "#f39b1d",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 12px 28px rgba(243,155,29,0.32)",
        opacity,
      }}
    >
      <svg width={44} height={44} viewBox="0 0 44 44">
        {symbol === "gear" ? (
          <>
            <circle cx="22" cy="22" r="9.5" fill="none" stroke="#fff" strokeWidth="3" />
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (Math.PI * 2 * i) / 8;
              const x1 = 22 + Math.cos(a) * 12.5;
              const y1 = 22 + Math.sin(a) * 12.5;
              const x2 = 22 + Math.cos(a) * 17;
              const y2 = 22 + Math.sin(a) * 17;
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeWidth="3" strokeLinecap="round" />
              );
            })}
          </>
        ) : null}
        {symbol === "search" ? (
          <>
            <circle cx="18" cy="18" r="10" fill="none" stroke="#fff" strokeWidth="3.2" />
            <line x1="25" y1="25" x2="35" y2="35" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
          </>
        ) : null}
        {symbol === "check" ? (
          <polyline
            points="11,23 19,31 33,14"
            fill="none"
            stroke="#fff"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}
      </svg>
    </div>
  );
};

export const SceneFour: React.FC<SceneProps> = ({ frame }) => {
  const local = frame - SCENE_4_START;

  const cloudIn = interpolate(local, [8, 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const node1 = interpolate(local, [68, 118], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const node2 = interpolate(local, [118, 168], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const node3 = interpolate(local, [168, 218], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const statement1 = interpolate(local, [220, 255], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const statement2 = interpolate(local, [258, 293], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const statement3 = interpolate(local, [296, 331], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glowBase = interpolate(local, [236, 280], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glowPulse = 0.65 + Math.sin(local / 8) * 0.35;
  const arrowGlow = glowBase * glowPulse;
  const topTextY1 = interpolate(statement1, [0, 1], [-28, 54]);
  const topTextY2 = interpolate(statement2, [0, 1], [-10, 96]);
  const topTextY3 = interpolate(statement3, [0, 1], [8, 138]);

  const cloudCenter = { x: 640, y: 332 };
  const leftIconCenter = { x: 221, y: 187 };
  const rightIconCenter = { x: 1059, y: 187 };
  const bottomIconCenter = { x: 640, y: 603 };
  const iconRadius = 41;
  const cloudRadius = 114;
  const edgePoint = (from: { x: number; y: number }, to: { x: number; y: number }, radius: number) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    return { x: from.x + ux * radius, y: from.y + uy * radius };
  };
  const leftStart = edgePoint(leftIconCenter, cloudCenter, iconRadius);
  const leftEnd = edgePoint(cloudCenter, leftIconCenter, cloudRadius + 40);
  const rightStart = edgePoint(rightIconCenter, cloudCenter, iconRadius);
  const rightEnd = edgePoint(cloudCenter, rightIconCenter, cloudRadius + 26);
  const bottomStart = edgePoint(bottomIconCenter, cloudCenter, iconRadius);
  const bottomEnd = edgePoint(cloudCenter, bottomIconCenter, cloudRadius);

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 45% 30%, #1a395f 0%, #08192f 62%, #040d20 100%)",
      }}
    >
      <Particles frame={local + 200} opacity={0.68} />

      <div style={{ position: "absolute", left: 375, top: 190, width: 530, height: 285, opacity: cloudIn }}>
        <svg width={530} height={285} viewBox="0 0 530 285">
          <defs>
            <linearGradient id="cloud-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(235,243,252,0.95)" />
              <stop offset="100%" stopColor="rgba(210,223,238,0.9)" />
            </linearGradient>
          </defs>
          <path
            d="M105 220C70 220 42 192 42 158C42 125 69 99 103 98C115 65 145 45 178 45C206 45 231 59 247 81C256 72 272 65 290 65C319 65 342 81 353 105C362 101 373 99 384 99C421 99 451 128 451 165C451 196 428 220 396 220H105Z"
            fill="url(#cloud-fill)"
            stroke="rgba(214,230,248,0.95)"
            strokeWidth="2"
          />
        </svg>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 120,
            textAlign: "center",
            color: "#f39b1d",
            fontSize: 42,
            fontWeight: 600,
            textShadow: "0 6px 16px rgba(10,29,50,0.25)",
          }}
        >
          Veeva Vault QMS
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 172,
            textAlign: "center",
            color: "rgba(61,87,119,0.98)",
            fontSize: 30,
            fontWeight: 600,
          }}
        >
          Complaints Information
        </div>
      </div>

      <OrangeIcon x={180} y={146} symbol="gear" opacity={node1} />
      <div style={{ position: "absolute", left: 176, top: 236, width: 92, textAlign: "center", color: "#c8ddf8", fontSize: 24, fontWeight: 600, opacity: node1 }}>
        Customer
      </div>
      <div style={{ position: "absolute", left: 178, top: 264, width: 92, textAlign: "center", color: "#c8ddf8", fontSize: 24, fontWeight: 600, opacity: node1 }}>
        Service
      </div>

      <OrangeIcon x={1018} y={146} symbol="search" opacity={node2} />
      <div style={{ position: "absolute", left: 980, top: 236, width: 170, textAlign: "center", color: "#c8ddf8", fontSize: 24, fontWeight: 600, opacity: node2 }}>
        Regulatory
      </div>
      <div style={{ position: "absolute", left: 980, top: 264, width: 170, textAlign: "center", color: "#c8ddf8", fontSize: 24, fontWeight: 600, opacity: node2 }}>
        Affairs
      </div>

      <OrangeIcon x={599} y={562} symbol="check" opacity={node3} />
      <div style={{ position: "absolute", left: 530, top: 646, width: 220, textAlign: "center", color: "#c8ddf8", fontSize: 24, fontWeight: 600, opacity: node3 }}>
        Quality Assurance
      </div>

      <svg width={1280} height={720} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <marker id="s4-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3.5" orient="auto">
            <polygon points="0 0, 8 3.5, 0 7" fill="rgba(205,225,250,0.9)" />
          </marker>
        </defs>
        <line
          x1={leftStart.x}
          y1={leftStart.y}
          x2={leftStart.x + (leftEnd.x - leftStart.x) * node1}
          y2={leftStart.y + (leftEnd.y - leftStart.y) * node1}
          opacity={node1 > 0.02 ? 1 : 0}
          stroke="rgba(205,225,250,0.86)"
          strokeWidth={3.5}
          strokeDasharray="8 8"
          markerEnd="url(#s4-arrow)"
        />
        <line
          x1={leftStart.x}
          y1={leftStart.y}
          x2={leftStart.x + (leftEnd.x - leftStart.x) * node1}
          y2={leftStart.y + (leftEnd.y - leftStart.y) * node1}
          opacity={node1 > 0.98 ? arrowGlow : 0}
          stroke="rgba(238,247,255,0.9)"
          strokeWidth={6}
          strokeLinecap="round"
          filter="drop-shadow(0 0 10px rgba(211,233,255,0.9))"
        />
        <line
          x1={rightStart.x}
          y1={rightStart.y}
          x2={rightStart.x + (rightEnd.x - rightStart.x) * node2}
          y2={rightStart.y + (rightEnd.y - rightStart.y) * node2}
          opacity={node2 > 0.02 ? 1 : 0}
          stroke="rgba(205,225,250,0.86)"
          strokeWidth={3.5}
          strokeDasharray="8 8"
          markerEnd="url(#s4-arrow)"
        />
        <line
          x1={rightStart.x}
          y1={rightStart.y}
          x2={rightStart.x + (rightEnd.x - rightStart.x) * node2}
          y2={rightStart.y + (rightEnd.y - rightStart.y) * node2}
          opacity={node2 > 0.98 ? arrowGlow : 0}
          stroke="rgba(238,247,255,0.9)"
          strokeWidth={6}
          strokeLinecap="round"
          filter="drop-shadow(0 0 10px rgba(211,233,255,0.9))"
        />
        <line
          x1={bottomStart.x}
          y1={bottomStart.y}
          x2={bottomStart.x + (bottomEnd.x - bottomStart.x) * node3}
          y2={bottomStart.y + (bottomEnd.y - bottomStart.y) * node3}
          opacity={node3 > 0.02 ? 1 : 0}
          stroke="rgba(205,225,250,0.86)"
          strokeWidth={3.5}
          strokeDasharray="8 8"
          markerEnd="url(#s4-arrow)"
        />
        <line
          x1={bottomStart.x}
          y1={bottomStart.y}
          x2={bottomStart.x + (bottomEnd.x - bottomStart.x) * node3}
          y2={bottomStart.y + (bottomEnd.y - bottomStart.y) * node3}
          opacity={node3 > 0.98 ? arrowGlow : 0}
          stroke="rgba(238,247,255,0.9)"
          strokeWidth={6}
          strokeLinecap="round"
          filter="drop-shadow(0 0 10px rgba(211,233,255,0.9))"
        />
      </svg>

      {[
        "One place for all data",
        "Faster complaint handling",
        "Safe and direct access",
      ].map((statement, i) => {
        const op = [statement1, statement2, statement3][i];
        return (
          <div
            key={statement}
            style={{
              position: "absolute",
              left: "50%",
              top: [topTextY1, topTextY2, topTextY3][i],
              transform: "translateX(-50%)",
              color: "#e7f4ff",
              textAlign: "center",
              fontSize: 30,
              fontWeight: 600,
              opacity: op,
              textShadow: "0 8px 18px rgba(7,22,42,0.48)",
            }}
          >
            {`\u2022 ${statement}`}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
