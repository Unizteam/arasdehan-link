"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { VisualKey } from "@/types/site";

const INK = "#f2ede4";
const DIM = "#a39c91";
const NEO = "#45d2c0";
const UNI = "#d0a35d";
const UNI_BLUE = "#6f97d8";
const ETVA = "#a094f5";
const TR_RED = "#dc6151";
const TG = "#4aa8ea";

/*
 * Featured artwork is cropped ("slice") so it always bleeds to the card edge.
 * Keep meaningful content inside x 26–234 / y 24–196 of the 260x220 box.
 */
const HERO_BOX = "0 0 260 220";
const WIDE_BOX = "0 0 320 220";
const SQUARE_BOX = "0 0 120 120";

/*
 * Trigonometric results can differ in the final float digit between the Node
 * renderer and the browser, which serialises different SVG attributes and
 * breaks hydration. Round every derived coordinate.
 */
function round(value: number) {
  return Math.round(value * 100) / 100;
}

function polar(cx: number, cy: number, radius: number, degrees: number) {
  const radians = (degrees * Math.PI) / 180;
  return { x: round(cx + Math.cos(radians) * radius), y: round(cy + Math.sin(radians) * radius) };
}

type ArtProps = {
  viewBox: string;
  fit?: "meet" | "slice";
  tint?: string;
  grid?: boolean;
  children: ReactNode;
};

function Art({ viewBox, fit = "meet", tint, grid, children }: ArtProps) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-[#1b1b1a]", tint)}>
      {grid ? (
        <span aria-hidden="true" className="art-grid absolute inset-0 opacity-70" />
      ) : null}
      <svg
        viewBox={viewBox}
        preserveAspectRatio={`xMidYMid ${fit}`}
        className="relative h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        {children}
      </svg>
    </div>
  );
}

/*
 * Persian glyph runs advance leftward from the anchor point, so a visually
 * left-aligned Persian label has to be anchored on its logical end. `align`
 * is therefore expressed physically and mapped per script.
 */
function faAnchor(align: "left" | "center" | "right", latin: boolean) {
  if (align === "center") return "middle" as const;
  if (latin) return align === "left" ? ("start" as const) : ("end" as const);
  return align === "left" ? ("end" as const) : ("start" as const);
}

function Label({
  x,
  y,
  children,
  size = 9,
  fill = DIM,
  weight = 600,
  align = "left",
  latin = false,
  spacing = 0,
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  fill?: string;
  weight?: number;
  align?: "left" | "center" | "right";
  latin?: boolean;
  spacing?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      fontSize={size}
      fontWeight={weight}
      letterSpacing={spacing}
      textAnchor={faAnchor(align, latin)}
    >
      {children}
    </text>
  );
}

function Panel({
  x,
  y,
  width,
  height,
  radius = 12,
  fill = "#232322",
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
  fill?: string;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={radius}
      fill={fill}
      stroke="rgba(242,237,228,0.09)"
    />
  );
}

function Bar({
  x,
  y,
  width,
  fill = "rgba(242,237,228,0.16)",
  height = 5,
}: {
  x: number;
  y: number;
  width: number;
  fill?: string;
  height?: number;
}) {
  return <rect x={x} y={y} width={width} height={height} rx={height / 2} fill={fill} />;
}

function ProgressRing({
  cx,
  cy,
  r,
  progress,
  color,
  width = 6,
}: {
  cx: number;
  cy: number;
  r: number;
  progress: number;
  color: string;
  width?: number;
}) {
  const circumference = 2 * Math.PI * r;

  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(242,237,228,0.12)" strokeWidth={width} />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={`${circumference * progress} ${circumference}`}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    </g>
  );
}

function FlagTurkiye({ x, y, w = 54, h = 36 }: { x: number; y: number; w?: number; h?: number }) {
  const scale = w / 54;

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect width={54} height={h / scale} rx={5} fill="#E0393E" />
      <circle cx={22} cy={18} r={9} fill="#fdf6f4" />
      <circle cx={26} cy={18} r={7.2} fill="#E0393E" />
      <path d="M34.5 12.4l1.7 4.7 4.9.2-3.9 3 1.4 4.8-4.1-2.8-4.2 2.6 1.6-4.7-3.8-3.1 4.9-.1z" fill="#fdf6f4" />
    </g>
  );
}

function FlagEurope({ x, y, w = 54, h = 36 }: { x: number; y: number; w?: number; h?: number }) {
  const scale = w / 54;
  const stars = Array.from({ length: 12 }, (_, index) => {
    const point = polar(27, 18, 10, index * 30 - 90);
    return { cx: point.x, cy: point.y };
  });

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect width={54} height={h / scale} rx={5} fill="#1c47a3" />
      {stars.map((star) => (
        <circle key={`${star.cx}-${star.cy}`} cx={star.cx} cy={star.cy} r={1.7} fill="#f2d15c" />
      ))}
    </g>
  );
}

function Bubble({
  x,
  y,
  width,
  height,
  text,
  fill = "rgba(242,237,228,0.94)",
  color = "#1b1b1a",
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  fill?: string;
  color?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={height / 2} fill={fill} />
      <path d={`M${x + 16} ${y + height} l0 7 l9 -7 z`} fill={fill} />
      <text
        x={x + width / 2}
        y={y + height / 2 + 4}
        fill={color}
        fontSize={11}
        fontWeight={600}
        textAnchor="middle"
      >
        {text}
      </text>
    </g>
  );
}

/* ---------------------------------- profile --------------------------------- */

export function ProfileVisual() {
  const gradient = useId();

  return (
    <Art viewBox={SQUARE_BOX} fit="slice">
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2e4a46" />
          <stop offset="55%" stopColor="#26302d" />
          <stop offset="100%" stopColor="#3b2f26" />
        </linearGradient>
      </defs>
      <rect width={120} height={120} fill={`url(#${gradient})`} />
      <circle cx={60} cy={60} r={44} fill="none" stroke="rgba(242,237,228,0.12)" />
      <circle cx={60} cy={60} r={33} fill="none" stroke="rgba(242,237,228,0.08)" />
      <text x={60} y={70} fill={INK} fontSize={30} fontWeight={600} letterSpacing={1.5} textAnchor="middle">
        AD
      </text>
    </Art>
  );
}

/* --------------------------------- NeoTracked -------------------------------- */

const HEATMAP_ALPHA = [
  0.16, 0.5, 0.28, 0.8, 0.4, 0.62, 0.2, 0.72, 0.34, 0.55, 0.9, 0.24, 0.46, 0.68,
  0.3, 0.58, 0.18, 0.76, 0.42, 0.64, 0.26, 0.52, 0.84, 0.36, 0.6, 0.22, 0.7,
  0.44, 0.3, 0.56, 0.14, 0.66, 0.38, 0.78, 0.48, 0.2, 0.6, 0.32, 0.54, 0.86,
  0.24, 0.46, 0.72, 0.28, 0.5, 0.18, 0.64, 0.4, 0.58, 0.34,
];

