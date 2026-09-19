'use client';

import React, { useState, useRef } from 'react';
import { X, MousePointer, Keyboard, CornerDownLeft } from 'lucide-react';
import { RemoteCommand } from '@/lib/types';

interface TrackpadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCommand: (cmd: RemoteCommand) => void;
}

export const TrackpadModal: React.FC<TrackpadModalProps> = ({
  isOpen,
  onClose,
  onCommand,
}) => {
  const [dotPos, setDotPos] = useState({ x: 50, y: 50 });
  const [typedText, setTypedText] = useState('');
  const trackpadRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!trackpadRef.current) return;
    const rect = trackpadRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setDotPos({ x, y });
  };

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedText.trim()) return;
    // Dispatched to TV input
    onCommand('OK');
    setTypedText('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MousePointer size={20} color="#38bdf8" />
            <h2 className="modal-title">Trackpad & Keyboard Pintar</h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
          Gunakan area di bawah ini sebagai touchpad mouse virtual untuk Smart TV, atau ketik teks untuk pencarian di TV.
        </div>

        {/* Trackpad Gesture Area */}
        <div
          ref={trackpadRef}
          className="trackpad-area"
          onPointerMove={handlePointerMove}
          onClick={() => onCommand('OK')}
        >
          <div
            className="trackpad-cursor-dot"
            style={{ left: `${dotPos.x}%`, top: `${dotPos.y}%` }}
          />
          <MousePointer size={28} style={{ opacity: 0.3 }} />
          <span style={{ fontSize: '0.8rem' }}>Usap untuk navigasi • Ketuk untuk KLIK (OK)</span>
        </div>

        {/* Keyboard Input for Smart TV */}
        <form onSubmit={handleSendText} className="form-group" style={{ marginTop: '8px' }}>
          <label className="form-label">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Keyboard size={14} />
              <span>Ketik Teks ke TV (Pencarian YouTube / Web)</span>
            </div>
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              className="form-input"
              style={{ flex: 1 }}
              placeholder="Contoh: Film Action, Lagu Pop..."
              value={typedText}
              onChange={(e) => setTypedText(e.target.value)}
            />
            <button
              type="submit"
              className="rem-btn"
              style={{ padding: '0 16px', background: '#2563eb' }}
            >
              <CornerDownLeft size={16} />
              <span style={{ marginLeft: '4px' }}>Kirim</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
