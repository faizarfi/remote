'use client';

import React from 'react';

interface IrEmitterLedProps {
  isTransmitting: boolean;
}

export const IrEmitterLed: React.FC<IrEmitterLedProps> = ({ isTransmitting }) => {
  return (
    <div className="emitter-cap" title="Pemancar Sinyal Infra-Red / Network">
      <div className={`ir-led ${isTransmitting ? 'transmitting' : ''}`} />
    </div>
  );
};
