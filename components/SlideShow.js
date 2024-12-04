// Slideshow.js

import React from 'react';
import Image from 'next/image';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const fadeProperties = {
  duration: 2000, // Duration of the fade animation in milliseconds
  transitionDuration: 200, // Duration of the transition between slides in milliseconds
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
    <div className="slide-container h-full w-full overflow-hidden">
      <Fade {...fadeProperties}>
        {imageUrls.map((imageUrl, index) => (
          <div className="each-fade h-full w-full" key={index}>
            <div className="image-container h-full w-full relative" >
              <Image 
                src={imageUrl} 
                alt={`Slide ${index + 1}`} 
                sizes="100vw"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                width={840}
                height={640}
                loading='lazy'
                />
                {/* <Image 
                  src={imageUrl} 
                  alt={`Slide ${index + 1}`} 
                  // fill
                  height={600}
                  width={800}
                  objectFit="cover" // Ensures the image scales to cover the container
                  objectPosition="center" // Centers the image vertically and horizontally
                  sizes='100vw, 100vh'
                  loading='lazy'
                /> */}
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default Slideshow;
