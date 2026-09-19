import { TVBrand, TVDevice } from './types';

export const TV_BRANDS: TVBrand[] = [
  {
    id: 'samsung',
    name: 'Samsung Smart TV',
    category: 'smart-tv',
    defaultProtocol: 'samsung-tizen',
    defaultPort: 8002,
    badgeColor: '#1428a0',
    popularInIndonesia: true,
    description: 'Samsung Tizen OS (2016 ke atas) via Wi-Fi atau SmartThings.',
    instructions: 'Pastikan TV dan HP di Wi-Fi yang sama. Izinkan akses remote di menu TV saat pertama kali menghubungkan.'
  },
  {
    id: 'lg',
    name: 'LG webOS TV',
    category: 'smart-tv',
    defaultProtocol: 'lg-webos',
    defaultPort: 3000,
    badgeColor: '#a50034',
    popularInIndonesia: true,
    description: 'LG webOS Smart TV melalui protokol WebSocket.',
    instructions: 'Pastikan fitur "LG Connect Apps" atau "Mobile TV On" aktif di pengaturan koneksi TV LG.'
  },
  {
    id: 'android-tv',
    name: 'Android TV / Google TV',
    category: 'smart-tv',
    defaultProtocol: 'android-tv',
    defaultPort: 6466,
    badgeColor: '#3ddc84',
    popularInIndonesia: true,
    description: 'Cocok untuk Google TV, Sony, Xiaomi Mi Box/Stick, Chromecast, Changhong, dan Realme TV.',
    instructions: 'Bisa dikontrol via Android TV Remote Service di port 6466/6467 atau bridge HTTP.'
  },
  {
    id: 'roku',
    name: 'Roku TV / TCL Roku',
    category: 'smart-tv',
    defaultProtocol: 'roku-ecp',
    defaultPort: 8060,
    badgeColor: '#662d91',
    popularInIndonesia: false,
    description: 'Mendukung Roku ECP (External Control Protocol) instan tanpa kode pairing!',
    instructions: 'Masukkan IP Roku TV Anda (contoh: 192.168.1.50). Langsung merespons perintah HTTP POST.'
  },
  {
    id: 'polytron',
    name: 'Polytron (Smart / LED)',
    category: 'universal',
    defaultProtocol: 'android-tv',
    defaultPort: 6466,
    badgeColor: '#0055a5',
    popularInIndonesia: true,
    description: 'Sangat populer di Indonesia. Untuk Polytron Smart gunakan Android TV; untuk LED biasa gunakan mode IR/ESP32.',
    instructions: 'Jika Polytron Android TV, masukkan IP lokal. Jika Polytron biasa/tabung, hubungkan ke modul ESP32 IR Blaster.'
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi / Redmi TV',
    category: 'smart-tv',
    defaultProtocol: 'android-tv',
    defaultPort: 6466,
    badgeColor: '#ff6700',
    popularInIndonesia: true,
    description: 'Xiaomi Mi TV 4A, A2, P1, TV Stick, Box S dengan Android TV / PatchWall.',
    instructions: 'Aktifkan "Remote Control / Network Debugging" di Pengaturan Pengembang jika diperlukan bridge ADB.'
  },
  {
    id: 'sony',
    name: 'Sony Bravia',
    category: 'smart-tv',
    defaultProtocol: 'sony-bravia',
    defaultPort: 80,
    badgeColor: '#1f1f1f',
    popularInIndonesia: true,
    description: 'Sony Bravia dengan REST API bawaan (Pre-Shared Key / IP Control).',
    instructions: 'Buka Settings > Network > Home Network Setup > IP Control > aktifkan Simple IP Control.'
  },
  {
    id: 'tcl',
    name: 'TCL Smart TV',
    category: 'smart-tv',
    defaultProtocol: 'android-tv',
    defaultPort: 6466,
    badgeColor: '#e2001a',
    popularInIndonesia: true,
    description: 'TCL Google TV / Android TV / Roku TV.',
    instructions: 'Gunakan protokol Android TV jika TCL berbasis Google TV, atau Roku jika TCL Roku TV.'
  },
  {
    id: 'sharp',
    name: 'Sharp Aquos',
    category: 'smart-tv',
    defaultProtocol: 'android-tv',
    defaultPort: 6466,
    badgeColor: '#d6001c',
    popularInIndonesia: true,
    description: 'Sharp Aquos Android TV atau LED TV konvensional.',
    instructions: 'Pilih protokol Android TV untuk seri pintar, atau Webhook/IR untuk Sharp analog/biasa.'
  },
  {
    id: 'coocaa',
    name: 'Coocaa TV',
    category: 'smart-tv',
    defaultProtocol: 'android-tv',
    defaultPort: 6466,
    badgeColor: '#ff8200',
    popularInIndonesia: true,
    description: 'Smart TV terjangkau berbasis Android TV atau Coolita OS.',
    instructions: 'Hubungkan via IP Wi-Fi untuk Coocaa Android TV.'
  },
  {
    id: 'esp32-ir',
    name: 'ESP32 / ESP8266 IR Blaster',
    category: 'ir-bridge',
    defaultProtocol: 'esp32-ir',
    defaultPort: 80,
    badgeColor: '#009688',
    popularInIndonesia: true,
    description: 'Hardware bridge murah (~Rp 35.000) untuk menembakkan sinyal infra-merah ke TV APA SAJA.',
    instructions: 'Kirim perintah HTTP ke ESP32 yang terhubung ke LED IR (NEC/RC5/Sony). Solusi terbaik untuk TV non-smart!'
  },
  {
    id: 'home-assistant',
    name: 'Home Assistant / Webhook',
    category: 'universal',
    defaultProtocol: 'webhook',
    defaultPort: 8123,
    badgeColor: '#03a9f4',
    popularInIndonesia: false,
    description: 'Integrasi otomatisasi rumah (Home Assistant, Node-RED, Tuya, Broadlink RM).',
    instructions: 'Kirim payload JSON ke webhook Home Assistant remote.send_command.'
  },
  {
    id: 'audio-jack-ir',
    name: 'Audio Jack 3.5mm IR Dongle',
    category: 'ir-bridge',
    defaultProtocol: 'audio-ir',
    defaultPort: 0,
    badgeColor: '#9c27b0',
    popularInIndonesia: true,
    description: 'Dongle IR murah yang dicolokkan ke port headset HP dengan modulasi 38kHz stereo.',
    instructions: 'Colokkan dongle IR ke lubang jack headset 3.5mm, naikkan volume HP ke 100%.'
  },
  {
    id: 'simulation',
    name: 'Simulator / Virtual TV',
    category: 'universal',
    defaultProtocol: 'simulation',
    defaultPort: 0,
    badgeColor: '#607d8b',
    popularInIndonesia: true,
    description: 'Mode demo interaktif dengan layar simulasi TV virtual untuk mencoba semua fungsi.',
    instructions: 'Gunakan mode ini untuk menguji tombol remote, haptics, dan audio tanpa memerlukan TV fisik.'
  }
];

export const DEFAULT_DEVICE: TVDevice = {
  id: 'default-simulator',
  name: 'TV Simulasi Interaktif',
  brandId: 'simulation',
  ipAddress: '192.168.1.100',
  port: 8080,
  protocol: 'simulation',
  createdAt: Date.now(),
};