function Heatmap({
  x,
  y,
  columns,
  rows,
  cell = 14,
  gap = 4,
  color = NEO,
}: {
  x: number;
  y: number;
  columns: number;
  rows: number;
  cell?: number;
  gap?: number;
  color?: string;
}) {
  const squares: ReactNode[] = [];

  for (let column = 0; column < columns; column += 1) {
    for (let row = 0; row < rows; row += 1) {
      const alpha = HEATMAP_ALPHA[(column * rows + row) % HEATMAP_ALPHA.length];
      squares.push(
        <rect
          key={`${column}-${row}`}
          x={x + column * (cell + gap)}
          y={y + row * (cell + gap)}
          width={cell}
          height={cell}
          rx={3.5}
          fill={color}
          opacity={alpha}
        />,
      );
    }
  }

  return <g>{squares}</g>;
}

function NeoTrackedHeroVisual() {
  const glow = useId();

  return (
    <Art viewBox={HERO_BOX} fit="slice" grid tint="bg-[#141b1a]">
      <defs>
        <radialGradient id={glow} cx="20%" cy="12%" r="85%">
          <stop offset="0%" stopColor="rgba(69,210,192,0.22)" />
          <stop offset="100%" stopColor="rgba(69,210,192,0)" />
        </radialGradient>
      </defs>
      <rect width={260} height={220} fill={`url(#${glow})`} />

      <Panel x={26} y={26} width={208} height={168} radius={16} fill="#20211f" />

      <Label x={40} y={48} size={9}>
        امتیاز روز
      </Label>

      <ProgressRing cx={196} cy={62} r={20} progress={0.86} color={NEO} width={6} />
      <text x={196} y={66} fill={INK} fontSize={14} fontWeight={600} textAnchor="middle">
        ۸۶
      </text>

      <text x={40} y={76} fill={INK} fontSize={16} fontWeight={600} textAnchor="end">
        امروز
      </text>

      <Bar x={40} y={90} width={124} />
      <Bar x={40} y={90} width={92} fill={NEO} />
      <Bar x={40} y={104} width={124} />
      <Bar x={40} y={104} width={54} fill="rgba(69,210,192,0.6)" />

      <Label x={40} y={128} size={9}>
        تداوم
      </Label>
      <Heatmap x={40} y={136} columns={10} rows={3} cell={14} gap={4.6} />

      <Bar x={40} y={184} width={62} height={4} fill="rgba(242,237,228,0.14)" />
    </Art>
  );
}

function NeoTrackedDailyVisual() {
  return (
    <Art viewBox={WIDE_BOX} grid tint="bg-[#151b1a]">
      <Panel x={20} y={20} width={280} height={180} radius={16} fill="#1f201e" />
      <circle cx={38} cy={38} r={3.4} fill="rgba(242,237,228,0.28)" />
      <circle cx={50} cy={38} r={3.4} fill="rgba(242,237,228,0.18)" />
      <circle cx={62} cy={38} r={3.4} fill="rgba(242,237,228,0.18)" />
      <Label x={80} y={42} size={9}>
        گزارش روزانه
      </Label>

      <rect x={244} y={30} width={44} height={20} rx={10} fill="rgba(69,210,192,0.16)" />
      <text x={266} y={44} fill={NEO} fontSize={11} fontWeight={700} textAnchor="middle">
        ۹۱
      </text>

      <line x1={20} y1={54} x2={300} y2={54} stroke="rgba(242,237,228,0.08)" />

      <Heatmap x={36} y={68} columns={10} rows={4} cell={19} gap={5.5} />

      <Label x={36} y={187} size={9}>
        کم
      </Label>
      {[0.18, 0.38, 0.6, 0.85].map((alpha, index) => (
        <rect
          key={alpha}
          x={62 + index * 13}
          y={178}
          width={9}
          height={9}
          rx={2.5}
          fill={NEO}
          opacity={alpha}
        />
      ))}
      <Label x={120} y={187} size={9}>
        زیاد
      </Label>
    </Art>
  );
}

function NeoTrackedCountdownVisual() {
  const blocks = [
    { value: "۱۲", label: "روز" },
    { value: "۰۴", label: "ساعت" },
    { value: "۳۸", label: "دقیقه" },
  ];

  return (
    <Art viewBox={WIDE_BOX} grid tint="bg-[#141b1b]">
      <rect x={26} y={26} width={116} height={22} rx={11} fill="rgba(69,210,192,0.14)" />
      <circle cx={40} cy={37} r={4.5} fill="none" stroke={NEO} strokeWidth={2} />
      <text x={54} y={41} fill={NEO} fontSize={10} fontWeight={700} textAnchor="end">
        شمارش معکوس
      </text>

      {blocks.map((block, index) => {
        const x = 30 + index * 92;
        return (
          <g key={block.label}>
            <Panel x={x} y={64} width={76} height={78} radius={16} fill="#242422" />
            <text x={x + 38} y={108} fill={INK} fontSize={28} fontWeight={600} textAnchor="middle">
              {block.value}
            </text>
            <Label x={x + 38} y={128} size={9} align="center">
              {block.label}
            </Label>
          </g>
        );
      })}

      {[122, 214].map((x) => (
        <g key={x}>
          <circle cx={x - 8} cy={92} r={2.4} fill="rgba(242,237,228,0.3)" />
          <circle cx={x - 8} cy={112} r={2.4} fill="rgba(242,237,228,0.3)" />
        </g>
      ))}

      <Bar x={30} y={166} width={260} height={6} />
      <Bar x={30} y={166} width={168} height={6} fill={NEO} />
      <Label x={30} y={192} size={9}>
        زمان باقی‌مانده
      </Label>
    </Art>
  );
}

