export const luxuryEase = [0.22, 1, 0.36, 1]
export const subtleEase = [0.25, 0.46, 0.45, 0.94]

export const motionTiming = {
  micro: 0.22,
  fast: 0.32,
  base: 0.72,
  reveal: 0.9,
  editorial: 1.2,
  cinematic: 1.55,
}

export const viewportReveal = {
  once: true,
  amount: 0.22,
  margin: '0px 0px -12% 0px',
}

export const reducedMotionVariant = {
  hidden: { opacity: 1, x: 0, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' },
  visible: { opacity: 1, x: 0, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' },
  exit: { opacity: 0 },
}

export const createFadeUp = ({ distance = 40, duration = motionTiming.reveal, delay = 0 } = {}) => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration, ease: luxuryEase },
  },
})

export const fadeUp = createFadeUp()

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: motionTiming.editorial, ease: luxuryEase },
  },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.14,
    },
  },
}

export const heroBackground = {
  hidden: { opacity: 0, scale: 1.045 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: motionTiming.cinematic, ease: subtleEase },
  },
}

export const heroEyebrow = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.2, duration: 0.82, ease: luxuryEase },
  },
}

export const heroHeadline = {
  hidden: { opacity: 0, y: 96 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.42, duration: motionTiming.editorial, ease: luxuryEase },
  },
}

export const heroSubheadline = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.78, duration: 0.96, ease: luxuryEase },
  },
}

export const heroCta = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 1.08, duration: 0.86, ease: luxuryEase },
  },
}

export const heroEntrance = createFadeUp({ distance: 56, duration: motionTiming.editorial })

export const imageReveal = {
  hidden: {
    opacity: 0,
    scale: 1.06,
    clipPath: 'inset(16% 0% 0% 0%)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.15, ease: luxuryEase },
  },
}

export const buttonHover = {
  y: -2,
  scale: 1.018,
  transition: { duration: motionTiming.fast, ease: luxuryEase },
}

export const buttonTap = {
  y: 0,
  scale: 0.985,
  transition: { duration: motionTiming.micro, ease: luxuryEase },
}

export const navEntrance = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: luxuryEase },
  },
}

export const mobileOverlay = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: luxuryEase },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.28, ease: subtleEase },
  },
}

export const mobilePanel = {
  hidden: { opacity: 0, y: 26, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, ease: luxuryEase },
  },
  exit: {
    opacity: 0,
    y: 18,
    scale: 0.99,
    transition: { duration: 0.25, ease: subtleEase },
  },
}

export const mobileNavList = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.09,
    },
  },
}

export const mobileNavItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: luxuryEase },
  },
}
