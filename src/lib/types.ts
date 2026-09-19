export type ProtocolType =
  | 'roku-ecp'
  | 'android-tv'
  | 'samsung-tizen'
  | 'lg-webos'
  | 'sony-bravia'
  | 'webhook'
  | 'esp32-ir'
  | 'audio-ir'
  | 'simulation';

export interface TVBrand {
  id: string;
  name: string;
  category: 'smart-tv' | 'ir-bridge' | 'universal';
  defaultProtocol: ProtocolType;
  defaultPort: number;
  badgeColor: string;
  popularInIndonesia?: boolean;
  description: string;
  instructions: string;
}

export interface TVDevice {
  id: string;
  name: string;
  brandId: string;
  ipAddress: string;
  port: number;
  protocol: ProtocolType;
  webhookUrl?: string;
  esp32Endpoint?: string;
  macAddress?: string;
  token?: string; // e.g. for LG or Samsung pairing token
  createdAt: number;
}

export type RemoteCommand =
  | 'POWER'
  | 'POWER_ON'
  | 'POWER_OFF'
  | 'VOL_UP'
  | 'VOL_DOWN'
  | 'MUTE'
  | 'CH_UP'
  | 'CH_DOWN'
  | 'UP'
  | 'DOWN'
  | 'LEFT'
  | 'RIGHT'
  | 'OK'
  | 'BACK'
  | 'HOME'
  | 'MENU'
  | 'INPUT'
  | 'SETTINGS'
  | 'INFO'
  | 'EXIT'
  | 'PLAY'
  | 'PAUSE'
  | 'REWIND'
  | 'FAST_FORWARD'
  | 'NUM_0'
  | 'NUM_1'
  | 'NUM_2'
  | 'NUM_3'
  | 'NUM_4'
  | 'NUM_5'
  | 'NUM_6'
  | 'NUM_7'
  | 'NUM_8'
  | 'NUM_9'
  | 'APP_YOUTUBE'
  | 'APP_NETFLIX'
  | 'APP_PRIME'
  | 'APP_DISNEY'
  | 'APP_VIDIO'
  | 'APP_SPOTIFY'
  | 'COLOR_RED'
  | 'COLOR_GREEN'
  | 'COLOR_YELLOW'
  | 'COLOR_BLUE';

export interface CommandLog {
  id: string;
  command: RemoteCommand;
  timestamp: number;
  success: boolean;
  targetDeviceName: string;
  targetIp: string;
  protocol: ProtocolType;
  message?: string;
}

export interface AppSettings {
  soundEnabled: boolean;
  hapticEnabled: boolean;
  activeDeviceId: string | null;
  keepScreenAwake: boolean;
  theme: 'dark-obsidian' | 'cyber-neon' | 'silver-titanium';
}
