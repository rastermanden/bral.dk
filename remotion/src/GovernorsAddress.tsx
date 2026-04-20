import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

const PAPER = "#e9e5db";
const INK = "#1a1714";
const INK_SOFT = "#3c352d";
const ACCENT = "#c3410b";
const ALU = "#b8b3ab";

type Props = {
  quarter: string;
  auditor: string;
  lastAudit: string;
  circulating: number;
  canReserve: number;
  purity: number;
};

export const GovernorsAddress: React.FC<Props> = ({
  quarter,
  auditor,
  lastAudit,
  circulating,
  canReserve,
  purity,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const outro = interpolate(
    frame,
    [durationInFrames - fps * 0.6, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: PAPER,
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent 0 79px, rgba(26,23,20,0.08) 79px 80px),
          repeating-linear-gradient(90deg, transparent 0 79px, rgba(26,23,20,0.08) 79px 80px)
        `,
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        color: INK,
        opacity: outro,
      }}
    >
      <CornerMarks />

      <Sequence from={0} durationInFrames={fps * 2}>
        <Stage1 />
      </Sequence>

      <Sequence from={fps * 2} durationInFrames={fps * 2}>
        <Stage2 quarter={quarter} />
      </Sequence>

      <Sequence from={fps * 4} durationInFrames={fps * 3}>
        <Stage3
          circulating={circulating}
          canReserve={canReserve}
          purity={purity}
        />
      </Sequence>

      <Sequence from={fps * 6.5} durationInFrames={fps * 1.5}>
        <Stage4 auditor={auditor} lastAudit={lastAudit} />
      </Sequence>

      <FilmGrain />
    </AbsoluteFill>
  );
};

const CornerMarks: React.FC = () => {
  const marks = [
    { top: 48, left: 48, rotate: 0 },
    { top: 48, right: 48, rotate: 90 },
    { bottom: 48, left: 48, rotate: -90 },
    { bottom: 48, right: 48, rotate: 180 },
  ] as const;
  return (
    <>
      {marks.map((m, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...m,
            width: 40,
            height: 40,
            borderTop: `2px solid ${INK}`,
            borderLeft: `2px solid ${INK}`,
            transform: `rotate(${m.rotate}deg)`,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          top: 56,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 18,
          letterSpacing: "0.4em",
          color: INK_SOFT,
        }}
      >
        BANCO · BRAL · DEN DANSKE BRÅL·MYNT
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 56,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 14,
          letterSpacing: "0.5em",
          color: INK_SOFT,
        }}
      >
        FORM · MINT · COMMUNIQUÉ · 01
      </div>
    </>
  );
};

const Stage1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rise = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });
  const fade = interpolate(frame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fade,
      }}
    >
      <Seal frame={frame} fps={fps} />
      <div
        style={{
          fontFamily: "'Instrument Serif', 'Times New Roman', serif",
          fontSize: 180,
          letterSpacing: "-0.02em",
          transform: `translateY(${(1 - rise) * 40}px)`,
          marginTop: 48,
          fontWeight: 400,
        }}
      >
        Banco·Bral
      </div>
      <div
        style={{
          fontSize: 18,
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          color: INK_SOFT,
          marginTop: 8,
          opacity: rise,
        }}
      >
        Established MMXXIV · Purity 98.2
      </div>
    </AbsoluteFill>
  );
};

const Stage2: React.FC<{ quarter: string }> = ({ quarter }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fade = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fade,
      }}
    >
      <div
        style={{
          border: `2px solid ${ACCENT}`,
          color: ACCENT,
          padding: "10px 28px",
          fontSize: 20,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          transform: "rotate(-2deg)",
          fontWeight: 700,
        }}
      >
        Quarterly Address
      </div>
      <div
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 120,
          marginTop: 32,
          letterSpacing: "-0.01em",
        }}
      >
        {quarter}
      </div>
      <HorizontalRule widthPx={420} delayFrames={0} />
      <div
        style={{
          fontSize: 20,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: INK_SOFT,
          marginTop: 24,
        }}
      >
        Reserve Disclosure
      </div>
    </AbsoluteFill>
  );
};

const Stage3: React.FC<{
  circulating: number;
  canReserve: number;
  purity: number;
}> = ({ circulating, canReserve, purity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: 80 }}>
        <Stat
          label="In Circulation"
          value={circulating}
          suffix=" BRAL"
          frame={frame}
          fps={fps}
          delay={0}
        />
        <Stat
          label="Can Reserve"
          value={canReserve}
          suffix=""
          frame={frame}
          fps={fps}
          delay={fps * 0.3}
        />
        <Stat
          label="Purity"
          value={purity}
          suffix="%"
          decimals={1}
          frame={frame}
          fps={fps}
          delay={fps * 0.6}
        />
      </div>
    </AbsoluteFill>
  );
};

const Stat: React.FC<{
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  frame: number;
  fps: number;
  delay: number;
}> = ({ label, value, suffix = "", decimals = 0, frame, fps, delay }) => {
  const local = Math.max(0, frame - delay);
  const progress = interpolate(local, [0, fps * 1.2], [0, 1], {
    extrapolateRight: "clamp",
  });
  const counted = value * progress;
  const rise = spring({
    frame: local,
    fps,
    config: { damping: 20, stiffness: 90 },
  });

  return (
    <div
      style={{
        textAlign: "center",
        transform: `translateY(${(1 - rise) * 30}px)`,
        opacity: rise,
        minWidth: 320,
      }}
    >
      <div
        style={{
          fontSize: 14,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: INK_SOFT,
          marginBottom: 18,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 140,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {counted.toFixed(decimals)}
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 28,
            letterSpacing: "0.2em",
            color: INK_SOFT,
            marginLeft: 6,
          }}
        >
          {suffix}
        </span>
      </div>
      <div
        style={{
          height: 1,
          background: INK,
          margin: "16px auto 0",
          width: `${progress * 100}%`,
          maxWidth: 240,
          transition: "width",
        }}
      />
    </div>
  );
};

const Stage4: React.FC<{ auditor: string; lastAudit: string }> = ({
  auditor,
  lastAudit,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fade = interpolate(frame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });
  const stampPop = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 160 },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fade,
      }}
    >
      <div
        style={{
          border: `3px solid ${ACCENT}`,
          color: ACCENT,
          padding: "18px 36px",
          fontSize: 28,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          transform: `rotate(-4deg) scale(${stampPop})`,
          fontWeight: 700,
        }}
      >
        Audited · {lastAudit}
      </div>
      <div
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 48,
          marginTop: 40,
        }}
      >
        — {auditor}
      </div>
      <div
        style={{
          fontSize: 16,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: INK_SOFT,
          marginTop: 12,
        }}
      >
        Principal Auditor, Banco·Bral
      </div>
    </AbsoluteFill>
  );
};

const Seal: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const rotate = (frame / fps) * 12;
  return (
    <svg width={200} height={200} viewBox="0 0 200 200">
      <g style={{ transform: `rotate(${rotate}deg)`, transformOrigin: "100px 100px" }}>
        <circle cx="100" cy="100" r="94" fill="none" stroke={INK} strokeWidth="2" />
        <circle cx="100" cy="100" r="80" fill="none" stroke={INK} strokeWidth="1" />
        <circle cx="100" cy="100" r="54" fill={ALU} stroke={INK} strokeWidth="1.5" />
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const x1 = 100 + Math.cos(a) * 82;
          const y1 = 100 + Math.sin(a) * 82;
          const x2 = 100 + Math.cos(a) * 92;
          const y2 = 100 + Math.sin(a) * 92;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={INK}
              strokeWidth="1"
            />
          );
        })}
      </g>
      <text
        x="100"
        y="108"
        textAnchor="middle"
        fontFamily="'Instrument Serif', serif"
        fontSize="36"
        fill={INK}
      >
        BB
      </text>
    </svg>
  );
};

const HorizontalRule: React.FC<{ widthPx: number; delayFrames: number }> = ({
  widthPx,
  delayFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - delayFrames);
  const progress = interpolate(local, [0, fps * 0.6], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        height: 2,
        width: widthPx * progress,
        background: INK,
        marginTop: 32,
      }}
    />
  );
};

const FilmGrain: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        mixBlendMode: "multiply",
        opacity: 0.06,
        backgroundImage:
          "radial-gradient(circle at 20% 30%, rgba(0,0,0,0.3), transparent 50%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.3), transparent 55%)",
        transform: `translate(${(frame % 7) - 3}px, ${(frame % 5) - 2}px)`,
      }}
    />
  );
};
