"use client";

import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --red: #c8102e;
    --gold: #f5c842;
    --dark: #0d0a06;
    --brown-deep: #1a0e07;
    --brown: #2b1a0d;
    --brown-mid: #3d2510;
    --cream: #f5e9cc;
    --nav-h: 64px;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--dark);
    overflow-x: hidden;
    font-family: 'Crimson Text', serif;
    -webkit-font-smoothing: antialiased;
  }

  body::after {
    content: '';
    position: fixed; inset: 0; z-index: 9999;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    opacity: 0.35;
  }

  /* ─── NAVBAR ─────────────────────────────────────── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0;
    height: var(--nav-h); z-index: 200;
    display: flex; align-items: center;
    justify-content: space-between;
    padding: 0 clamp(16px, 4vw, 48px);
    background: rgba(13,10,6,0.92);
    border-bottom: 1px solid rgba(245,200,66,0.18);
    backdrop-filter: blur(14px);
    transition: background 0.3s;
  }
  .nav.opaque { background: rgba(13,10,6,0.99); }

  .nav-brand {
    display: flex; align-items: center; gap: 10px;
    flex-shrink: 0; min-width: 0;
  }
  .nav-flag {
    display: flex; align-items: center; justify-content: center;
    width: 40px; height: 27px; flex-shrink: 0;
    background: var(--red);
    box-shadow: 0 0 10px rgba(200,16,46,0.45);
  }
  .nav-flag span { color: var(--gold); font-size: 15px; line-height: 1; }

  .nav-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(0.85rem, 2vw, 1.2rem);
    font-weight: 900; color: var(--gold);
    letter-spacing: 0.03em;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    text-shadow: 0 0 20px rgba(245,200,66,0.3);
  }

  .nav-links {
    display: flex; gap: clamp(12px, 2vw, 28px);
    flex-shrink: 0; flex-wrap: nowrap;
  }
  .nav-links a {
    font-family: 'Crimson Text', serif;
    font-size: clamp(0.65rem, 1.1vw, 0.82rem);
    color: rgba(245,233,204,0.6);
    text-decoration: none; letter-spacing: 0.08em;
    text-transform: uppercase; transition: color 0.25s;
    white-space: nowrap;
  }
  .nav-links a:hover { color: var(--gold); }

  @media (max-width: 700px) {
    .nav-links { display: none; }
    .nav-title { font-size: 0.9rem; }
  }

  /* ─── HERO ───────────────────────────────────────── */
  .hero {
    position: relative;
    width: 100%; min-height: 100svh;
    display: flex; align-items: flex-end;
    overflow: hidden;
    padding-top: var(--nav-h);
  }

  .hero-sky {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom,
      #1a1015 0%, #2d1810 15%, #4a2515 35%,
      #5d3018 55%, #7a4020 72%, #563015 85%, #2a1510 100%
    );
  }

  .hero-stars {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      radial-gradient(1px 1px at 8% 10%, rgba(255,255,255,.75) 0%, transparent 100%),
      radial-gradient(1px 1px at 22% 6%, rgba(255,255,255,.5) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 40% 16%, rgba(255,255,255,.85) 0%, transparent 100%),
      radial-gradient(1px 1px at 57% 9%, rgba(255,255,255,.6) 0%, transparent 100%),
      radial-gradient(1px 1px at 74% 4%, rgba(255,255,255,.7) 0%, transparent 100%),
      radial-gradient(1px 1px at 89% 13%, rgba(255,255,255,.5) 0%, transparent 100%),
      radial-gradient(2px 2px at 33% 3%, rgba(255,240,180,.9) 0%, transparent 100%),
      radial-gradient(1px 1px at 62% 20%, rgba(255,255,255,.4) 0%, transparent 100%),
      radial-gradient(1px 1px at 15% 28%, rgba(255,255,255,.35) 0%, transparent 100%);
  }

  .hero-smoke {
    position: absolute; border-radius: 50%;
    filter: blur(50px); pointer-events: none;
    animation: smokeDrift 10s ease-in-out infinite;
  }
  .hs1{width:min(320px,40vw);height:min(200px,25vw);top:6%;left:4%;background:rgba(220,100,30,.18);animation-delay:0s}
  .hs2{width:min(200px,28vw);height:min(140px,18vw);top:18%;left:60%;background:rgba(240,120,40,.15);animation-delay:3s}
  .hs3{width:min(250px,35vw);height:min(155px,20vw);top:8%;left:76%;background:rgba(180,80,20,.12);animation-delay:6s}

  @keyframes smokeDrift {
    0%,100%{transform:translateX(0) scale(1);opacity:.6}
    50%{transform:translateX(20px) scale(1.15);opacity:1}
  }

  .hero-hill {
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: clamp(280px, 55%, 520px);
    pointer-events: none;
  }

  .hero-body {
    position: relative; z-index: 10;
    width: 100%;
    padding: clamp(24px,5vw,80px) clamp(16px,5vw,64px) clamp(40px,6vw,88px);
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: flex-end;
    gap: clamp(16px, 3vw, 48px);
  }

  @media (max-width: 640px) {
    .hero-body { grid-template-columns: 1fr; }
    .hero-stat { justify-self: flex-start; }
  }

  .hero-eyebrow {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Crimson Text', serif;
    font-size: clamp(0.72rem, 1.5vw, 0.88rem);
    letter-spacing: 0.28em; color: var(--red);
    text-transform: uppercase; margin-bottom: 12px;
  }
  .hero-eyebrow::before {
    content: ''; display: block;
    width: clamp(20px, 3vw, 36px); height: 1px; background: var(--red); flex-shrink: 0;
  }

  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.4rem, 7vw, 5.5rem);
    font-weight: 900; line-height: 1.04;
    color: var(--cream);
    text-shadow: 0 4px 40px rgba(0,0,0,.9);
    margin-bottom: 10px;
  }
  .hero-title span { color: var(--gold); display: block; }

  .hero-subtitle {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1rem, 2.2vw, 1.4rem);
    font-style: italic; color: var(--gold);
    margin-bottom: clamp(12px, 2vw, 20px);
    text-shadow: 0 0 18px rgba(245,200,66,.4);
  }

  .hero-desc {
    font-family: 'Crimson Text', serif;
    font-size: clamp(0.95rem, 1.8vw, 1.12rem);
    line-height: 1.8; color: rgba(245,233,204,.82);
    max-width: min(540px, 100%);
  }

  .hero-stat { text-align: center; padding-bottom: 4px; }
  .hero-stat-label {
    font-family: 'Crimson Text', serif;
    font-size: clamp(0.68rem, 1.2vw, 0.82rem);
    letter-spacing: .14em; text-transform: uppercase;
    color: rgba(245,233,204,.42); margin-bottom: 4px;
  }
  .hero-stat-num {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3.5rem, 8vw, 5.5rem);
    font-weight: 900; color: var(--gold); line-height: 1;
    text-shadow: 0 0 36px rgba(245,200,66,.5);
  }
  .hero-stat-sub {
    font-family: 'Crimson Text', serif;
    font-size: clamp(0.68rem, 1.2vw, 0.82rem);
    color: rgba(245,233,204,.42); letter-spacing: .07em;
  }

  /* ─── SHARED SECTION STYLES ──────────────────────── */
  .sec {
    padding: clamp(48px, 8vw, 96px) clamp(16px, 5vw, 64px);
  }
  .sec-label {
    font-family: 'Crimson Text', serif;
    font-size: clamp(0.7rem, 1.2vw, 0.8rem);
    letter-spacing: .34em; color: var(--red);
    text-transform: uppercase; text-align: center; margin-bottom: 8px;
  }
  .sec-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 4vw, 2.9rem);
    font-weight: 900; text-align: center; color: var(--gold);
    margin-bottom: clamp(32px, 5vw, 60px);
    text-shadow: 0 0 30px rgba(245,200,66,.22);
  }
  .sec-inner {
    max-width: min(1100px, 100%);
    margin: 0 auto;
  }

  /* ─── A1 SECTION ─────────────────────────────────── */
  .sec-a1 { background: var(--brown-deep); position: relative; overflow: hidden; }
  .sec-a1::before {
    content:''; position:absolute; inset:0;
    background: radial-gradient(ellipse at 50% 110%, rgba(139,58,16,.12) 0%, transparent 60%);
    pointer-events: none;
  }

  .a1-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(340px, 100%), 1fr));
    gap: clamp(24px, 4vw, 52px);
    align-items: center;
  }

  .a1-img-wrap {
    position: relative;
    border: 2px solid rgba(245,200,66,.22); border-radius: 3px;
    overflow: hidden; aspect-ratio: 4/3;
  }
  .a1-img-wrap::after {
    content:''; position:absolute; inset:0;
    background: linear-gradient(to top, rgba(13,10,6,.62) 0%, transparent 52%);
  }
  .a1-img-wrap img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    filter: sepia(15%) brightness(.88);
    transition: filter .4s;
  }
  .a1-img-wrap:hover img { filter: sepia(5%) brightness(.96); }
  .a1-img-cap {
    position: absolute; bottom: 0; left: 0; right: 0; z-index: 2;
    padding: clamp(12px,2vw,18px) clamp(14px,2.5vw,22px);
    font-family: 'Crimson Text', serif; color: var(--cream);
    font-style: italic; font-size: clamp(.82rem,1.5vw,.96rem);
  }

  .a1-info h3 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.4rem, 3vw, 2rem);
    font-weight: 900; color: var(--gold); margin-bottom: 16px;
  }
  .a1-info p {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.95rem, 1.7vw, 1.1rem);
    line-height: 1.85; color: rgba(245,233,204,.82); margin-bottom: 16px;
  }
  .a1-info strong { color: var(--gold); }

  .stats {
    display: flex; flex-wrap: wrap;
    gap: clamp(10px, 2vw, 20px); margin-top: clamp(20px,3vw,32px);
  }
  .stat {
    flex: 1 1 80px; text-align: center;
    padding: clamp(10px,1.5vw,14px) clamp(12px,2vw,20px);
    border: 1px solid rgba(245,200,66,.2);
    background: rgba(245,200,66,.04);
  }
  .stat-n {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.4rem, 3vw, 1.9rem);
    font-weight: 900; color: var(--gold); display: block;
  }
  .stat-l {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.7rem, 1.3vw, .8rem);
    color: rgba(245,233,204,.5); letter-spacing: .03em;
  }

  /* ─── GALLERY ────────────────────────────────────── */
  .sec-gallery { background: var(--brown); }

  .gallery {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: clamp(160px, 20vw, 260px);
    gap: clamp(6px, 1vw, 12px);
  }

  .g0 { grid-column: span 5; grid-row: span 2; }
  .g1 { grid-column: span 4; }
  .g2 { grid-column: span 3; }
  .g3 { grid-column: span 4; }
  .g4 { grid-column: span 3; }

  @media (max-width: 900px) {
    .g0 { grid-column: span 6; grid-row: span 2; }
    .g1 { grid-column: span 6; }
    .g2 { grid-column: span 6; }
    .g3 { grid-column: span 6; }
    .g4 { grid-column: span 6; }
  }

  @media (max-width: 560px) {
    .gallery { grid-template-columns: 1fr 1fr; grid-auto-rows: 44vw; }
    .g0 { grid-column: span 2; grid-row: span 1; }
    .g1,.g2,.g3,.g4 { grid-column: span 1; }
  }

  .g-item {
    position: relative; overflow: hidden;
    border: 1px solid rgba(245,200,66,.1);
  }
  .g-item img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    filter: sepia(22%) brightness(.82);
    transition: transform .55s ease, filter .38s ease;
  }
  .g-item:hover img { transform: scale(1.06); filter: sepia(4%) brightness(1); }
  .g-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(13,10,6,.88) 0%, transparent 52%);
    opacity: 0; transition: opacity .35s;
  }
  .g-item:hover .g-overlay { opacity: 1; }
  .g-cap {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: clamp(10px,1.5vw,16px) clamp(12px,2vw,18px);
    font-family: 'Crimson Text', serif; color: var(--cream);
    font-size: clamp(.8rem,1.4vw,.98rem); font-style: italic;
    transform: translateY(8px); opacity: 0;
    transition: transform .35s, opacity .35s;
  }
  .g-item:hover .g-cap { transform: translateY(0); opacity: 1; }

  /* ─── TIMELINE ───────────────────────────────────── */
  .sec-timeline { background: var(--brown-deep); }

  .timeline {
    max-width: min(820px, 100%);
    margin: 0 auto; position: relative;
  }
  .timeline::before {
    content: ''; position: absolute;
    left: clamp(20px, 4vw, 32px); top: 0; bottom: 0; width: 1px;
    background: linear-gradient(to bottom, transparent, rgba(245,200,66,.35) 8%, rgba(245,200,66,.35) 92%, transparent);
  }

  .tl-item {
    display: flex;
    gap: clamp(12px, 3vw, 28px);
    align-items: flex-start;
    margin-bottom: clamp(28px, 4vw, 48px);
    animation: fadeSlide .55s ease forwards; opacity: 0;
  }
  .tl-item:nth-child(1){animation-delay:.08s}
  .tl-item:nth-child(2){animation-delay:.2s}
  .tl-item:nth-child(3){animation-delay:.32s}
  .tl-item:nth-child(4){animation-delay:.44s}
  .tl-item:nth-child(5){animation-delay:.56s}

  @keyframes fadeSlide {
    from{opacity:0;transform:translateX(-16px)}
    to{opacity:1;transform:translateX(0)}
  }

  .tl-dot {
    width: clamp(40px, 6vw, 64px);
    flex-shrink: 0; display: flex;
    justify-content: center; padding-top: 5px;
  }
  .tl-dot-inner {
    width: 11px; height: 11px; border-radius: 50%;
    background: var(--gold); border: 2px solid var(--dark);
    box-shadow: 0 0 10px rgba(245,200,66,.55); z-index: 1;
  }

  .tl-body {
    flex: 1; min-width: 0;
    background: rgba(61,37,16,.38);
    border: 1px solid rgba(245,200,66,.12);
    border-left: 3px solid var(--red);
    padding: clamp(14px,2vw,20px) clamp(16px,2.5vw,24px);
    transition: background .3s, border-color .3s;
  }
  .tl-body:hover { background: rgba(61,37,16,.65); border-color: rgba(245,200,66,.32); }

  .tl-date {
    font-family: 'Playfair Display', serif;
    font-size: clamp(.95rem, 1.8vw, 1.15rem);
    font-weight: 700; color: var(--gold); margin-bottom: 7px;
  }
  .tl-text {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.9rem, 1.6vw, 1.05rem);
    line-height: 1.75; color: rgba(245,233,204,.82);
  }

  /* ─── SIGNIFICANCE ───────────────────────────────── */
  .sec-sig {
    background: linear-gradient(135deg, var(--brown-mid) 0%, var(--brown-deep) 100%);
    position: relative; overflow: hidden;
  }
  .sec-sig::before {
    content: '★'; position: absolute;
    font-size: clamp(30vw, 42vw, 55vw);
    color: rgba(245,200,66,.015);
    top: 50%; left: 50%; transform: translate(-50%,-50%);
    font-family: serif; line-height: 1; pointer-events: none;
  }

  .sig-inner {
    max-width: min(900px, 100%);
    margin: 0 auto; text-align: center; position: relative;
  }
  .sig-quote {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.15rem, 3vw, 1.9rem);
    font-style: italic; font-weight: 700;
    color: var(--cream); line-height: 1.65; margin-bottom: 24px;
  }
  .sig-quote em { color: var(--gold); font-style: normal; }
  .sig-body {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.95rem, 1.8vw, 1.12rem);
    line-height: 1.9; color: rgba(245,233,204,.78);
  }

  /* ─── THEORY SECTION ────────────────────────────── */
  .sec-theory { background: var(--brown-mid); position: relative; }
  .sec-theory::after {
    content:''; position:absolute; inset:0;
    background: radial-gradient(ellipse at 30% -20%, rgba(200,16,46,.08) 0%, transparent 60%);
    pointer-events: none;
  }

  .theory-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
    gap: clamp(20px, 3vw, 40px);
    position: relative; z-index: 1;
  }

  .theory-card {
    background: rgba(61,37,16,.35);
    border: 1px solid rgba(245,200,66,.15);
    padding: clamp(20px, 2.5vw, 28px);
    border-radius: 2px;
    transition: all .3s;
  }
  .theory-card:hover {
    background: rgba(61,37,16,.55);
    border-color: rgba(245,200,66,.32);
    transform: translateY(-2px);
  }

  .theory-card h4 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    font-weight: 700; color: var(--gold);
    margin-bottom: 12px;
  }

  .theory-card p {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.9rem, 1.5vw, 1rem);
    line-height: 1.75; color: rgba(245,233,204,.78);
  }

  /* ─── MAP SECTION ────────────────────────────────── */
  .sec-map { background: var(--brown); position: relative; overflow: hidden; }

  .map-container {
    max-width: min(900px, 100%);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(20px, 3vw, 40px);
    align-items: center;
  }

  @media (max-width: 768px) {
    .map-container { grid-template-columns: 1fr; }
  }

  .map-visual {
    background: rgba(61,37,16,.4);
    border: 2px solid rgba(245,200,66,.22);
    border-radius: 3px;
    aspect-ratio: 4/3;
    overflow: hidden;
    position: relative;
  }

  .map-tabs {
    display: flex; gap: 12px; margin-bottom: 20px; justify-content: center;
    flex-wrap: wrap;
  }

  .map-tab-btn {
    padding: 12px 24px;
    background: rgba(200,16,46,.2);
    border: 2px solid rgba(200,16,46,.4);
    color: var(--gold);
    font-family: 'Crimson Text', serif;
    font-size: 15px;
    cursor: pointer;
    transition: all .3s;
    border-radius: 2px;
  }

  .map-tab-btn.active {
    background: rgba(200,16,46,.7);
    border-color: var(--gold);
    box-shadow: 0 0 15px rgba(200,16,46,.5);
  }

  .map-tab-btn:hover { background: rgba(200,16,46,.5); }

  .map-phase-buttons {
    display: flex; flex-wrap: wrap; gap: 12px;
    margin-bottom: 24px; justify-content: center;
  }

  .map-phase-btn {
    padding: 10px 16px;
    background: rgba(200,16,46,.2);
    border: 2px solid rgba(200,16,46,.4);
    color: var(--gold);
    font-family: 'Crimson Text', serif;
    font-size: 14px;
    cursor: pointer;
    transition: all .3s;
    border-radius: 2px;
  }

  .map-phase-btn.active {
    background: rgba(200,16,46,.7);
    border-color: var(--gold);
  }

  .map-phase-btn:hover { background: rgba(200,16,46,.5); }

  .map-legend {
    display: flex; flex-direction: column; gap: 12px;
  }

  .legend-item {
    display: flex; align-items: center; gap: 10px;
  }

  .legend-color {
    width: 24px; height: 24px; flex-shrink: 0;
    border-radius: 2px; border: 1px solid rgba(245,200,66,.3);
  }

  .legend-text {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.9rem, 1.5vw, 1rem);
    color: rgba(245,233,204,.82);
  }

  .legend-text strong { color: var(--gold); }

  .map-phase-info {
    background: rgba(61,37,16,.5);
    border: 1px solid rgba(245,200,66,.2);
    padding: clamp(16px, 2.5vw, 24px);
    border-radius: 2px;
    margin-top: 16px;
  }

  .map-phase-info h4 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1rem, 1.8vw, 1.3rem);
    color: var(--gold); margin-bottom: 8px;
  }

  .map-phase-info p {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.9rem, 1.5vw, 1rem);
    color: rgba(245,233,204,.82); line-height: 1.7;
  }

  /* ─── COMMANDERS SECTION ─────────────────────────── */
  .sec-commanders { background: var(--brown-deep); position: relative; }
  .sec-commanders::before {
    content:''; position:absolute; inset:0;
    background: radial-gradient(ellipse at 70% 50%, rgba(200,16,46,.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .commanders-carousel {
    position: relative;
    max-width: min(1000px, 100%);
    margin: 0 auto;
  }

  .carousel-inner {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));
    gap: clamp(16px, 2.5vw, 32px);
    position: relative; z-index: 1;
  }

  .carousel-controls {
    display: flex; justify-content: center; gap: 20px;
    margin-top: 32px;
  }

  .carousel-btn {
    background: rgba(200,16,46,.3);
    border: 2px solid rgba(200,16,46,.6);
    color: var(--gold);
    padding: 10px 20px;
    cursor: pointer;
    font-family: 'Crimson Text', serif;
    font-size: 14px;
    transition: all .3s;
    border-radius: 2px;
  }

  .carousel-btn:hover { background: rgba(200,16,46,.6); transform: scale(1.05); }
  .carousel-btn:disabled { opacity: 0.3; cursor: not-allowed; }

  .commanders-title-label {
    text-align: center;
    margin-bottom: 24px;
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.3rem, 2.2vw, 1.8rem);
    color: var(--gold);
  }

  .commander-card {
    background: rgba(61,37,16,.5);
    border: 1px solid rgba(245,200,66,.2);
    border-radius: 2px;
    overflow: hidden;
    transition: all .3s;
    cursor: pointer;
  }

  .commander-card:hover {
    background: rgba(61,37,16,.75);
    border-color: rgba(245,200,66,.4);
    transform: translateY(-3px);
  }

  .commander-avatar {
    width: 100%; aspect-ratio: 1;
    overflow: hidden;
    background: linear-gradient(135deg, rgba(200,16,46,.2), rgba(245,200,66,.1));
    display: flex; align-items: center; justify-content: center;
    font-size: 48px;
  }

  .commander-info {
    padding: clamp(12px, 1.5vw, 18px);
  }

  .commander-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(.88rem, 1.4vw, 1rem);
    font-weight: 700; color: var(--cream);
    margin-bottom: 4px;
  }

  .commander-rank {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.75rem, 1.2vw, .88rem);
    color: rgba(245,233,204,.5); font-style: italic;
    margin-bottom: 4px;
  }

  .commander-role {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.8rem, 1.3vw, .92rem);
    color: rgba(245,233,204,.7);
  }

  /* ─── VIDEO SECTION ──────────────────────────────── */
  .sec-video {
    background: var(--dark);
    position: relative;
    overflow: hidden;
  }
  .sec-video::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 20% 50%, rgba(200,16,46,.07) 0%, transparent 55%),
      radial-gradient(ellipse at 80% 50%, rgba(245,200,66,.04) 0%, transparent 55%);
    pointer-events: none;
  }

  .video-tabs {
    display: flex; gap: 0; margin-bottom: clamp(24px, 4vw, 48px);
    justify-content: center;
    border: 1px solid rgba(245,200,66,.2);
    border-radius: 3px;
    overflow: hidden;
    max-width: 500px;
    margin-left: auto; margin-right: auto;
    margin-bottom: clamp(24px, 4vw, 48px);
  }

  .vtab-btn {
    flex: 1;
    padding: 14px 20px;
    background: transparent;
    border: none;
    color: rgba(245,233,204,.55);
    font-family: 'Crimson Text', serif;
    font-size: clamp(0.85rem, 1.5vw, 1rem);
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: all .3s;
    border-right: 1px solid rgba(245,200,66,.2);
    position: relative;
  }
  .vtab-btn:last-child { border-right: none; }
  .vtab-btn.active {
    background: rgba(200,16,46,.35);
    color: var(--gold);
  }
  .vtab-btn:hover:not(.active) { background: rgba(61,37,16,.5); color: var(--cream); }

  /* VIDEO GRID */
  .video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(340px, 100%), 1fr));
    gap: clamp(20px, 3vw, 36px);
    max-width: min(1100px, 100%);
    margin: 0 auto;
  }

  .video-card {
    background: rgba(26,14,7,.8);
    border: 1px solid rgba(245,200,66,.15);
    border-radius: 4px;
    overflow: hidden;
    transition: border-color .3s, transform .3s;
  }
  .video-card:hover {
    border-color: rgba(245,200,66,.38);
    transform: translateY(-4px);
  }

  .video-embed-wrap {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    background: #000;
  }
  .video-embed-wrap iframe {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    border: none;
  }

  .video-card-body {
    padding: clamp(14px, 2vw, 22px);
  }

  .video-card-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1rem, 1.8vw, 1.22rem);
    font-weight: 700; color: var(--gold);
    margin-bottom: 8px;
  }

  .video-card-desc {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.88rem, 1.4vw, 1rem);
    color: rgba(245,233,204,.7);
    line-height: 1.6;
  }

  /* ─── MUSIC SECTION ──────────────────────────────── */
  .music-section {
    max-width: min(860px, 100%);
    margin: 0 auto;
  }

  .music-hero-banner {
    position: relative;
    background: linear-gradient(135deg, #1a0e07 0%, #2b1208 50%, #1a0e07 100%);
    border: 1px solid rgba(245,200,66,.25);
    border-radius: 6px;
    overflow: hidden;
    padding: clamp(28px, 4vw, 48px);
    margin-bottom: clamp(24px, 3.5vw, 40px);
  }
  .music-hero-banner::before {
    content: '♩';
    position: absolute; top: -10px; right: 20px;
    font-size: 160px; line-height: 1;
    color: rgba(245,200,66,.04);
    font-family: serif;
    pointer-events: none;
  }

  .music-song-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.4rem, 3vw, 2.2rem);
    font-weight: 900;
    color: var(--gold);
    margin-bottom: 6px;
  }

  .music-song-meta {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.9rem, 1.5vw, 1.05rem);
    color: rgba(245,233,204,.6);
    font-style: italic;
    margin-bottom: clamp(20px, 3vw, 32px);
  }

  /* Custom audio player */
  .audio-player {
    background: rgba(13,10,6,.6);
    border: 1px solid rgba(245,200,66,.18);
    border-radius: 4px;
    padding: clamp(16px, 2.5vw, 24px);
  }

  .audio-controls {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 14px;
  }

  .play-btn {
    width: 52px; height: 52px;
    border-radius: 50%;
    background: var(--red);
    border: 2px solid rgba(245,200,66,.4);
    color: var(--gold);
    font-size: 20px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all .25s;
    flex-shrink: 0;
    box-shadow: 0 0 20px rgba(200,16,46,.45);
  }
  .play-btn:hover {
    background: #e01535;
    transform: scale(1.08);
    box-shadow: 0 0 30px rgba(200,16,46,.65);
  }

  .time-display {
    font-family: 'Crimson Text', serif;
    font-size: 13px;
    color: rgba(245,233,204,.55);
    letter-spacing: .04em;
    white-space: nowrap;
    min-width: 80px;
  }

  .volume-wrap {
    display: flex; align-items: center; gap: 8px;
    margin-left: auto;
  }
  .vol-icon {
    font-size: 16px;
    color: rgba(245,233,204,.5);
  }

  .progress-wrap {
    position: relative;
    height: 6px;
    background: rgba(245,200,66,.12);
    border-radius: 3px;
    cursor: pointer;
    overflow: hidden;
    margin-bottom: 6px;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(to right, var(--red), var(--gold));
    border-radius: 3px;
    transition: width .15s linear;
    pointer-events: none;
  }

  .volume-slider, .seek-slider {
    -webkit-appearance: none;
    appearance: none;
    height: 4px;
    border-radius: 2px;
    background: rgba(245,200,66,.2);
    outline: none;
    cursor: pointer;
  }
  .seek-slider {
    width: 100%;
    height: 6px;
    background: rgba(245,200,66,.12);
  }
  .seek-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: var(--gold);
    box-shadow: 0 0 6px rgba(245,200,66,.6);
    cursor: pointer;
  }
  .volume-slider { width: 80px; }
  .volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px; height: 12px;
    border-radius: 50%;
    background: var(--gold);
    cursor: pointer;
  }

  .audio-source-note {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.78rem, 1.2vw, .88rem);
    color: rgba(245,233,204,.38);
    text-align: center;
    margin-top: 10px;
    font-style: italic;
  }

  .lyrics-card {
    background: rgba(26,14,7,.7);
    border: 1px solid rgba(245,200,66,.15);
    border-left: 3px solid var(--red);
    border-radius: 3px;
    padding: clamp(20px, 3vw, 36px);
    margin-bottom: 24px;
  }

  .lyrics-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1rem, 1.8vw, 1.3rem);
    font-weight: 700;
    color: var(--gold);
    margin-bottom: 16px;
    display: flex; align-items: center; gap: 10px;
  }

  .lyrics-body {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.92rem, 1.6vw, 1.05rem);
    line-height: 2;
    color: rgba(245,233,204,.82);
    white-space: pre-line;
  }

  .lyrics-body .chorus {
    color: var(--gold);
    font-style: italic;
    font-weight: 600;
  }

  .song-info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
    gap: 16px;
    margin-top: 24px;
  }

  .song-info-card {
    background: rgba(61,37,16,.35);
    border: 1px solid rgba(245,200,66,.12);
    border-radius: 3px;
    padding: 18px;
    text-align: center;
  }

  .song-info-label {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.7rem, 1.1vw, .8rem);
    letter-spacing: .16em;
    text-transform: uppercase;
    color: rgba(245,233,204,.38);
    margin-bottom: 6px;
  }

  .song-info-value {
    font-family: 'Playfair Display', serif;
    font-size: clamp(.95rem, 1.6vw, 1.15rem);
    font-weight: 700;
    color: var(--cream);
  }

  .youtube-music-embed {
    margin-top: 32px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid rgba(245,200,66,.2);
  }

  .youtube-music-embed iframe {
    width: 100%;
    height: 80px;
    border: none;
    display: block;
  }

  /* ─── MEMORIAL SECTION ───────────────────────────── */
  .sec-memorial {
    background: #060402;
    position: relative;
    overflow: hidden;
  }

  /* Deep atmospheric background */
  .sec-memorial::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 50% 0%, rgba(200,16,46,.06) 0%, transparent 50%),
      radial-gradient(ellipse at 20% 100%, rgba(245,200,66,.03) 0%, transparent 45%),
      radial-gradient(ellipse at 80% 100%, rgba(245,200,66,.03) 0%, transparent 45%);
    pointer-events: none;
  }

  /* Animated falling particles (ash/petals) */
  .memorial-particles {
    position: absolute; inset: 0;
    pointer-events: none; overflow: hidden;
  }
  .mp {
    position: absolute; top: -10px;
    width: 3px; height: 3px;
    border-radius: 50%;
    background: rgba(245,200,66,.25);
    animation: mpFall linear infinite;
  }
  .mp:nth-child(1)  { left:5%;  width:2px;height:2px; animation-duration:9s;  animation-delay:0s;   opacity:.18; }
  .mp:nth-child(2)  { left:13%; width:3px;height:3px; animation-duration:12s; animation-delay:1.5s; opacity:.22; }
  .mp:nth-child(3)  { left:22%; width:2px;height:2px; animation-duration:8s;  animation-delay:3s;   opacity:.15; }
  .mp:nth-child(4)  { left:31%; width:4px;height:4px; animation-duration:14s; animation-delay:0.8s; opacity:.12; }
  .mp:nth-child(5)  { left:42%; width:2px;height:2px; animation-duration:10s; animation-delay:5s;   opacity:.2;  }
  .mp:nth-child(6)  { left:54%; width:3px;height:3px; animation-duration:11s; animation-delay:2.2s; opacity:.17; }
  .mp:nth-child(7)  { left:63%; width:2px;height:2px; animation-duration:9s;  animation-delay:6s;   opacity:.14; }
  .mp:nth-child(8)  { left:72%; width:3px;height:3px; animation-duration:13s; animation-delay:1s;   opacity:.2;  }
  .mp:nth-child(9)  { left:84%; width:2px;height:2px; animation-duration:10s; animation-delay:4s;   opacity:.16; }
  .mp:nth-child(10) { left:93%; width:4px;height:4px; animation-duration:15s; animation-delay:7s;   opacity:.1;  }
  .mp:nth-child(11) { left:8%;  width:2px;height:2px; animation-duration:11s; animation-delay:8s;   opacity:.2;  background:rgba(200,16,46,.3); }
  .mp:nth-child(12) { left:47%; width:3px;height:3px; animation-duration:9s;  animation-delay:2.8s; opacity:.18; background:rgba(200,16,46,.25); }

  @keyframes mpFall {
    0%   { transform: translateY(0)    translateX(0)   rotate(0deg);   opacity: 0; }
    5%   { opacity: 1; }
    90%  { opacity: 0.8; }
    100% { transform: translateY(110vh) translateX(30px) rotate(360deg); opacity: 0; }
  }

  /* Divider ornament */
  .memorial-divider {
    display: flex; align-items: center; gap: 18px;
    justify-content: center;
    margin-bottom: clamp(36px, 5vw, 64px);
  }
  .memorial-divider-line {
    flex: 1; max-width: 180px; height: 1px;
    background: linear-gradient(to right, transparent, rgba(245,200,66,.35));
  }
  .memorial-divider-line.right {
    background: linear-gradient(to left, transparent, rgba(245,200,66,.35));
  }
  .memorial-divider-icon {
    font-size: 22px;
    color: rgba(245,200,66,.6);
    text-shadow: 0 0 12px rgba(245,200,66,.4);
  }

  /* Eternal flame / candle row */
  .candle-row {
    display: flex;
    justify-content: center;
    gap: clamp(16px, 3vw, 36px);
    margin-bottom: clamp(32px, 5vw, 56px);
    flex-wrap: wrap;
  }

  /* SVG Candle */
  .candle-wrap {
    display: flex; flex-direction: column; align-items: center;
    gap: 6px;
  }
  .candle-svg { width: clamp(28px, 4vw, 44px); height: auto; }
  .candle-label {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.65rem, 1vw, .75rem);
    color: rgba(245,233,204,.35);
    letter-spacing: .08em;
    text-align: center;
  }

  /* Flame flicker keyframes */
  @keyframes flicker {
    0%,100% { transform: scaleX(1)   scaleY(1)   translateY(0); opacity: .95; }
    20%     { transform: scaleX(.92) scaleY(1.1) translateY(-1px); opacity: 1; }
    40%     { transform: scaleX(1.05) scaleY(.94) translateY(0); opacity: .88; }
    60%     { transform: scaleX(.96) scaleY(1.08) translateY(-2px); opacity: 1; }
    80%     { transform: scaleX(1.04) scaleY(.96) translateY(0); opacity: .92; }
  }
  @keyframes glow {
    0%,100% { filter: drop-shadow(0 0 6px rgba(255,160,40,.6)); }
    50%     { filter: drop-shadow(0 0 14px rgba(255,180,60,.9)); }
  }
  .flame-g {
    animation: flicker 2.4s ease-in-out infinite, glow 2.4s ease-in-out infinite;
    transform-origin: 50% 100%;
  }
  .flame-g:nth-child(2) { animation-delay: .4s; }
  .flame-g:nth-child(3) { animation-delay: .8s; }
  .flame-g:nth-child(4) { animation-delay: 1.2s; }
  .flame-g:nth-child(5) { animation-delay: 1.6s; }
  .flame-g:nth-child(6) { animation-delay: 2s; }
  .flame-g:nth-child(7) { animation-delay: .2s; }

  /* Central epitaph */
  .epitaph-block {
    text-align: center;
    max-width: min(760px, 100%);
    margin: 0 auto clamp(40px, 6vw, 72px);
    padding: clamp(24px, 4vw, 48px);
    border: 1px solid rgba(245,200,66,.12);
    border-top: 3px solid rgba(200,16,46,.5);
    background: rgba(10,6,2,.6);
    position: relative;
  }
  .epitaph-block::before,
  .epitaph-block::after {
    content: '✦';
    position: absolute; top: 16px;
    color: rgba(245,200,66,.25);
    font-size: 12px;
  }
  .epitaph-block::before { left: 16px; }
  .epitaph-block::after  { right: 16px; }

  .epitaph-verse {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.1rem, 2.5vw, 1.65rem);
    font-style: italic; font-weight: 700;
    color: var(--cream);
    line-height: 1.75;
    margin-bottom: 18px;
  }
  .epitaph-verse em { color: var(--gold); font-style: normal; }

  .epitaph-attr {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.82rem, 1.3vw, .95rem);
    color: rgba(245,233,204,.4);
    letter-spacing: .1em;
    text-transform: uppercase;
  }

  /* Casualties stats strip */
  .memorial-stats {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1px;
    margin-bottom: clamp(40px, 6vw, 72px);
    border: 1px solid rgba(245,200,66,.1);
    overflow: hidden;
    border-radius: 3px;
    max-width: min(900px, 100%);
    margin-left: auto; margin-right: auto;
    margin-bottom: clamp(40px, 6vw, 72px);
  }
  .mem-stat {
    flex: 1 1 160px;
    text-align: center;
    padding: clamp(18px, 2.5vw, 28px) clamp(12px, 2vw, 20px);
    background: rgba(16,8,3,.7);
    border-right: 1px solid rgba(245,200,66,.08);
    position: relative;
  }
  .mem-stat:last-child { border-right: none; }
  .mem-stat-icon {
    font-size: clamp(1.2rem, 2vw, 1.6rem);
    margin-bottom: 8px;
    display: block;
  }
  .mem-stat-n {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.5rem, 3.5vw, 2.4rem);
    font-weight: 900; color: var(--gold); display: block;
    text-shadow: 0 0 24px rgba(245,200,66,.35);
    line-height: 1;
    margin-bottom: 6px;
  }
  .mem-stat-l {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.75rem, 1.2vw, .88rem);
    color: rgba(245,233,204,.45);
    line-height: 1.4;
    display: block;
  }

  /* Heroes grid */
  .heroes-section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.2rem, 2.5vw, 1.8rem);
    font-weight: 700;
    color: var(--gold);
    text-align: center;
    margin-bottom: clamp(24px, 3.5vw, 44px);
    display: flex; align-items: center; justify-content: center; gap: 14px;
  }
  .heroes-section-title::before,
  .heroes-section-title::after {
    content: '';
    flex: 1; max-width: 100px; height: 1px;
    background: linear-gradient(to right, transparent, rgba(200,16,46,.5));
  }
  .heroes-section-title::after {
    background: linear-gradient(to left, transparent, rgba(200,16,46,.5));
  }

  .heroes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
    gap: clamp(16px, 2.5vw, 28px);
    margin-bottom: clamp(36px, 5vw, 64px);
  }

  .hero-card {
    background: rgba(14,8,2,.8);
    border: 1px solid rgba(245,200,66,.1);
    border-top: 2px solid rgba(200,16,46,.35);
    padding: clamp(18px, 2.5vw, 26px);
    border-radius: 2px;
    transition: border-color .35s, background .35s, transform .35s;
    position: relative;
    overflow: hidden;
  }
  .hero-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(to right, transparent, rgba(245,200,66,.3), transparent);
    opacity: 0; transition: opacity .35s;
  }
  .hero-card:hover {
    border-color: rgba(245,200,66,.28);
    border-top-color: rgba(200,16,46,.7);
    background: rgba(22,12,3,.9);
    transform: translateY(-3px);
  }
  .hero-card:hover::before { opacity: 1; }

  .hero-card-star {
    font-size: 20px;
    margin-bottom: 10px;
    display: block;
    filter: drop-shadow(0 0 6px rgba(245,200,66,.5));
  }

  .hero-card-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1rem, 1.8vw, 1.2rem);
    font-weight: 900;
    color: var(--cream);
    margin-bottom: 4px;
  }

  .hero-card-title {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.8rem, 1.3vw, .92rem);
    color: var(--gold);
    font-style: italic;
    margin-bottom: 10px;
    letter-spacing: .03em;
  }

  .hero-card-desc {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.88rem, 1.4vw, 1rem);
    line-height: 1.7;
    color: rgba(245,233,204,.65);
  }

  .hero-card-badge {
    display: inline-block;
    margin-top: 12px;
    padding: 3px 10px;
    background: rgba(200,16,46,.15);
    border: 1px solid rgba(200,16,46,.3);
    border-radius: 2px;
    font-family: 'Crimson Text', serif;
    font-size: clamp(.7rem, 1.1vw, .8rem);
    color: rgba(245,233,204,.55);
    letter-spacing: .06em;
  }

  /* Unknown soldiers wall */
  .unknown-wall {
    background: rgba(10,6,2,.7);
    border: 1px solid rgba(245,200,66,.1);
    border-left: 3px solid rgba(245,200,66,.3);
    padding: clamp(24px, 3.5vw, 40px);
    border-radius: 2px;
    margin-bottom: clamp(32px, 4.5vw, 56px);
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .unknown-wall::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 50% 50%, rgba(245,200,66,.03) 0%, transparent 70%);
    pointer-events: none;
  }

  .unknown-wall-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.15rem, 2.2vw, 1.55rem);
    font-weight: 700;
    color: var(--gold);
    margin-bottom: 14px;
  }

  .unknown-wall-text {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.95rem, 1.6vw, 1.1rem);
    line-height: 1.85;
    color: rgba(245,233,204,.72);
    max-width: min(660px, 100%);
    margin: 0 auto 20px;
  }

  /* Rolling name ticker */
  .name-ticker-wrap {
    overflow: hidden;
    border-top: 1px solid rgba(245,200,66,.1);
    border-bottom: 1px solid rgba(245,200,66,.1);
    padding: 12px 0;
    margin: 20px 0 0;
    position: relative;
  }
  .name-ticker-wrap::before,
  .name-ticker-wrap::after {
    content: '';
    position: absolute; top: 0; bottom: 0; width: 60px; z-index: 2;
    pointer-events: none;
  }
  .name-ticker-wrap::before { left: 0; background: linear-gradient(to right, rgba(10,6,2,.9), transparent); }
  .name-ticker-wrap::after  { right: 0; background: linear-gradient(to left, rgba(10,6,2,.9), transparent); }

  .name-ticker {
    display: flex;
    animation: tickerScroll 38s linear infinite;
    white-space: nowrap;
  }
  .name-ticker:hover { animation-play-state: paused; }

  @keyframes tickerScroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .ticker-name {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.82rem, 1.3vw, .95rem);
    color: rgba(245,233,204,.55);
    padding: 0 clamp(16px, 2.5vw, 28px);
    letter-spacing: .06em;
    flex-shrink: 0;
  }
  .ticker-sep {
    color: rgba(200,16,46,.6);
    padding: 0 4px;
    flex-shrink: 0;
  }

  /* Pledge / vow block */
  .memorial-pledge {
    text-align: center;
    padding: clamp(28px, 4vw, 52px) clamp(16px, 4vw, 48px);
    background: linear-gradient(135deg, rgba(200,16,46,.06) 0%, rgba(10,6,2,.4) 50%, rgba(245,200,66,.04) 100%);
    border: 1px solid rgba(245,200,66,.12);
    border-radius: 3px;
    margin-top: clamp(16px, 3vw, 32px);
  }

  .pledge-text {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1rem, 2vw, 1.4rem);
    font-style: italic;
    font-weight: 700;
    color: var(--cream);
    line-height: 1.75;
    margin-bottom: 16px;
  }

  .pledge-text em { color: var(--gold); font-style: normal; }

  .pledge-sig {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.8rem, 1.3vw, .92rem);
    color: rgba(245,233,204,.38);
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  /* ─── FOOTER ─────────────────────────────────────── */
  footer {
    text-align: center;
    padding: clamp(20px, 3vw, 32px) clamp(16px, 4vw, 48px);
    background: var(--dark);
    border-top: 1px solid rgba(245,200,66,.1);
    font-family: 'Crimson Text', serif;
    color: rgba(245,233,204,.35);
    font-size: clamp(.78rem, 1.3vw, .9rem);
    letter-spacing: .08em;
    line-height: 1.7;
  }
  footer strong { color: rgba(245,200,66,.55); }

  /* ─── SCROLL TO TOP ──────────────────────────────── */
  .scroll-top {
    position: fixed;
    bottom: 32px; right: 32px;
    width: 44px; height: 44px;
    background: rgba(200,16,46,.7);
    border: 1px solid rgba(245,200,66,.4);
    border-radius: 50%;
    color: var(--gold);
    font-size: 18px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    z-index: 100;
    transition: all .3s;
    opacity: 0; pointer-events: none;
    box-shadow: 0 4px 18px rgba(0,0,0,.5);
  }
  .scroll-top.visible { opacity: 1; pointer-events: auto; }
  .scroll-top:hover { background: rgba(200,16,46,1); transform: translateY(-3px); }
