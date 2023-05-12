import React from 'react';

const Card = ({ rank, suit}) => {
  return (
    <div>
      <p>{rank} of {suit}</p>
    </div>
  );
};

export default Card