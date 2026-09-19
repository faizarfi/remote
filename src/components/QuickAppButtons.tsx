'use client';

import React from 'react';
import { RemoteCommand } from '@/lib/types';

interface QuickAppButtonsProps {
  onCommand: (cmd: RemoteCommand) => void;
}

export const QuickAppButtons: React.FC<QuickAppButtonsProps> = ({ onCommand }) => {
  return (
    <div className="app-shortcuts-grid">
      <button
        type="button"
        className="rem-btn btn-app netflix"
        onClick={() => onCommand('APP_NETFLIX')}
        title="Buka Netflix"
      >
        NETFLIX
      </button>

      <button
        type="button"
        className="rem-btn btn-app youtube"
        onClick={() => onCommand('APP_YOUTUBE')}
        title="Buka YouTube"
      >
        YouTube
      </button>

      <button
        type="button"
        className="rem-btn btn-app prime"
        onClick={() => onCommand('APP_PRIME')}
        title="Buka Prime Video"
      >
        prime
      </button>

      <button
        type="button"
        className="rem-btn btn-app disney"
        onClick={() => onCommand('APP_DISNEY')}
        title="Buka Disney+ Hotstar"
      >
        Disney+
      </button>

      <button
        type="button"
        className="rem-btn btn-app vidio"
        onClick={() => onCommand('APP_VIDIO')}
        title="Buka Vidio"
      >
        vidio
      </button>

      <button
        type="button"
        className="rem-btn btn-app spotify"
        onClick={() => onCommand('APP_SPOTIFY')}
        title="Buka Spotify"
      >
        Spotify
      </button>
    </div>
  );
};