`;

// ── SVG Hill ──────────────────────────────────────────────────────────────────
function HeroHill() {
  return (
    <svg viewBox="0 0 1440 420" xmlns="http://www.w3.org/2000/svg" className="hero-hill" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="hg1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2d1a08"/><stop offset="100%" stopColor="#0d0a06"/>
        </linearGradient>
        <linearGradient id="hg2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a0e05"/><stop offset="100%" stopColor="#060402"/>
        </linearGradient>
        <linearGradient id="hg3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3d2510"/><stop offset="100%" stopColor="#1a0e05"/>
        </linearGradient>
        <radialGradient id="fg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6600" stopOpacity=".85"/>
          <stop offset="100%" stopColor="#ff6600" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <path d="M0 420 L0 265 Q200 195 400 228 Q600 262 780 210 Q960 158 1140 202 Q1300 238 1440 218 L1440 420Z" fill="url(#hg2)" opacity=".6"/>
      <path d="M0 420 L0 300 Q150 248 300 272 Q480 305 620 252 Q760 205 900 244 Q1040 278 1180 238 Q1320 200 1440 244 L1440 420Z" fill="url(#hg1)"/>
      <path d="M0 420 L0 360 Q90 345 180 334 Q280 320 360 305 Q430 290 490 270 Q535 252 570 236 Q610 218 638 208 Q658 200 676 204 Q695 208 714 216 Q752 232 808 255 Q866 278 936 296 Q1030 318 1140 328 Q1260 338 1380 343 L1440 345 L1440 420Z" fill="url(#hg3)"/>
      {[295,348,828,886,962,1044,1138,1205].map((x,i) => (
        <g key={i} transform={`translate(${x},${276+(i%3)*14})`} opacity=".45">
          <polygon points="0,-22 9,0 -9,0" fill="#1a0c05"/>
          <polygon points="0,-15 7,3 -7,3" fill="#1a0c05"/>
          <rect x="-1.5" y="3" width="3" height="6" fill="#1a0c05"/>
        </g>
      ))}
      <circle cx="800" cy="250" r="14" fill="url(#fg)" opacity=".65">
        <animate attributeName="opacity" values=".65;.2;.8;.25;.65" dur="2.8s" repeatCount="indefinite"/>
        <animate attributeName="r" values="14;20;11;18;14" dur="2.8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="472" cy="258" r="10" fill="url(#fg)" opacity=".55">
        <animate attributeName="opacity" values=".55;.75;.28;.6;.55" dur="4.1s" repeatCount="indefinite"/>
      </circle>
      <circle cx="1040" cy="278" r="8" fill="url(#fg)" opacity=".45">
        <animate attributeName="opacity" values=".45;.68;.22;.55;.45" dur="3.6s" repeatCount="indefinite"/>
      </circle>
      <line x1="666" y1="204" x2="666" y2="132" stroke="#8b7355" strokeWidth="2.2"/>
      <g transform="translate(666,132)">
        <rect x="0" y="0" width="52" height="34" fill="#c8102e"/>
        <polygon points="26,5 29.5,14.5 39.6,14.5 31.8,20.3 34.6,29.8 26,24.2 17.4,29.8 20.2,20.3 12.4,14.5 22.5,14.5" fill="#f5c842"/>
        <animateTransform attributeName="transform" type="skewY" values="0;-3;3;-4;2;0" dur="1.6s" repeatCount="indefinite" additive="sum"/>
      </g>
      <ellipse cx="666" cy="206" rx="6" ry="3" fill="#5c3820" opacity=".7"/>
    </svg>
  );
}

// ── Map Component ──────────────────────────────────────────────────────────────
function DienBienMap({ phase = "all" }) {
  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"auto",display:"block"}}>
      <defs>
        <pattern id="paper" patternUnits="userSpaceOnUse" width="4" height="4">
          <rect width="4" height="4" fill="#f5e9cc"/>
          <path d="M0,0 l4,4 M4,0 l-4,4" stroke="rgba(0,0,0,0.03)" strokeWidth="0.5"/>
        </pattern>
        <linearGradient id="hill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d4a574"/>
          <stop offset="100%" stopColor="#a0744d"/>
        </linearGradient>
        <marker id="arrowRed" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
          <polygon points="0 0, 12 6, 0 12" fill="#c8102e"/>
        </marker>
      </defs>
      <rect width="800" height="600" fill="url(#paper)"/>
      <rect x="30" y="20" width="740" height="560" fill="none" stroke="#8b7d6b" strokeWidth="2"/>
      <text x="400" y="50" textAnchor="middle" fontFamily="serif" fontSize="16" fontWeight="bold" fill="#4a3728">BẢN ĐỒ CHIẾN DỊCH ĐIỆN BIÊN PHỦ (1954)</text>
      <path d="M60 120 Q360 80 740 120 L750 200 Q400 180 50 200 Z" fill="url(#hill)" opacity="0.35" stroke="#8b7d6b" strokeWidth="1"/>
      <circle cx="100" cy="280" r="55" fill="url(#hill)" opacity="0.3"/>
      <circle cx="700" cy="300" r="60" fill="url(#hill)" opacity="0.3"/>
      <path d="M150 300 Q300 320 450 330 Q600 340 650 340" stroke="#4a90e2" strokeWidth="3" fill="none" opacity="0.6" strokeLinecap="round"/>
      <text x="120" y="315" fontFamily="serif" fontSize="11" fill="#4a90e2" opacity="0.7">Sông Nậm Rốm</text>
      <g opacity="0.85">
        <circle cx="120" cy="200" r="14" fill="none" stroke="#c8102e" strokeWidth="3"/>
        <text x="120" y="225" textAnchor="middle" fontFamily="serif" fontSize="11" fontWeight="bold" fill="#c8102e">Đông Bắc 54</text>
        <circle cx="400" cy="130" r="14" fill="none" stroke="#c8102e" strokeWidth="3"/>
        <text x="400" y="110" textAnchor="middle" fontFamily="serif" fontSize="11" fontWeight="bold" fill="#c8102e">Bắc</text>
        <circle cx="680" cy="200" r="14" fill="none" stroke="#c8102e" strokeWidth="3"/>
        <text x="680" y="225" textAnchor="middle" fontFamily="serif" fontSize="11" fontWeight="bold" fill="#c8102e">Tây Bắc 3</text>
        <circle cx="730" cy="340" r="14" fill="none" stroke="#c8102e" strokeWidth="3"/>
        <text x="730" y="375" textAnchor="middle" fontFamily="serif" fontSize="11" fontWeight="bold" fill="#c8102e">Liên Khu 3</text>
        <circle cx="400" cy="480" r="14" fill="none" stroke="#c8102e" strokeWidth="3"/>
        <text x="400" y="508" textAnchor="middle" fontFamily="serif" fontSize="11" fontWeight="bold" fill="#c8102e">Đông Bắc 308</text>
      </g>
      {(phase === "all" || phase === "phase1" || phase === "phase2") && (
        <g opacity="0.7">
          <path d="M130 210 L280 300" stroke="#c8102e" strokeWidth="2.5" fill="none" markerEnd="url(#arrowRed)" strokeDasharray="5,3"/>
          <path d="M420 145 L400 270" stroke="#c8102e" strokeWidth="2.5" fill="none" markerEnd="url(#arrowRed)" strokeDasharray="5,3"/>
          <path d="M670 210 L520 300" stroke="#c8102e" strokeWidth="2.5" fill="none" markerEnd="url(#arrowRed)" strokeDasharray="5,3"/>
          <path d="M715 355 L520 330" stroke="#c8102e" strokeWidth="2.5" fill="none" markerEnd="url(#arrowRed)" strokeDasharray="5,3"/>
          <path d="M420 465 L400 370" stroke="#c8102e" strokeWidth="2.5" fill="none" markerEnd="url(#arrowRed)" strokeDasharray="5,3"/>
        </g>
      )}
      <g opacity="0.9">
        <polygon points="360,300 440,300 450,350 350,350" fill="rgba(0,85,164,0.15)" stroke="#0055a4" strokeWidth="2"/>
        <circle cx="350" cy="280" r="10" fill="rgba(0,85,164,0.3)" stroke="#0055a4" strokeWidth="2"/>
        <text x="350" y="270" textAnchor="middle" fontFamily="serif" fontSize="10" fontWeight="bold" fill="#0055a4">Him Lam</text>
        <circle cx="445" cy="270" r="10" fill="rgba(0,85,164,0.3)" stroke="#0055a4" strokeWidth="2"/>
        <text x="445" y="260" textAnchor="middle" fontFamily="serif" fontSize="10" fontWeight="bold" fill="#0055a4">Gabrielle</text>
        <circle cx="460" cy="315" r="10" fill="rgba(0,85,164,0.3)" stroke="#0055a4" strokeWidth="2"/>
        <text x="478" y="315" textAnchor="start" fontFamily="serif" fontSize="10" fontWeight="bold" fill="#0055a4">Dominique</text>
        <circle cx="445" cy="340" r="10" fill="rgba(0,85,164,0.3)" stroke="#0055a4" strokeWidth="2"/>
        <text x="445" y="358" textAnchor="middle" fontFamily="serif" fontSize="10" fontWeight="bold" fill="#0055a4">Eliane</text>
        <circle cx="340" cy="330" r="10" fill="rgba(0,85,164,0.3)" stroke="#0055a4" strokeWidth="2"/>
        <text x="322" y="340" textAnchor="end" fontFamily="serif" fontSize="10" fontWeight="bold" fill="#0055a4">Huguette</text>
        <circle cx="390" cy="300" r="12" fill="rgba(255,215,0,0.4)" stroke="#f5c842" strokeWidth="3"/>
        <text x="390" y="308" textAnchor="middle" fontFamily="serif" fontSize="12" fontWeight="bold" fill="#f5c842">A1</text>
        {(phase === "all" || phase === "phase3") && (
          <circle cx="390" cy="300" r="30" fill="none" stroke="#ffd700" strokeWidth="2" strokeDasharray="4,4" opacity="0.8">
            <animate attributeName="r" from="25" to="38" dur="1.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" from="0.8" to="0.2" dur="1.5s" repeatCount="indefinite"/>
          </circle>
        )}
      </g>
      <g opacity="0.7">
        <rect x="50" y="420" width="260" height="120" fill="#f5e9cc" stroke="#8b7d6b" strokeWidth="1.5"/>
        <text x="60" y="440" fontFamily="serif" fontSize="12" fontWeight="bold" fill="#4a3728">CHÚ GIẢI:</text>
        <circle cx="68" cy="458" r="7" fill="none" stroke="#c8102e" strokeWidth="2.5"/>
        <text x="85" y="463" fontFamily="serif" fontSize="10" fill="#4a3728">Việt Minh</text>
        <circle cx="68" cy="480" r="7" fill="rgba(0,85,164,0.4)" stroke="#0055a4" strokeWidth="2"/>
        <text x="85" y="485" fontFamily="serif" fontSize="10" fill="#4a3728">Cứ điểm Pháp</text>
        <circle cx="68" cy="502" r="7" fill="rgba(255,215,0,0.4)" stroke="#f5c842" strokeWidth="2.5"/>
        <text x="85" y="507" fontFamily="serif" fontSize="10" fill="#4a3728">Đồi A1</text>
        <path d="M58 524 L78 524" stroke="#c8102e" strokeWidth="2" strokeDasharray="4,2" markerEnd="url(#arrowRed)"/>
        <text x="85" y="528" fontFamily="serif" fontSize="10" fill="#4a3728">Hướng tấn công</text>
      </g>
      <text x="700" y="530" textAnchor="middle" fontFamily="serif" fontSize="9" fill="#8b7d6b" opacity="0.8">56 ngày (13/3–7/5/1954)</text>
      <g opacity="0.6">
        <circle cx="720" cy="480" r="20" fill="none" stroke="#8b7d6b" strokeWidth="1"/>
        <line x1="720" y1="460" x2="720" y2="440" stroke="#c8102e" strokeWidth="2"/>
        <text x="720" y="432" textAnchor="middle" fontFamily="serif" fontSize="14" fontWeight="bold" fill="#c8102e">N</text>
      </g>
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const TIMELINE = [
  { date: "13/3/1954 – Nổ súng mở màn", text: "Đại tướng Võ Nguyên Giáp phát lệnh tấn công. Pháo binh ta bắn phủ đầu, tiêu diệt cứ điểm Him Lam, Độc Lập, bức hàng Bản Kéo — ngay trong đêm đầu tiên." },
  { date: "14/3 – 30/3/1954 – Đợt tấn công 1", text: "Quân ta tiêu diệt các cứ điểm phía Bắc, kiểm soát sân bay Mường Thanh, cắt đứt hoàn toàn đường tiếp tế đường không — yết hầu sống còn của quân Pháp." },
  { date: "30/3 – 26/4/1954 – Đợt tấn công 2", text: "Trận chiến đồi A1 (Éliane 2) — ác liệt nhất trong toàn chiến dịch. Hai bên giằng co từng tấc đất suốt nhiều tuần. Quân Pháp liên tục phản kích nhưng không thể giữ vững." },
  { date: "1/5 – 6/5/1954 – Đợt tấn công 3", text: "Phòng tuyến Pháp sụp đổ dần. Đêm 6/5, quân ta kích nổ 1.000 kg thuốc nổ trong đường hầm bí mật đồi A1 — tiếng nổ vang trời mở đường tổng công kích." },
  { date: "7/5/1954 – Toàn thắng", text: "17:30 ngày 7/5/1954, cờ Quyết chiến Quyết thắng tung bay trên nóc hầm De Castries. Tướng Pháp và toàn bộ bộ tham mưu đầu hàng. 56 ngày đêm — toàn thắng!" }
];

const GALLERY = [
  { src:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=560&fit=crop&q=80", cap:"Núi rừng Tây Bắc – chiến trường huyền thoại" },
  { src:"https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=500&h=280&fit=crop&q=80", cap:"Cờ đỏ sao vàng – biểu tượng chiến thắng" },
  { src:"https://images.unsplash.com/photo-1541417904950-b855846fe074?w=380&h=280&fit=crop&q=80", cap:"Đêm tối trên chiến địa Điện Biên" },
  { src:"https://images.unsplash.com/photo-1490604001847-b712b0c2f967?w=500&h=280&fit=crop&q=80", cap:"Người chiến sĩ Điện Biên anh hùng" },
  { src:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=380&h=280&fit=crop&q=80", cap:"Địa hình lòng chảo Mường Thanh" }
];

const THEORY = [
  { title: "Bối cảnh chiến lược", text: "Năm 1954, Pháp tìm cách thay đổi tình hình bất lợi tại Đông Dương bằng cách xây dựng doanh trại kiên cố tại Điện Biên Phủ. Kế hoạch của Pháp là sử dụng lực lượng cơ giới mạnh để chọc thủng lực lượng Việt Minh và buộc họ phải chiến đấu trong điều kiện bất lợi." },
  { title: "Sự chuẩn bị của Việt Minh", text: "Đại tướng Võ Nguyên Giáp và Bộ Tư lệnh Việt Minh đã chuẩn bị kỹ càng trong 3 tháng. Họ huy động hàng chục nghìn quân nhân, vận chuyển hàng ngàn khẩu pháo lên các sườn núi xung quanh, tạo ra một vòng vây toàn diện đáng sợ." },
  { title: "Ý nghĩa chiến lược", text: "Chiến dịch Điện Biên Phủ là bước ngoặt quyết định. Chiến thắng này chứng tỏ rằng một lực lượng có sự lãnh đạo tài ba, kỷ luật cao và ý chí quật cường, dùng chiến lược thích hợp có thể đánh bại một cường quốc phương Tây trang bị hàng đầu." }
];

const COMMANDERS = [
  {
    side: "vietnamese",
    title: "⭐ Chỉ huy Việt Minh",
    commanders: [
      { name: "Đại tướng Võ Nguyên Giáp", rank: "Tổng Tư lệnh", role: "Chỉ huy toàn chiến dịch", avatar: "🎖️" },
      { name: "Tướng Hoàng Văn Thái", rank: "Phó Tư lệnh", role: "Chỉ huy tiền tuyến", avatar: "⭐" },
      { name: "Thiếu tướng Đặng Kim Giang", rank: "Cục trưởng Hậu cần", role: "Chỉ huy hậu cần", avatar: "🔫" },
      { name: "Đại tá Lê Trọng Tấn", rank: "Đại đoàn trưởng", role: "Chỉ huy Đại đoàn 312", avatar: "🎯" },
      { name: "Đại tá Vương Thừa Vũ", rank: "Đại đoàn trưởng", role: "Chỉ huy Đại đoàn 308", avatar: "🗺️" }
    ]
  },
  {
    side: "french",
    title: "🇫🇷 Chỉ huy Pháp",
    commanders: [
      { name: "Tướng Henri Navarre", rank: "Tư lệnh quân đội", role: "Tư lệnh Đông Dương", avatar: "🇫🇷" },
      { name: "Tướng Christian de Castries", rank: "Thiếu tướng", role: "Tư lệnh doanh trại", avatar: "🏰" },
      { name: "Tướng René Cogny", rank: "Thiếu tướng", role: "Phó Tư lệnh vùng", avatar: "⚔️" },
      { name: "Trung tá Pierre Langlais", rank: "Thượng tá", role: "Chỉ huy tác chiến", avatar: "🗡️" },
      { name: "Trung tá Bigeard", rank: "Trung tá", role: "Chỉ huy tiểu đoàn dù", avatar: "🎖️" }
    ]
  }
];

const ATTACK_PHASES = [
  { id: "phase1", label: "13/3 – Nổ súng", title: "Đợt 1: Mở màn", description: "Pháo binh quân ta bắn phủ đầu kinh hoàng. Tiêu diệt Him Lam, Độc Lập, Bản Kéo trong đêm đầu tiên." },
  { id: "phase2", label: "14/3-30/3 – Tiêu hao", title: "Đợt 2: Tiêu diệt phòng tuyến", description: "Quân ta kiểm soát sân bay Mường Thanh, cắt đứt hoàn toàn đường tiếp tế không quân." },
  { id: "phase3", label: "30/3-26/4 – Ác liệt", title: "Đợt 3: Giành đồi A1", description: "Trận chiến đồi A1 (Éliane 2) ác liệt nhất. Hai bên giằng co từng tấc đất, thương vong lớn." },
  { id: "phase4", label: "1/5-6/5 – Quyết định", title: "Đợt 4: Tổng công kích", description: "Đêm 6/5, kích nổ 1.000kg thuốc nổ trong đường hầm bí mật A1. Tiếng nổ mở đường tổng công kích." },
  { id: "phase5", label: "7/5 – Toàn thắng", title: "Chiến thắng hoàn toàn", description: "17h30 ngày 7/5/1954, cờ Quyết chiến tung bay. 16.200 tù binh Pháp đầu hàng. TOÀN THẮNG!" }
];

// YouTube videos about Dien Bien Phu
const VIDEOS = [
  {
    id: "CD8sKixEDsI",
    title: "Chiến dịch Điện Biên Phủ | EZ Sử",
    desc: "Tài liệu chi tiết về chiến dịch Điện Biên Phủ 1954 từ kênh EZ Sử. Khám phá những sự kiện lịch sử quan trọng quyết định vận mệnh Việt Nam."
  }
];

// Hò Kéo Pháo lyrics
const HO_KEO_PHAO_LYRICS = ` Hò dô ta nào, kéo pháo ta vượt qua đèo,
Hò dô ta nào, kéo pháo ta vượt qua núi.

