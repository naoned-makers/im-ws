import React from 'react';
import Head from './head';

const Body = () => {
  // const styles = {
  //     #energy:active #glow,
  //   #head:active #glow,
  //   #left_arm:active #glow,
  //     #left_hand:active #glow,
  //   #right_arm:active #glow,
  //     #right_hand:active #glow {
  //         fill: '#DAF0F6';
  // 	filter: 'url(#blur-filter)';
  //     }
  //   #energy:active #border,
  //   #head:active #border,
  //   #left_arm:active #border,
  //   #left_hand:active #border,
  //   #right_arm:active #border,
  //   #right_hand:active #border {
  //         fill: '#6ECCDD';
  //     }
  // };
  return (
    <svg version='1.2' baseProfile='tiny' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px'
      y='0px' viewBox='0 0 3061.4 5442.5' overflow='scroll' xmlSpace='preserve' >
      <filter id='blur-filter'>
        <feGaussianBlur in='SourceGraphic' stdDeviation='30' />
      </filter>
      <g id='background'>
        <rect fill='#212121' width='3061.4' height='5442.5' />
      </g>
      <Head />
    </svg>
  )
};

export default Body;