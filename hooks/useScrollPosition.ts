"use client"

import { useState, useEffect } from "react"

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up")
  const [lastScroll, setLastScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
      
      if (position > lastScroll) {
        setScrollDirection("down")
      } else {
        setScrollDirection("up")
      }
      setLastScroll(position)
    }

    window.addEventListener("scroll", handleScroll)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScroll])

  return { scrollPosition, scrollDirection }
}