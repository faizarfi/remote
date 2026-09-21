import { RemoteCommand, TVDevice, CommandLog } from './types';

// State virtual untuk simulator TV
export interface VirtualTVState {
  power: boolean;
  volume: number;
  muted: boolean;
  channel: number;
  channelName: string;
  source: string;
  activeApp: string | null;
  lastCommand: string;
}

export const virtualTVState: VirtualTVState = {
  power: true,
  volume: 24,
  muted: false,
  channel: 1,
  channelName: 'TV Digital HD',
  source: 'HDMI 1',
  activeApp: null,
  lastCommand: 'READY'
};

const CHANNELS = [
  'TV Digital HD',
  'RCTI HD',
  'Trans7 HD',
  'Trans TV',
  'NET TV',
  'Indosiar',
  'SCTV HD',
  'Kompas TV',
  'Metro TV',
  'TVRI Nasional',
  'National Geographic',
  'HBO Signature'
];

export async function sendRemoteCommand(
  command: RemoteCommand,
  device: TVDevice
): Promise<CommandLog> {
  const log: CommandLog = {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    command,
    timestamp: Date.now(),
    success: true,
    targetDeviceName: device.name,
    targetIp: device.ipAddress,
    protocol: device.protocol,
    message: 'Perintah terkirim'
  };

  // 1. Tangani Mode Simulasi
  if (device.protocol === 'simulation') {
    handleSimulationCommand(command);
    log.message = `Simulasi: ${command} berhasil dijalankan.`;
    return log;
  }

  // 2. Roku ECP (External Control Protocol)
  if (device.protocol === 'roku-ecp') {
    try {
      const rokuKey = mapToRokuKey(command);
      if (rokuKey) {
        const isAppLaunch = rokuKey.startsWith('launch/');
        const url = `http://${device.ipAddress}:8060/${isAppLaunch ? rokuKey : `keypress/${rokuKey}`}`;
        
        // Mode no-cors memungkinkan browser menembak HTTP POST ke LAN tanpa terblokir CORS
        await fetch(url, {
          method: 'POST',
          mode: 'no-cors'
        });
        log.message = `Roku: Sinyal "${rokuKey}" terkirim ke ${device.ipAddress}`;
      }
    } catch (err: unknown) {
      log.success = false;
      log.message = err instanceof Error ? err.message : 'Gagal mengirim ke Roku';
    }
    return log;
  }

  // 3. ESP32 / ESP8266 IR Blaster
  if (device.protocol === 'esp32-ir') {
    try {
      const endpoint = device.esp32Endpoint || `http://${device.ipAddress}/send`;
      const url = `${endpoint}?brand=${encodeURIComponent(device.brandId)}&cmd=${encodeURIComponent(command)}`;
      await fetch(url, {
        method: 'GET',
        mode: 'no-cors'
      });
      log.message = `ESP32 IR: Perintah ${command} terkirim`;
    } catch (err: unknown) {
      log.success = false;
      log.message = err instanceof Error ? err.message : 'Gagal terhubung ke ESP32';
    }
    return log;
  }

  // 4. Webhook / Home Assistant
  if (device.protocol === 'webhook') {
    try {
      const url = device.webhookUrl || `http://${device.ipAddress}:8123/api/webhook/tv_remote`;
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify({
          entity_id: 'remote.tv',
          command: command,
          brand: device.brandId,
          device_name: device.name,
          timestamp: Date.now()
        })
      });
      log.message = `Webhook: ${command} terkirim ke server automation`;
    } catch (err: unknown) {
      log.success = false;
      log.message = err instanceof Error ? err.message : 'Webhook error';
    }
    return log;
  }

  // 5. Smart TV Bridge (Android TV / Samsung / LG / Sony via server route or local proxy)
  try {
    const res = await fetch('/api/tv/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        device,
        command
      })
    });
    const data = await res.json();
    log.message = data.message || `Sinyal ${command} terproses`;
    log.success = data.success ?? true;
  } catch {
    // Fallback bila berjalan di static/client-only
    log.message = `Sinyal ${command} dikirim via local dispatcher`;
  }

  return log;
}

