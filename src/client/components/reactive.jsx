import React from 'react';
import { emitMovement } from '../services/socket';

const Reactive = ({actionType, message, ...props}) => {

  const handleMouseDown = () => emitMovement(actionType, message);

  return (
    <g onMouseDown={handleMouseDown}>
      {props.children}
    </g>
  )
};

export default Reactive;