Dốc núi cao cao, nhưng lòng quyết tâm còn cao hơn núi,
Vực sâu thăm thẳm, vực nào sâu bằng chí căm thù,
Kéo pháo ta lên, trận địa đây vùi xác quân thù (hai, ba nào).

Hò dô ta nào, kéo pháo ta vượt qua đèo,
Hò dô ta nào, kéo pháo ta vượt qua núi.

1-
Gà rừng gáy trên nương rồi,
Dấn bước ta đi lên nào.
Kéo pháo ta sang qua đèo,
Trước khi trời hửng sáng.

Sắp tới nơi còn một đoạn nữa thôi,
Vai ướt đẫm sương đêm cùng mồ hôi.
Tới đích rồi đồng chí pháo binh ơi,
Vinh quang thay sức người lao động,
Hò dô ta pháo ta vượt đèo,
Lòng quyết tâm sắt gang nào bằng (hò dô).

2-
Dù lửa nóng, trong bom đạn,
Bốc cháy xung quanh ta rồi.
Nắm chắc tay không buông rời,
Quyết tâm bảo vệ pháo.

Kéo pháo lên trận địa của chúng ta,
Tin chắc thắng ta tin tưởng ở trên.
Tới đích rồi đồng chí chúng ta ơi,
Mai đây nghe pháo gầm vang trời,
Cùng bộ binh đánh tan đồn thù,
Thề quyết tâm đánh tan đồn thù (hò dô).!`;

// ── Custom Audio Player ────────────────────────────────────────────────────────
function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement>(null);
  // Using a royalty-free patriotic/marching music as placeholder
  // The actual Hò Kéo Pháo is best accessed via YouTube embed
  const audioSrc = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = val;
    setCurrentTime(val);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.volume = val;
    setVolume(val);
  };

  const handleEnded = () => setIsPlaying(false);

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const pct = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      <div className="audio-controls">
        <button className="play-btn" onClick={togglePlay} aria-label={isPlaying ? "Tạm dừng" : "Phát"}>
          {isPlaying ? "⏸" : "▶"}
        </button>
        <div className="time-display">
          {fmt(currentTime)} / {fmt(duration)}
        </div>
        <div className="volume-wrap">
          <span className="vol-icon">🔊</span>
          <input
            type="range"
            className="volume-slider"
            min="0" max="1" step="0.05"
            value={volume}
            onChange={handleVolume}
          />
        </div>
      </div>
      <input
        type="range"
        className="seek-slider"
        min="0"
        max={duration || 100}
        step="0.1"
        value={currentTime}
        onChange={handleSeek}
        style={{
          background: `linear-gradient(to right, #c8102e ${pct}%, rgba(245,200,66,0.15) ${pct}%)`
        }}
      />
    </div>
  );
}

