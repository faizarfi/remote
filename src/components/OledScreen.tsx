'use client';

import React from 'react';
import { TVDevice, TVBrand } from '@/lib/types';
import { VirtualTVState } from '@/lib/tvProtocols';
import { Wifi, BatteryMedium, Radio } from 'lucide-react';

interface OledScreenProps {
  device: TVDevice;
  brand: TVBrand;
  tvState: VirtualTVState;
  isTransmitting: boolean;
  statusMessage: string;
}

export const OledScreen: React.FC<OledScreenProps> = ({
  device,
  brand,
  tvState,
  isTransmitting,
  statusMessage,
}) => {
  return (
    <div className="oled-container">
      <div className="oled-header">
        <span className="oled-brand-tag" style={{ color: brand.badgeColor || '#38bdf8' }}>
          <Radio size={12} className={isTransmitting ? 'animate-pulse' : ''} />
          {device.name}
        </span>
        <div className="oled-signal">
          <Wifi size={12} />
          <BatteryMedium size={12} />
        </div>
      </div>

      <div className="oled-body">
        <div className="oled-main-status">
          {!tvState.power
            ? '● STANDBY / OFF'
            : isTransmitting
            ? '>>> TRANSMITTING'
            : tvState.activeApp
            ? `APP: ${tvState.activeApp.toUpperCase()}`
            : `CH ${tvState.channel.toString().padStart(2, '0')}: ${tvState.channelName}`}
        </div>

        <div className="oled-sub-status">
          <span>
            {device.protocol === 'simulation'
              ? 'SIMULATOR MODE'
              : `${device.ipAddress}:${device.port}`}
          </span>
          <span>
            {tvState.power
              ? tvState.muted
                ? 'MUTED'
                : `VOL: ${tvState.volume}%`
              : 'OFF'}
          </span>
        </div>

        {/* Volume Gauge */}
        {tvState.power && (
          <div className="oled-vol-meter" title={`Volume: ${tvState.volume}%`}>
            <div
              className="oled-vol-fill"
              style={{
                width: tvState.muted ? '0%' : `${tvState.volume}%`,
                background: tvState.volume > 80 ? '#f59e0b' : undefined,
              }}
            />
          </div>
        )}

        {statusMessage && (
          <div
            style={{
              fontSize: '0.68rem',
              color: '#94a3b8',
              marginTop: '4px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
};
