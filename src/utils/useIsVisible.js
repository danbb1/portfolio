import { useState, useEffect } from "react"

const useIsVisible = (ref, rootMargin = "0px") => {
  const windowGlobal = typeof window !== "undefined"

  const [isIntersecting, setIsIntersecting] = useState(false)

  let observer

  useEffect(() => {
    if (windowGlobal && ref.current) {
      observer = new IntersectionObserver(
        ([entry]) => setIsIntersecting(entry.isIntersecting),
        { rootMargin }
      )
      observer.observe(ref.current)

      return () => {
        observer.disconnect()
      }
    }
    return null
  }, [])

  return isIntersecting
}

export default useIsVisible
