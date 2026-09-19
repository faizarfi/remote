'use client';

import React from 'react';
import { Tv, Volume2, VolumeX, Smartphone, MousePointer, Settings, HelpCircle, Eye } from 'lucide-react';
import { TVDevice } from '@/lib/types';

interface HeaderBarProps {
  devices: TVDevice[];
  activeDevice: TVDevice;
  onSelectDevice: (id: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  hapticEnabled: boolean;
  onToggleHaptic: () => void;
  showTvPanel: boolean;
  onToggleTvPanel: () => void;
  onOpenTrackpad: () => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  devices,
  activeDevice,
  onSelectDevice,
  soundEnabled,
  onToggleSound,
  hapticEnabled,
  onToggleHaptic,
  showTvPanel,
  onToggleTvPanel,
  onOpenTrackpad,
  onOpenSettings,
  onOpenHelp,
}) => {
  return (
    <header className="app-header">
      <div className="brand-title-group">
        <div className="logo-badge">
          <Tv size={20} color="#ffffff" />
        </div>
        <div>
          <h1 className="brand-title">UNIVERSAL TV REMOTE</h1>
          <div className="brand-sub">
            <select
              value={activeDevice.id}
              onChange={(e) => onSelectDevice(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#38bdf8',
                fontWeight: 600,
                fontSize: '0.74rem',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {devices.map((d) => (
                <option key={d.id} value={d.id} style={{ background: '#131722', color: '#ffffff' }}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="header-controls">
        {/* Toggle Sound */}
        <button
          type="button"
          className={`header-icon-btn ${soundEnabled ? 'active' : ''}`}
          onClick={onToggleSound}
          title={soundEnabled ? 'Suara Tombol: Aktif' : 'Suara Tombol: Mati'}
          aria-label="Sound Toggle"
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>

        {/* Toggle Haptics */}
        <button
          type="button"
          className={`header-icon-btn ${hapticEnabled ? 'active' : ''}`}
          onClick={onToggleHaptic}
          title={hapticEnabled ? 'Getaran Haptic: Aktif' : 'Getaran Haptic: Mati'}
          aria-label="Haptic Toggle"
        >
          <Smartphone size={16} />
        </button>

        {/* Toggle Virtual TV Panel */}
        <button
          type="button"
          className={`header-icon-btn ${showTvPanel ? 'active' : ''}`}
          onClick={onToggleTvPanel}
          title={showTvPanel ? 'Sembunyikan Layar TV Simulasi' : 'Tampilkan Layar TV Simulasi'}
          aria-label="Toggle Simulator TV"
        >
          <Eye size={16} />
        </button>

        {/* Open Trackpad */}
        <button
          type="button"
          className="header-icon-btn"
          onClick={onOpenTrackpad}
          title="Buka Mouse Trackpad & Keyboard Pintar"
          aria-label="Open Trackpad"
        >
          <MousePointer size={16} />
        </button>

        {/* Open Help */}
        <button
          type="button"
          className="header-icon-btn"
          onClick={onOpenHelp}
          title="Panduan Koneksi & Bantuan"
          aria-label="Help Guide"
        >
          <HelpCircle size={16} />
        </button>

        {/* Open Settings */}
        <button
          type="button"
          className="header-icon-btn"
          onClick={onOpenSettings}
          title="Pengaturan & Tambah TV"
          aria-label="Settings"
        >
          <Settings size={16} />
        </button>
      </div>
    </header>
  );
};
