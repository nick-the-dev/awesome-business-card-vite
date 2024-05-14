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

    // Preload the next image
    const preloadNextImage = (currentIndex: number) => {
      const nextSlide = (currentIndex + 1) % images.length;
      loadImage(images[nextSlide]);
    };

    // Set up the interval to change slides every 2 seconds if the next image is loaded
    const changeSlide = () => {
      setCurrentSlide((prevSlide) => {
        const nextSlide = (prevSlide + 1) % images.length;
        if (loadedImages[images[nextSlide]]) {
          preloadNextImage(nextSlide);
          return nextSlide;
        }
        return prevSlide;
      });
    };

    // Preload the next image initially
    preloadNextImage(currentSlide);

    intervalRef.current = setInterval(() => {
      changeSlide();
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
