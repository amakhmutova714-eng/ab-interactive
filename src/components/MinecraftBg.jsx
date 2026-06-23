const B = 10

const GROUND_COLORS = ['#C2855A', '#8D6E63', '#A1887F', '#C2855A', '#795548']
const LEAF_PALETTES = [
  ['#F7D6E8', '#F48FB1', '#F7D6E8'],
  ['#FBEAF3', '#F7D6E8', '#FBEAF3'],
  ['#F48FB1', '#F7D6E8', '#F48FB1'],
  ['#EDD6F7', '#D6B8EA', '#EDD6F7'],
]

const trees = [
  { tx: 0, leafTop: 2, leafW: 5, leafH: 3, palette: 0 },
  { tx: 6, leafTop: 0, leafW: 6, leafH: 4, palette: 1 },
  { tx: 14, leafTop: 1, leafW: 5, leafH: 3, palette: 2 },
  { tx: 21, leafTop: 3, leafW: 4, leafH: 3, palette: 0 },
  { tx: 27, leafTop: 0, leafW: 6, leafH: 4, palette: 3 },
  { tx: 35, leafTop: 2, leafW: 5, leafH: 3, palette: 1 },
]

const TOTAL_W = 42
const TOTAL_H = 12

export default function MinecraftBg({ className = '' }) {
  return (
    <svg
      viewBox={`0 0 ${TOTAL_W * B} ${TOTAL_H * B}`}
      className={`w-full pixel-art ${className}`}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mcSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#F7D6E8" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      <rect width={TOTAL_W * B} height={TOTAL_H * B} fill="url(#mcSky)" />

      {/* Ground */}
      {Array.from({ length: TOTAL_W }).map((_, i) => (
        <g key={`g-${i}`}>
          <rect
            x={i * B} y={(TOTAL_H - 2) * B}
            width={B} height={B}
            fill="#F48FB1"
            opacity={0.9}
          />
          <rect
            x={i * B} y={(TOTAL_H - 1) * B}
            width={B} height={B}
            fill={GROUND_COLORS[i % GROUND_COLORS.length]}
          />
        </g>
      ))}

      {/* Trees */}
      {trees.map((tree, ti) => {
        const palette = LEAF_PALETTES[tree.palette]
        const trunkX = tree.tx + Math.floor(tree.leafW / 2) - 1
        const trunkTop = tree.leafTop + tree.leafH
        const trunkH = TOTAL_H - 2 - trunkTop

        return (
          <g key={`tree-${ti}`}>
            {/* Leaves */}
            {Array.from({ length: tree.leafH }).map((_, ly) =>
              Array.from({ length: tree.leafW }).map((_, lx) => (
                <rect
                  key={`l-${ti}-${ly}-${lx}`}
                  x={(tree.tx + lx) * B}
                  y={(tree.leafTop + ly) * B}
                  width={B} height={B}
                  fill={palette[(lx + ly) % palette.length]}
                  opacity={ly === 0 ? 0.7 : 0.9}
                />
              ))
            )}
            {/* Trunk */}
            {trunkH > 0 && Array.from({ length: trunkH }).map((_, th) => (
              <rect
                key={`t-${ti}-${th}`}
                x={trunkX * B}
                y={(trunkTop + th) * B}
                width={B * 2} height={B}
                fill="#6D4C41"
              />
            ))}
          </g>
        )
      })}

      {/* Floating blocks */}
      <rect x={4 * B} y={3 * B} width={B} height={B} fill="#F48FB1" opacity={0.5} />
      <rect x={19 * B} y={1 * B} width={B} height={B} fill="#EDD6F7" opacity={0.5} />
      <rect x={32 * B} y={4 * B} width={B} height={B} fill="#F7D6E8" opacity={0.5} />
    </svg>
  )
}
