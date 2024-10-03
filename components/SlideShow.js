// Slideshow.js

import React from 'react';
import Image from 'next/image';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const fadeProperties = {
  duration: 300, // Duration of the fade animation in milliseconds
  transitionDuration: 100, // Duration of the transition between slides in milliseconds
  infinite: true, // Whether the slideshow should loop infinitely
  indicators: false, // Whether to show slide indicators
  arrows:false, // Whether to show arrow navigation
};

const Slideshow = ({ imageUrls }) => {
  const slideImages = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1444525873963-75d329ef9e1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
  ];
  return (
    <div className="slide-container">
      <Fade {...fadeProperties}>
        {imageUrls.map((imageUrl, index) => (
          <div className="each-fade" key={index}>
            <div className="image-container" >
              <Image 
                src={imageUrl} 
                alt={`Slide ${index + 1}`} 
                sizes="100vw"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                width={640}
                height={640}
                />
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default Slideshow;
