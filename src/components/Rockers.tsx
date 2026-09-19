'use client';

import React from 'react';
import { Plus, Minus, ChevronUp, ChevronDown, Play, Pause, Info } from 'lucide-react';
import { RemoteCommand } from '@/lib/types';

interface RockersProps {
  onCommand: (cmd: RemoteCommand) => void;
}

export const Rockers: React.FC<RockersProps> = ({ onCommand }) => {
  return (
    <div className="rocker-section">
      {/* Volume Rocker */}
      <div className="rocker-pill" title="Volume Suara">
        <button
          type="button"
          className="rocker-half-btn"
          onClick={() => onCommand('VOL_UP')}
          aria-label="Volume Naik"
        >
          <Plus size={20} strokeWidth={2.5} />
          <span style={{ fontSize: '0.65rem', fontWeight: 800 }}>VOL</span>
        </button>
        <div className="rocker-divider" />
        <button
          type="button"
          className="rocker-half-btn"
          onClick={() => onCommand('VOL_DOWN')}
          aria-label="Volume Turun"
        >
          <Minus size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Center Utility Buttons */}
      <div className="rocker-center-group">
        <button
          type="button"
          className="rem-btn btn-center-pill"
          onClick={() => onCommand('PLAY')}
          title="Putar / Jeda Media"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <Play size={12} fill="currentColor" />
            <Pause size={12} fill="currentColor" />
          </div>
          <span style={{ fontSize: '0.7rem' }}>PLAY</span>
        </button>

        <button
          type="button"
          className="rem-btn btn-center-pill"
          onClick={() => onCommand('INFO')}
          title="Info Saluran / Siaran"
        >
          <Info size={14} />
          <span style={{ fontSize: '0.7rem' }}>INFO</span>
        </button>
      </div>

      {/* Channel Rocker */}
      <div className="rocker-pill" title="Pindah Saluran TV">
        <button
          type="button"
          className="rocker-half-btn"
          onClick={() => onCommand('CH_UP')}
          aria-label="Saluran Naik"
        >
          <ChevronUp size={20} strokeWidth={2.5} />
          <span style={{ fontSize: '0.65rem', fontWeight: 800 }}>CH</span>
        </button>
        <div className="rocker-divider" />
        <button
          type="button"
          className="rocker-half-btn"
          onClick={() => onCommand('CH_DOWN')}
          aria-label="Saluran Turun"
        >
          <ChevronDown size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
