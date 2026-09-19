'use client';

import React from 'react';
import { TVDevice, TVBrand, RemoteCommand } from '@/lib/types';
import { VirtualTVState } from '@/lib/tvProtocols';
import { IrEmitterLed } from './IrEmitterLed';
import { OledScreen } from './OledScreen';
import { PowerUtilRow } from './PowerUtilRow';
import { DPadNavigation } from './DPadNavigation';
import { Rockers } from './Rockers';
import { QuickAppButtons } from './QuickAppButtons';
import { NumpadDrawer } from './NumpadDrawer';

interface RemoteBodyProps {
  device: TVDevice;
  brand: TVBrand;
  tvState: VirtualTVState;
  isTransmitting: boolean;
  statusMessage: string;
  onCommand: (cmd: RemoteCommand) => void;
  onOpenSettings: () => void;
}

export const RemoteBody: React.FC<RemoteBodyProps> = ({
  device,
  brand,
  tvState,
  isTransmitting,
  statusMessage,
  onCommand,
  onOpenSettings,
}) => {
  return (
    <div className="remote-casing">
      {/* Top Infra-Red Diode Emitter */}
      <IrEmitterLed isTransmitting={isTransmitting} />

      {/* OLED Status Screen */}
      <OledScreen
        device={device}
        brand={brand}
        tvState={tvState}
        isTransmitting={isTransmitting}
        statusMessage={statusMessage}
      />

      {/* Power, Input, Mute, Settings Row */}
      <PowerUtilRow onCommand={onCommand} onOpenSettings={onOpenSettings} />

      {/* 5-Way Circular D-Pad Controller */}
      <DPadNavigation onCommand={onCommand} />

      {/* Volume & Channel Rockers + Center Buttons */}
      <Rockers onCommand={onCommand} />

      {/* Streaming App Shortcuts */}
      <QuickAppButtons onCommand={onCommand} />

      {/* Numpad Drawer & 4 Color Teletext Buttons */}
      <NumpadDrawer onCommand={onCommand} />
    </div>
  );
};