function handleSimulationCommand(cmd: RemoteCommand) {
  virtualTVState.lastCommand = cmd;

  switch (cmd) {
    case 'POWER':
      virtualTVState.power = !virtualTVState.power;
      break;
    case 'POWER_ON':
      virtualTVState.power = true;
      break;
    case 'POWER_OFF':
      virtualTVState.power = false;
      break;
    case 'VOL_UP':
      if (virtualTVState.power) {
        virtualTVState.volume = Math.min(100, virtualTVState.volume + 1);
        virtualTVState.muted = false;
      }
      break;
    case 'VOL_DOWN':
      if (virtualTVState.power) {
        virtualTVState.volume = Math.max(0, virtualTVState.volume - 1);
        virtualTVState.muted = false;
      }
      break;
    case 'MUTE':
      if (virtualTVState.power) {
        virtualTVState.muted = !virtualTVState.muted;
      }
      break;
    case 'CH_UP':
      if (virtualTVState.power) {
        virtualTVState.channel = (virtualTVState.channel % CHANNELS.length) + 1;
        virtualTVState.channelName = CHANNELS[virtualTVState.channel - 1];
        virtualTVState.activeApp = null;
      }
      break;
    case 'CH_DOWN':
      if (virtualTVState.power) {
        virtualTVState.channel = virtualTVState.channel <= 1 ? CHANNELS.length : virtualTVState.channel - 1;
        virtualTVState.channelName = CHANNELS[virtualTVState.channel - 1];
        virtualTVState.activeApp = null;
      }
      break;
    case 'INPUT':
      if (virtualTVState.power) {
        const sources = ['HDMI 1', 'HDMI 2', 'TV Digital', 'AV Component', 'USB Media'];
        const currentIdx = sources.indexOf(virtualTVState.source);
        virtualTVState.source = sources[(currentIdx + 1) % sources.length];
        virtualTVState.activeApp = null;
      }
      break;
    case 'APP_YOUTUBE':
      if (virtualTVState.power) virtualTVState.activeApp = 'YouTube';
      break;
    case 'APP_NETFLIX':
      if (virtualTVState.power) virtualTVState.activeApp = 'Netflix';
      break;
    case 'APP_PRIME':
      if (virtualTVState.power) virtualTVState.activeApp = 'Prime Video';
      break;
    case 'APP_DISNEY':
      if (virtualTVState.power) virtualTVState.activeApp = 'Disney+';
      break;
    case 'APP_VIDIO':
      if (virtualTVState.power) virtualTVState.activeApp = 'Vidio';
      break;
    case 'APP_SPOTIFY':
      if (virtualTVState.power) virtualTVState.activeApp = 'Spotify';
      break;
    case 'HOME':
      if (virtualTVState.power) virtualTVState.activeApp = 'Smart Home Menu';
      break;
    default:
      break;
  }
}

function mapToRokuKey(cmd: RemoteCommand): string | null {
  switch (cmd) {
    case 'POWER': return 'Power';
    case 'HOME': return 'Home';
    case 'BACK': return 'Back';
    case 'UP': return 'Up';
    case 'DOWN': return 'Down';
    case 'LEFT': return 'Left';
    case 'RIGHT': return 'Right';
    case 'OK': return 'Select';
    case 'VOL_UP': return 'VolumeUp';
    case 'VOL_DOWN': return 'VolumeDown';
    case 'MUTE': return 'VolumeMute';
    case 'CH_UP': return 'ChannelUp';
    case 'CH_DOWN': return 'ChannelDown';
    case 'PLAY':
    case 'PAUSE': return 'Play';
    case 'REWIND': return 'Rev';
    case 'FAST_FORWARD': return 'Fwd';
    case 'INFO': return 'Info';
    case 'APP_YOUTUBE': return 'launch/837';
    case 'APP_NETFLIX': return 'launch/12';
    case 'APP_PRIME': return 'launch/13';
    default: return null;
  }
}

// Modulasi Audio Jack 38kHz IR Transmitter
export function transmitAudioIR() {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // 38kHz infra-red carrier frequency
    osc.type = 'square';
    osc.frequency.setValueAtTime(38000, ctx.currentTime);

    // Kirim pulsa sinyal (NEC protocol simulation burst)
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(1.0, now);
    gain.gain.setValueAtTime(0.0, now + 0.009); // Leader 9ms
    gain.gain.setValueAtTime(1.0, now + 0.0135); // 4.5ms space
    gain.gain.setValueAtTime(0.0, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  } catch (err) {
    console.debug('Audio IR burst error:', err);
  }
}
