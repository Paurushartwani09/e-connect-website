import { useInView } from 'react-intersection-observer'

interface ScrollAnimation {
  ref: (node?: Element | null) => void
  inView: boolean
}

export const useScrollAnimation = (
  threshold = 0.15,
  triggerOnce = true
): ScrollAnimation => {
  const { ref, inView } = useInView({ threshold, triggerOnce })
  return { ref, inView }
}
