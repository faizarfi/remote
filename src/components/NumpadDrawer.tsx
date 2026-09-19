'use client';

import React, { useState } from 'react';
import { Hash, X, CornerUpLeft } from 'lucide-react';
import { RemoteCommand } from '@/lib/types';

interface NumpadDrawerProps {
  onCommand: (cmd: RemoteCommand) => void;
}

export const NumpadDrawer: React.FC<NumpadDrawerProps> = ({ onCommand }) => {
  const [isOpen, setIsOpen] = useState(false);

  const numKeys: { label: string; cmd: RemoteCommand }[] = [
    { label: '1', cmd: 'NUM_1' },
    { label: '2', cmd: 'NUM_2' },
    { label: '3', cmd: 'NUM_3' },
    { label: '4', cmd: 'NUM_4' },
    { label: '5', cmd: 'NUM_5' },
    { label: '6', cmd: 'NUM_6' },
    { label: '7', cmd: 'NUM_7' },
    { label: '8', cmd: 'NUM_8' },
    { label: '9', cmd: 'NUM_9' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* Toggle Button & Color Keys */}
      <div className="toggle-drawer-row">
        <button
          type="button"
          className={`rem-btn btn-drawer-pill ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          title="Buka / Tutup Tombol Angka (0-9)"
        >
          <Hash size={14} />
          <span>{isOpen ? 'TUTUP NUMPAD' : 'ANGKA (0-9)'}</span>
        </button>
      </div>

      {/* 4 Color Buttons */}
      <div className="color-keys-row">
        <button
          type="button"
          className="btn-color-key red"
          onClick={() => onCommand('COLOR_RED')}
          title="Tombol Merah"
        />
        <button
          type="button"
          className="btn-color-key green"
          onClick={() => onCommand('COLOR_GREEN')}
          title="Tombol Hijau"
        />
        <button
          type="button"
          className="btn-color-key yellow"
          onClick={() => onCommand('COLOR_YELLOW')}
          title="Tombol Kuning"
        />
        <button
          type="button"
          className="btn-color-key blue"
          onClick={() => onCommand('COLOR_BLUE')}
          title="Tombol Biru"
        />
      </div>

      {/* Sliding Numpad */}
      {isOpen && (
        <div className="numpad-drawer">
          {numKeys.map((k) => (
            <button
              key={k.label}
              type="button"
              className="rem-btn btn-num"
              onClick={() => onCommand(k.cmd)}
            >
              {k.label}
            </button>
          ))}

          <button
            type="button"
            className="rem-btn btn-num"
            onClick={() => onCommand('EXIT')}
            title="Keluar (Exit)"
          >
            <X size={16} />
          </button>

          <button
            type="button"
            className="rem-btn btn-num"
            onClick={() => onCommand('NUM_0')}
          >
            0
          </button>

          <button
            type="button"
            className="rem-btn btn-num"
            onClick={() => onCommand('BACK')}
            title="Kembali"
          >
            <CornerUpLeft size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
