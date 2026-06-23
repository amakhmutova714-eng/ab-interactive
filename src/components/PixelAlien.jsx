const ALIEN = [
  [0, 0, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 0, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1],
  [0, 0, 0, 1, 0, 1, 0, 0, 0],
]

export default function PixelAlien({ size = 5, color = '#E8448A', className = '' }) {
  const cols = ALIEN[0].length
  const rows = ALIEN.length

  return (
    <svg
      width={cols * size}
      height={rows * size}
      viewBox={`0 0 ${cols * size} ${rows * size}`}
      className={`pixel-art ${className}`}
      aria-hidden="true"
    >
      {ALIEN.flatMap((row, y) =>
        row.map((px, x) =>
          px ? (
            <rect
              key={`${x}-${y}`}
              x={x * size}
              y={y * size}
              width={size}
              height={size}
              fill={color}
            />
          ) : null
        )
      )}
    </svg>
  )
}
