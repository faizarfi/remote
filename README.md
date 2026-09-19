# 📺 Universal TV Remote Pro

Aplikasi **Universal TV Remote** pintar dan modern berbasis **React / Next.js (App Router)** dan **Progressive Web App (PWA)**. Didesain menyerupai remote fisik genggam kelas atas dengan sensasi taktil haptic vibration, synthesizer audio klik tombol (Web Audio API), layar OLED digital interaktif, dan simulator layar TV 16:9 langsung di browser.

Dibuat sebagai solusi praktis ketika remote TV fisik Anda rusak atau hilang, dan dapat digunakan di mana saja langsung dari smartphone (Android / iOS) atau komputer.

---

## ✨ Fitur Unggulan

- 📱 **Mobile-First & Ergonomis**: Tampilan handheld remote fisik obsidian dengan efek tekan 3D, lekukan samping bertekstur, dan LED pemancar infra-merah di bagian atas yang menyala saat sinyal dikirim.
- 📳 **Haptic Vibration Feedback**: Getaran taktil nyata (`navigator.vibrate`) untuk setiap penekanan tombol Power, OK, dan Navigasi.
- 🔊 **Synthesizer Suara Klik Tombol**: Efek suara mekanikal dan nada power chime menggunakan Web Audio API tanpa perlu aset file audio eksternal.
- 🖥️ **Layar OLED Digital & Virtual TV**: Menampilkan status real-time, volume bar, channel aktif, mode simulasi, serta pratinjau monitor TV 16:9 responsif.
- 🧭 **Kontrol Lengkap**:
  - D-Pad 5-arah (Atas, Bawah, Kiri, Kanan, OK) + Back, Home, Menu
  - Rocker Volume (+ / -) dan Channel (+ / -)
  - Tombol Pintas Streaming: **Netflix, YouTube, Prime Video, Disney+ Hotstar, Vidio, Spotify**
  - Numeric Keypad (0-9) lipat & 4 tombol warna (Merah, Hijau, Kuning, Biru)
  - Virtual Mouse Trackpad & Keyboard input untuk Smart TV
- 🌐 **Mendukung Berbagai Merek TV**:
  - **Roku TV**: Kontrol instan via protokol HTTP ECP (Port 8060) tanpa pairing.
  - **Android TV / Google TV / Xiaomi / TCL / Sony**: Kontrol via IP lokal & bridge REST.
  - **Samsung Tizen & LG webOS**: Konfigurasi port dan token pairing.
  - **Polytron & Sharp**: Mode Smart TV atau mode IR Blaster untuk seri biasa/tabung.
  - **TV Analog / Tabung Non-Smart**: Dukungan koneksi modul **ESP32/ESP8266 IR Blaster** murah atau Webhook Home Assistant.
- 📲 **PWA Ready (Add to Home Screen)**: Pasang langsung di HP tanpa perlu mengunduh dari App Store / Play Store.

---

## 🚀 Cara Menjalankan Secara Lokal

1. **Clone atau buka direktori proyek**:
   ```bash
   cd d:/remote
   ```

2. **Pastikan dependencies terinstall**:
   ```bash
   npm install
   ```

3. **Jalankan development server**:
   ```bash
   npm run dev
   ```

4. **Buka di browser**:
   Akses [http://localhost:3000](http://localhost:3000). Untuk membuka di HP, pastikan HP dan komputer berada di Wi-Fi yang sama, lalu buka `http://<IP-Komputer-Anda>:3000`.

---

## 📲 Cara Menginstal di Layar Utama Smartphone (PWA)

- **Android (Google Chrome)**:
  1. Buka link web remote di Chrome HP.
  2. Ketuk tombol **menu titik tiga (⋮)** di pojok kanan atas.
  3. Pilih **"Tambahkan ke Layar Utama"** atau **"Instal Aplikasi"**.
- **iPhone / iPad (Safari)**:
  1. Buka link web remote di Safari.
  2. Ketuk ikon **Bagikan / Share** (kotak dengan panah ke atas).
  3. Geser ke bawah dan pilih **"Add to Home Screen"** (Tambah ke Layar Utama).

---

## 📡 Panduan Menghubungkan ke TV Fisik

### 1. Smart TV (Samsung, LG, Android TV, Sony, Roku, Xiaomi, TCL, Polytron Smart)
1. Hubungkan HP dan Smart TV Anda ke **Wi-Fi yang sama** (satu router).
2. Di TV Anda, buka menu: **Pengaturan (Settings) > Jaringan (Network) > Status Jaringan / IP**.
3. Catat alamat IP TV (contoh: `192.168.1.45`).
4. Di aplikasi remote ini, klik tombol **⚙ (Pengaturan)** > **Tambah TV Baru**, masukkan nama dan IP TV tersebut.
5. Selesai! Untuk Roku TV langsung berfungsi seketika. Untuk Samsung/LG, setujui prompt izin remote di layar TV saat pertama kali tombol ditekan.

### 2. TV Tabung / TV LED Lama Non-Smart (Polytron, Sharp, dll)
Karena TV biasa tidak memiliki Wi-Fi dan HP modern tidak memiliki lampu LED IR internal:
- Gunakan modul **ESP32 / ESP8266 IR Blaster** (tersedia di Tokopedia/Shopee ~Rp 25.000 - Rp 45.000).
- Letakkan ESP32 dekat TV dan sambungkan ke Wi-Fi rumah.
- Masukkan IP ESP32 ke menu remote ini. Remote web akan mengirim perintah via Wi-Fi ke ESP32, dan ESP32 akan menembakkan sinyal infra-merah asli ke TV Anda!

---

## 📤 Langkah Push ke GitHub

Jika Anda ingin menyimpan kode ini ke akun GitHub Anda:

1. **Buat repositori baru di GitHub**:
   - Buka [https://github.com/new](https://github.com/new).
   - Beri nama repository, misalnya: `universal-tv-remote`.
   - Pilih **Public** atau **Private**, lalu klik **Create repository** (jangan centang Add README karena sudah ada).

2. **Jalankan perintah berikut di terminal**:
   ```bash
   # Ganti URL di bawah dengan URL repositori GitHub Anda
   git remote add origin https://github.com/USERNAME_ANDA/universal-tv-remote.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy Gratis ke Vercel**:
   - Buka [https://vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
   - Klik **"Add New Project"** dan pilih repository `universal-tv-remote`.
   - Klik **Deploy**. Dalam 1 menit, Anda akan memiliki link web publik (contoh: `https://tv-remote.vercel.app`) yang bisa diakses dari HP mana pun di mana saja!

---

## 🛠️ Teknologi yang Digunakan

- **Next.js 15+** (App Router, Turbopack)
- **React 19**
- **TypeScript**
- **Vanilla CSS murni** (Desain kustom tanpa framework bloat)
- **Web Audio API** (Sound generation)
- **Web Vibration API** (Tactile haptics)
- **Lucide Icons**
