import React from 'react';
import Interactive from './interactive';
import { LIGHT_TORSO } from '../../common/movementNames';

const Energy = () => (
  <Interactive actionType={LIGHT_TORSO} message='Iron Man lights his energy circle !'>
    <path className='glow fill-light' d='M1530.7,1988.7c-78.3,0-141.7,63.5-141.7,141.7s63.5,141.7,141.7,141.7c78.3,0,141.7-63.5,141.7-141.7S1609,1988.7,1530.7,1988.7z M1530.7,2258c-70.4,0-127.6-57.1-127.6-127.6s57.1-127.6,127.6-127.6c70.4,0,127.6,57.1,127.6,127.6S1601.2,2258,1530.7,2258z' />
    <path className='fill-light' d='M1530.7,1988.7c-78.3,0-141.7,63.5-141.7,141.7s63.5,141.7,141.7,141.7c78.3,0,141.7-63.5,141.7-141.7S1609,1988.7,1530.7,1988.7z M1530.7,2258c-70.4,0-127.6-57.1-127.6-127.6s57.1-127.6,127.6-127.6c70.4,0,127.6,57.1,127.6,127.6S1601.2,2258,1530.7,2258z' />
    <circle className='fill-lighter' cx='1530.7' cy='2130.4' r='127.6' />
  </Interactive>
);

export default Energy;