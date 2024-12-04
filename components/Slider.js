// components/YourComponent.js
'use client'
import React, { useState, useEffect } from 'react';
import SlideShow from './SlideShow';

const Slider = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchImageUrls() {
      try {
        const response = await fetch('http://localhost:3000/api/fetchimages');
        if (!response.ok) {
          throw new Error('Failed to fetch image URLs');
        }
        const data = await response.json();
        setImageUrls(data.imageUrls);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
      }
    }

    fetchImageUrls();
  }, []); // Empty dependency array to ensure useEffect runs only once when the component mounts

  return (
    <div>
      <SlideShow imageUrls={imageUrls} />
    </div>
  );
};

export default Slider;