function NeoTrackedLanguageVisual() {
  const rows = [
    { word: "واژه", progress: 0.82, badge: "۱" },
    { word: "تکرار", progress: 0.54, badge: "۲" },
    { word: "جمله", progress: 0.36, badge: "۳" },
  ];

  return (
    <Art viewBox={WIDE_BOX} tint="bg-[#151c1b]">
      <text x={28} y={34} fill={DIM} fontSize={9} fontWeight={600} className="brand">
        LanguageGym
      </text>

      {rows.map((row, index) => {
        const y = 46 + index * 52;
        return (
          <g key={row.word}>
            <Panel x={26} y={y} width={268} height={44} radius={12} fill="#232322" />
            <rect x={38} y={y + 11} width={22} height={22} rx={7} fill="rgba(69,210,192,0.18)" />
            <text x={49} y={y + 27} fill={NEO} fontSize={11} fontWeight={700} textAnchor="middle">
              {row.badge}
            </text>
            <text
              x={70}
              y={y + 27}
              fill={INK}
              fontSize={13}
              fontWeight={500}
              textAnchor="end"
            >
              {row.word}
            </text>
            <Bar x={168} y={y + 19} width={110} height={6} />
            <Bar x={168} y={y + 19} width={110 * row.progress} height={6} fill={NEO} />
          </g>
        );
      })}

      <Label x={26} y={210} size={9}>
        مرور روزانه
      </Label>
    </Art>
  );
}

function NeoTrackedMindVisual() {
  const glow = useId();
  const sequence = ["۳", "۷", "۱۱", "؟"];

  return (
    <Art viewBox={WIDE_BOX} tint="bg-[#131b1a]">
      <defs>
        <radialGradient id={glow} cx="50%" cy="42%" r="58%">
          <stop offset="0%" stopColor="rgba(69,210,192,0.16)" />
          <stop offset="100%" stopColor="rgba(69,210,192,0)" />
        </radialGradient>
      </defs>
      <rect width={320} height={220} fill={`url(#${glow})`} />

      <text x={28} y={34} fill={DIM} fontSize={9} fontWeight={600} className="brand">
        MindGym
      </text>
      <Label x={28} y={52} size={9}>
        دنباله عددی
      </Label>

      {sequence.map((value, index) => {
        const x = 36 + index * 66;
        return (
          <g key={index}>
            <Panel x={x} y={62} width={52} height={52} radius={14} fill="#232322" />
            <text
              x={x + 26}
              y={94}
              fill={value === "؟" ? NEO : INK}
              fontSize={22}
              fontWeight={600}
              textAnchor="middle"
            >
              {value}
            </text>
          </g>
        );
      })}

      <Panel x={26} y={128} width={268} height={58} radius={14} fill="#1f2423" />
      <Label x={42} y={150} size={9}>
        محاسبه ذهنی
      </Label>
      <text x={42} y={174} fill={INK} fontSize={20} fontWeight={600} textAnchor="end">
        ۱۵ × ۴ = ۶۰
      </text>
      <rect x={228} y={144} width={52} height={28} rx={10} fill="rgba(69,210,192,0.18)" />
      <text x={254} y={163} fill={NEO} fontSize={11} fontWeight={700} textAnchor="middle">
        ✓
      </text>
    </Art>
  );
}

function NeoTrackedAnalyticsVisual() {
  const fill = useId();
  const bars = [0.32, 0.55, 0.42, 0.78, 0.62, 0.9, 0.7];
  const days = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

  return (
    <Art viewBox={WIDE_BOX} tint="bg-[#141b1b]">
      <defs>
        <linearGradient id={fill} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(69,210,192,0.85)" />
          <stop offset="100%" stopColor="rgba(69,210,192,0.18)" />
        </linearGradient>
      </defs>

      <Label x={26} y={34} size={9}>
        ریتم هفتگی
      </Label>

      {[70, 108, 146].map((y) => (
        <line
          key={y}
          x1={26}
          y1={y}
          x2={294}
          y2={y}
          stroke="rgba(242,237,228,0.07)"
          strokeDasharray="3 5"
        />
      ))}

      {bars.map((value, index) => {
        const height = value * 108;
        const x = 32 + index * 38;
        return (
          <rect
            key={index}
            x={x}
            y={172 - height}
            width={24}
            height={height}
            rx={7}
            fill={`url(#${fill})`}
          />
        );
      })}

      <polyline
        points={bars.map((value, index) => `${44 + index * 38},${172 - value * 108 - 10}`).join(" ")}
        fill="none"
        stroke={INK}
        strokeOpacity={0.55}
        strokeWidth={2}
        strokeLinecap="round"
      />

      <line x1={26} y1={172} x2={294} y2={172} stroke="rgba(242,237,228,0.14)" />
      {days.map((day, index) => (
        <Label key={index} x={44 + index * 38} y={192} size={9} align="center">
          {day}
        </Label>
      ))}
    </Art>
  );
}

/* --------------------------------- UniEliteZ -------------------------------- */

function UniEliteZHeroVisual() {
  const glow = useId();

  return (
    <Art viewBox={HERO_BOX} fit="slice" tint="bg-[#161a22]">
      <defs>
        <radialGradient id={glow} cx="78%" cy="14%" r="80%">
          <stop offset="0%" stopColor="rgba(111,151,216,0.24)" />
          <stop offset="100%" stopColor="rgba(111,151,216,0)" />
        </radialGradient>
      </defs>
      <rect width={260} height={220} fill={`url(#${glow})`} />

      <Panel x={26} y={26} width={208} height={168} radius={16} fill="#20211f" />

      <rect x={38} y={40} width={184} height={28} rx={14} fill="rgba(242,237,228,0.07)" />
      <circle cx={54} cy={54} r={5.5} fill="none" stroke={DIM} strokeWidth={2} />
      <line x1={58} y1={58} x2={62} y2={62} stroke={DIM} strokeWidth={2} strokeLinecap="round" />
      <Bar x={72} y={51} width={78} fill="rgba(242,237,228,0.22)" />

      <g>
        <Panel x={38} y={78} width={184} height={48} radius={12} fill="#26261f" />
        <FlagTurkiye x={50} y={90} w={30} h={20} />
        <text x={90} y={100} fill={INK} fontSize={11} fontWeight={600} textAnchor="end">
          ترکیه
        </text>
        <Bar x={90} y={106} width={64} height={4} />
        <rect x={176} y={92} width={34} height={16} rx={8} fill="rgba(208,163,93,0.2)" />
        <Bar x={183} y={98} width={20} height={4} fill={UNI} />
      </g>

      <g>
        <Panel x={38} y={132} width={184} height={48} radius={12} fill="#22242c" />
        <FlagEurope x={50} y={144} w={30} h={20} />
        <text x={90} y={154} fill={INK} fontSize={11} fontWeight={600} textAnchor="end">
          اروپا
        </text>
        <Bar x={90} y={160} width={52} height={4} />
        <rect x={176} y={146} width={34} height={16} rx={8} fill="rgba(111,151,216,0.22)" />
        <Bar x={183} y={152} width={20} height={4} fill={UNI_BLUE} />
      </g>
    </Art>
  );
}

