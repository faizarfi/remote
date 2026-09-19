'use client';

import React, { useState } from 'react';
import { X, Plus, Trash2, Check, Radio, Tv, Settings2 } from 'lucide-react';
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
  const [newBrandId, setNewBrandId] = useState('samsung');
  const [newIpAddress, setNewIpAddress] = useState('192.168.1.');
  const [newPort, setNewPort] = useState(8002);
  const [newProtocol, setNewProtocol] = useState<ProtocolType>('samsung-tizen');
  const [newWebhookUrl, setNewWebhookUrl] = useState('');

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
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings2 size={20} color="#38bdf8" />
            <h2 className="modal-title">Pengaturan Perangkat TV</h2>
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

        {/* Device List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8' }}>
              DAFTAR TV TERSIMPAN ({devices.length})
            </span>
            {!isAdding && (
              <button
                type="button"
                className="rem-btn"
                style={{ padding: '6px 12px', fontSize: '0.78rem', background: '#2563eb', gap: '4px' }}
                onClick={() => setIsAdding(true)}
              >
                <Plus size={14} />
                <span>Tambah TV Baru</span>
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
                    onClick={() => onSelectDevice(dev.id)}
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
                            borderRadius: '6px',
                            fontWeight: 700,
                          }}
                        >
                          AKTIF
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '3px' }}>
                      {brand?.name} • IP: {dev.ipAddress} • {dev.protocol}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      className="header-icon-btn"
                      onClick={() => onSelectDevice(dev.id)}
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
              marginTop: '12px',
              padding: '16px',
              background: 'rgba(15, 18, 28, 0.9)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: '0.9rem', color: '#38bdf8' }}>
                Konfigurasi TV Baru
              </strong>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
              >
                Batal
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Nama TV / Ruangan</label>
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
              <label className="form-label">Merek TV</label>
              <select
                className="form-select"
                value={newBrandId}
                onChange={(e) => handleBrandChange(e.target.value)}
              >
                {TV_BRANDS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.category})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
              <div className="form-group">
                <label className="form-label">Alamat IP TV (Wi-Fi)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="192.168.1.50"
                  value={newIpAddress}
                  onChange={(e) => setNewIpAddress(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Port</label>
                <input
                  type="number"
                  className="form-input"
                  value={newPort}
                  onChange={(e) => setNewPort(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Protokol Kontrol</label>
              <select
                className="form-select"
                value={newProtocol}
                onChange={(e) => setNewProtocol(e.target.value as ProtocolType)}
              >
                <option value="simulation">Simulasi / Virtual TV</option>
                <option value="roku-ecp">Roku ECP Direct (Port 8060)</option>
                <option value="android-tv">Android TV / Google TV</option>
                <option value="samsung-tizen">Samsung Tizen Smart TV</option>
                <option value="lg-webos">LG webOS WebSocket</option>
                <option value="sony-bravia">Sony Bravia Simple IP</option>
                <option value="esp32-ir">ESP32 / ESP8266 IR Blaster</option>
                <option value="webhook">Home Assistant / REST Webhook</option>
                <option value="audio-ir">Audio Jack 3.5mm IR Dongle (38kHz)</option>
              </select>
            </div>

            {newProtocol === 'webhook' && (
              <div className="form-group">
                <label className="form-label">Webhook URL (Home Assistant / Node-RED)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="http://192.168.1.10:8123/api/webhook/..."
                  value={newWebhookUrl}
                  onChange={(e) => setNewWebhookUrl(e.target.value)}
                />
              </div>
            )}

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
              Simpan & Pasang TV Ini
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