// ── Memorial Data ─────────────────────────────────────────────────────────────
const HEROES = [
  {
    name: "Tô Vĩnh Diện",
    title: "Pháo thủ anh hùng",
    desc: "Hy sinh thân mình lấy đầu gác pháo trong đêm kéo pháo vào trận địa tại dốc Chuối. Được phong tặng danh hiệu Anh hùng Lực lượng vũ trang nhân dân.",
    badge: "Anh hùng LLVT",
    star: "★"
  },
  {
    name: "Phan Đình Giót",
    title: "Chiến sĩ tiểu đoàn 428",
    desc: "Lấy thân mình bịt lỗ châu mai trong trận đánh cứ điểm Him Lam ngày 13/3/1954, mở đường cho đồng đội xung phong. Được phong Anh hùng LLVT.",
    badge: "Anh hùng LLVT",
    star: "★"
  },
  {
    name: "Bế Văn Đàn",
    title: "Liên lạc viên dũng cảm",
    desc: "Lấy vai làm giá súng cho đồng đội bắn trong trận đánh tại đường 41. Hy sinh anh dũng khi chưa tròn 21 tuổi. Được phong Anh hùng LLVT.",
    badge: "Anh hùng LLVT",
    star: "★"
  },
  {
    name: "Trần Can",
    title: "Đại đội trưởng Đại đoàn 312",
    desc: "Người đầu tiên cắm cờ Quyết chiến Quyết thắng trên nóc hầm chỉ huy De Castries lúc 17h30 ngày 7/5/1954 — khoảnh khắc lịch sử vĩnh cửu.",
    badge: "Người cắm cờ lịch sử",
    star: "🚩"
  },
  {
    name: "Nguyễn Văn Ty",
    title: "Chiến sĩ công binh",
    desc: "Tham gia đào đường hầm bí mật đồi A1 suốt nhiều tuần liên tục, góp phần tạo nên trận nổ 1.000 kg thuốc nổ đêm 6/5 làm rung chuyển toàn chiến trường.",
    badge: "Đường hầm A1",
    star: "⛏"
  },
  {
    name: "Hàng vạn dân công hỏa tuyến",
    title: "Những người vô danh vĩ đại",
    desc: "Hơn 260.000 dân công gánh vác đạn dược, lương thực vượt hàng trăm km đường rừng, đồi núi hiểm trở. Xương máu họ hòa vào đất mẹ Tây Bắc.",
    badge: "Hậu phương anh hùng",
    star: "🕯"
  }
];

