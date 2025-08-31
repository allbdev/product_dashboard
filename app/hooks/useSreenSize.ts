import { useEffect, useState } from 'react'

export const useScreenSize = () => {
  const [isWide, setIsWide] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth > 768)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { isWide }
}