function UniTurkiyeVisual() {
  const glow = useId();

  return (
    <Art viewBox={WIDE_BOX} tint="bg-[#1f1817]">
      <defs>
        <radialGradient id={glow} cx="18%" cy="18%" r="80%">
          <stop offset="0%" stopColor="rgba(220,97,81,0.22)" />
          <stop offset="100%" stopColor="rgba(220,97,81,0)" />
        </radialGradient>
      </defs>
      <rect width={320} height={220} fill={`url(#${glow})`} />

      <FlagTurkiye x={28} y={28} w={58} h={38} />
      <text x={98} y={48} fill={INK} fontSize={16} fontWeight={600} textAnchor="end">
        ترکیه
      </text>
      <Label x={98} y={66} size={9}>
        دانشگاه‌ها
      </Label>

      <g opacity={0.9}>
        <path d="M110 150 L160 112 L210 150 Z" fill="rgba(242,237,228,0.14)" />
        <rect x={118} y={150} width={84} height={34} fill="rgba(242,237,228,0.1)" />
        {[126, 146, 166, 186].map((x) => (
          <rect key={x} x={x} y={152} width={8} height={30} rx={3} fill="rgba(242,237,228,0.2)" />
        ))}
        <circle cx={160} cy={104} r={4} fill={TR_RED} />
      </g>

      <Panel x={28} y={92} width={64} height={40} radius={11} fill="#252423" />
      <Bar x={38} y={104} width={40} height={4} />
      <Bar x={38} y={114} width={26} height={4} fill="rgba(220,97,81,0.6)" />

      <Panel x={228} y={92} width={64} height={40} radius={11} fill="#252423" />
      <Bar x={238} y={104} width={40} height={4} />
      <Bar x={238} y={114} width={30} height={4} fill="rgba(242,237,228,0.3)" />
    </Art>
  );
}

function UniEuropeVisual() {
  const glow = useId();

  return (
    <Art viewBox={WIDE_BOX} tint="bg-[#161a24]">
      <defs>
        <radialGradient id={glow} cx="82%" cy="16%" r="80%">
          <stop offset="0%" stopColor="rgba(111,151,216,0.24)" />
          <stop offset="100%" stopColor="rgba(111,151,216,0)" />
        </radialGradient>
      </defs>
      <rect width={320} height={220} fill={`url(#${glow})`} />

      <FlagEurope x={28} y={28} w={58} h={38} />
      <text x={98} y={48} fill={INK} fontSize={16} fontWeight={600} textAnchor="end">
        اروپا
      </text>
      <Label x={98} y={66} size={9}>
        مسیرهای تحصیلی
      </Label>

      <g>
        <path d="M104 132 L160 100 L216 132 Z" fill="rgba(111,151,216,0.22)" />
        <rect x={104} y={134} width={112} height={6} rx={3} fill="rgba(242,237,228,0.16)" />
        {[114, 138, 162, 186].map((x) => (
          <rect key={x} x={x} y={142} width={10} height={38} rx={4} fill="rgba(242,237,228,0.16)" />
        ))}
        <rect x={104} y={180} width={112} height={7} rx={3} fill="rgba(242,237,228,0.2)" />
      </g>

      {[
        { x: 24, y: 150 },
        { x: 248, y: 108 },
      ].map((chip) => (
        <g key={chip.x}>
          <Panel x={chip.x} y={chip.y} width={62} height={38} radius={11} fill="#232630" />
          <Bar x={chip.x + 10} y={chip.y + 12} width={38} height={4} />
          <Bar x={chip.x + 10} y={chip.y + 22} width={24} height={4} fill={UNI_BLUE} />
        </g>
      ))}
    </Art>
  );
}

function UniCompareVisual() {
  return (
    <Art viewBox={WIDE_BOX} tint="bg-[#191b20]">
      <Label x={26} y={32} size={9}>
        مقایسه
      </Label>

      {[
        { x: 26, accent: UNI, fills: [0.72, 0.48, 0.6] },
        { x: 172, accent: UNI_BLUE, fills: [0.5, 0.78, 0.36] },
      ].map((card) => (
        <g key={card.x}>
          <Panel x={card.x} y={44} width={122} height={148} radius={14} fill="#232322" />
          <rect x={card.x + 14} y={58} width={26} height={26} rx={8} fill={card.accent} opacity={0.24} />
          <circle cx={card.x + 27} cy={71} r={5.5} fill={card.accent} opacity={0.85} />
          <Bar x={card.x + 48} y={62} width={54} height={5} />
          <Bar x={card.x + 48} y={74} width={34} height={4} />

          {card.fills.map((value, index) => (
            <g key={index}>
              <Bar x={card.x + 14} y={104 + index * 26} width={94} height={6} />
              <Bar x={card.x + 14} y={104 + index * 26} width={94 * value} height={6} fill={card.accent} />
            </g>
          ))}
          <Label x={card.x + 14} y={184} size={9}>
            رشته · شهریه
          </Label>
        </g>
      ))}

      <circle cx={160} cy={118} r={17} fill="#1b1b1a" stroke="rgba(242,237,228,0.16)" />
      <path
        d="M153 114h13l-3-3M167 122h-13l3 3"
        fill="none"
        stroke={INK}
        strokeOpacity={0.8}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Art>
  );
}

function UniScholarshipVisual() {
  const gold = useId();
  const glow = useId();

  return (
    <Art viewBox={WIDE_BOX} tint="bg-[#1e1a13]">
      <defs>
        <linearGradient id={gold} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e6c286" />
          <stop offset="100%" stopColor="#b8863f" />
        </linearGradient>
        <radialGradient id={glow} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(208,163,93,0.22)" />
          <stop offset="100%" stopColor="rgba(208,163,93,0)" />
        </radialGradient>
      </defs>
      <rect width={320} height={220} fill={`url(#${glow})`} />

      {[0, 45, 90, 135].map((angle) => {
        const start = polar(160, 92, 88, angle + 180);
        const end = polar(160, 92, 88, angle);
        return (
          <line
            key={angle}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke="rgba(208,163,93,0.12)"
          />
        );
      })}

      <path d="M142 122 l-10 44 22 -12 22 12 -10 -44 z" fill="rgba(208,163,93,0.4)" />
      <circle cx={160} cy={92} r={40} fill={`url(#${gold})`} />
      <circle cx={160} cy={92} r={31} fill="none" stroke="rgba(27,27,26,0.35)" strokeWidth={2} />
      <path
        d="M160 72l5.6 11.6 12.8.9-9.6 8.4 3 12.5-11.8-7-11.7 7 3-12.5-9.6-8.4 12.7-.9z"
        fill="#20180a"
        opacity={0.75}
      />

      <Label x={160} y={200} size={10} align="center" fill={UNI}>
        بورسیه
      </Label>
    </Art>
  );
}

