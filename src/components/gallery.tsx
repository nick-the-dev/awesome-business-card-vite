import { useState, useEffect } from 'react'
import { animated, useTransition } from '@react-spring/web'
import { updateBackgroundColor } from '@/helpers/updateBgColor'

const Gallery = ({ images }: { images: Array<string> }) => {
  const slides = images.map((image, index) => ({
    id: index,
    url: image,
  }))

  const [index, setIndex] = useState(0)
  const transitions = useTransition(slides[index], {
    keys: (item) => item.id,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 1000 }, // Using a fixed duration for transition, you can customize it
  })

  useEffect(() => {
    updateBackgroundColor()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((state) => (state + 1) % slides.length)
      updateBackgroundColor()
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return transitions((style, item) => (
    // Try to use cached images first

    <animated.div
      style={{
        ...style,
        backgroundImage: `url(${item.url})`,
      }}
      className="bg"
    />
  ))
}

export default Gallery
