import { useInView } from 'react-intersection-observer'

export const useScrollAnimation = (threshold = 0.15, triggerOnce = true) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  })
  return { ref, inView }
}