function UniMatchVisual() {
  return (
    <Art viewBox={WIDE_BOX} tint="bg-[#1a1822]">
      <Label x={26} y={32} size={9}>
        بهترین انتخاب
      </Label>

      <g>
        {[64, 44, 24].map((r, index) => (
          <circle
            key={r}
            cx={100}
            cy={118}
            r={r}
            fill="none"
            stroke="rgba(242,237,228,0.1)"
            strokeDasharray={index === 0 ? "4 6" : undefined}
          />
        ))}
        {[
          { cx: 72, cy: 92 },
          { cx: 134, cy: 96 },
          { cx: 82, cy: 152 },
          { cx: 140, cy: 148 },
        ].map((dot) => (
          <circle key={dot.cx} cx={dot.cx} cy={dot.cy} r={4} fill="rgba(242,237,228,0.28)" />
        ))}
        <circle cx={100} cy={118} r={11} fill={ETVA} opacity={0.9} />
        <circle cx={100} cy={118} r={18} fill="none" stroke={ETVA} strokeOpacity={0.5} />
      </g>

      <Panel x={186} y={72} width={108} height={92} radius={14} fill="#232322" />
      <circle cx={206} cy={94} r={10} fill="rgba(160,148,245,0.22)" />
      <path
        d="M201 94l3.6 3.8 6.4-7"
        fill="none"
        stroke={ETVA}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Bar x={224} y={90} width={52} height={5} />
      <Bar x={200} y={118} width={76} height={5} />
      <Bar x={200} y={132} width={54} height={5} fill="rgba(160,148,245,0.55)" />
      <Label x={200} y={156} size={9}>
        پروفایل منتخب
      </Label>
    </Art>
  );
}

/* ---------------------------------- EtvaVida -------------------------------- */

function EtvaVidaHeroVisual() {
  const glow = useId();

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#181725]">
      <span
        aria-hidden="true"
        className="etva-orb absolute top-[38%] left-1/2 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(160,148,245,0.42),rgba(160,148,245,0)_68%)]"
      />
      <svg
        viewBox={HERO_BOX}
        preserveAspectRatio="xMidYMid slice"
        className="relative h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <radialGradient id={glow} cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="rgba(160,148,245,0.16)" />
            <stop offset="100%" stopColor="rgba(160,148,245,0)" />
          </radialGradient>
        </defs>
        <rect width={260} height={220} fill={`url(#${glow})`} />

        {[-24, 18, 62].map((rotation, index) => (
          <ellipse
            key={rotation}
            cx={130}
            cy={100}
            rx={82 - index * 8}
            ry={34 - index * 4}
            fill="none"
            stroke="rgba(242,237,228,0.14)"
            transform={`rotate(${rotation} 130 100)`}
          />
        ))}

        {[
          { cx: 58, cy: 84 },
          { cx: 202, cy: 118 },
          { cx: 148, cy: 52 },
          { cx: 104, cy: 148 },
        ].map((node) => (
          <circle key={node.cx} cx={node.cx} cy={node.cy} r={3.4} fill={ETVA} opacity={0.8} />
        ))}

        <path d="M130 84l7 12 12 4-12 4-7 12-7-12-12-4 12-4z" fill={INK} opacity={0.92} />

        <text
          x={130}
          y={176}
          fill={INK}
          fontSize={15}
          fontWeight={600}
          letterSpacing={6}
          textAnchor="middle"
          className="brand"
        >
          ETVAVIDA
        </text>
        <Label x={130} y={196} size={9} align="center" fill={ETVA}>
          خدمات دیجیتال
        </Label>
      </svg>
    </div>
  );
}

function ServiceWebVisual() {
  const glow = useId();

  return (
    <Art viewBox={WIDE_BOX} tint="bg-[#191827]">
      <defs>
        <radialGradient id={glow} cx="18%" cy="12%" r="82%">
          <stop offset="0%" stopColor="rgba(160,148,245,0.2)" />
          <stop offset="100%" stopColor="rgba(160,148,245,0)" />
        </radialGradient>
      </defs>
      <rect width={320} height={220} fill={`url(#${glow})`} />

      <Panel x={24} y={28} width={272} height={164} radius={14} fill="#232231" />
      <rect x={24} y={28} width={272} height={28} rx={14} fill="rgba(242,237,228,0.05)" />
      <circle cx={42} cy={42} r={3.4} fill="rgba(242,237,228,0.3)" />
      <circle cx={54} cy={42} r={3.4} fill="rgba(242,237,228,0.18)" />
      <circle cx={66} cy={42} r={3.4} fill="rgba(242,237,228,0.18)" />
      <rect x={86} y={35} width={120} height={14} rx={7} fill="rgba(242,237,228,0.08)" />

      <rect x={40} y={70} width={130} height={46} rx={10} fill="rgba(160,148,245,0.22)" />
      <Bar x={52} y={84} width={80} fill="rgba(242,237,228,0.35)" />
      <Bar x={52} y={98} width={52} fill="rgba(242,237,228,0.2)" />

      <rect x={184} y={70} width={96} height={46} rx={10} fill="rgba(242,237,228,0.06)" />
      <Bar x={196} y={86} width={64} height={4} />
      <Bar x={196} y={98} width={40} height={4} fill="rgba(160,148,245,0.6)" />

      {[40, 122, 204].map((x) => (
        <g key={x}>
          <rect x={x} y={130} width={76} height={44} rx={10} fill="rgba(242,237,228,0.05)" />
          <circle cx={x + 18} cy={148} r={7} fill="rgba(160,148,245,0.5)" />
          <Bar x={x + 12} y={162} width={52} height={4} />
        </g>
      ))}

      <Label x={24} y={210} size={9}>
        طراحی و توسعه وب
      </Label>
    </Art>
  );
}

