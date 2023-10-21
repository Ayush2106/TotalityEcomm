import React, { useState } from 'react';
import './homepage.css';

const ImageCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="image-carousel">
      <div className="carousel-container">
        <button className="carousel-button prev" onClick={goToPrevImage}>
        {'<'} 
      </button>
        <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
        <button className="carousel-button next" onClick={goToNextImage}>
        {'>'} 
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
