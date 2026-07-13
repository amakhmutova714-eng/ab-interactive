const MASCOTS = {
  hero:    '/mascot.PNG',
  about:   '/mascot-pointing.PNG',
  alien:   '/mascot-alien.PNG',
  laptop:  '/mascot-laptop.PNG',
  contact: '/mascot-heart.PNG',
}

// multiply hides light/gray PNG backgrounds; dark-bg images use no blend
const BLEND = {
  hero:    'multiply',
  about:   'normal',
  alien:   'multiply',
  laptop:  'multiply',
  contact: 'normal',
}

export default function CharacterImage({ variant = 'hero', className = '' }) {
  return (
    <img
      src={MASCOTS[variant]}
      alt="Albina mascot"
      className={`w-auto block select-none pointer-events-none drop-shadow-lg ${className}`}
      style={{ mixBlendMode: BLEND[variant] }}
      draggable={false}
    />
  )
}
