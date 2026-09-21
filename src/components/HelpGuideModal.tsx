'use client';

import React from 'react';
import { X, HelpCircle, Wifi, Smartphone, Cpu, Zap } from 'lucide-react';

interface HelpGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpGuideModal: React.FC<HelpGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={20} color="#10b981" />
            <h2 className="modal-title">Panduan Penggunaan Remote</h2>
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.85rem' }}>
          {/* Card 1: Smart TV Setup */}
          <div
            style={{
              padding: '14px',
              borderRadius: '14px',
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: 700, marginBottom: '6px' }}>
              <Wifi size={16} />
              <span>1. Mengontrol Smart TV (Samsung, LG, Android TV, Sony, Roku, Xiaomi)</span>
            </div>
            <ol style={{ paddingLeft: '18px', color: '#cbd5e1', lineHeight: '1.6' }}>
              <li>Pastikan <strong>HP dan TV Anda terhubung ke jaringan Wi-Fi yang sama</strong> (satu router).</li>
              <li>Buka menu TV: <strong>Pengaturan / Settings &gt; Jaringan / Network &gt; Status Jaringan / IP</strong>. Catat alamat IP TV Anda (contoh: <code>192.168.1.45</code>).</li>
              <li>Klik ikon <strong>⚙ (Pengaturan)</strong> di remote ini &gt; Tambah TV &gt; Masukkan IP tersebut.</li>
              <li>Untuk <strong>Roku TV</strong>: Langsung bekerja seketika tanpa pairing!</li>
              <li>Untuk <strong>Samsung & LG</strong>: Izinkan prompt notifikasi remote yang muncul di layar TV Anda.</li>
            </ol>
          </div>

          {/* Card 2: Non-Smart / Analog TV */}
          <div
            style={{
              padding: '14px',
              borderRadius: '14px',
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontWeight: 700, marginBottom: '6px' }}>
              <Cpu size={16} />
              <span>2. Mengontrol TV Biasa / Tabung / LED Non-Smart (Polytron, Sharp, dll)</span>
            </div>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
              TV non-smart hanya menerima sinyal cahaya infra-merah (IR). Karena smartphone modern tidak memiliki lampu LED IR pemancar fisik internal, Anda bisa menggunakan solusi sangat terjangkau:
            </p>
            <ul style={{ paddingLeft: '18px', color: '#cbd5e1', marginTop: '6px', lineHeight: '1.6' }}>
              <li>
                <strong>Modul ESP32 / ESP8266 IR Blaster</strong> (Harga ~Rp 25.000 - Rp 40.000 di toko online): Colokkan ke adaptor charger HP di dekat TV. Modul ini menerima perintah Wi-Fi dari web remote ini dan menembakkan kode infra-merah ke TV merek apa saja!
              </li>
              <li>
                <strong>Smart IR Remote Universal</strong> (seperti Tuya/Bardi/Broadlink) melalui integrasi Webhook / Home Assistant.
              </li>
            </ul>
          </div>

          {/* Card 3: PWA / Install to phone */}
          <div
            style={{
              padding: '14px',
              borderRadius: '14px',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 700, marginBottom: '6px' }}>
              <Smartphone size={16} />
              <span>3. Pasang di Layar Utama HP (PWA / Tanpa Install App Store)</span>
            </div>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
              Agar terasa seperti aplikasi remote asli di smartphone:
            </p>
            <ul style={{ paddingLeft: '18px', color: '#cbd5e1', marginTop: '6px', lineHeight: '1.6' }}>
              <li><strong>Di Chrome Android:</strong> Ketuk tombol titik tiga di pojok kanan atas &gt; pilih <strong>&ldquo;Tambahkan ke Layar Utama&rdquo; (Add to Home screen)</strong>.</li>
              <li><strong>Di Safari iPhone:</strong> Ketuk tombol Bagikan (ikon kotak panah ke atas) &gt; pilih <strong>&ldquo;Tambah ke Layar Utama&rdquo;</strong>.</li>
            </ul>
          </div>

          {/* Card 4: GitHub & Free Cloud Hosting */}
          <div
            style={{
              padding: '14px',
              borderRadius: '14px',
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#818cf8', fontWeight: 700, marginBottom: '6px' }}>
              <Zap size={16} />
              <span>4. Deploy Gratis ke Vercel agar Bisa Diakses dari Mana Saja</span>
            </div>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
              Setelah kode di-push ke GitHub, Anda bisa menghubungkannya ke <strong>Vercel</strong> (100% gratis) sehingga Anda mendapatkan URL web sendiri (contoh: <code>https://remote-tv-saya.vercel.app</code>) yang bisa dibuka dari browser HP mana pun!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
