'use client';

import React from 'react';
import { Wifi, ArrowRight, AlertTriangle, Mouse } from 'lucide-react';

interface QuickConnectBannerProps {
  isSimulation: boolean;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
}

export const QuickConnectBanner: React.FC<QuickConnectBannerProps> = ({
  isSimulation,
  onOpenSettings,
  onOpenHelp,
}) => {
  if (!isSimulation) return null;

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '900px',
        background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.18), rgba(194, 65, 12, 0.12))',
        border: '1px solid rgba(249, 115, 22, 0.35)',
        borderRadius: '16px',
        padding: '12px 16px',
        marginBottom: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: '#ea580c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(234, 88, 12, 0.4)',
          }}
        >
          <AlertTriangle size={20} color="#ffffff" />
        </div>
        <div>
          <strong style={{ fontSize: '0.9rem', color: '#fed7aa', display: 'block' }}>
            TV Fisik Belum Berubah? Anda Sedang dalam Mode Simulasi
          </strong>
          <span style={{ fontSize: '0.78rem', color: '#fdba74' }}>
            Hubungkan ke IP Smart TV Anda di Wi-Fi rumah agar tombol remote langsung mengontrol TV fisik Anda.
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          type="button"
          className="rem-btn"
          onClick={onOpenSettings}
          style={{
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            color: '#ffffff',
            padding: '8px 14px',
            fontSize: '0.8rem',
            fontWeight: 700,
            gap: '6px',
          }}
        >
          <Wifi size={14} />
          <span>Sambungkan ke Smart TV</span>
          <ArrowRight size={14} />
        </button>

        <button
          type="button"
          className="rem-btn"
          onClick={onOpenHelp}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            color: '#cbd5e1',
            padding: '8px 12px',
            fontSize: '0.8rem',
          }}
          title="Panduan jika remote TV rusak"
        >
          <span>Cara Cek IP TV</span>
        </button>
      </div>
    </div>
  );
};
