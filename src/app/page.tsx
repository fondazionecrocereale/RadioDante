"use client";

import React, { useState, useRef } from 'react';
import { useArticles } from '@/hooks/useArticles';
import { ArticleCard, ArticleShimmer } from '@/components/ArticleItems';

export default function Home() {
  const { articles, state, error } = useArticles();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error("Playback failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const STREAM_URL = "http://localhost:8080/api/v1/stream";

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f4] text-[#1c1c19] selection:bg-primary-container selection:text-on-primary-container font-body">
      <audio ref={audioRef} src={STREAM_URL} preload="none" />
      
      {/* Live Ticker Bar */}
      <div className="bg-on-surface text-surface py-2 overflow-hidden border-b border-outline-variant/15">
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex space-x-12 px-4 font-label text-[10px] uppercase tracking-widest items-center animate-ticker">
            <span>LA SETTIMANA DELLA MODA DI MILANO INIZIA DOMANI</span>
            <span>SIGLATO NUOVO ACCORDO COMMERCIALE TRA ROMA E BUENOS AIRES</span>
            <span>DANTE XXI INAUGURA IL NUOVO ARCHIVIO DIGITALE TRANSATLANTICO</span>
            <span>SCOPERTI NUOVI DOCUMENTI SUL VIAGGIO DEL CONTE GRANDE</span>
            <span>LA SETTIMANA DELLA MODA DI MILANO INIZIA DOMANI</span>
            <span>SIGLATO NUOVO ACCORDO COMMERCIALE TRA ROMA E BUENOS AIRES</span>
            <span>DANTE XXI INAUGURA IL NUOVO ARCHIVIO DIGITALE TRANSATLANTICO</span>
            <span>SCOPERTI NUOVI DOCUMENTI SUL VIAGGIO DEL CONTE GRANDE</span>
          </div>
        </div>
      </div>

      {/* TopAppBar */}
      <header className="flex flex-col w-full px-6 py-4 border-b border-[#dac1bb]/15 bg-[#fcf9f4] sticky top-0 z-50">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <span className="material-symbols-outlined text-primary cursor-pointer">menu</span>
            <span className="font-label text-xs uppercase tracking-[0.2em] hidden md:block">Mercoledì, 25 Mar, 2026</span>
          </div>
          <h1 className="text-3xl font-black font-headline text-[#9b432f] uppercase tracking-tighter">L&apos;Italia Al Plata</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 mr-2 font-label text-[10px] tracking-widest uppercase border-r border-outline-variant/30 pr-4">
              <button className="font-bold text-primary">IT</button>
              <span className="text-outline-variant/50">|</span>
              <button className="text-on-surface-variant/60 hover:text-primary transition-colors">ES</button>
              <span className="text-outline-variant/50">|</span>
              <button className="text-on-surface-variant/60 hover:text-primary transition-colors">PT</button>
            </div>
            <span className="material-symbols-outlined text-primary cursor-pointer">calendar_today</span>
            <button className="bg-primary text-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest hover:bg-on-primary-fixed-variant transition-colors">Abbonati Ora</button>
          </div>
        </div>
        <nav className="hidden md:flex justify-center space-x-10">
          <a className="text-[#9b432f] font-bold border-b-2 border-[#9b432f] font-label text-sm uppercase tracking-wider transition-opacity active:opacity-80" href="#">Home</a>
          <a className="text-[#1c1c19] font-medium font-label text-sm uppercase tracking-wider hover:bg-[#f6f3ee] transition-colors px-2" href="#notizie">Articoli</a>
          <a className="text-[#1c1c19] font-medium font-label text-sm uppercase tracking-wider hover:bg-[#f6f3ee] transition-colors px-2" href="#schedule">Palinsesto Radio</a>
          <a className="text-[#1c1c19] font-medium font-label text-sm uppercase tracking-wider hover:bg-[#f6f3ee] transition-colors px-2" href="#archivi">Archivi</a>
        </nav>
      </header>

      <div className="flex flex-1">
        {/* SideNavBar (Desktop Only) */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-[#dac1bb]/15 bg-[#f6f3ee] p-6 space-y-8 sticky top-24 h-[calc(100vh-6rem)]">
          <div>
            <h3 className="font-headline italic text-primary text-xl mb-1">Articoli</h3>
            <p className="font-body text-[10px] tracking-wide opacity-60 uppercase">Categorie Editoriali</p>
          </div>
          <nav className="flex-1 space-y-1">
            <a className="flex items-center px-4 py-3 text-sm font-medium text-[#1c1c19] bg-[#dac1bb]/10" href="#">
              <span className="material-symbols-outlined mr-3">menu_book</span> Cronaca
            </a>
            <a className="flex items-center px-4 py-3 text-sm font-medium text-[#1c1c19] hover:bg-[#dac1bb]/10" href="#">
              <span className="material-symbols-outlined mr-3">theater_comedy</span> Cultura
            </a>
            <a className="flex items-center px-4 py-3 text-sm font-medium text-[#1c1c19] hover:bg-[#dac1bb]/10" href="#">
              <span className="material-symbols-outlined mr-3">restaurant</span> Cucina
            </a>
            <a className="flex items-center px-4 py-3 text-sm font-medium text-[#1c1c19] hover:bg-[#dac1bb]/10" href="#">
              <span className="material-symbols-outlined mr-3">language</span> Lingua
            </a>
            <a className="flex items-center px-4 py-3 text-sm font-medium text-[#1c1c19] hover:bg-[#dac1bb]/10" href="#">
              <span className="material-symbols-outlined mr-3">history</span> Storia
            </a>
          </nav>
          <button className="bg-[#9b432f] text-white font-bold py-3 uppercase text-[10px] tracking-widest hover:bg-[#7c2d1b] transition-colors">Abbonati Ora</button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto space-y-20">
          
          {/* STREAMING FOCUS HERO */}
          <section id="live-stream" className="space-y-8 scroll-mt-24">
            <div className="flex items-center justify-between border-b-4 border-on-surface pb-2">
              <h2 className="font-headline text-3xl font-black uppercase tracking-tighter">Live Radio & Video 24/7</h2>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2 font-label text-[10px] uppercase font-bold text-primary">
                  <span className={`w-2 h-2 bg-primary rounded-full ${isPlaying ? 'animate-pulse' : ''}`} /> Live Now
                </span>
                <span className="font-label text-[10px] uppercase font-bold opacity-40 italic">Buon Giorno Buenos Aires</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div 
                onClick={togglePlay}
                className="lg:col-span-8 relative group overflow-hidden bg-on-surface aspect-video cursor-pointer"
              >
                {/* VIDEO PLACEHOLDER */}
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDu8MC54-TlrDh0zOc3wNIQcocZCf78gCKPFeYdDxfJPTGct-FU6hvRerWqyREJD2OcGT6IuhbMbz4JEcx0nQjIrVF_0W8lkEWXc_MjHVFyKjFtkmofZy3Tr6JTZrUYqUu-KUeLqet6Q5yGirNkII3rL-apZK2-PGGeea0BH8TFxHXwC3b5FKIWtPw1649EF4gQ1wSrkJxidk3fMrOx0wLRD-zs4p4pt9GRIMixQntXnAJckBQmiNLr9pl5t2fwwWX2evGHWPgmZVo"
                  alt="Live Streaming"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="material-symbols-outlined text-white text-8xl opacity-80 group-hover:scale-110 transition-transform">
                    {isPlaying ? "pause_circle" : "play_circle"}
                  </span>
                </div>
                <div className="absolute bottom-8 left-8 text-white z-10 space-y-2 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <span className="bg-primary px-3 py-1 font-label text-[10px] font-bold uppercase tracking-widest">In Onda</span>
                  <h3 className="font-headline text-4xl font-bold italic tracking-tight">Il Ponte Transatlantico: Live da Genova</h3>
                  {isPlaying && <p className="font-label text-xs animate-pulse text-primary-container">Streaming Live...</p>}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-8">
                <div className="bg-surface-container-high p-8 flex-1 flex flex-col justify-between border-l-8 border-primary">
                  <div className="space-y-4">
                    <h4 className="font-label text-xs font-black uppercase tracking-widest text-primary">Prossimamente</h4>
                    <div className="space-y-6">
                      <div className="border-b border-outline-variant/30 pb-4">
                        <span className="font-label text-[10px] font-bold opacity-40 block">18:00 — 20:00</span>
                        <span className="font-headline text-xl font-bold italic block">Rotta Italiana</span>
                      </div>
                      <div id="schedule" className="pb-4">
                        <span className="font-label text-[10px] font-bold opacity-40 block">20:00 — 22:00</span>
                        <span className="font-headline text-xl font-bold italic block">Dante Jazz Club</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-on-surface text-surface py-4 font-label text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors">
                    Sincronizza Calendario
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* DYNAMIC ARTICLE FEED */}
          <section id="notizie" className="grid grid-cols-1 md:grid-cols-12 gap-12 scroll-mt-24">
            <div className="md:col-span-8 space-y-12">
              <div className="flex items-center justify-between border-b-2 border-on-surface pb-2">
                <h3 className="font-headline text-2xl font-black uppercase">Articoli e Cultura</h3>
                <span className="font-label text-[10px] font-bold text-primary uppercase tracking-widest">Aggiornato ora</span>
              </div>
              
              <div className="space-y-12">
                {state === "loading" && Array(5).fill(0).map((_, i) => <ArticleShimmer key={i} />)}
                {state === "error" && (
                  <div className="p-8 bg-error-container text-on-error-container font-body text-sm">
                    Errore nel caricamento delle notizie: {error}
                  </div>
                )}
                {state === "success" && articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>

            <aside className="md:col-span-4 space-y-12 pt-16">
              <div className="bg-surface-container-high p-8 space-y-6">
                <h3 className="font-headline text-2xl font-bold tracking-tight text-on-surface italic">Il Corriere Settimanale</h3>
                <p className="font-body text-xs text-on-surface-variant">Analisi essenziale sul rapporto italo-argentino, consegnata nella tua casella ogni sabato mattina.</p>
                <div className="space-y-3">
                  <input className="w-full bg-white border border-outline-variant/30 focus:ring-1 focus:ring-primary px-4 py-3 text-xs placeholder:text-on-surface-variant/50" placeholder="Indirizzo Email" type="email" />
                  <button className="w-full bg-primary text-white py-3 font-label text-xs font-bold uppercase tracking-widest hover:bg-on-primary-fixed-variant transition-colors">Iscriviti</button>
                </div>
              </div>
            </aside>
          </section>

          {/* Bento Grid Featured (Legacy Section for Design continuity) */}
          <section id="archivi" className="space-y-8 scroll-mt-24">
            <div className="flex items-baseline justify-between mb-8 border-b-2 border-on-surface pb-2">
              <h3 className="font-headline text-2xl font-black uppercase tracking-tight">Record dell&apos;Archivio</h3>
              <span className="font-label text-[10px] uppercase font-bold tracking-[0.3em] opacity-50">Selezione Storica</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden bg-on-surface h-[400px]">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuUNpA7Nx7S7mrgSynN-_5v0HQHjPbLf_P38mFqCfSzYsa6irxZb4UEYrSaJBaKvDZwY6T40FX8pSo-Ggs-q5eJPRxsldt1bqpu032RCrKueR9rYlvOMfgzBH9Ayw9XFKkD3TjaFsz126iJp2wkkJzxkaor0JU-g_pYfD-LKbjpMSymaD3GhqaIDMGGKgZY7L4jU48hulsnYaGZ60M6iA8CJ1B8XweaRBr6oXX2ZUa4lg3g2Kaj5gnqPda1vpqbE73_IR2opz75rc" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                  alt="Vintage Studio"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-8">
                  <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 w-fit mb-4">EREDITÀ RADIOFONICA</span>
                  <h4 className="font-headline text-3xl text-white font-bold leading-tight mb-2 italic">La Prima Trasmissione Transatlantica del 1932</h4>
                </div>
              </div>
              
              <div className="md:col-span-2 bg-surface-container-lowest p-8 flex border border-outline-variant/20 gap-8">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVRU9hNCT2jVTnBTfpMwf0yczdyNjV53wemonVVwsb_kVKtkrTV_QFJRTkQd7mPIHQvJSlB7wqnUbg3vUk7LFT5-cv6Bhea9RWbBv0KZAXqXEV_YEQ2cOdkeEzvTa74f5SDfq_V-HhzqxvNwrfLYWA33IFhheEAZ2Yigh58vTBU-atc8LHkuopmgfSDEGp_Whsr_etg5a3xrpEXr8DH10xQfYbuHZzz8uE8GpmIlwFrwTUCAmlSC09xxQut3fNd4dHF5BtqScJxBw"
                  className="w-32 h-32 object-cover grayscale"
                  alt="Film Archive"
                />
                <div>
                  <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Archivi Visivi</span>
                  <h4 className="font-headline text-2xl font-bold mt-2 italic">L&apos;Istituto Luce: I Rulli Sudamericani</h4>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant/30 py-16 px-6 md:ml-64">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <h2 className="text-3xl font-black font-headline text-primary uppercase">L&apos;Italia Al Plata</h2>
            <p className="font-body text-sm text-on-surface-variant max-w-sm leading-relaxed">
              Fondato nel 1924, punto di riferimento per la comunità italiana in Argentina, offrendo notizie, cultura e analisi quotidiane.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-outline-variant/10 text-[10px] font-label uppercase tracking-widest text-secondary text-center">
          © 2026 L&apos;Italia Al Plata / Radio Dante XXI. Tutti i diritti riservati.
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-outline-variant/15 flex justify-around p-3 z-50">
        <span className="material-symbols-outlined text-primary">radio</span>
        <span className="material-symbols-outlined text-on-surface/40">newspaper</span>
        <span className="material-symbols-outlined text-on-surface/40">history</span>
        <span className="material-symbols-outlined text-on-surface/40">person</span>
      </nav>
    </div>
  );
}
