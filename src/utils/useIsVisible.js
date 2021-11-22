import { useState, useEffect } from "react"

const useIsVisible = (ref, rootMargin = "0px") => {
  const [isIntersecting, setIsIntersecting] = useState(false)

  const observer = new IntersectionObserver(
    ([entry]) => setIsIntersecting(entry.isIntersecting),
    { rootMargin }
  )

  useEffect(() => {
    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return isIntersecting
}

export default useIsVisible
