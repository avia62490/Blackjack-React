import React from 'react';

const Card = ({ rank, suit}) => {
  return (
    <>
      <p>{rank} of {suit}</p>
    </>
  );
};

export default Card