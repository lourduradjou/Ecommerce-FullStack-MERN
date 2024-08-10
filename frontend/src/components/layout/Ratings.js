import React, { useState } from 'react';

const Ratings = ({ value = 0, max = 5, onChange }) => {
  const [hoverValue, setHoverValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(value);

  const handleClick = (rating) => {
    setCurrentValue(rating);
    if (onChange) onChange(rating);
  };

  const handleMouseOver = (rating) => {
    setHoverValue(rating);
  };

  const handleMouseOut = () => {
    setHoverValue(0);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= max; i++) {
      const isFilled = i <= (hoverValue || currentValue);
      stars.push(
        <svg
          key={i}
          className={`w-6 h-6 cursor-pointer ${isFilled ? 'text-yellow-500' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
          onClick={() => handleClick(i)}
          onMouseOver={() => handleMouseOver(i)}
          onMouseOut={handleMouseOut}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
    return stars;
  };

  return <div className="flex">{renderStars()}</div>;
};

export default Ratings;