function ServiceMobileVisual() {
  return (
    <Art viewBox={WIDE_BOX} tint="bg-[#181a28]">
      <Label x={26} y={32} size={9}>
        اپلیکیشن موبایل
      </Label>

      {/* Rear device */}
      <g opacity={0.55}>
        <rect x={188} y={52} width={84} height={140} rx={16} fill="#242433" stroke="rgba(242,237,228,0.08)" />
        <rect x={214} y={60} width={32} height={5} rx={2.5} fill="rgba(242,237,228,0.18)" />
        <Bar x={200} y={80} width={60} height={5} />
        <Bar x={200} y={94} width={42} height={5} fill="rgba(160,148,245,0.5)" />
        <rect x={200} y={112} width={60} height={34} rx={8} fill="rgba(242,237,228,0.06)" />
      </g>

      {/* Front device */}
      <rect x={44} y={40} width={104} height={164} rx={20} fill="#26263a" stroke="rgba(242,237,228,0.12)" />
      <rect x={78} y={50} width={36} height={5} rx={2.5} fill="rgba(242,237,228,0.22)" />
      <rect x={58} y={68} width={76} height={40} rx={10} fill="rgba(160,148,245,0.26)" />
      <circle cx={74} cy={88} r={8} fill="rgba(242,237,228,0.4)" />
      <Bar x={90} y={82} width={34} height={4} fill="rgba(242,237,228,0.4)" />
      <Bar x={90} y={92} width={24} height={4} fill="rgba(242,237,228,0.25)" />
      {[118, 136].map((y) => (
        <g key={y}>
          <Bar x={58} y={y} width={76} height={5} />
        </g>
      ))}
      <rect x={58} y={158} width={76} height={26} rx={13} fill="rgba(242,237,228,0.9)" />
      <Bar x={78} y={169} width={36} height={4} fill="#1b1b1a" />

      <g className="brand">
        <rect x={188} y={26} width={40} height={18} rx={9} fill="rgba(242,237,228,0.08)" />
        <text x={208} y={39} fill={DIM} fontSize={9} fontWeight={600} textAnchor="middle">
          iOS
        </text>
        <rect x={234} y={26} width={62} height={18} rx={9} fill="rgba(242,237,228,0.08)" />
        <text x={265} y={39} fill={DIM} fontSize={9} fontWeight={600} textAnchor="middle">
          Android
        </text>
      </g>
    </Art>
  );
}

function ServiceSocialVisual() {
  const glow = useId();

  return (
    <Art viewBox={WIDE_BOX} tint="bg-[#1b1826]">
      <defs>
        <radialGradient id={glow} cx="80%" cy="16%" r="80%">
          <stop offset="0%" stopColor="rgba(160,148,245,0.2)" />
          <stop offset="100%" stopColor="rgba(160,148,245,0)" />
        </radialGradient>
      </defs>
      <rect width={320} height={220} fill={`url(#${glow})`} />

      <Label x={26} y={32} size={9}>
        شبکه‌های اجتماعی
      </Label>

      <Panel x={24} y={44} width={172} height={150} radius={14} fill="#242231" />
      <circle cx={46} cy={66} r={11} fill="rgba(160,148,245,0.35)" />
      <Bar x={64} y={60} width={56} height={5} />
      <Bar x={64} y={71} width={36} height={4} />
      <rect x={38} y={88} width={144} height={58} rx={10} fill="rgba(242,237,228,0.06)" />
      <path
        d="M96 126c-14-9-20-15-20-22a9 9 0 0116-5 9 9 0 0116 5c0 7-6 13-20 22z"
        fill="rgba(160,148,245,0.6)"
      />
      <Bar x={38} y={158} width={104} height={5} />
      <Bar x={38} y={172} width={64} height={5} fill="rgba(160,148,245,0.55)" />

      {/* Growth column */}
      {[0.4, 0.62, 0.85].map((value, index) => (
        <rect
          key={index}
          x={216 + index * 28}
          y={168 - value * 70}
          width={18}
          height={value * 70}
          rx={6}
          fill="rgba(160,148,245,0.55)"
        />
      ))}
      <line x1={212} y1={168} x2={296} y2={168} stroke="rgba(242,237,228,0.14)" />

      <g className="brand">
        <rect x={216} y={62} width={62} height={20} rx={10} fill="rgba(160,148,245,0.22)" />
        <text x={247} y={76} fill={ETVA} fontSize={10} fontWeight={700} textAnchor="middle">
          SMMA
        </text>
      </g>
    </Art>
  );
}

function ServiceBrandVisual() {
  return (
    <Art viewBox={WIDE_BOX} tint="bg-[#1a1924]">
      <Label x={26} y={32} size={9}>
        هویت بصری
      </Label>

      <Panel x={24} y={44} width={128} height={128} radius={16} fill="#242232" />
      <circle cx={88} cy={100} r={34} fill="none" stroke="rgba(160,148,245,0.5)" strokeWidth={2} />
      <path d="M88 76l8 18 18 8-18 8-8 18-8-18-18-8 18-8z" fill="rgba(242,237,228,0.9)" />

      {/* Mark variations */}
      {[
        { x: 168, y: 44 },
        { x: 232, y: 44 },
      ].map((tile) => (
        <g key={tile.x}>
          <rect x={tile.x} y={tile.y} width={56} height={56} rx={12} fill="rgba(242,237,228,0.06)" />
          <circle cx={tile.x + 28} cy={tile.y + 28} r={13} fill="none" stroke="rgba(242,237,228,0.35)" strokeWidth={2} />
          <path
            d={`M${tile.x + 28} ${tile.y + 18}l4 8 8 4-8 4-4 8-4-8-8-4 8-4z`}
            fill="rgba(160,148,245,0.75)"
          />
        </g>
      ))}

      {/* Palette */}
      {["#a094f5", "#f2ede4", "#45d2c0", "#d0a35d", "#2b2a29"].map((colour, index) => (
        <rect
          key={colour}
          x={168 + index * 26}
          y={116}
          width={20}
          height={30}
          rx={6}
          fill={colour}
          stroke="rgba(242,237,228,0.1)"
        />
      ))}

      <Bar x={168} y={160} width={124} height={5} />
      <Bar x={168} y={174} width={78} height={5} fill="rgba(160,148,245,0.55)" />
    </Art>
  );
}

function ServiceProductVisual() {
  return (
    <Art viewBox={WIDE_BOX} grid tint="bg-[#181826]">
      <Label x={26} y={32} size={9}>
        از ایده تا محصول
      </Label>

      {/* Wireframe stage */}
      <rect
        x={24}
        y={54}
        width={112}
        height={132}
        rx={12}
        fill="rgba(242,237,228,0.04)"
        stroke="rgba(242,237,228,0.18)"
        strokeDasharray="5 5"
      />
      <rect x={38} y={70} width={84} height={26} rx={6} fill="rgba(242,237,228,0.09)" />
      {[106, 122, 138].map((y) => (
        <Bar key={y} x={38} y={y} width={y === 138 ? 48 : 84} height={5} />
      ))}
      <rect x={38} y={156} width={52} height={16} rx={8} fill="rgba(242,237,228,0.12)" />

      {/* Flow */}
      <g>
        <circle cx={160} cy={120} r={4} fill="rgba(160,148,245,0.8)" />
        <path
          d="M146 120h28M168 113l8 7-8 7"
          fill="none"
          stroke={ETVA}
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Finished product */}
      <Panel x={188} y={54} width={108} height={132} radius={14} fill="#26243a" />
      <rect x={202} y={70} width={80} height={30} rx={8} fill="rgba(160,148,245,0.32)" />
      <Bar x={212} y={82} width={48} height={5} fill="rgba(242,237,228,0.5)" />
      <Bar x={202} y={112} width={80} height={5} />
      <Bar x={202} y={126} width={58} height={5} />
      <rect x={202} y={150} width={80} height={22} rx={11} fill="rgba(242,237,228,0.9)" />
      <Bar x={224} y={159} width={36} height={4} fill="#1b1b1a" />
    </Art>
  );
}

