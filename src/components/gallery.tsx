import { useState, useEffect, useRef } from 'react';

const Gallery = ({ images }: { images: Array<string> }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState<{
    [key: string]: HTMLImageElement;
  }>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Function to load image and update cache
    const loadImage = (url: string) => {
      if (!loadedImages[url]) {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          setLoadedImages((prevLoadedImages) => ({
            ...prevLoadedImages,
            [url]: img,
          }));
        };
      }
    };

    // Preload the first image
    loadImage(images[currentSlide]);

    // Set up the interval to change slides every 2 seconds
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        const nextSlide = (prevSlide + 1) % images.length;
        loadImage(images[nextSlide]);
        return nextSlide;
      });
    }, 2000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalRef.current!);
  }, [images, currentSlide, loadedImages]);

  // Get the current image from the cache
  const currentImage: HTMLImageElement | undefined =
    loadedImages[images[currentSlide]];

  return (
    <div className="gallery">
      {currentImage ? (
        <img src={currentImage.src} alt={`Slide ${currentSlide}`} />
      ) : (
        ''
      )}
    </div>
  );
};

export default Gallery;
