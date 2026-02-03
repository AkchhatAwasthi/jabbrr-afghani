import React, { useState, useEffect } from 'react';

const sliderData = [
  {
    id: 1,
    image: "https://github.com/jabbrrweb/website-images/blob/main/A%20cinematic%20dark-themed%20restaurant%20banner%20for%20a%20brand%20called%20%E2%80%9CJabbrr%20Afghani%E2%80%9D,%20featuring%20authentic%20Afghani%20and%20Mughlai%20cuisine.%20The%20background%20is%20deep%20black%20with%20warm%20golden%20smoke%20and%20glowing%20embers.%20In%20the%20center,.jpg?raw=true"
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentSlideData = sliderData[currentSlide];

  return (
    <section className="relative h-[50dvh] md:h-[60dvh] w-full overflow-hidden bg-hero-bg">
      <div className="absolute inset-0 z-0">
        <img
          src={currentSlideData.image}
          alt={`Slide ${currentSlideData.id}`}
          className="w-full h-full object-cover"
          loading={currentSlide === 0 ? "eager" : "lazy"}
        />
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 flex space-x-3 z-30 justify-center w-full">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1 transition-all duration-500 rounded-full ${index === currentSlide ? 'w-12 bg-primary' : 'w-4 bg-white/30 hover:bg-white/60'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;