function ServiceStrategyVisual() {
  const line = useId();

  return (
    <Art viewBox={WIDE_BOX} tint="bg-[#191b25]">
      <defs>
        <linearGradient id={line} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(160,148,245,0.3)" />
          <stop offset="100%" stopColor="rgba(160,148,245,0.95)" />
        </linearGradient>
      </defs>

      <Label x={26} y={32} size={9}>
        استراتژی محتوا
      </Label>

      {/* Content calendar */}
      <Panel x={24} y={44} width={140} height={140} radius={14} fill="#242331" />
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((column) => {
          const planned = (row + column) % 3 === 0;
          return (
            <rect
              key={`${row}-${column}`}
              x={38 + column * 28}
              y={60 + row * 30}
              width={20}
              height={20}
              rx={5}
              fill={planned ? "rgba(160,148,245,0.65)" : "rgba(242,237,228,0.1)"}
            />
          );
        }),
      )}

      {/* Growth trend */}
      <polyline
        points="188,166 212,150 236,154 260,124 284,96"
        fill="none"
        stroke={`url(#${line})`}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[
        { cx: 188, cy: 166 },
        { cx: 236, cy: 154 },
        { cx: 284, cy: 96 },
      ].map((dot) => (
        <circle key={dot.cx} cx={dot.cx} cy={dot.cy} r={4} fill={ETVA} />
      ))}
      <line x1={182} y1={182} x2={296} y2={182} stroke="rgba(242,237,228,0.14)" />
      <Bar x={182} y={60} width={70} height={5} />
      <Bar x={182} y={74} width={44} height={5} fill="rgba(160,148,245,0.55)" />
    </Art>
  );
}

/* -------------------------------- Türkçe Kursum ------------------------------ */

function TurkishHeroVisual() {
  const glow = useId();

  return (
    <Art viewBox={HERO_BOX} fit="slice" tint="bg-[#20191a]">
      <defs>
        <radialGradient id={glow} cx="24%" cy="20%" r="82%">
          <stop offset="0%" stopColor="rgba(220,97,81,0.24)" />
          <stop offset="100%" stopColor="rgba(220,97,81,0)" />
        </radialGradient>
      </defs>
      <rect width={260} height={220} fill={`url(#${glow})`} />

      <FlagTurkiye x={182} y={30} w={48} h={32} />

      <text x={30} y={104} fill={INK} fontSize={50} fontWeight={600} className="brand">
        Aa
      </text>
      <text x={118} y={104} fill={TR_RED} fontSize={50} fontWeight={600} opacity={0.85} className="brand">
        Şş
      </text>
      <line x1={30} y1={118} x2={196} y2={118} stroke="rgba(242,237,228,0.12)" />

      <Bubble x={30} y={134} width={122} height={30} text="Merhaba" />
      <Label x={30} y={198} size={9}>
        درس‌های ترکی
      </Label>
    </Art>
  );
}

function TurkishWordVisual({
  word,
  translation,
  progress,
}: {
  word: string;
  translation: string;
  progress: number;
}) {
  return (
    <Art viewBox={WIDE_BOX} tint="bg-[#1f1a19]">
      <Panel x={24} y={30} width={272} height={82} radius={14} fill="#262524" />
      <text x={42} y={80} fill={INK} fontSize={26} fontWeight={600} className="brand">
        {word}
      </text>
      <FlagTurkiye x={248} y={44} w={34} h={22} />

      <Bubble x={24} y={126} width={168} height={32} text={translation} />

      <Bar x={24} y={182} width={272} height={6} />
      <Bar x={24} y={182} width={272 * progress} height={6} fill={TR_RED} />
      <Label x={24} y={208} size={9}>
        پیشرفت درس
      </Label>
    </Art>
  );
}

function TurkishUniVisual() {
  return (
    <Art viewBox={WIDE_BOX} tint="bg-[#1e1a1a]">
      <Label x={26} y={32} size={9}>
        ترکی دانشگاهی
      </Label>

      <Panel x={26} y={44} width={166} height={148} radius={14} fill="#262524" />
      <text x={44} y={84} fill={INK} fontSize={24} fontWeight={600} className="brand">
        Ders
      </text>
      {[102, 120, 138, 156].map((y) => (
        <Bar key={y} x={44} y={y} width={y === 156 ? 68 : 128} height={5} />
      ))}
      <Bar x={44} y={174} width={96} height={5} fill="rgba(220,97,81,0.6)" />

      <g>
        <rect x={206} y={56} width={88} height={62} rx={12} fill="rgba(242,237,228,0.92)" />
        <path d="M222 118l0 10 11-10z" fill="rgba(242,237,228,0.92)" />
        <text x={250} y={82} fill="#1b1b1a" fontSize={11} fontWeight={600} textAnchor="middle">
          دانشگاه
        </text>
        <text x={250} y={102} fill="#4a4741" fontSize={9.5} textAnchor="middle">
          آزمون · ارائه
        </text>
      </g>

      <FlagTurkiye x={244} y={150} w={40} h={26} />
    </Art>
  );
}

function TurkishWorkVisual() {
  return (
    <Art viewBox={WIDE_BOX} tint="bg-[#1f1b18]">
      <Label x={26} y={32} size={9}>
        ترکی کاری
      </Label>

      <Panel x={26} y={44} width={104} height={104} radius={14} fill="#262524" />
      <rect x={26} y={44} width={104} height={26} rx={14} fill="rgba(220,97,81,0.28)" />
      <text x={78} y={63} fill={INK} fontSize={10} fontWeight={700} textAnchor="middle">
        تقویم
      </text>
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((column) => {
          const active = row === 1 && column === 2;
          return (
            <rect
              key={`${row}-${column}`}
              x={38 + column * 21}
              y={80 + row * 20}
              width={15}
              height={15}
              rx={4}
              fill={active ? TR_RED : "rgba(242,237,228,0.14)"}
            />
          );
        }),
      )}

      <text x={148} y={74} fill={INK} fontSize={22} fontWeight={600} className="brand">
        Toplantı
      </text>
      <Bubble x={148} y={92} width={146} height={30} text="ایمیل · ارائه" />

      <Panel x={26} y={160} width={268} height={38} radius={11} fill="#242322" />
      <circle cx={46} cy={179} r={9} fill="rgba(220,97,81,0.24)" />
      <path
        d="M41 179h10M47 175l4 4-4 4"
        stroke={TR_RED}
        strokeWidth={1.8}
        fill="none"
        strokeLinecap="round"
      />
      <Bar x={66} y={176} width={150} height={5} />
    </Art>
  );
}

