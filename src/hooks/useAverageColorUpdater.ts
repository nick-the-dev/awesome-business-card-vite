import { useEffect, useState } from 'react'
import html2canvas from 'html2canvas'

const useAverageColorUpdater = () => {
  const [isSignificantChange, setSignificantChange] = useState(false)

  const markChange = () => setSignificantChange(true)

  const calculateAverageColor = (imageData) => {
    const data = imageData.data
    const totalPixels = imageData.width * imageData.height
    let r = 0,
      g = 0,
      b = 0,
      a = 0

    for (let i = 0; i < data.length; i += 4) {
      r += data[i]
      g += data[i + 1]
      b += data[i + 2]
      a += data[i + 3]
    }

    return {
      r: Math.round(r / totalPixels),
      g: Math.round(g / totalPixels),
      b: Math.round(b / totalPixels),
      a: Math.round(a / totalPixels),
    }
  }

  const updateBackgroundColor = () => {
    if (!isSignificantChange) return
    setSignificantChange(false)

    html2canvas(document.body, { scrollY: -window.scrollY })
      .then((canvas) => {
        const ctx = canvas.getContext('2d')
        const stripHeight = 5
        const imageData = ctx.getImageData(0, 0, canvas.width, stripHeight)
        const { r, g, b, a } = calculateAverageColor(imageData)

        const avgColor = `rgba(${r}, ${g}, ${b}, ${a / 255})`
        document.body.style.backgroundColor = avgColor
      })
      .catch((error) => {
        console.error('Failed to capture canvas:', error)
      })
  }

  useEffect(() => {
    const mutationObserver = new MutationObserver(markChange)
    const resizeObserver = new ResizeObserver(markChange)

    mutationObserver.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    })
    resizeObserver.observe(document.documentElement)

    const interval = setInterval(updateBackgroundColor, 200)

    return () => {
      mutationObserver.disconnect()
      resizeObserver.disconnect()
      clearInterval(interval)
    }
  }, [isSignificantChange])

  return updateBackgroundColor
}

export default useAverageColorUpdater
