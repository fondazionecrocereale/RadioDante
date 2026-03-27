"use client";

import React, { useState, useEffect } from 'react';

export default function StudioPage() {
  const [streamKey, setStreamKey] = useState("");
  const [status, setStatus] = useState("idle"); // idle, connecting, live, error
  const [listeners, setListeners] = useState(0);

  const fetchStatus = async () => {
    try {
      const res = await fetch("https://radiodante.onrender.com/api/v1/status");
      const data = await res.json();
      setListeners(data.listeners || 0);
    } catch (err) {
      console.error("Failed to fetch status", err);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#1c1c19] text-[#fcf9f4] font-body p-8 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="flex justify-between items-end border-b border-[#fcf9f4]/15 pb-6">
          <div className="space-y-2">
            <h1 className="font-headline text-4xl font-black uppercase italic tracking-tighter text-primary">Radio Dante XXI</h1>
            <p className="font-label text-xs uppercase tracking-[0.3em] opacity-60">Studio Control Panel / Broadcaster Pro</p>
          </div>
          <div className="text-right">
            <span className="font-label text-[10px] uppercase block opacity-40">UTC Time</span>
            <span className="font-label text-xl font-bold">{new Date().toLocaleTimeString()}</span>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Connection Status */}
          <section className="bg-[#2a2a26] p-8 space-y-8 border-l-4 border-primary">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-2xl font-bold tracking-tight italic">System Status</h2>
              <div className={`flex items-center gap-2 font-label text-[10px] uppercase font-bold ${status === 'live' ? 'text-primary' : 'text-on-surface-variant/40'}`}>
                <span className={`w-2 h-2 rounded-full ${status === 'live' ? 'bg-primary animate-pulse' : 'bg-on-surface-variant/40'}`} />
                {status === 'live' ? 'Live on Air' : 'Standby'}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1c1c19] p-4">
                <span className="font-label text-[10px] opacity-40 uppercase block">Listeners</span>
                <span className="text-3xl font-bold">{listeners}</span>
              </div>
              <div className="bg-[#1c1c19] p-4">
                <span className="font-label text-[10px] opacity-40 uppercase block">Bitrate</span>
                <span className="text-3xl font-bold">128k</span>
              </div>
            </div>

            <div className="space-y-4">
              <label className="font-label text-xs uppercase tracking-widest opacity-60">Stream Configuration</label>
              <div className="p-4 bg-black/30 space-y-2 text-xs font-mono">
                <p><span className="text-primary">Server:</span> rtmp://radiodante.onrender.com/live</p>
                <p><span className="text-primary">HTTP Ingest:</span> https://radiodante.onrender.com/api/v1/ingest</p>
                <p><span className="text-primary">Key:</span> ••••••••••••••••</p>
              </div>
              <p className="text-[10px] opacity-40 leading-relaxed italic">
                Use these settings in BUTT, OBS, or your hardware encoder. The station will automatically switch to your feed once you start streaming.
              </p>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="space-y-8">
            <div className="bg-primary/5 p-8 border border-primary/20 space-y-6">
              <h3 className="font-headline text-2xl font-bold tracking-tight italic">Host Authorization</h3>
              <p className="font-body text-sm opacity-70">Enter your station key to enable emergency local controls or monitoring.</p>
              <div className="space-y-4">
                <input 
                  type="password" 
                  value={streamKey}
                  onChange={(e) => setStreamKey(e.target.value)}
                  placeholder="Enter Stream Key"
                  className="w-full bg-[#1c1c19] border border-[#fcf9f4]/15 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                />
                <button className="w-full bg-primary text-[#1c1c19] font-black py-4 uppercase text-xs tracking-[0.2em] hover:brightness-110 transition-all">
                  Authorize Studio
                </button>
              </div>
            </div>

            <div className="bg-[#2a2a26] p-8 space-y-4">
              <h3 className="font-label text-xs font-bold uppercase tracking-widest text-primary">Emergency Fallback</h3>
              <p className="text-xs opacity-60">If the remote studio disconnects, the system will play "Radici Italiane" automatically.</p>
              <button className="w-full border border-[#fcf9f4]/15 text-[#fcf9f4] py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#fcf9f4]/5 transition-colors">
                Stop Custom Fallback
              </button>
            </div>
          </section>
        </main>

        <footer className="pt-12 mt-12 border-t border-[#fcf9f4]/15 text-[10px] font-label uppercase tracking-widest opacity-40 flex justify-between">
          <span>&copy; 2026 Radio Dante XXI Orchestrator v2.1</span>
          <span>Security: TLS 1.3 / AES-256</span>
        </footer>
      </div>
    </div>
  );
}
