'use client';

import React, { useState, useEffect } from 'react';
import { RemoteCommand, TVDevice, CommandLog, AppSettings } from '@/lib/types';
import { TV_BRANDS, DEFAULT_DEVICE } from '@/lib/tvBrands';
import {
  sendRemoteCommand,
  virtualTVState,
  VirtualTVState,
  transmitAudioIR,
} from '@/lib/tvProtocols';
import { playAudioFeedback } from '@/lib/audioFeedback';
import { triggerHapticFeedback } from '@/lib/hapticFeedback';
import {
  getStoredDevices,
  saveStoredDevices,
  getStoredSettings,
  saveStoredSettings,
} from '@/lib/storage';

import { HeaderBar } from '@/components/HeaderBar';
import { QuickConnectBanner } from '@/components/QuickConnectBanner';
import { RemoteBody } from '@/components/RemoteBody';
import { VirtualTvPanel } from '@/components/VirtualTvPanel';
import { SettingsModal } from '@/components/SettingsModal';
import { HelpGuideModal } from '@/components/HelpGuideModal';
import { TrackpadModal } from '@/components/TrackpadModal';

export default function RemotePage() {
  const [devices, setDevices] = useState<TVDevice[]>([DEFAULT_DEVICE]);
  const [activeDeviceId, setActiveDeviceId] = useState<string>(DEFAULT_DEVICE.id);
  const [settings, setSettings] = useState<AppSettings>({
    soundEnabled: true,
    hapticEnabled: true,
    activeDeviceId: DEFAULT_DEVICE.id,
    keepScreenAwake: false,
    theme: 'dark-obsidian',
  });

  const [tvState, setTvState] = useState<VirtualTVState>({ ...virtualTVState });
  const [logs, setLogs] = useState<CommandLog[]>([]);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Modals & Panels
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isTrackpadOpen, setIsTrackpadOpen] = useState(false);
  const [showTvPanel, setShowTvPanel] = useState(true);

  // Inisialisasi dari localStorage setelah komponen dimuat di client
  useEffect(() => {
    const loadedDevices = getStoredDevices();
    const loadedSettings = getStoredSettings();

    setDevices(loadedDevices);
    setSettings(loadedSettings);

    if (loadedSettings.activeDeviceId && loadedDevices.some((d) => d.id === loadedSettings.activeDeviceId)) {
      setActiveDeviceId(loadedSettings.activeDeviceId);
    } else if (loadedDevices.length > 0) {
      setActiveDeviceId(loadedDevices[0].id);
    }
  }, []);

  const activeDevice = devices.find((d) => d.id === activeDeviceId) || devices[0] || DEFAULT_DEVICE;
  const activeBrand = TV_BRANDS.find((b) => b.id === activeDevice.brandId) || TV_BRANDS[0];
  const isSimulation = activeDevice.protocol === 'simulation';

  // Penanganan Perintah Remote
  const handleCommand = async (cmd: RemoteCommand) => {
    // 1. Umpan Balik Audio Synthesizer
    if (cmd === 'POWER') {
      playAudioFeedback(tvState.power ? 'power-off' : 'power-on', settings.soundEnabled);
    } else if (cmd.startsWith('APP_')) {
      playAudioFeedback('app', settings.soundEnabled);
    } else if (cmd === 'VOL_UP' || cmd === 'VOL_DOWN' || cmd === 'CH_UP' || cmd === 'CH_DOWN') {
      playAudioFeedback('tick', settings.soundEnabled);
    } else {
      playAudioFeedback('click', settings.soundEnabled);
    }

    // 2. Umpan Balik Getaran Haptic
    if (cmd === 'POWER') {
      triggerHapticFeedback('power', settings.hapticEnabled);
    } else if (cmd === 'OK') {
      triggerHapticFeedback('medium', settings.hapticEnabled);
    } else {
      triggerHapticFeedback('light', settings.hapticEnabled);
    }

    // 3. Animasi LED Infra-Red
    setIsTransmitting(true);
    setTimeout(() => setIsTransmitting(false), 260);

    // 4. Jika mode Audio IR Dongle 38kHz
    if (activeDevice.protocol === 'audio-ir') {
      transmitAudioIR(cmd);
    }

    // 5. Kirim Perintah ke TV via Protokol Terpilih
    const log = await sendRemoteCommand(cmd, activeDevice);

    // 6. Sinkronisasi status
    setTvState({ ...virtualTVState });
    setStatusMessage(log.message || `${cmd} terkirim`);
    setLogs((prev) => [log, ...prev.slice(0, 19)]);
  };

  // Switch Perangkat
  const handleSelectDevice = (id: string) => {
    setActiveDeviceId(id);
    const updatedSettings = { ...settings, activeDeviceId: id };
    setSettings(updatedSettings);
    saveStoredSettings(updatedSettings);
    playAudioFeedback('click', settings.soundEnabled);
    triggerHapticFeedback('light', settings.hapticEnabled);
  };

  // Simpan Perangkat Baru
  const handleSaveDevice = (newDev: TVDevice) => {
    const updated = [...devices, newDev];
    setDevices(updated);
    saveStoredDevices(updated);
    handleSelectDevice(newDev.id);
  };

  // Hapus Perangkat
  const handleDeleteDevice = (id: string) => {
    const updated = devices.filter((d) => d.id !== id);
    setDevices(updated);
    saveStoredDevices(updated);
    if (activeDeviceId === id && updated.length > 0) {
      handleSelectDevice(updated[0].id);
    }
  };

  // Toggle Sound & Haptic
  const toggleSound = () => {
    const nextVal = !settings.soundEnabled;
    const updated = { ...settings, soundEnabled: nextVal };
    setSettings(updated);
    saveStoredSettings(updated);
    if (nextVal) playAudioFeedback('click', true);
  };

  const toggleHaptic = () => {
    const nextVal = !settings.hapticEnabled;
    const updated = { ...settings, hapticEnabled: nextVal };
    setSettings(updated);
    saveStoredSettings(updated);
    if (nextVal) triggerHapticFeedback('medium', true);
  };

  return (
    <div className="app-wrapper">
      {/* Header Bar */}
      <HeaderBar
        devices={devices}
        activeDevice={activeDevice}
        onSelectDevice={handleSelectDevice}
        soundEnabled={settings.soundEnabled}
        onToggleSound={toggleSound}
        hapticEnabled={settings.hapticEnabled}
        onToggleHaptic={toggleHaptic}
        showTvPanel={showTvPanel}
        onToggleTvPanel={() => setShowTvPanel(!showTvPanel)}
        onOpenTrackpad={() => setIsTrackpadOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Quick Connect Alert Banner (Jika masih dalam Simulator Mode) */}
      <QuickConnectBanner
        isSimulation={isSimulation}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Main Responsive Stage */}
      <main className="main-stage">
        {/* Handheld Remote Body */}
        <RemoteBody
          device={activeDevice}
          brand={activeBrand}
          tvState={tvState}
          isTransmitting={isTransmitting}
          statusMessage={statusMessage}
          onCommand={handleCommand}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Live Virtual TV Monitor Panel */}
        {showTvPanel && (
          <VirtualTvPanel
            device={activeDevice}
            tvState={tvState}
            logs={logs}
          />
        )}
      </main>

      {/* Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        devices={devices}
        activeDeviceId={activeDeviceId}
        onSelectDevice={handleSelectDevice}
        onSaveDevice={handleSaveDevice}
        onDeleteDevice={handleDeleteDevice}
      />

      <HelpGuideModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      <TrackpadModal
        isOpen={isTrackpadOpen}
        onClose={() => setIsTrackpadOpen(false)}
        onCommand={handleCommand}
      />
    </div>
  );
}
