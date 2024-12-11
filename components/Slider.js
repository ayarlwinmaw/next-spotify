'use client';
import React, { useState, useEffect } from 'react';
import SlideShow from './SlideShow';

const Slider = ({ genres }) => { // Accept genres as a prop
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    async function fetchImageUrls() {
      

      try {
         // Construct query parameters for genres
         const genreQuery = `genre=${genres.map(genre => encodeURIComponent(genre)).join('&')}`;
         
 
         // Fetch data using a relative path
         const response = await fetch(`/api/fetchimages?${genreQuery}`);
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
  }, [genres]); // Fetch data whenever genres change

  return (
    <div>
      <SlideShow imageUrls={imageUrls} />
    </div>
  );
};

export default Slider;
