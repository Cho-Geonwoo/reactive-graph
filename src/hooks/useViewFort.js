import { useState, useEffect } from 'react';

const useViewFort = () => {
  const [width, setWidth] = useState(window.innerWidth);
  // Add a second state variable "height" and default it to the current window height
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    let timer = null;
    const handleWindowResize = () => {
      if (!timer) {
        setWidth(window.innerWidth);
        // Set the height in state as well as the width
        setHeight(window.innerHeight);
        timer = setTimeout(() => {
          timer = null;
        }, 100);
      }
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [setWidth, setHeight]);

  // Return both the height and width
  return { width, height };
};

export default useViewFort;
