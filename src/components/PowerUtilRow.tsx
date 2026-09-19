'use client';

import React from 'react';
import { Power, VolumeX, Tv2, Settings } from 'lucide-react';
import { RemoteCommand } from '@/lib/types';

interface PowerUtilRowProps {
  onCommand: (cmd: RemoteCommand) => void;
  onOpenSettings: () => void;
}

export const PowerUtilRow: React.FC<PowerUtilRowProps> = ({
  onCommand,
  onOpenSettings,
}) => {
  return (
    <div className="power-util-row">
      <button
        type="button"
        className="rem-btn btn-power"
        onClick={() => onCommand('POWER')}
        title="Tombol Power ON / OFF"
        aria-label="Power"
      >
        <Power size={24} />
      </button>

      <button
        type="button"
        className="rem-btn btn-util"
        onClick={() => onCommand('INPUT')}
        title="Pilih Sumber Input (HDMI / AV / TV)"
      >
        <Tv2 size={16} />
        <span>INPUT</span>
      </button>

      <button
        type="button"
        className="rem-btn btn-util"
        onClick={() => onCommand('MUTE')}
        title="Matikan Suara (Mute)"
      >
        <VolumeX size={16} />
        <span>MUTE</span>
      </button>

      <button
        type="button"
        className="rem-btn btn-util"
        onClick={onOpenSettings}
        title="Buka Pengaturan Remote & IP"
        aria-label="Settings"
      >
        <Settings size={18} />
      </button>
    </div>
  );
};
