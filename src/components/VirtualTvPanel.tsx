'use client';

import React from 'react';
import { TVDevice, CommandLog } from '@/lib/types';
import { VirtualTVState } from '@/lib/tvProtocols';
import { Volume2, VolumeX, Tv, Radio, MonitorCheck } from 'lucide-react';

interface VirtualTvPanelProps {
  device: TVDevice;
  tvState: VirtualTVState;
  logs: CommandLog[];
}

export const VirtualTvPanel: React.FC<VirtualTvPanelProps> = ({
  device,
  tvState,
  logs,
}) => {
  return (
    <div className="virtual-tv-panel">
      {/* 16:9 TV Frame */}
      <div className="tv-bezel">
        {!tvState.power ? (
          <div className="tv-screen-off">
            <Tv size={36} style={{ opacity: 0.3 }} />
            <div style={{ fontSize: '0.85rem' }}>LAYAR MATI (STANDBY)</div>
            <div style={{ fontSize: '0.7rem', color: '#334155' }}>
              Tekan tombol POWER merah di remote untuk menyalakan
            </div>
          </div>
        ) : (
          <div className="tv-screen-on">
            {/* Top HUD */}
            <div className="tv-hud-top">
              <span className="tv-hud-source">
                {tvState.activeApp ? 'SMART APP' : tvState.source}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.7rem', color: '#10b981' }}>● LIVE 1080p</span>
                <Radio size={12} color="#10b981" />
              </div>
            </div>

            {/* Center Content */}
            <div className="tv-content-center">
              {tvState.activeApp ? (
                <div className="tv-app-banner">
                  <span>🎬 MEMBUKA: {tvState.activeApp}</span>
                </div>
              ) : (
                <>
                  <div className="tv-channel-badge">
                    CH {tvState.channel.toString().padStart(2, '0')}
                  </div>
                  <div className="tv-channel-name">{tvState.channelName}</div>
                </>
              )}
            </div>

            {/* Bottom HUD */}
            <div className="tv-hud-bottom">
              {tvState.muted ? (
                <div className="tv-vol-banner" style={{ color: '#ef4444' }}>
                  <VolumeX size={16} />
                  <span>SUARA DIBISUKAN (MUTED)</span>
                </div>
              ) : (
                <div className="tv-vol-banner">
                  <Volume2 size={16} />
                  <span>VOL: {tvState.volume}%</span>
                  <div
                    style={{
                      width: '60px',
                      height: '6px',
                      background: 'rgba(255,255,255,0.2)',
                      borderRadius: '3px',
                      overflow: 'hidden',
                      marginLeft: '6px',
                    }}
                  >
                    <div
                      style={{
                        width: `${tvState.volume}%`,
                        height: '100%',
                        background: '#38bdf8',
                      }}
                    />
                  </div>
                </div>
              )}

              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                Perintah Terakhir: <strong style={{ color: '#ffffff' }}>{tvState.lastCommand}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="tv-stand" />

      {/* Connection & Live Log Monitor */}
      <div className="info-card">
        <div className="info-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MonitorCheck size={16} color="#38bdf8" />
            <span>Status Transmisi ({device.name})</span>
          </div>
          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
            {device.protocol.toUpperCase()}
          </span>
        </div>

        <div className="log-list">
          {logs.length === 0 ? (
            <div style={{ color: '#64748b', textAlign: 'center', padding: '12px' }}>
              Belum ada perintah dikirim. Coba tekan tombol remote!
            </div>
          ) : (
            logs.slice(0, 5).map((l) => (
              <div key={l.id} className="log-item">
                <span style={{ color: '#ffffff', fontWeight: 600 }}>{l.command}</span>
                <span style={{ color: '#94a3b8', fontSize: '0.68rem' }}>{l.message}</span>
                <span style={{ color: '#64748b', fontSize: '0.68rem' }}>
                  {new Date(l.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
