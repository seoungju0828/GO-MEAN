// 쓰레기통 슬라이드

import React, { useState, useEffect } from 'react';
import '../CSS/CircularCarousel.css';

const CircularCarousel = ({ items, interval = 8000 }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
  	const [isTransitioning, setIsTransitioning] = useState(true);

  	const totalItems = items.length;

  	useEffect(() => {
    	const intervalId = setInterval(() => {
      		setCurrentIndex((prevIndex) => prevIndex + 1);
    	}, interval);

    	return () => clearInterval(intervalId);
  	}, [interval]);

  	useEffect(() => {
    	if (currentIndex === totalItems) {
      		const timeoutId = setTimeout(() => {
        		setIsTransitioning(false);
        		setCurrentIndex(0);
      		}, 500);
      		return () => clearTimeout(timeoutId);
    	} else if (currentIndex === 1) {
      		setIsTransitioning(true);
    	}
  	}, [currentIndex, totalItems]);

  	return (
    	<div className="carousel-container">
      		<div
        		className="carousel-wrapper"
        		style={{
          			transform: `translateX(-${currentIndex * 100}%)`,
          			transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
        		}}
      		>
        		{items.map((item, index) => (
          			<div className={`carousel-item slide-${index}`} key={index}>
            			<img src={item} alt={`Item ${index}`} />
          			</div>
        		))}
       			{/* 마지막 슬라이드 다음에 첫 번째 슬라이드 복제 */}
        		<div className={`carousel-item slide-${totalItems}`} key={totalItems}>
          			<img src={items[0]} alt={`Item 0`} />
        		</div>
      		</div>
    	</div>
  	);
};

export default CircularCarousel;
