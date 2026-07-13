const MASCOTS = {
  hero:    '/mascot.PNG',
  about:   '/mascot-pointing.PNG',
  alien:   '/mascot-alien.PNG',
  laptop:  '/mascot-laptop.PNG',
  contact: '/mascot-heart.PNG',
}

/**
 * variant: 'hero' | 'about' | 'alien' | 'laptop' | 'contact'
 * Pass Tailwind height class via className, e.g. className="h-64"
 */
export default function CharacterImage({ variant = 'hero', className = '' }) {
  return (
    <img
      src={MASCOTS[variant]}
      alt="Albina mascot"
      className={`w-auto block select-none pointer-events-none drop-shadow-lg ${className}`}
      style={{ mixBlendMode: 'multiply' }}
      draggable={false}
    />
  )
}
