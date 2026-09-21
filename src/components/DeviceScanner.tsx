'use client';

import React, { useState, useEffect } from 'react';
import {
  Radio,
  Tv,
  Wifi,
  RefreshCw,
  Link,
  Bluetooth,
  Sparkles,
  ShieldCheck,
  Check,
  Sliders,
} from 'lucide-react';
import { DiscoveredDevice, TVDevice } from '@/lib/types';
import { TV_BRANDS } from '@/lib/tvBrands';

function createTvDevice(device: DiscoveredDevice): TVDevice {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 6);
  return {
    id: `tv-${timestamp}-${randomSuffix}`,
    name: device.name,
    brandId: device.brandId,
    ipAddress: device.ipAddress,
    port: device.port,
    protocol: device.protocol,
    createdAt: timestamp,
  };
}

interface DeviceScannerProps {
  onPairDevice: (device: TVDevice) => void;
  onSwitchToManual: () => void;
  existingDeviceIps?: string[];
}

export const DeviceScanner: React.FC<DeviceScannerProps> = ({
  onPairDevice,
  onSwitchToManual,
  existingDeviceIps = [],
}) => {
  const [isScanning, setIsScanning] = useState(true);
  const [scanStepText, setScanStepText] = useState('Memulai pemindai SSDP & siaran Wi-Fi lokal...');
  const [discoveredDevices, setDiscoveredDevices] = useState<DiscoveredDevice[]>([]);
  const [pairingDeviceId, setPairingDeviceId] = useState<string | null>(null);
  const [activeSubnet, setActiveSubnet] = useState('192.168.1');
  const [isCustomSubnetOpen, setIsCustomSubnetOpen] = useState(false);
  const [customSubnetInput, setCustomSubnetInput] = useState('192.168.1');
  const [bluetoothStatus, setBluetoothStatus] = useState<string | null>(null);
  const [scanCount, setScanCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const runScan = async () => {
      try {
        const res = await fetch('/api/tv/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subnet: activeSubnet }),
        });
        const data = await res.json();

        if (isMounted) {
          if (data.subnet) {
            setActiveSubnet(data.subnet);
            setCustomSubnetInput(data.subnet);
          }

          if (data.devices && Array.isArray(data.devices)) {
            setDiscoveredDevices(data.devices);
          }
          setIsScanning(false);
          setScanStepText('Pemindaian selesai.');
        }
      } catch {
        if (isMounted) {
          setIsScanning(false);
          setScanStepText('Gagal menghubungi API scanner.');
        }
      }
    };

    runScan();

    return () => {
      isMounted = false;
    };
  }, [activeSubnet, scanCount]);

  const triggerRescan = (targetSubnet?: string) => {
    setIsScanning(true);
    setScanStepText('Memancarkan siaran SSDP & DIAL multicast (239.255.255.250)...');
    setBluetoothStatus(null);
    if (targetSubnet) {
      setActiveSubnet(targetSubnet);
    }
    setScanCount((prev) => prev + 1);
  };

  const handlePair = async (device: DiscoveredDevice) => {
    setPairingDeviceId(device.id);

    // Uji ping singkat sebelum tautkan
    try {
      await fetch('/api/tv/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip: device.ipAddress, port: device.port }),
      });
    } catch {
      // Abaikan jika no-cors atau error, tetap tautkan
    }

    const newDevice = createTvDevice(device);

    setTimeout(() => {
      setPairingDeviceId(null);
      onPairDevice(newDevice);
    }, 450);
  };

  const handleBluetoothScan = async () => {
    if (typeof navigator === 'undefined' || !('bluetooth' in navigator)) {
      setBluetoothStatus('Browser ini belum mendukung Web Bluetooth API (gunakan Google Chrome di Android/PC).');
      return;
    }

    try {
      setBluetoothStatus('Membuka dialog pencarian Bluetooth terdekat...');
      const nav = navigator as unknown as {
        bluetooth: {
          requestDevice: (options: { acceptAllDevices: boolean }) => Promise<{ id: string; name?: string }>;
        };
      };
      const bleDevice = await nav.bluetooth.requestDevice({ acceptAllDevices: true });
      if (bleDevice) {
        const pairedName = bleDevice.name || 'Bluetooth Smart TV';
        const timestamp = Date.now();
        const newDevice: TVDevice = {
          id: `ble-${bleDevice.id || timestamp}`,
          name: pairedName,
          brandId: 'android-tv',
          ipAddress: 'bluetooth://local',
          port: 0,
          protocol: 'android-tv',
          createdAt: timestamp,
        };
        onPairDevice(newDevice);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Dibatalkan';
      if (!msg.includes('cancelled') && !msg.includes('User cancelled')) {
        setBluetoothStatus(`Bluetooth: ${msg}`);
      } else {
        setBluetoothStatus('Pencarian Bluetooth dibatalkan.');
      }
    }
  };

  const handleApplyCustomSubnet = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = customSubnetInput.trim().replace(/\.$/, '');
    if (clean) {
      setIsCustomSubnetOpen(false);
      triggerRescan(clean);
    }
  };

  return (
    <div className="device-scanner-wrapper">
      {/* Radar Visualizer Card */}
      <div className="scanner-radar-card">
        <div className="radar-screen">
          {/* Concentric rings */}
          <div className="radar-circle radar-circle-1" />
          <div className="radar-circle radar-circle-2" />
          <div className="radar-circle radar-circle-3" />
          <div className="radar-axis-x" />
          <div className="radar-axis-y" />

          {/* Rotating sweep beam */}
          <div className={`radar-sweep-beam ${isScanning ? 'active' : ''}`} />

          {/* Center ping transmitter */}
          <div className="radar-center-emitter">
            <Radio size={18} color="#38bdf8" />
            <div className="radar-ping-ripple" />
          </div>

          {/* Render blips on the radar representing found devices */}
          {discoveredDevices.map((dev, idx) => {
            const angles = [35, 120, 210, 305, 75, 160];
            const distances = [55, 75, 90, 65, 82, 95];
            const angle = angles[idx % angles.length];
            const dist = distances[idx % distances.length];
            const rad = (angle * Math.PI) / 180;
            const top = 50 + (Math.sin(rad) * dist) / 2.5;
            const left = 50 + (Math.cos(rad) * dist) / 2.5;

            const brand = TV_BRANDS.find((b) => b.id === dev.brandId);

            return (
              <div
                key={dev.id}
                className="radar-blip"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  borderColor: brand?.badgeColor || '#38bdf8',
                }}
                title={`${dev.name} (${dev.ipAddress})`}
              >
                <div
                  className="radar-blip-dot"
                  style={{ background: brand?.badgeColor || '#38bdf8' }}
                />
              </div>
            );
          })}
        </div>

        {/* Live scanning HUD banner */}
        <div className="scanner-hud-text">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Sparkles size={16} color={isScanning ? '#38bdf8' : '#10b981'} className={isScanning ? 'spin-slow' : ''} />
            <strong style={{ fontSize: '0.95rem', color: '#ffffff' }}>
              {isScanning ? 'Sedang Memindai TV di Sekitar...' : `Ditemukan ${discoveredDevices.length} Smart TV di Jaringan`}
            </strong>
          </div>
          <p className="scanner-step-subtext">
            {scanStepText}
          </p>

          <div className="scanner-action-pills">
            <span className="subnet-badge">
              <Wifi size={12} color="#38bdf8" />
              <span>Wi-Fi Subnet: <strong>{activeSubnet}.x</strong></span>
            </span>

            <button
              type="button"
              className="scanner-pill-btn"
              onClick={() => triggerRescan()}
              disabled={isScanning}
              title="Pindai Ulang Jaringan"
            >
              <RefreshCw size={12} className={isScanning ? 'spin-anim' : ''} />
              <span>Pindai Ulang</span>
            </button>

            <button
              type="button"
              className="scanner-pill-btn"
              onClick={() => setIsCustomSubnetOpen(!isCustomSubnetOpen)}
              title="Ubah Rentang Subnet IP"
            >
              <Sliders size={12} />
              <span>Ubah Subnet</span>
            </button>

            <button
              type="button"
              className="scanner-pill-btn"
              onClick={handleBluetoothScan}
              title="Pindai Smart TV via Bluetooth"
            >
              <Bluetooth size={12} color="#60a5fa" />
              <span>Bluetooth</span>
            </button>
          </div>

          {/* Subnet Input Drawer */}
          {isCustomSubnetOpen && (
            <form onSubmit={handleApplyCustomSubnet} className="subnet-form-box">
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Masukkan 3 angka pertama IP router Anda (contoh: 192.168.1 atau 192.168.0):
              </span>
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ padding: '6px 10px', fontSize: '0.82rem', flex: 1 }}
                  placeholder="192.168.1"
                  value={customSubnetInput}
                  onChange={(e) => setCustomSubnetInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="rem-btn"
                  style={{ padding: '6px 14px', fontSize: '0.8rem', background: '#0284c7', color: '#ffffff' }}
                >
                  Terapkan & Pindai
                </button>
              </div>
            </form>
          )}

          {bluetoothStatus && (
            <div style={{ fontSize: '0.74rem', color: '#93c5fd', marginTop: '6px' }}>
              {bluetoothStatus}
            </div>
          )}
        </div>
      </div>

      {/* Discovered Devices List */}
      <div className="scanner-list-section">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Tv size={14} color="#38bdf8" />
            <span>PERANGKAT TERDETEKSI ({discoveredDevices.length})</span>
          </span>
          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
            Klik <strong>&ldquo;Tautkan&rdquo;</strong> untuk menghubungkan langsung
          </span>
        </div>

        <div className="scanner-device-grid">
          {discoveredDevices.map((dev) => {
            const brand = TV_BRANDS.find((b) => b.id === dev.brandId);
            const isPairing = pairingDeviceId === dev.id;
            const isAlreadyAdded = existingDeviceIps.includes(dev.ipAddress);

            return (
              <div key={dev.id} className="discovered-device-card">
                <div className="dev-card-left">
                  <div
                    className="dev-brand-badge"
                    style={{
                      backgroundColor: `${brand?.badgeColor || '#38bdf8'}22`,
                      borderColor: brand?.badgeColor || '#38bdf8',
                    }}
                  >
                    <Tv size={20} color={brand?.badgeColor || '#38bdf8'} />
                  </div>

                  <div className="dev-card-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: '0.92rem', color: '#ffffff' }}>
                        {dev.name}
                      </strong>
                      <span
                        className="dev-protocol-tag"
                        style={{
                          background: `${brand?.badgeColor || '#0284c7'}33`,
                          color: '#e2e8f0',
                        }}
                      >
                        {dev.protocol}
                      </span>
                    </div>

                    <div className="dev-meta-line">
                      <span>IP: <strong style={{ color: '#38bdf8' }}>{dev.ipAddress}</strong></span>
                      <span>•</span>
                      <span>Port: {dev.port}</span>
                      <span>•</span>
                      <span style={{ color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                        <ShieldCheck size={11} />
                        <span>{dev.latencyMs || 12}ms</span>
                      </span>
                    </div>

                    {dev.modelInfo && (
                      <div className="dev-model-line">
                        {dev.modelInfo}
                      </div>
                    )}
                  </div>
                </div>

                <div className="dev-card-right">
                  <button
                    type="button"
                    className={`rem-btn pair-action-btn ${isPairing ? 'loading' : ''}`}
                    onClick={() => handlePair(dev)}
                    disabled={isPairing}
                    title="Tautkan remote ke TV ini"
                  >
                    {isPairing ? (
                      <>
                        <RefreshCw size={14} className="spin-anim" />
                        <span>Menautkan...</span>
                      </>
                    ) : isAlreadyAdded ? (
                      <>
                        <Check size={14} />
                        <span>Tautkan Ulang</span>
                      </>
                    ) : (
                      <>
                        <Link size={14} />
                        <span>Tautkan</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Manual Input Fallback Link */}
      <div className="scanner-footer-note">
        <span style={{ color: '#64748b', fontSize: '0.78rem' }}>
          Smart TV Anda tidak muncul di radar?
        </span>
        <button
          type="button"
          onClick={onSwitchToManual}
          style={{
            background: 'none',
            border: 'none',
            color: '#38bdf8',
            fontWeight: 600,
            fontSize: '0.78rem',
            cursor: 'pointer',
            textDecoration: 'underline',
            marginLeft: '6px',
          }}
        >
          ✍️ Gunakan Input IP Manual
        </button>
      </div>
    </div>
  );
};
