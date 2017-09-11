import React from 'react';
import Head from './head';
import Torso from './torso';
import Energy from './energy';
import LeftArm from './left.arm';
import LeftHand from './left.hand';
import RightArm from './right.arm';
import RightHand from './right.hand';
import Legs from './legs';

const Body = () => (
  <svg version='1.2' baseProfile='tiny' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px'
    y='0px' viewBox='0 0 3061.4 5442.5' overflow='scroll' xmlSpace='preserve' >
    <filter id='blur-filter'>
      <feGaussianBlur in='SourceGraphic' stdDeviation='30' />
    </filter>
    <g id='background'>
      <rect className='fill-dark' width='3061.4' height='5442.5' />
    </g>
    <Head />
    <Torso />
    <Energy />
    <LeftArm />
    <LeftHand />
    <RightArm />
    <RightHand />
    <Legs />
  </svg>
);

export default Body;