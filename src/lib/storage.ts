import { AppSettings, TVDevice } from './types';
import { DEFAULT_DEVICE } from './tvBrands';

const STORAGE_KEYS = {
  DEVICES: 'universal_tv_remote_devices_v1',
  SETTINGS: 'universal_tv_remote_settings_v1',
};

const DEFAULT_SETTINGS: AppSettings = {
  soundEnabled: true,
  hapticEnabled: true,
  activeDeviceId: 'default-simulator',
  keepScreenAwake: false,
  theme: 'dark-obsidian',
};

export function getStoredDevices(): TVDevice[] {
  if (typeof window === 'undefined') return [DEFAULT_DEVICE];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DEVICES);
    if (!raw) {
      const initial = [
        DEFAULT_DEVICE,
        {
          id: 'samsung-livingroom',
          name: 'Samsung TV Ruang Tamu',
          brandId: 'samsung',
          ipAddress: '192.168.1.45',
          port: 8002,
          protocol: 'samsung-tizen',
          createdAt: Date.now() - 100000
        },
        {
          id: 'polytron-bedroom',
          name: 'Polytron Kamar Tidur',
          brandId: 'polytron',
          ipAddress: '192.168.1.60',
          port: 6466,
          protocol: 'android-tv',
          createdAt: Date.now() - 50000
        }
      ];
      localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(initial));
      return initial as TVDevice[];
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading devices from localStorage:', err);
    return [DEFAULT_DEVICE];
  }
}

export function saveStoredDevices(devices: TVDevice[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(devices));
  } catch (err) {
    console.error('Error saving devices to localStorage:', err);
  }
}

export function getStoredSettings(): AppSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (err) {
    console.error('Error loading settings from localStorage:', err);
    return DEFAULT_SETTINGS;
  }
}

export function saveStoredSettings(settings: AppSettings) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (err) {
    console.error('Error saving settings to localStorage:', err);
  }
}
