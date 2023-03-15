import { useEffect, useState } from "react"

const useWidth = () => {
  const [width, setWidth] = useState(() => window.innerWidth)
  function updateWidth() {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener("resize", updateWidth)
    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  }, [])
  return { width }
}

export default useWidth
