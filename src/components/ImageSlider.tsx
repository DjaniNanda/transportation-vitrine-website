import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { siteConfig } from "../config/siteConfig";
import "./ImageSlider.css";

const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const progressRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const images = siteConfig.about.slider;

  const totalImages = images.length;

  // Progress bar animation - 2 seconds
  useEffect(() => {
    if (isPlaying && !isTransitioning) {
      setProgress(0);
      let startTime = Date.now();
      
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = (elapsed / 2000) * 100;
        
        if (newProgress >= 100) {
          setProgress(100);
          handleNext();
        } else {
          setProgress(newProgress);
          progressRef.current = setTimeout(updateProgress, 50);
        }
      };
      
      progressRef.current = setTimeout(updateProgress, 50);
    }

    return () => {
      if (progressRef.current) {
        clearTimeout(progressRef.current);
      }
    };
  }, [currentIndex, isPlaying, isTransitioning]);

  const handleNext = () => {
    if (isTransitioning) return;
    setDirection('forward');
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % totalImages);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  const handlePrevious = () => {
    if (isTransitioning) return;
    setDirection('backward');
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  const handleDotClick = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    
    setDirection(index > currentIndex ? 'forward' : 'backward');
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentImage = images[currentIndex];

  return (
    <div className="slider-wrapper">
      <div className="slider-container">
        {/* Left Navigation Button */}
        <button
          onClick={handlePrevious}
          disabled={isTransitioning}
          className={`nav-button nav-button-left ${isTransitioning ? 'disabled' : ''}`}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Main Slider */}
        <div className="modern-slider">
          {/* Background Images Stack */}
          <div className="slider-background">
            {images.map((image, index) => (
              <div
                key={index}
                className={`slide ${
                  index === currentIndex ? 'active' : ''
                } ${
                  isTransitioning 
                    ? direction === 'forward' 
                      ? 'transitioning-forward' 
                      : 'transitioning-backward'
                    : ''
                }`}
                data-index={index}
                data-current={currentIndex}
              >
                <img
                  src={image.image}
                  alt={image.alt}
                  className={`slide-image ${
                    isTransitioning && index === currentIndex ? 'zooming' : ''
                  }`}
                />
                
                {/* Gradient Overlay */}
                <div className={`slide-overlay ${
                  index === currentIndex ? 'active' : ''
                }`} />
              </div>
            ))}
          </div>

          {/* Content Overlay */}
          <div className={`content-overlay ${isTransitioning ? 'transitioning' : ''}`}>
            
            <h1 className={`slide-title ${isTransitioning ? 'transitioning' : ''}`}>
              {currentImage.title}
            </h1>
            
            <p className={`slide-description ${isTransitioning ? 'transitioning' : ''}`}>
              {currentImage.description}
            </p>
          </div>

          {/* Top Controls */}
          <div className="top-controls">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="play-pause-button"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            {/* Progress Bar */}
            <div className="progress-container">
              <div 
                className="progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Bottom Indicators */}
          <div className="bottom-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                disabled={isTransitioning}
                className={`indicator ${
                  index === currentIndex ? 'active' : ''
                } ${
                  isTransitioning && index !== currentIndex ? 'disabled' : ''
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Navigation Button */}
        <button
          onClick={handleNext}
          disabled={isTransitioning}
          className={`nav-button nav-button-right ${isTransitioning ? 'disabled' : ''}`}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;