function TurkishSpeakingVisual() {
  const bars = [0.3, 0.62, 0.44, 0.86, 0.55, 0.95, 0.4, 0.7, 0.5, 0.8, 0.35, 0.6];

  return (
    <Art viewBox={WIDE_BOX} tint="bg-[#201a19]">
      <Label x={26} y={32} size={9}>
        تمرین مکالمه
      </Label>

      <text x={26} y={80} fill={INK} fontSize={28} fontWeight={600} className="brand">
        Konuş
      </text>

      <circle cx={268} cy={64} r={24} fill="rgba(220,97,81,0.18)" />
      <rect x={262} y={50} width={12} height={20} rx={6} fill={TR_RED} />
      <path d="M256 68a12 12 0 0024 0" fill="none" stroke={TR_RED} strokeWidth={2} strokeLinecap="round" />
      <line x1={268} y1={80} x2={268} y2={86} stroke={TR_RED} strokeWidth={2} />

      <Panel x={24} y={106} width={272} height={64} radius={14} fill="#262524" />
      {bars.map((value, index) => (
        <rect
          key={index}
          x={40 + index * 20}
          y={138 - value * 22}
          width={7}
          height={value * 44}
          rx={3.5}
          fill={index % 3 === 0 ? TR_RED : "rgba(242,237,228,0.28)"}
        />
      ))}

      <Label x={24} y={196} size={9}>
        تلفظ · روانی
      </Label>
    </Art>
  );
}

function TurkishPersianVisual() {
  return (
    <Art viewBox={WIDE_BOX} tint="bg-[#1d1b1a]">
      <Label x={26} y={32} size={9}>
        از فارسی به ترکی
      </Label>

      <Panel x={26} y={52} width={112} height={92} radius={14} fill="#262524" />
      <text x={82} y={108} fill={INK} fontSize={22} fontWeight={600} textAnchor="middle">
        فارسی
      </text>

      <path
        d="M152 98h30M174 90l9 8-9 8"
        stroke={TR_RED}
        strokeWidth={2.4}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Panel x={196} y={52} width={98} height={92} radius={14} fill="#2a2422" />
      <text x={245} y={108} fill={INK} fontSize={20} fontWeight={600} textAnchor="middle" className="brand">
        Türkçe
      </text>

      <Panel x={26} y={158} width={268} height={40} radius={11} fill="#242322" />
      <Bar x={42} y={172} width={92} height={5} />
      <Bar x={42} y={184} width={58} height={5} fill="rgba(220,97,81,0.6)" />
      <Bar x={186} y={172} width={92} height={5} />
      <Bar x={186} y={184} width={68} height={5} fill="rgba(242,237,228,0.24)" />
    </Art>
  );
}

/* ------------------------------- Telegram Kanalım --------------------------- */

function TelegramHeroVisual() {
  const glow = useId();
  const plane = useId();

  return (
    <Art viewBox={HERO_BOX} fit="slice" tint="bg-[#15202b]">
      <defs>
        <radialGradient id={glow} cx="70%" cy="20%" r="82%">
          <stop offset="0%" stopColor="rgba(74,168,234,0.26)" />
          <stop offset="100%" stopColor="rgba(74,168,234,0)" />
        </radialGradient>
        <linearGradient id={plane} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7ec8f5" />
          <stop offset="100%" stopColor="#3d94d8" />
        </linearGradient>
      </defs>
      <rect width={260} height={220} fill={`url(#${glow})`} />

      <g opacity={0.95}>
        <path d="M40 96l176-52-30 118-52-30z" fill={`url(#${plane})`} />
        <path d="M134 132l-2 30 20-18z" fill="#2f7fbe" />
        <path d="M40 96l176-52-112 74z" fill="#a5d8f7" opacity={0.75} />
      </g>

      <g>
        <rect x={34} y={158} width={192} height={14} rx={7} fill="rgba(242,237,228,0.14)" />
        <rect x={34} y={178} width={148} height={14} rx={7} fill="rgba(242,237,228,0.1)" />
      </g>

      <rect x={34} y={30} width={78} height={22} rx={11} fill="rgba(74,168,234,0.2)" />
      <text x={73} y={45} fill={TG} fontSize={10} fontWeight={700} textAnchor="middle">
        کانال
      </text>
    </Art>
  );
}

/* ---------------------------------- registry -------------------------------- */

export function ProjectVisual({ visualKey }: { visualKey: VisualKey }) {
  switch (visualKey) {
    case "avatar":
      return <ProfileVisual />;
    case "neotracked-hero":
      return <NeoTrackedHeroVisual />;
    case "neotracked-daily":
      return <NeoTrackedDailyVisual />;
    case "neotracked-countdown":
      return <NeoTrackedCountdownVisual />;
    case "neotracked-language":
      return <NeoTrackedLanguageVisual />;
    case "neotracked-mind":
      return <NeoTrackedMindVisual />;
    case "neotracked-analytics":
      return <NeoTrackedAnalyticsVisual />;
    case "unielitez-hero":
      return <UniEliteZHeroVisual />;
    case "uni-turkiye":
      return <UniTurkiyeVisual />;
    case "uni-europe":
      return <UniEuropeVisual />;
    case "uni-compare":
      return <UniCompareVisual />;
    case "uni-scholarships":
      return <UniScholarshipVisual />;
    case "uni-match":
      return <UniMatchVisual />;
    case "etvavida-hero":
      return <EtvaVidaHeroVisual />;
    case "service-web":
      return <ServiceWebVisual />;
    case "service-mobile":
      return <ServiceMobileVisual />;
    case "service-social":
      return <ServiceSocialVisual />;
    case "service-brand":
      return <ServiceBrandVisual />;
    case "service-product":
      return <ServiceProductVisual />;
    case "service-strategy":
      return <ServiceStrategyVisual />;
    case "turkish-hero":
      return <TurkishHeroVisual />;
    case "turkish-daily":
      return <TurkishWordVisual word="Günaydın" translation="صبح بخیر" progress={0.72} />;
    case "turkish-uni":
      return <TurkishUniVisual />;
    case "turkish-work":
      return <TurkishWorkVisual />;
    case "turkish-speaking":
      return <TurkishSpeakingVisual />;
    case "turkish-persian":
      return <TurkishPersianVisual />;
    case "telegram-hero":
      return <TelegramHeroVisual />;
    default:
      return <ProfileVisual />;
  }
}