const FALLEN_NAMES = [
  "Tô Vĩnh Diện","Phan Đình Giót","Bế Văn Đàn","Trần Can","Hoàng Văn Nô",
  "Nguyễn Văn Chức","Lê Văn Tốt","Vũ Đình Huề","Đinh Văn Giao","Phạm Đức Thể",
  "Nguyễn Hữu Chính","Trần Đức Long","Lê Quang Bình","Vũ Văn Thắng","Nguyễn Thị Hoa",
  "Lò Văn Bường","Cầm Văn Phướng","Quàng Văn Hưng","Giàng A Sử","Mùa A Páo",
  "Lường Văn Tịnh","Tòng Văn Khặt","Nguyễn Văn Bình","Trần Văn Hai","Đỗ Văn Nam",
  "Hoàng Thị Lan","Nguyễn Văn Khánh","Phạm Văn Tứ","Lê Đức Thịnh","Vũ Ngọc Thành",
  "Đinh Văn Mạnh","Nguyễn Quang Trung","Phạm Văn Đức","Cao Văn Khánh","Lê Thị Mai",
  "Trịnh Văn Dũng","Nguyễn Văn Sơn","Phạm Đức Thắng","Hoàng Văn Minh","Bùi Văn Long"
];

// ── Candle SVG ────────────────────────────────────────────────────────────────
function Candle({ delay = 0, label = "" }) {
  return (
    <div className="candle-wrap">
      <svg className="candle-svg" viewBox="0 0 30 70" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id={`cg${delay}`} cx="50%" cy="80%" r="60%">
            <stop offset="0%" stopColor="#ffe4a0"/>
            <stop offset="100%" stopColor="#c8a040"/>
          </radialGradient>
          <radialGradient id={`wax${delay}`} cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f0e8d8"/>
            <stop offset="100%" stopColor="#c8b890"/>
          </radialGradient>
        </defs>
        {/* Candle glow halo */}
        <ellipse cx="15" cy="20" rx="12" ry="14" fill="rgba(255,180,40,.06)"/>
        {/* Wick */}
        <line x1="15" y1="28" x2="15" y2="22" stroke="#2a1a08" strokeWidth="1.2" strokeLinecap="round"/>
        {/* Flame */}
        <g className="flame-g" style={{animationDelay:`${delay}s`}}>
          <ellipse cx="15" cy="16" rx="4.5" ry="7" fill="rgba(255,120,20,.85)"/>
          <ellipse cx="15" cy="15" rx="3" ry="5.5" fill="rgba(255,200,60,.9)"/>
          <ellipse cx="15" cy="14.5" rx="1.5" ry="3" fill="rgba(255,240,180,.95)"/>
        </g>
        {/* Wax drip */}
        <path d="M10 30 Q9 34 10 38" stroke="rgba(240,232,216,.4)" strokeWidth="1.5" fill="none"/>
        {/* Candle body */}
        <rect x="8" y="28" width="14" height="36" rx="1.5" fill={`url(#wax${delay})`}/>
        {/* Candle shading */}
        <rect x="8" y="28" width="3.5" height="36" rx="1" fill="rgba(0,0,0,.08)"/>
        {/* Base */}
        <rect x="5" y="62" width="20" height="5" rx="1" fill={`url(#cg${delay})`} opacity=".7"/>
        {/* Melt line */}
        <path d="M8 33 Q15 30 22 33" stroke="rgba(255,255,255,.18)" strokeWidth="1" fill="none"/>
      </svg>
      {label && <span className="candle-label">{label}</span>}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mapPhase, setMapPhase] = useState("all");
  const [commanderSlide, setCommanderSlide] = useState(0);
  const [mapTab, setMapTab] = useState("interactive");
  const [videoTab, setVideoTab] = useState("videos");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{style}</style>

      {/* NAVBAR */}
      <nav className={`nav${scrolled ? " opaque" : ""}`}>
        <div className="nav-brand">
          <div className="nav-flag"><span>★</span></div>
          <h1 className="nav-title">CHIẾN DỊCH ĐIỆN BIÊN PHỦ</h1>
        </div>
        <div className="nav-links">
          <a href="#a1">Đồi A1</a>
          <a href="#theory">Lý thuyết</a>
          <a href="#map">Bản đồ</a>
          <a href="#commanders">Chỉ huy</a>
          <a href="#timeline">Diễn biến</a>
          <a href="#gallery">Hình ảnh</a>
          <a href="#tuong-niem" style={{color:"#f0c0c0"}}>🕯 Tưởng Niệm</a>
          <a href="#media" style={{color:"#f5c842"}}>📽 Video & Nhạc</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-sky"/>
        <div className="hero-stars"/>
        <div className="hero-smoke hs1"/>
        <div className="hero-smoke hs2"/>
        <div className="hero-smoke hs3"/>
        <HeroHill />
        <div className="hero-body">
          <div className="hero-text">
            <div className="hero-eyebrow">13 tháng 3 – 7 tháng 5 năm 1954</div>
            <h1 className="hero-title">
              Chiến dịch
              <span>Điện Biên Phủ</span>
            </h1>
            <p className="hero-subtitle">"Lừng lẫy năm châu – Chấn động địa cầu"</p>
            <p className="hero-desc">
              Chiến thắng lịch sử của quân và dân Việt Nam dưới sự lãnh đạo của Đảng
              và Đại tướng Võ Nguyên Giáp, đập tan tập đoàn cứ điểm mạnh nhất
              của thực dân Pháp, chấm dứt 9 năm kháng chiến trường kỳ.
            </p>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-label">Ngày chiến đấu</div>
            <div className="hero-stat-num">56</div>
            <div className="hero-stat-sub">Ngày đêm lịch sử</div>
          </div>
        </div>
      </section>

      {/* ĐỒI A1 */}
      <section className="sec sec-a1" id="a1">
        <div className="sec-inner">
          <div className="sec-label">Di tích lịch sử</div>
          <h2 className="sec-title">Đồi A1 – Trận chiến ác liệt nhất</h2>
          <div className="a1-grid">
            <div className="a1-img-wrap">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Dien_Bien_Phu_hill_A1.jpg/800px-Dien_Bien_Phu_hill_A1.jpg"
                alt="Đồi A1 Điện Biên Phủ"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop&q=80"; }}
              />
              <div className="a1-img-cap">🏔️ Đồi A1 (Éliane 2) – cứ điểm kiên cố nhất của quân Pháp</div>
            </div>
            <div className="a1-info">
              <h3>Cứ điểm Éliane 2 – Đồi A1</h3>
              <p>Đồi A1 (Pháp gọi là Éliane 2) là cứ điểm then chốt và kiên cố nhất trong hệ thống phòng thủ của quân Pháp tại Điện Biên Phủ. Nằm ở phía Đông Mường Thanh, đồi A1 khống chế toàn bộ khu trung tâm và sân bay — yết hầu tiếp tế duy nhất của quân Pháp.</p>
              <p>Trận chiến giành giật đồi A1 kéo dài gần <strong>2 tháng</strong> với những trận đánh đẫm máu nhất. Đêm 6/5/1954, quân ta kích nổ 1.000 kg thuốc nổ trong đường hầm bí mật, phá vỡ hoàn toàn tuyến phòng thủ và mở đường cho đợt tổng công kích lịch sử.</p>
              <div className="stats">
                <div className="stat"><span className="stat-n">56</span><span className="stat-l">ngày đêm chiến đấu</span></div>
                <div className="stat"><span className="stat-n">16.200</span><span className="stat-l">tù binh Pháp</span></div>
                <div className="stat"><span className="stat-n">7/5</span><span className="stat-l">ngày toàn thắng</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THEORY */}
      <section className="sec sec-theory" id="theory">
        <div className="sec-inner">
          <div className="sec-label">Nền tảng lịch sử</div>
          <h2 className="sec-title">Lý thuyết chiến lược</h2>
          <div className="theory-grid">
            {THEORY.map((item, i) => (
              <div className="theory-card" key={i}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="sec sec-map" id="map">
        <div className="sec-inner">
          <div className="sec-label">Địa lý chiến trường</div>
          <h2 className="sec-title">Bản đồ Điện Biên Phủ</h2>
          <div className="map-tabs">
            <button className={`map-tab-btn ${mapTab === "interactive" ? "active" : ""}`} onClick={() => setMapTab("interactive")}>Bản đồ tương tác</button>
            <button className={`map-tab-btn ${mapTab === "historical" ? "active" : ""}`} onClick={() => setMapTab("historical")}>Bản đồ lịch sử</button>
          </div>
          {mapTab === "interactive" && (
            <>
              <div className="map-phase-buttons">
                <button className={`map-phase-btn ${mapPhase === "all" ? "active" : ""}`} onClick={() => setMapPhase("all")}>Tất cả</button>
                {ATTACK_PHASES.map(p => (
                  <button key={p.id} className={`map-phase-btn ${mapPhase === p.id ? "active" : ""}`} onClick={() => setMapPhase(p.id)}>{p.label}</button>
                ))}
              </div>
              <div className="map-container">
                <div className="map-visual"><DienBienMap phase={mapPhase}/></div>
                <div className="map-legend">
                  <div className="legend-item"><div className="legend-color" style={{backgroundColor:"#c8102e"}}/><div className="legend-text"><strong>Việt Minh</strong> – vòng vây từ các đồi cao</div></div>
                  <div className="legend-item"><div className="legend-color" style={{backgroundColor:"rgba(0,85,164,.6)"}}/><div className="legend-text"><strong>Căn cứ Pháp</strong> – nằm trong lòng chảo</div></div>
                  <div className="legend-item"><div className="legend-color" style={{backgroundColor:"#f5c842",opacity:"0.7"}}/><div className="legend-text"><strong>Đồi A1</strong> – cứ điểm then chốt</div></div>
                  {mapPhase !== "all" && (
                    <div className="map-phase-info">
                      <h4>{ATTACK_PHASES.find(p => p.id === mapPhase)?.title}</h4>
                      <p>{ATTACK_PHASES.find(p => p.id === mapPhase)?.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {mapTab === "historical" && (
            <div style={{textAlign:"center"}}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Dien_Bien_Phu_map.svg/800px-Dien_Bien_Phu_map.svg.png" alt="Bản đồ lịch sử" style={{width:"100%",maxWidth:"680px",height:"auto",borderRadius:"3px",border:"2px solid rgba(245,200,66,.22)"}}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => { (e.target as HTMLImageElement).src="https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=800&h=500&fit=crop"; }}
              />
              <p style={{marginTop:"14px",fontFamily:"'Crimson Text',serif",color:"rgba(245,233,204,.6)",fontSize:"14px",fontStyle:"italic"}}>Bản đồ chiến dịch Điện Biên Phủ – tư liệu lịch sử</p>
            </div>
          )}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="sec sec-timeline" id="timeline">
        <div className="sec-inner">
          <div className="sec-label">Diễn biến</div>
          <h2 className="sec-title">56 ngày đêm hào hùng</h2>
          <div className="timeline">
            {TIMELINE.map((item, i) => (
              <div className="tl-item" key={i}>
                <div className="tl-dot"><div className="tl-dot-inner"/></div>
                <div className="tl-body">
                  <div className="tl-date">{item.date}</div>
                  <div className="tl-text">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMANDERS */}
      <section className="sec sec-commanders" id="commanders">
        <div className="sec-inner">
          <div className="sec-label">Nhân vật lịch sử</div>
          <h2 className="sec-title">Chỉ huy hai bên quân</h2>
          <div className="commanders-carousel">
            <div className="commanders-title-label">{COMMANDERS[commanderSlide].title}</div>
            <div className="carousel-inner">
              {COMMANDERS[commanderSlide].commanders.map((cmd, j) => (
                <div className="commander-card" key={j}>
                  <div className="commander-avatar">{cmd.avatar}</div>
                  <div className="commander-info">
                    <div className="commander-name">{cmd.name}</div>
                    <div className="commander-rank">{cmd.rank}</div>
                    <div className="commander-role">{cmd.role}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="carousel-controls">
              <button className="carousel-btn" onClick={() => setCommanderSlide(s => s === 0 ? COMMANDERS.length-1 : s-1)}>← Bên trước</button>
              <span style={{color:"var(--gold)",display:"flex",alignItems:"center",fontSize:"14px"}}>{commanderSlide+1} / {COMMANDERS.length}</span>
              <button className="carousel-btn" onClick={() => setCommanderSlide(s => s === COMMANDERS.length-1 ? 0 : s+1)}>Bên sau →</button>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="sec sec-gallery" id="gallery">
        <div className="sec-inner">
          <div className="sec-label">Tư liệu lịch sử</div>
          <h2 className="sec-title">Hình ảnh chiến dịch</h2>
          <div className="gallery">
            {GALLERY.map((item, i) => (
              <div className={`g-item g${i}`} key={i}>
                <img src={item.src} alt={item.cap} loading="lazy"/>
                <div className="g-overlay"/>
                <div className="g-cap">{item.cap}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VIDEO & MUSIC SECTION ══════════════════════════════════════════════ */}
      <section className="sec sec-video" id="media">
        <div className="sec-inner">
          <div className="sec-label">Tư liệu đa phương tiện</div>
          <h2 className="sec-title">Video & Âm nhạc lịch sử</h2>

          {/* Tabs */}
          <div className="video-tabs">
            <button className={`vtab-btn ${videoTab === "videos" ? "active" : ""}`} onClick={() => setVideoTab("videos")}>
              📽 Video YouTube
            </button>
            <button className={`vtab-btn ${videoTab === "music" ? "active" : ""}`} onClick={() => setVideoTab("music")}>
              🎵 Hò Kéo Pháo
            </button>
          </div>

          {/* ── VIDEO TAB ── */}
          {videoTab === "videos" && (
            <div className="video-grid">
              {VIDEOS.map((v) => (
                <div className="video-card" key={v.id}>
                  <div className="video-embed-wrap">
                    <iframe
                      src={`https://www.youtube.com/embed/${v.id}?start=112&rel=0&modestbranding=1`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="video-card-body">
                    <div className="video-card-title">{v.title}</div>
                    <div className="video-card-desc">{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── MUSIC TAB ── */}
          {videoTab === "music" && (
            <div className="music-section">
              {/* Hero banner */}
              <div className="music-hero-banner">
                <div className="music-song-title">🎵 Hò Kéo Pháo</div>
                <div className="music-song-meta">Nhạc sĩ: Hoàng Vân &nbsp;•&nbsp; Sáng tác: 1954 &nbsp;•&nbsp; Thể loại: Nhạc cách mạng</div>

                {/* YouTube embed - Hò Kéo Pháo */}
                <div style={{position:"relative",paddingBottom:"56.25%",height:0,overflow:"hidden",borderRadius:"4px",border:"1px solid rgba(245,200,66,.2)",marginBottom:"20px"}}>
                  <iframe
                    style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"none"}}
                    src="https://www.youtube.com/embed/caCFq21IyCw?start=112&rel=0&modestbranding=1"
                    title="Hò Kéo Pháo - Hoàng Vân"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="audio-source-note">
                  ▲ Video YouTube chính thức · Nếu không tải được, hãy tìm kiếm "Hò Kéo Pháo Hoàng Vân" trên YouTube
                </div>
              </div>

              {/* Song info */}
              <div className="song-info-grid">
                <div className="song-info-card">
                  <div className="song-info-label">Nhạc sĩ</div>
                  <div className="song-info-value">Hoàng Vân</div>
                </div>
                <div className="song-info-card">
                  <div className="song-info-label">Năm sáng tác</div>
                  <div className="song-info-value">1954</div>
                </div>
                <div className="song-info-card">
                  <div className="song-info-label">Thể loại</div>
                  <div className="song-info-value">Nhạc cách mạng</div>
                </div>
                <div className="song-info-card">
                  <div className="song-info-label">Ý nghĩa</div>
                  <div className="song-info-value">Biểu tượng chiến trường</div>
                </div>
              </div>

              {/* Lyrics */}
              <div className="lyrics-card" style={{marginTop:"28px"}}>
                <div className="lyrics-title">📜 Lời bài hát – Hò Kéo Pháo</div>
                <div className="lyrics-body">{HO_KEO_PHAO_LYRICS}</div>
              </div>

              {/* Context */}
              <div className="theory-card" style={{marginTop:"16px"}}>
                <h4>Bối cảnh ra đời</h4>
                <p>Bài hát "Hò Kéo Pháo" của nhạc sĩ Hoàng Vân được sáng tác năm 1954, lấy cảm hứng trực tiếp từ cảnh tượng hàng nghìn chiến sĩ và dân công kéo pháo hạng nặng lên các sườn núi cao bao quanh lòng chảo Điện Biên. Đây là một trong những kỳ tích kỹ thuật quân sự vĩ đại nhất, khi những khẩu pháo nặng hàng tấn được đưa lên độ cao hàng nghìn mét chỉ bằng sức người.</p>
              </div>

              {/* Additional YouTube search suggestion */}
              <div style={{textAlign:"center",marginTop:"32px",padding:"20px",border:"1px solid rgba(245,200,66,.15)",borderRadius:"4px",background:"rgba(61,37,16,.2)"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1rem,1.8vw,1.3rem)",color:"var(--gold)",marginBottom:"10px"}}>🎶 Nghe thêm nhạc cách mạng</div>
                <div style={{fontFamily:"'Crimson Text',serif",fontSize:"clamp(.88rem,1.4vw,1rem)",color:"rgba(245,233,204,.7)",lineHeight:"1.7"}}>
                  Tìm kiếm trên YouTube: <em style={{color:"var(--gold)"}}>"Hò Kéo Pháo Hoàng Vân"</em> · <em style={{color:"var(--gold)"}}>"Giải phóng Điện Biên"</em> · <em style={{color:"var(--gold)"}}>"Qua miền Tây Bắc"</em>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══ TƯỞNG NIỆM ANH HÙNG ═══════════════════════════════════════════════ */}
      <section className="sec sec-memorial" id="tuong-niem">
        {/* Falling particles */}
        <div className="memorial-particles">
          {Array.from({length:12}).map((_,i) => <div key={i} className="mp"/>)}
        </div>

        <div className="sec-inner" style={{position:"relative",zIndex:1}}>
          <div className="sec-label" style={{color:"rgba(245,200,66,.6)",letterSpacing:".4em"}}>Kính dâng hương hồn</div>
          <h2 className="sec-title" style={{color:"var(--cream)",textShadow:"0 0 40px rgba(245,200,66,.15)"}}>
            Tưởng Niệm Anh Hùng
          </h2>

          {/* Memorial divider */}
          <div className="memorial-divider">
            <div className="memorial-divider-line"/>
            <span className="memorial-divider-icon">✦ ✦ ✦</span>
            <div className="memorial-divider-line right"/>
          </div>

          {/* Candles */}
          <div className="candle-row">
            {["", "", "", "", "", "", ""].map((_, i) => (
              <Candle key={i} delay={i * 0.4} />
            ))}
          </div>

          {/* Central epitaph */}
          <div className="epitaph-block">
            <div className="epitaph-verse">
              "Các anh không chết, các anh đã hóa thành <em>núi sông, đất trời</em> của Tổ quốc Việt Nam mãi mãi trường tồn."
            </div>
            <div className="epitaph-attr">— Lời tưởng niệm các Anh hùng Liệt sĩ Điện Biên Phủ —</div>
          </div>

          {/* Casualty statistics */}
          <div className="memorial-stats">
            <div className="mem-stat">
              <span className="mem-stat-icon">⚔️</span>
              <span className="mem-stat-n">~4.020</span>
              <span className="mem-stat-l">Chiến sĩ Việt Minh<br/>hy sinh</span>
            </div>
            <div className="mem-stat">
              <span className="mem-stat-icon">🩸</span>
              <span className="mem-stat-n">~9.118</span>
              <span className="mem-stat-l">Chiến sĩ bị<br/>thương</span>
            </div>
            <div className="mem-stat">
              <span className="mem-stat-icon">🏔️</span>
              <span className="mem-stat-n">3.000+</span>
              <span className="mem-stat-l">Dân công hy sinh<br/>trên đường tiếp tế</span>
            </div>
            <div className="mem-stat">
              <span className="mem-stat-icon">🕯️</span>
              <span className="mem-stat-n">11</span>
              <span className="mem-stat-l">Nghĩa trang liệt sĩ<br/>tại Điện Biên</span>
            </div>
          </div>

          {/* Anh hùng tiêu biểu */}
          <div className="heroes-section-title">Những anh hùng tiêu biểu</div>
          <div className="heroes-grid">
            {HEROES.map((h, i) => (
              <div className="hero-card" key={i}>
                <span className="hero-card-star">{h.star}</span>
                <div className="hero-card-name">{h.name}</div>
                <div className="hero-card-title">{h.title}</div>
                <div className="hero-card-desc">{h.desc}</div>
                <span className="hero-card-badge">{h.badge}</span>
              </div>
            ))}
          </div>

          {/* Unknown soldiers wall */}
          <div className="unknown-wall">
            <div className="unknown-wall-title">🕯 Những người con vô danh của Tổ quốc</div>
            <p className="unknown-wall-text">
              Hàng nghìn chiến sĩ đã ngã xuống mà tên tuổi không được ghi chép đầy đủ.
              Họ yên nghỉ trong lòng đất Tây Bắc — máu thịt hòa vào mảnh đất thiêng liêng
              mà họ đã hiến dâng. Tên các anh sẽ mãi khắc sâu trong tim mỗi người con đất Việt.
            </p>
            {/* Rolling name ticker */}
            <div className="name-ticker-wrap">
              <div className="name-ticker">
                {[...FALLEN_NAMES, ...FALLEN_NAMES].map((name, i) => (
                  <span key={i} className="ticker-name">
                    {name}
                    <span className="ticker-sep"> • </span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pledge */}
          <div className="memorial-pledge">
            <div className="pledge-text">
              "Các anh đã ngã xuống vì <em>độc lập, tự do</em> của Tổ quốc.<br/>
              Chúng tôi nguyện ghi nhớ công ơn, tiếp bước con đường các anh đã chọn —<br/>
              xây dựng đất nước Việt Nam <em>mãi mãi trường tồn và phồn vinh</em>."
            </div>
            <div className="pledge-sig">Thế hệ hậu bối kính cẩn nghiêng mình</div>
          </div>
        </div>
      </section>

      {/* SIGNIFICANCE */}
      <section className="sec sec-sig">
        <div className="sig-inner">
          <div className="sec-label">Ý nghĩa lịch sử</div>
          <h2 className="sec-title">Chấn động địa cầu</h2>
          <div className="sig-quote">
            "Điện Biên Phủ là <em>chiến thắng vĩ đại nhất</em> trong lịch sử dân tộc
            Việt Nam, là mốc son chói lọi kết thúc ách thống trị của thực dân Pháp
            trên đất nước ta sau gần một thế kỷ."
          </div>
          <p className="sig-body">
            Chiến thắng Điện Biên Phủ ngày 7/5/1954 đập tan tập đoàn cứ điểm mạnh nhất của thực dân Pháp, tiêu diệt và bắt sống 16.200 quân địch — trong đó có tướng De Castries và toàn bộ bộ tham mưu. Chiến thắng buộc Pháp ký Hiệp định Genève 20/7/1954, chấm dứt 9 năm kháng chiến trường kỳ, giải phóng miền Bắc Việt Nam. Chiến thắng này còn cổ vũ mạnh mẽ phong trào giải phóng dân tộc trên toàn thế giới, trở thành biểu tượng bất diệt của ý chí quật cường.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <strong>Chiến dịch Điện Biên Phủ 1954</strong> &nbsp;•&nbsp; VNR202 Project &nbsp;•&nbsp; Lịch sử Việt Nam<br/>
        7 tháng 5, 1954 – Ngày Chiến thắng &nbsp;•&nbsp; <em>"Lừng lẫy năm châu, chấn động địa cầu"</em>
      </footer>

      {/* Scroll to top */}
      <button
        className={`scroll-top ${showScrollTop ? "visible" : ""}`}
        onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
        aria-label="Về đầu trang"
      >↑</button>
    </>
  );
}