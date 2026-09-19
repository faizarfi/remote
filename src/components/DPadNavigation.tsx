'use client';

import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Home, CornerDownLeft, Menu } from 'lucide-react';
import { RemoteCommand } from '@/lib/types';

interface DPadNavigationProps {
  onCommand: (cmd: RemoteCommand) => void;
}

export const DPadNavigation: React.FC<DPadNavigationProps> = ({ onCommand }) => {
  return (
    <div>
      {/* D-Pad 5-way Circular Controller */}
      <div className="dpad-container">
        <div className="dpad-outer-ring">
          <button
            type="button"
            className="dpad-directional-btn dpad-up"
            onClick={() => onCommand('UP')}
            aria-label="Navigasi Atas"
            title="Navigasi Atas"
          >
            <ChevronUp size={28} strokeWidth={2.5} />
          </button>

          <button
            type="button"
            className="dpad-directional-btn dpad-down"
            onClick={() => onCommand('DOWN')}
            aria-label="Navigasi Bawah"
            title="Navigasi Bawah"
          >
            <ChevronDown size={28} strokeWidth={2.5} />
          </button>

          <button
            type="button"
            className="dpad-directional-btn dpad-left"
            onClick={() => onCommand('LEFT')}
            aria-label="Navigasi Kiri"
            title="Navigasi Kiri"
          >
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>

          <button
            type="button"
            className="dpad-directional-btn dpad-right"
            onClick={() => onCommand('RIGHT')}
            aria-label="Navigasi Kanan"
            title="Navigasi Kanan"
          >
            <ChevronRight size={28} strokeWidth={2.5} />
          </button>

          <button
            type="button"
            className="dpad-center-ok"
            onClick={() => onCommand('OK')}
            aria-label="Pilih OK"
            title="Pilih / Enter"
          >
            OK
          </button>
        </div>
      </div>

      {/* Auxiliary Navigation: Back, Home, Menu */}
      <div className="aux-nav-row">
        <button
          type="button"
          className="rem-btn btn-round-aux"
          onClick={() => onCommand('BACK')}
          title="Kembali (Back)"
        >
          <CornerDownLeft size={18} />
          <span>BACK</span>
        </button>

        <button
          type="button"
          className="rem-btn btn-round-aux"
          onClick={() => onCommand('HOME')}
          title="Layar Utama (Home)"
        >
          <Home size={18} />
          <span>HOME</span>
        </button>

        <button
          type="button"
          className="rem-btn btn-round-aux"
          onClick={() => onCommand('MENU')}
          title="Menu Pengaturan TV"
        >
          <Menu size={18} />
          <span>MENU</span>
        </button>
      </div>
    </div>
  );
};
