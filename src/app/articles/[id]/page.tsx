"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useArticles } from "@/hooks/useArticles";

export default function ArticleDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { articles, state } = useArticles();

  const article = articles.find((a) => a.id === id);

  if (state === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen animate-pulse space-y-8 p-12">
        <div className="h-12 w-3/4 bg-surface-container-highest" />
        <div className="h-4 w-1/2 bg-surface-container-highest" />
        <div className="h-[400px] w-full bg-surface-container-highest" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-12">
        <h1 className="font-headline text-4xl font-bold mb-4">Articolo non trovato</h1>
        <button 
          onClick={() => router.push("/")}
          className="bg-primary text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-on-primary-fixed-variant transition-colors"
        >
          Torna alla Home
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-12 md:py-24 space-y-12">
      {/* Editorial Header */}
      <header className="space-y-6 border-b-2 border-on-surface pb-12">
        <div className="flex items-center justify-between">
          <span className="font-label text-xs font-black text-primary uppercase tracking-[0.2em]">{article.section}</span>
          <time className="font-label text-xs uppercase opacity-50">
            {new Date(article.publishedAt).toLocaleDateString("it-IT", {
              day: "2-digit",
              month: "long",
              year: "numeric"
            })}
          </time>
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tighter italic">
          {article.title}
        </h1>
        {article.subtitle && (
          <p className="font-headline text-2xl md:text-3xl text-on-surface-variant font-medium leading-tight">
            {article.subtitle}
          </p>
        )}
        <div className="flex items-center space-x-4 pt-6">
          <img src={`https://ui-avatars.com/api/?name=${article.author.name}&background=9b432f&color=fff`} className="w-10 h-10grayscale" alt={article.author.name} />
          <div>
            <p className="font-headline font-bold text-primary">Di {article.author.name}</p>
            <p className="font-body text-[10px] uppercase tracking-widest opacity-60">{article.author.bio}</p>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      {article.featuredImage && (
        <figure className="space-y-3">
          <img 
            src={`https://lh3.googleusercontent.com/aida-public/AB6AXuDu8MC54-TlrDh0zOc3wNIQcocZCf78gCKPFeYdDxfJPTGct-FU6hvRerWqyREJD2OcGT6IuhbMbz4JEcx0nQjIrVF_0W8lkEWXc_MjHVFyKjFtkmofZy3Tr6JTZrUYqUu-KUeLqet6Q5yGirNkII3rL-apZK2-PGGeea0BH8TFxHXwC3b5FKIWtPw1649EF4gQ1wSrkJxidk3fMrOx0wLRD-zs4p4pt9GRIMixQntXnAJckBQmiNLr9pl5t2fwwWX2evGHWPgmZVo`} // Dynamic image placeholder logic
            className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000" 
            alt={article.featuredImage.alt} 
          />
          <figcaption className="font-body text-[10px] italic text-on-surface-variant opacity-60 uppercase tracking-wide">
            {article.featuredImage.caption}
          </figcaption>
        </figure>
      )}

      {/* Article Content */}
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <aside className="md:w-1/4 sticky top-32 space-y-8 border-l border-outline-variant/30 pl-6 hidden md:block">
           <div className="space-y-2">
             <p className="font-label text-[10px] font-bold uppercase tracking-widest text-primary">Tempo di lettura</p>
             <p className="font-headline italic text-2xl tracking-tighter">{article.readTime} minuti</p>
           </div>
           <div className="space-y-4">
             <button className="w-full border-2 border-on-surface py-3 font-label text-[10px] font-black uppercase tracking-widest hover:bg-on-surface hover:text-surface transition-colors">Condividi</button>
             <button className="w-full border-2 border-on-surface py-3 font-label text-[10px] font-black uppercase tracking-widest hover:bg-on-surface hover:text-surface transition-colors">Stampa</button>
           </div>
        </aside>

        <div className="flex-1 space-y-8">
          {article.lead && (
            <p className="font-headline text-2xl font-bold italic leading-relaxed text-primary">
              {article.lead}
            </p>
          )}
          <div className="font-body text-lg leading-relaxed space-y-6 text-on-surface first-letter:text-7xl first-letter:font-headline first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-primary">
            {article.content.split("\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Social Proof */}
          <div className="flex items-center space-x-8 pt-12 border-t border-outline-variant/30">
            <span className="font-label text-[10px] font-bold uppercase tracking-widest opacity-40">
              {article.comments} Commenti
            </span>
            <span className="font-label text-[10px] font-bold uppercase tracking-widest opacity-40">
              {article.shares} Condivisioni
            </span>
          </div>
        </div>
      </div>

      {/* Tag Cloud */}
      <div className="flex flex-wrap gap-2 pt-12">
        {article.tags.map((tag) => (
          <span key={tag} className="border border-on-surface/20 px-3 py-1 font-label text-[8px] font-bold uppercase tracking-widest">
            {tag}
          </span>
        ))}
      </div>

      <footer className="pt-24 border-t-4 border-on-surface">
        <button 
          onClick={() => router.push("/")}
          className="font-headline text-2xl font-black uppercase tracking-tighter italic border-b-2 border-primary text-primary"
        >
          ← Torna all&apos;Abacho di Radio Dante
        </button>
      </footer>
    </article>
  );
}
