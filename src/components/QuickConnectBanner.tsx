'use client';

import React from 'react';
import { ArrowRight, Radio, Sparkles } from 'lucide-react';

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
        background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.18), rgba(37, 99, 235, 0.12))',
        border: '1.5px solid rgba(56, 189, 248, 0.35)',
        borderRadius: '18px',
        padding: '12px 18px',
        marginBottom: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '280px' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0284c7, #2563eb)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 14px rgba(2, 132, 199, 0.5)',
          }}
        >
          <Radio size={22} color="#ffffff" className="spin-slow" />
        </div>
        <div>
          <strong style={{ fontSize: '0.92rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Smart TV Fisik Belum Ditautkan</span>
            <Sparkles size={14} color="#38bdf8" />
          </strong>
          <span style={{ fontSize: '0.78rem', color: '#bae6fd', display: 'block', marginTop: '2px' }}>
            Saat ini dalam mode simulasi. Gunakan <strong>Radar Pemindai</strong> untuk mendeteksi Smart TV di sekitar dan tautkan langsung!
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          type="button"
          className="rem-btn"
          onClick={onOpenSettings}
          style={{
            background: 'linear-gradient(135deg, #0284c7, #2563eb)',
            color: '#ffffff',
            padding: '9px 16px',
            fontSize: '0.82rem',
            fontWeight: 700,
            gap: '6px',
            boxShadow: '0 4px 16px rgba(2, 132, 199, 0.4)',
          }}
        >
          <Radio size={15} />
          <span>Pindai & Tautkan TV</span>
          <ArrowRight size={14} />
        </button>

        <button
          type="button"
          className="rem-btn"
          onClick={onOpenHelp}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            color: '#cbd5e1',
            padding: '9px 12px',
            fontSize: '0.8rem',
          }}
          title="Panduan jika remote TV rusak"
        >
          <span>Bantuan</span>
        </button>
      </div>
    </div>
  );
};
