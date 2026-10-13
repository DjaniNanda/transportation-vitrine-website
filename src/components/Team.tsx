import React, { useState, useEffect, useCallback } from 'react';
import { Users, ChevronLeft, ChevronRight, Sparkles, TrendingUp, Award } from 'lucide-react';
import { siteConfig, StatItem } from '../config/siteConfig';
import './Team.css';

const STAT_ICONS: Record<StatItem['icon'], React.ReactNode> = {
  users: <Users className="stat-icon" />,
  trending: <TrendingUp className="stat-icon" />,
  award: <Award className="stat-icon" />,
  sparkles: <Sparkles className="stat-icon" />,
};

const Team: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [, setProgress] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const { gallery } = siteConfig;
  const teamImages = gallery.images;

  // Auto-play with progress
  useEffect(() => {
    if (!isAutoPlaying) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 0.5;
      });
    }, 30);

    const slideInterval = setInterval(() => {
      setDirection('next');
      setCurrentSlide((prev) => (prev + 1) % teamImages.length);
      setProgress(0);
    }, 6000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, [isAutoPlaying, teamImages.length]);

  const nextSlide = useCallback(() => {
    setDirection('next');
    setCurrentSlide((prev) => (prev + 1) % teamImages.length);
    setProgress(0);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 6000);
  }, [teamImages.length]);

  const prevSlide = useCallback(() => {
    setDirection('prev');
    setCurrentSlide((prev) => (prev - 1 + teamImages.length) % teamImages.length);
    setProgress(0);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 6000);
  }, [teamImages.length]);

  return (
    <section className="team-section">
      <div className="team-container">
        {/* Enhanced Background decorative elements */}
        <div className="team-bg-decoration">
          <div className="team-decoration-circle team-decoration-circle-1"></div>
          <div className="team-decoration-circle team-decoration-circle-2"></div>
          <div className="team-decoration-circle team-decoration-circle-3"></div>
        </div>

        {/* Header */}
        <div className="team-header">
          <div className="team-badge">
            <Users className="team-badge-icon" />
            <span>{gallery.badge}</span>
            <div className="badge-shimmer"></div>
          </div>

          <h2 className="team-title">
            {gallery.title.split('{highlight}').map((part, idx, arr) => (
              <React.Fragment key={idx}>
                {part}
                {idx < arr.length - 1 && (
                  <span className="title-highlight">{gallery.titleHighlight}</span>
                )}
              </React.Fragment>
            ))}
          </h2>

          <p className="team-subtitle">
            {gallery.subtitle}
          </p>
        </div>

        {/* Team Content */}
        <div className="team-content">
          {/* Enhanced Team Image Slider */}
          <div className="team-image-container">
            <div className="team-slider">
              <div className="team-image-wrapper">
                {teamImages.map((image, index) => (
                  <div
                    key={index}
                    className={`team-slide ${index === currentSlide ? 'active' : ''} ${
                      index === currentSlide ? `slide-${direction}` : ''
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="team-image"
                    />
                    <div className="image-gradient-overlay"></div>
                    <div className="team-image-overlay">
                      <h3 className="overlay-title">{image.title}</h3>
                      <p className="overlay-subtitle">{image.subtitle}</p>
                      <div className="overlay-decorator"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Navigation Buttons */}
              <button
                className="slider-btn slider-btn-prev"
                onClick={prevSlide}
                aria-label="Image précédente"
              >
                <ChevronLeft />
                <span className="btn-ripple"></span>
              </button>
              <button
                className="slider-btn slider-btn-next"
                onClick={nextSlide}
                aria-label="Image suivante"
              >
                <ChevronRight />
                <span className="btn-ripple"></span>
              </button>

            </div>
          </div>

          {/* Enhanced Team Info */}
          <div className="team-info">
            {/* Enhanced Stats */}
            <div className="team-stats">
              {gallery.stats.map((stat, idx) => (
                <div className="stat-item" style={{ animationDelay: `${0.1 * (idx + 1)}s` }} key={stat.label}>
                  <div className="stat-icon-wrapper">
                    {STAT_ICONS[stat.icon]}
                  </div>
                  <div className="stat-number">
                    <span className="number-animated">{stat.value}</span>
                  </div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-shine"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
