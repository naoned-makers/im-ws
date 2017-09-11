import React from 'react';
import { emitAction } from '../services/socket';

const Interactive = ({ actionType, message, ...props }) => {

  const handleMouseDown = () => emitAction(actionType, message);

  return (
    <g onMouseDown={handleMouseDown}>
      {props.children}
    </g>
  )
};

export default Interactive;