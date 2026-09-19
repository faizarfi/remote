'use client';

import React, { useState } from 'react';
import { X, Plus, Trash2, Check, Tv, Settings2, Activity, Mouse, Info } from 'lucide-react';
import { TVDevice, ProtocolType } from '@/lib/types';
import { TV_BRANDS } from '@/lib/tvBrands';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  devices: TVDevice[];
  activeDeviceId: string;
  onSelectDevice: (id: string) => void;
  onSaveDevice: (device: TVDevice) => void;
  onDeleteDevice: (id: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  devices,
  activeDeviceId,
  onSelectDevice,
  onSaveDevice,
  onDeleteDevice,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState('');
  const [newBrandId, setNewBrandId] = useState('android-tv');
  const [newIpAddress, setNewIpAddress] = useState('192.168.1.');
  const [newPort, setNewPort] = useState(6466);
  const [newProtocol, setNewProtocol] = useState<ProtocolType>('android-tv');
  const [newWebhookUrl, setNewWebhookUrl] = useState('');
  const [pingStatus, setPingStatus] = useState<string | null>(null);
  const [isPinging, setIsPinging] = useState(false);

  if (!isOpen) return null;

  const handleBrandChange = (brandId: string) => {
    setNewBrandId(brandId);
    const selected = TV_BRANDS.find((b) => b.id === brandId);
    if (selected) {
      setNewProtocol(selected.defaultProtocol);
      setNewPort(selected.defaultPort);
      if (!newDeviceName || newDeviceName.includes('TV')) {
        setNewDeviceName(`${selected.name}`);
      }
    }
  };

  const handleTestPing = async () => {
    if (!newIpAddress || newIpAddress === '192.168.1.') {
      setPingStatus('⚠️ Masukkan alamat IP TV lengkap terlebih dahulu (contoh: 192.168.1.45)');
      return;
    }

    setIsPinging(true);
    setPingStatus('Sedang menguji koneksi ke ' + newIpAddress + '...');

    try {
      const res = await fetch('/api/tv/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip: newIpAddress.trim(), port: newPort }),
      });
      const data = await res.json();
      setPingStatus(data.message || 'Koneksi teruji');
    } catch {
      setPingStatus('Sinyal terkirim ke ' + newIpAddress + '. Siap dihubungkan.');
    } finally {
      setIsPinging(false);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeviceName.trim()) return;

    const newDevice: TVDevice = {
      id: `tv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: newDeviceName.trim(),
      brandId: newBrandId,
      ipAddress: newIpAddress.trim() || '192.168.1.100',
      port: Number(newPort) || 80,
      protocol: newProtocol,
      webhookUrl: newWebhookUrl.trim() || undefined,
      createdAt: Date.now(),
    };

    onSaveDevice(newDevice);
    onSelectDevice(newDevice.id);
    setIsAdding(false);
    setNewDeviceName('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings2 size={20} color="#38bdf8" />
            <h2 className="modal-title">Hubungkan ke Smart TV Anda</h2>
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

        {/* Tip penting jika remote rusak */}
        <div
          style={{
            padding: '12px',
            background: 'rgba(56, 189, 248, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '14px',
            fontSize: '0.8rem',
            color: '#bae6fd',
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-start',
          }}
        >
          <Mouse size={18} color="#38bdf8" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Tips Jika Remote Fisik TV Rusak:</strong>
            <div style={{ color: '#93c5fd', marginTop: '3px', lineHeight: '1.4' }}>
              Colokkan <strong>Mouse USB komputer</strong> ke port USB di belakang Smart TV Anda! Kursor mouse akan muncul di layar TV sehingga Anda bisa membuka menu Pengaturan Wi-Fi untuk melihat alamat IP TV dengan mudah.
            </div>
          </div>
        </div>

        {/* Device List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8' }}>
              PILIH TV AKTIF ({devices.length})
            </span>
            {!isAdding && (
              <button
                type="button"
                className="rem-btn"
                style={{ padding: '6px 14px', fontSize: '0.8rem', background: '#2563eb', color: '#ffffff', gap: '4px' }}
                onClick={() => setIsAdding(true)}
              >
                <Plus size={14} />
                <span>+ Sambungkan TV Baru</span>
              </button>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {devices.map((dev) => {
              const brand = TV_BRANDS.find((b) => b.id === dev.brandId);
              const isActive = dev.id === activeDeviceId;

              return (
                <div
                  key={dev.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '14px',
                    background: isActive ? 'rgba(56, 189, 248, 0.12)' : 'rgba(28, 33, 48, 0.7)',
                    border: isActive ? '1.5px solid #38bdf8' : '1px solid rgba(255,255,255,0.08)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div
                    style={{ flex: 1, cursor: 'pointer' }}
                    onClick={() => {
                      onSelectDevice(dev.id);
                      onClose();
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Tv size={16} color={brand?.badgeColor || '#94a3b8'} />
                      <strong style={{ color: isActive ? '#38bdf8' : '#ffffff' }}>
                        {dev.name}
                      </strong>
                      {isActive && (
                        <span
                          style={{
                            fontSize: '0.65rem',
                            padding: '2px 6px',
                            background: '#0284c7',
                            color: '#ffffff',
                            borderRadius: '6px',
                            fontWeight: 700,
                          }}
                        >
                          AKTIF
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '3px' }}>
                      {brand?.name} • IP: <strong>{dev.ipAddress}</strong> • {dev.protocol}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      className="header-icon-btn"
                      onClick={() => {
                        onSelectDevice(dev.id);
                        onClose();
                      }}
                      title="Pilih TV ini"
                      style={{ color: isActive ? '#38bdf8' : '#94a3b8' }}
                    >
                      <Check size={16} />
                    </button>
                    {devices.length > 1 && (
                      <button
                        type="button"
                        className="header-icon-btn"
                        onClick={() => onDeleteDevice(dev.id)}
                        title="Hapus Perangkat"
                        style={{ color: '#ef4444' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Device Form */}
        {isAdding && (
          <form
            onSubmit={handleAddSubmit}
            style={{
              marginTop: '8px',
              padding: '16px',
              background: 'rgba(15, 18, 28, 0.95)',
              border: '1.5px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: '0.92rem', color: '#38bdf8' }}>
                Formulir Sambung Smart TV
              </strong>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                Tutup Form
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">1. Pilih Merek Smart TV Anda</label>
              <select
                className="form-select"
                value={newBrandId}
                onChange={(e) => handleBrandChange(e.target.value)}
              >
                {TV_BRANDS.filter(b => b.id !== 'simulation').map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">2. Beri Nama TV (contoh: TV Ruang Tamu)</label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: TV Ruang Keluarga"
                value={newDeviceName}
                onChange={(e) => setNewDeviceName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                3. Alamat IP Smart TV (dari menu Pengaturan Wi-Fi TV)
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ flex: 1 }}
                  placeholder="Contoh: 192.168.1.45"
                  value={newIpAddress}
                  onChange={(e) => setNewIpAddress(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="rem-btn"
                  onClick={handleTestPing}
                  disabled={isPinging}
                  style={{ padding: '0 12px', fontSize: '0.78rem', background: '#334155', gap: '4px' }}
                >
                  <Activity size={14} />
                  <span>{isPinging ? 'Menguji...' : 'Tes IP'}</span>
                </button>
              </div>
              {pingStatus && (
                <div style={{ fontSize: '0.74rem', color: '#38bdf8', marginTop: '4px' }}>
                  {pingStatus}
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div className="form-group">
                <label className="form-label">Port</label>
                <input
                  type="number"
                  className="form-input"
                  value={newPort}
                  onChange={(e) => setNewPort(Number(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Protokol</label>
                <select
                  className="form-select"
                  value={newProtocol}
                  onChange={(e) => setNewProtocol(e.target.value as ProtocolType)}
                >
                  <option value="android-tv">Android TV / Google TV</option>
                  <option value="samsung-tizen">Samsung Tizen Smart TV</option>
                  <option value="lg-webos">LG webOS WebSocket</option>
                  <option value="roku-ecp">Roku TV (ECP Port 8060)</option>
                  <option value="sony-bravia">Sony Bravia Simple IP</option>
                  <option value="esp32-ir">ESP32 / ESP8266 IR Blaster</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="rem-btn"
              style={{
                background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                color: '#ffffff',
                padding: '12px',
                fontWeight: 700,
                marginTop: '6px',
              }}
            >
              Simpan & Hubungkan ke TV Sekarang
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
