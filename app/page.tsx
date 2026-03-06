"use client";

import { useState, useEffect } from "react";

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

  /* Grain overlay */
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
    display: flex; gap: clamp(16px, 2.5vw, 32px);
    flex-shrink: 0;
  }
  .nav-links a {
    font-family: 'Crimson Text', serif;
    font-size: clamp(0.7rem, 1.2vw, 0.85rem);
    color: rgba(245,233,204,0.6);
    text-decoration: none; letter-spacing: 0.1em;
    text-transform: uppercase; transition: color 0.25s;
    white-space: nowrap;
  }
  .nav-links a:hover { color: var(--gold); }

  /* Hide links on very small screens */
  @media (max-width: 600px) {
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

  /* SVG hill fills bottom portion */
  .hero-hill {
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: clamp(280px, 55%, 520px);
    pointer-events: none;
  }

  /* Hero text content */
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
    .hero-body {
      grid-template-columns: 1fr;
    }
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

  /* Desktop layout */
  .g0 { grid-column: span 5; grid-row: span 2; }
  .g1 { grid-column: span 4; }
  .g2 { grid-column: span 3; }
  .g3 { grid-column: span 4; }
  .g4 { grid-column: span 3; }

  /* Tablet */
  @media (max-width: 900px) {
    .g0 { grid-column: span 6; grid-row: span 2; }
    .g1 { grid-column: span 6; }
    .g2 { grid-column: span 6; }
    .g3 { grid-column: span 6; }
    .g4 { grid-column: span 6; }
  }

  /* Mobile: single column stack */
  @media (max-width: 560px) {
    .gallery {
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: 44vw;
    }
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
    .map-container {
      grid-template-columns: 1fr;
    }
  }

  .map-visual {
    background: rgba(61,37,16,.4);
    border: 2px solid rgba(245,200,66,.22);
    border-radius: 3px;
    aspect-ratio: 4/3;
    overflow: hidden;
    position: relative;
  }

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
    grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
    gap: clamp(24px, 3.5vw, 48px);
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

  .carousel-btn:hover {
    background: rgba(200,16,46,.6);
    transform: scale(1.05);
  }

  .carousel-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .commanders-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
    gap: clamp(24px, 3.5vw, 48px);
    position: relative; z-index: 1;
  }

  .commanders-group {
    background: rgba(61,37,16,.38);
    border: 1px solid rgba(245,200,66,.15);
    border-top: 3px solid rgba(200,16,46,.5);
    padding: clamp(20px, 2.5vw, 28px);
    border-radius: 2px;
  }

  .commanders-group.french {
    border-top-color: rgba(0,85,164,.6);
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

  .commander-avatar img {
    width: 100%; height: 100%; object-fit: cover;
  }

  .commander-info {
    padding: clamp(16px, 2vw, 20px);
  }

  .commanders-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.15rem, 2vw, 1.5rem);
    font-weight: 700; color: var(--gold);
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(245,200,66,.2);
  }

  .commander-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(.95rem, 1.6vw, 1.1rem);
    font-weight: 700; color: var(--cream);
    margin-bottom: 4px;
  }

  .commander-rank {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.8rem, 1.3vw, .92rem);
    color: rgba(245,233,204,.5); font-style: italic;
    margin-bottom: 6px;
  }

  .commander-role {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.85rem, 1.4vw, .98rem);
    color: rgba(245,233,204,.7);
  }

  /* ─── MAP INTERACTIVE ────────────────────────────── */
  .map-tabs {
    display: flex; gap: 12px; margin-bottom: 20px; justify-content: center;
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

  .map-tab-btn:hover {
    background: rgba(200,16,46,.5);
  }

  .map-content {
    display: none;
  }

  .map-content.active {
    display: block;
  }

  .historical-map-frame {
    width: 100%; aspect-ratio: 16/10;
    border: 2px solid rgba(245,200,66,.22);
    border-radius: 3px;
    overflow: hidden;
  }

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
    box-shadow: 0 0 15px rgba(200,16,46,.5);
  }

  .map-phase-btn:hover {
    background: rgba(200,16,46,.5);
  }

  .map-phase-info {
    background: rgba(61,37,16,.5);
    border: 1px solid rgba(245,200,66,.2);
    padding: clamp(16px, 2.5vw, 24px);
    border-radius: 2px;
    margin-top: 16px;
    min-height: 80px;
  }

  .map-phase-info h4 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1rem, 1.8vw, 1.3rem);
    color: var(--gold);
    margin-bottom: 8px;
  }

  .map-phase-info p {
    font-family: 'Crimson Text', serif;
    font-size: clamp(.9rem, 1.5vw, 1rem);
    color: rgba(245,233,204,.82);
    line-height: 1.7;
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
`;

// ── SVG Hill ──────────────────────────────────────────────────────────────────
function HeroHill() {
  return (
    <svg
      viewBox="0 0 1440 420"
      xmlns="http://www.w3.org/2000/svg"
      className="hero-hill"
      preserveAspectRatio="xMidYMax slice"
    >
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

      {/* Back ridge */}
      <path d="M0 420 L0 265 Q200 195 400 228 Q600 262 780 210 Q960 158 1140 202 Q1300 238 1440 218 L1440 420Z" fill="url(#hg2)" opacity=".6"/>
      {/* Mid */}
      <path d="M0 420 L0 300 Q150 248 300 272 Q480 305 620 252 Q760 205 900 244 Q1040 278 1180 238 Q1320 200 1440 244 L1440 420Z" fill="url(#hg1)"/>
      {/* Foreground – A1 peak */}
      <path d="M0 420 L0 360 Q90 345 180 334 Q280 320 360 305 Q430 290 490 270 Q535 252 570 236 Q610 218 638 208 Q658 200 676 204 Q695 208 714 216 Q752 232 808 255 Q866 278 936 296 Q1030 318 1140 328 Q1260 338 1380 343 L1440 345 L1440 420Z" fill="url(#hg3)"/>

      {/* Terrain detail lines */}
      <path d="M490 315 Q525 292 556 303 Q578 311 595 320" stroke="#4d2e12" strokeWidth="1" fill="none" opacity=".5"/>
      <path d="M618 280 Q644 258 668 270 Q690 280 706 295" stroke="#4d2e12" strokeWidth="1" fill="none" opacity=".5"/>
      <path d="M708 312 Q742 294 776 304 Q800 312 822 322" stroke="#4d2e12" strokeWidth="1" fill="none" opacity=".4"/>

      {/* Trees */}
      {[295,348,828,886,962,1044,1138,1205].map((x,i) => (
        <g key={i} transform={`translate(${x},${276+(i%3)*14})`} opacity=".45">
          <polygon points="0,-22 9,0 -9,0" fill="#1a0c05"/>
          <polygon points="0,-15 7,3 -7,3" fill="#1a0c05"/>
          <rect x="-1.5" y="3" width="3" height="6" fill="#1a0c05"/>
        </g>
      ))}

      {/* Battle silhouettes - soldiers */}
      <g opacity=".15" pointerEvents="none">
        {/* Soldier figures */}
        <g transform="translate(200,290)">
          <circle cx="0" cy="0" r="3" fill="#fff"/>
          <line x1="0" y1="3" x2="0" y2="10" stroke="#fff" strokeWidth="2"/>
          <line x1="-4" y1="5" x2="4" y2="5" stroke="#fff" strokeWidth="1.5"/>
          <line x1="0" y1="10" x2="-2" y2="15" stroke="#fff" strokeWidth="1.5"/>
          <line x1="0" y1="10" x2="2" y2="15" stroke="#fff" strokeWidth="1.5"/>
        </g>
        <g transform="translate(250,295)">
          <circle cx="0" cy="0" r="2.5" fill="#fff"/>
          <line x1="0" y1="2.5" x2="0" y2="9" stroke="#fff" strokeWidth="1.5"/>
          <line x1="-3" y1="4" x2="3" y2="4" stroke="#fff" strokeWidth="1"/>
        </g>
        <g transform="translate(600,300)">
          <circle cx="0" cy="0" r="3" fill="#fff"/>
          <line x1="0" y1="3" x2="0" y2="10" stroke="#fff" strokeWidth="2"/>
          <line x1="-4" y1="5" x2="4" y2="5" stroke="#fff" strokeWidth="1.5"/>
        </g>
        <g transform="translate(900,305)">
          <circle cx="0" cy="0" r="2.5" fill="#fff"/>
          <line x1="0" y1="2.5" x2="0" y2="9" stroke="#fff" strokeWidth="1.5"/>
          <line x1="-3" y1="4" x2="3" y2="4" stroke="#fff" strokeWidth="1"/>
        </g>
        <g transform="translate(1100,288)">
          <circle cx="0" cy="0" r="3" fill="#fff"/>
          <line x1="0" y1="3" x2="0" y2="10" stroke="#fff" strokeWidth="2"/>
          <line x1="-3.5" y1="6" x2="3.5" y2="6" stroke="#fff" strokeWidth="1.5"/>
        </g>
      </g>
      
      {/* Artillery flashes */}
      <circle cx="800" cy="250" r="14" fill="url(#fg)" opacity=".65">
        <animate attributeName="opacity" values=".65;.2;.8;.25;.65" dur="2.8s" repeatCount="indefinite"/>
        <animate attributeName="r" values="14;20;11;18;14" dur="2.8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="472" cy="258" r="10" fill="url(#fg)" opacity=".55">
        <animate attributeName="opacity" values=".55;.75;.28;.6;.55" dur="4.1s" repeatCount="indefinite"/>
        <animate attributeName="r" values="10;14;8;12;10" dur="4.1s" repeatCount="indefinite"/>
      </circle>
      <circle cx="1040" cy="278" r="8" fill="url(#fg)" opacity=".45">
        <animate attributeName="opacity" values=".45;.68;.22;.55;.45" dur="3.6s" repeatCount="indefinite"/>
        <animate attributeName="r" values="8;12;6;10;8" dur="3.6s" repeatCount="indefinite"/>
      </circle>

      {/* Searchlights */}
      <path d="M175 360 L62 60 L108 64Z" fill="rgba(245,220,140,.03)"/>
      <path d="M1235 345 L1388 56 L1346 60Z" fill="rgba(245,220,140,.025)"/>

      {/* ══ FLAGPOLE on A1 summit ══ */}
      <line x1="666" y1="204" x2="666" y2="132" stroke="#8b7355" strokeWidth="2.2"/>
      {/* Flag */}
      <g transform="translate(666,132)">
        <rect x="0" y="0" width="52" height="34" fill="#c8102e"/>
        {/* Star centered at 26, 17 */}
        <polygon
          points="26,5 29.5,14.5 39.6,14.5 31.8,20.3 34.6,29.8 26,24.2 17.4,29.8 20.2,20.3 12.4,14.5 22.5,14.5"
          fill="#f5c842"
        />
        <animateTransform
          attributeName="transform" type="skewY"
          values="0;-3;3;-4;2;0" dur="1.6s" repeatCount="indefinite" additive="sum"
        />
        <animate
          attributeName="x" from="0" to="4" dur="1.6s" values="0;-3;2;-4;1;0" repeatCount="indefinite"
        />
      </g>
      <ellipse cx="666" cy="206" rx="6" ry="3" fill="#5c3820" opacity=".7"/>

      {/* Ground */}
      <path d="M0 408 Q360 400 720 403 Q1080 406 1440 399" stroke="rgba(92,56,32,.22)" strokeWidth="1" fill="none"/>
    </svg>
  );
}



// ── Data ──────────────────────────────────────────────────────────────────────
const TIMELINE = [
  {
    date: "13/3/1954 – Nổ súng mở màn",
    text: "Đại tướng Võ Nguyên Giáp phát lệnh tấn công. Pháo binh ta bắn phủ đầu, tiêu diệt cứ điểm Him Lam, Độc Lập, bức hàng Bản Kéo — ngay trong đêm đầu tiên."
  },
  {
    date: "14/3 – 30/3/1954 – Đợt tấn công 1",
    text: "Quân ta tiêu diệt các cứ điểm phía Bắc, kiểm soát sân bay Mường Thanh, cắt đứt hoàn toàn đường tiếp tế đường không — yết hầu sống còn của quân Pháp."
  },
  {
    date: "30/3 – 26/4/1954 – Đợt tấn công 2",
    text: "Trận chiến đồi A1 (Éliane 2) — ác liệt nhất trong toàn chiến dịch. Hai bên giằng co từng tấc đất suốt nhiều tuần. Quân Pháp liên tục phản kích nhưng không thể giữ vững."
  },
  {
    date: "1/5 – 6/5/1954 – Đợt tấn công 3",
    text: "Phòng tuyến Pháp sụp đổ dần. Đêm 6/5, quân ta kích nổ 1.000 kg thuốc nổ trong đường hầm bí mật đồi A1 — tiếng nổ vang trời mở đường tổng công kích."
  },
  {
    date: "7/5/1954 – Toàn thắng",
    text: "17:30 ngày 7/5/1954, cờ Quyết chiến Quyết thắng tung bay trên nóc hầm De Castries. Tướng Pháp và toàn bộ bộ tham mưu đầu hàng. 56 ngày đêm — toàn thắng!"
  }
];

const GALLERY = [
  { src:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=560&fit=crop&q=80", cap:"Núi rừng Tây Bắc – chiến trường huyền thoại" },
  { src:"https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=500&h=280&fit=crop&q=80", cap:"Cờ đỏ sao vàng – biểu tượng chiến thắng" },
  { src:"https://images.unsplash.com/photo-1541417904950-b855846fe074?w=380&h=280&fit=crop&q=80", cap:"Đêm tối trên chiến địa Điện Biên" },
  { src:"https://images.unsplash.com/photo-1490604001847-b712b0c2f967?w=500&h=280&fit=crop&q=80", cap:"Người chiến sĩ Điện Biên anh hùng" },
  { src:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=380&h=280&fit=crop&q=80", cap:"Địa hình lòng chảo Mường Thanh" }
];

// ── Theory ────────────────────────────────────────────────────────────────────
const THEORY = [
  {
    title: "Bối cảnh chiến lược",
    text: "Năm 1954, Pháp tìm cách thay đổi tình hình bất lợi tại Đông Dương bằng cách xây dựng doanh trại kiên cố tại Điện Biên Phủ. Kế hoạch của Pháp là sử dụng lực lượng cơ giới mạnh để chọc thủng lực lượng Việt Minh và buộc họ phải chiến đấu trong điều kiện bất lợi."
  },
  {
    title: "Sự chuẩn bị của Việt Minh",
    text: "Đại tướng Võ Nguyên Giáp và Bộ Tư lệnh Việt Minh đã chuẩn bị kỹ càng trong 3 tháng. Họ huy động hàng chục nghìn quân nhân, vận chuyển hàng ngàn tủa pháo lên vào các sườn núi xung quanh, tạo ra một vòng vây toàn diện đáng sợ."
  },
  {
    title: "Ý nghĩa chiến lược",
    text: "Chiến dịch Điện Biên Phủ là bước ngoặt quyết định. Chiến thắng này chứng tỏ rằng một lực lượng có sự lãnh đạo tài ba, kỷ luật cao và ý chí quật cường, dùng chiến lược thích hợp có thể đánh bại một cường quốc phương Tây trang bị hàng đầu."
  }
];

// ── Commanders (Chỉ huy) ──────────────────────────────────────────────────────
const COMMANDERS = [
  {
    side: "vietnamese",
    title: "Chỉ huy Việt Minh",
    commanders: [
      { name: "Đại tướng Võ Nguyên Giáp", rank: "Tổng Tư lệnh", role: "Chỉ huy toàn chiến dịch", avatar: "🎖️" },
      { name: "Tướng Hoàng Văn Thái", rank: "Phó Tư lệnh", role: "Chỉ huy tiền tuyến", avatar: "⭐" },
      { name: "Thiếu tướng Đặng Ung", rank: "Cục trưởng", role: "Chỉ huy pháo binh", avatar: "🔫" },
      { name: "Đại tá Chu Văn An", rank: "Trung tướng", role: "Chỉ huy vùng", avatar: "🗺️" },
      { name: "Đại tá Lê Trọng Tấn", rank: "Trung tá", role: "Chỉ huy tiểu đoàn", avatar: "🎯" }
    ]
  },
  {
    side: "french",
    title: "Chỉ huy Pháp",
    commanders: [
      { name: "Tướng Henri Navarre", rank: "Tư lệnh quân đội", role: "Tư lệnh Đông Dương", avatar: "🇫🇷" },
      { name: "Thiếu tướng Christian de Castries", rank: "Tướng Nhân dân", role: "Tư lệnh doanh trại", avatar: "🏰" },
      { name: "Thiếu tướng René Cogny", rank: "Tướng Sư đoàn", role: "Phó Tư lệnh vùng", avatar: "⚔️" },
      { name: "Trung tá Château-Jobert", rank: "Trung tá", role: "Chỉ huy tiểu đoàn dự bị", avatar: "🎖️" },
      { name: "Thượng tá Pierre Langlais", rank: "Thượng tá", role: "Chỉ huy tác chiến", avatar: "🗡️" }
    ]
  }
];

// ── Attack Phases (Giai đoạn tấn công) ────────────────────────────────────────
const ATTACK_PHASES = [
  {
    id: "phase1",
    label: "13/3 - Nổ súng mở màn",
    title: "Đợt 1: Mở động quân",
    description: "Pháo binh quân ta bắn phủ đầu kinh hoàng. Tiêu diệt các cứ điểm Him Lam, Độc Lập, Bản Kéo trong đêm đầu tiên. Quân Pháp ngỡ ngàng bị tấn công từ nhiều hướng."
  },
  {
    id: "phase2",
    label: "14/3-30/3 - Tiêu hao",
    title: "Đợt 2: Tiêu diệt phòng tuyến",
    description: "Quân ta tiếp tục tấn công các cứ điểm phía Bắc. Kiểm soát sân bay Mường Thanh, cắt đứt hoàn toàn đường tiếp tế không quân. Quân Pháp bị cô lập hoàn toàn."
  },
  {
    id: "phase3",
    label: "30/3-26/4 - ác liệt",
    title: "Đợt 3: Giành đồi A1",
    description: "Trận chiến quanh đồi A1 (Éliane 2) - ác liệt nhất. Hai bên giằng co từng tấc đất. Quân Pháp phản kích liên tục nhưng không giữ được. Thương vong lớn ở cả hai phía."
  },
  {
    id: "phase4",
    label: "1/5-6/5 - Quyết định",
    title: "Đợt 4: Tổng công kích",
    description: "Phòng tuyến Pháp sụp đổ dần. Đêm 6/5, quân ta kích nổ 1000kg thuốc nổ trong đường hầm bí mật A1. Tiếng nổ lớn mở đường tổng công kích lịch sử."
  },
  {
    id: "phase5",
    label: "7/5 - Toàn thắng",
    title: "Chiến thắng hoàn toàn",
    description: "17h30 ngày 7/5/1954, cờ Quyết chiến Quyết thắng tung bay trên nóc hầm De Castries. 16.200 tù binh Pháp đầu hàng. 56 ngày đêm - TOÀN THẮNG!"
  }
];

// ── Map Component ──────────────────────────────────────────────────────────────
function DienBienMap({ phase = "all" }) {
  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" className="map-visual" style={{width: "100%", maxWidth: "600px", height: "auto", display: "block", margin: "0 auto"}}>
      <defs>
        <pattern id="paper" patternUnits="userSpaceOnUse" width="4" height="4">
          <rect width="4" height="4" fill="#f5e9cc"/>
          <path d="M0,0 l4,4 M4,0 l-4,4" stroke="rgba(0,0,0,0.03)" strokeWidth="0.5"/>
        </pattern>
        <linearGradient id="hill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d4a574"/>
          <stop offset="100%" stopColor="#a0744d"/>
        </linearGradient>
      </defs>

      {/* Paper background */}
      <rect width="800" height="600" fill="url(#paper)"/>
      
      {/* Border frame */}
      <rect x="30" y="20" width="740" height="560" fill="none" stroke="#8b7d6b" strokeWidth="2"/>
      <rect x="32" y="22" width="736" height="556" fill="none" stroke="#d4cfc4" strokeWidth="1"/>

      {/* Title */}
      <text x="400" y="50" textAnchor="middle" fontFamily="serif" fontSize="18" fontWeight="bold" fill="#4a3728">
        BẢN ĐỒ CHIẾN DỊCH ĐIỆN BIÊN PHỦ (13/3 - 7/5/1954)
      </text>

      {/* Terrain - hills become more prominent */}
      <g id="terrain">
        {/* Northern hills */}
        <path d="M60 120 Q120 100 180 130 Q220 150 250 120 Q280 90 320 110 Q360 80 400 100 Q440 80 480 110 Q520 150 560 130 Q620 100 680 120 Q720 140 750 120 L750 200 Q400 180 50 200 Z" 
              fill="url(#hill)" opacity="0.4" stroke="#8b7d6b" strokeWidth="1"/>

        {/* Western hills */}
        <circle cx="100" cy="280" r="55" fill="url(#hill)" opacity="0.35" stroke="#8b7d6b" strokeWidth="1"/>
        <circle cx="90" cy="350" r="45" fill="url(#hill)" opacity="0.3" stroke="#8b7d6b" strokeWidth="1"/>

        {/* Eastern hills */}
        <circle cx="700" cy="300" r="60" fill="url(#hill)" opacity="0.35" stroke="#8b7d6b" strokeWidth="1"/>
        <circle cx="710" cy="380" r="50" fill="url(#hill)" opacity="0.3" stroke="#8b7d6b" strokeWidth="1"/>

        {/* Contour lines */}
        <path d="M150 180 Q200 170 250 180" stroke="#8b7d6b" strokeWidth="0.5" fill="none" opacity="0.3"/>
        <path d="M550 190 Q600 175 650 190" stroke="#8b7d6b" strokeWidth="0.5" fill="none" opacity="0.3"/>
      </g>

      {/* River - Sông Đen */}
      <path d="M150 300 Q200 320 250 310 Q300 300 350 320 Q400 340 450 330 Q500 320 550 340 Q600 350 650 340" 
            stroke="#4a90e2" strokeWidth="3" fill="none" opacity="0.6" strokeLinecap="round"/>
      <text x="120" y="315" fontFamily="serif" fontSize="11" fill="#4a90e2" opacity="0.7">Sông Đen</text>

      {/* Vietnamese forces - surrounding positions */}
      <g id="vn-forces" opacity="0.85">
        {/* Northwest */}
        <circle cx="120" cy="200" r="14" fill="none" stroke="#c8102e" strokeWidth="3"/>
        <text x="120" y="225" textAnchor="middle" fontFamily="serif" fontSize="12" fontWeight="bold" fill="#c8102e">Đông Bắc 54</text>

        {/* North */}
        <circle cx="400" cy="130" r="14" fill="none" stroke="#c8102e" strokeWidth="3"/>
        <text x="400" y="110" textAnchor="middle" fontFamily="serif" fontSize="12" fontWeight="bold" fill="#c8102e">Bắc</text>

        {/* Northeast */}
        <circle cx="680" cy="200" r="14" fill="none" stroke="#c8102e" strokeWidth="3"/>
        <text x="680" y="225" textAnchor="middle" fontFamily="serif" fontSize="12" fontWeight="bold" fill="#c8102e">Tây Bắc 3</text>

        {/* West */}
        <circle cx="70" cy="320" r="14" fill="none" stroke="#c8102e" strokeWidth="3"/>
        <text x="70" y="365" textAnchor="middle" fontFamily="serif" fontSize="11" fontWeight="bold" fill="#c8102e">Đông Bắc 51</text>

        {/* East */}
        <circle cx="730" cy="340" r="14" fill="none" stroke="#c8102e" strokeWidth="3"/>
        <text x="730" y="380" textAnchor="middle" fontFamily="serif" fontSize="11" fontWeight="bold" fill="#c8102e">Liên Khu 3</text>

        {/* South */}
        <circle cx="400" cy="480" r="14" fill="none" stroke="#c8102e" strokeWidth="3"/>
        <text x="400" y="510" textAnchor="middle" fontFamily="serif" fontSize="12" fontWeight="bold" fill="#c8102e">Đông Bắc 308</text>
      </g>

      {/* Attack arrows for phases */}
      {(phase === "all" || phase === "phase1" || phase === "phase2") && (
        <g id="attack-arrows" opacity="0.7">
          <defs>
            <marker id="arrowRed" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
              <polygon points="0 0, 12 6, 0 12" fill="#c8102e"/>
            </marker>
          </defs>
          {/* Arrows from various directions toward center */}
          <path d="M130 210 L280 300" stroke="#c8102e" strokeWidth="2.5" fill="none" markerEnd="url(#arrowRed)" strokeDasharray="5,3"/>
          <path d="M420 145 L400 270" stroke="#c8102e" strokeWidth="2.5" fill="none" markerEnd="url(#arrowRed)" strokeDasharray="5,3"/>
          <path d="M670 210 L520 300" stroke="#c8102e" strokeWidth="2.5" fill="none" markerEnd="url(#arrowRed)" strokeDasharray="5,3"/>
          <path d="M85 305 L280 320" stroke="#c8102e" strokeWidth="2.5" fill="none" markerEnd="url(#arrowRed)" strokeDasharray="5,3"/>
          <path d="M715 355 L520 330" stroke="#c8102e" strokeWidth="2.5" fill="none" markerEnd="url(#arrowRed)" strokeDasharray="5,3"/>
          <path d="M420 465 L400 370" stroke="#c8102e" strokeWidth="2.5" fill="none" markerEnd="url(#arrowRed)" strokeDasharray="5,3"/>
        </g>
      )}

      {/* French fortified positions - Center */}
      <g id="french-base" opacity="0.9">
        {/* Main camp polygon */}
        <polygon points="360,300 440,300 450,350 350,350" fill="rgba(0,85,164,0.15)" stroke="#0055a4" strokeWidth="2"/>
        
        {/* Key strongpoints */}
        <g id="strongpoints">
          {/* Him Lam - Northwest of center */}
          <circle cx="350" cy="280" r="10" fill="rgba(0,85,164,0.3)" stroke="#0055a4" strokeWidth="2"/>
          <text x="350" y="270" textAnchor="middle" fontFamily="serif" fontSize="10" fontWeight="bold" fill="#0055a4">Him Lam</text>

          {/* Béatrice - North */}
          <circle cx="360" cy="260" r="10" fill="rgba(0,85,164,0.3)" stroke="#0055a4" strokeWidth="2"/>
          <text x="360" y="250" textAnchor="middle" fontFamily="serif" fontSize="10" fontWeight="bold" fill="#0055a4">Béatrice</text>

          {/* Gabrielle - Northeast */}
          <circle cx="445" cy="270" r="10" fill="rgba(0,85,164,0.3)" stroke="#0055a4" strokeWidth="2"/>
          <text x="445" y="260" textAnchor="middle" fontFamily="serif" fontSize="10" fontWeight="bold" fill="#0055a4">Gabrielle</text>

          {/* Dominique - East */}
          <circle cx="460" cy="315" r="10" fill="rgba(0,85,164,0.3)" stroke="#0055a4" strokeWidth="2"/>
          <text x="475" y="315" textAnchor="start" fontFamily="serif" fontSize="10" fontWeight="bold" fill="#0055a4">Dominique</text>

          {/* Eliane - Southeast */}
          <circle cx="445" cy="340" r="10" fill="rgba(0,85,164,0.3)" stroke="#0055a4" strokeWidth="2"/>
          <text x="445" y="355" textAnchor="middle" fontFamily="serif" fontSize="10" fontWeight="bold" fill="#0055a4">Eliane</text>

          {/* Claudine - South */}
          <circle cx="380" cy="360" r="10" fill="rgba(0,85,164,0.3)" stroke="#0055a4" strokeWidth="2"/>
          <text x="380" y="375" textAnchor="middle" fontFamily="serif" fontSize="10" fontWeight="bold" fill="#0055a4">Claudine</text>

          {/* Huguette - Southwest */}
          <circle cx="340" cy="330" r="10" fill="rgba(0,85,164,0.3)" stroke="#0055a4" strokeWidth="2"/>
          <text x="325" y="340" textAnchor="end" fontFamily="serif" fontSize="10" fontWeight="bold" fill="#0055a4">Huguette</text>

          {/* A1 (Éliane 2) - Key hill - HIGHLIGHT */}
          <circle cx="390" cy="300" r="12" fill="rgba(255,215,0,0.4)" stroke="#f5c842" strokeWidth="3"/>
          <text x="390" y="308" textAnchor="middle" fontFamily="serif" fontSize="12" fontWeight="bold" fill="#f5c842">A1</text>
        </g>

        {/* Central command post */}
        <rect x="395" y="310" width="20" height="20" fill="rgba(0,85,164,0.5)" stroke="#0055a4" strokeWidth="2" transform="rotate(45 405 320)"/>
        <text x="410" y="333" fontFamily="serif" fontSize="9" fill="#0055a4">Mường Thanh</text>

        {/* Airfield */}
        <line x1="320" y1="340" x2="480" y2="340" stroke="#0055a4" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.6"/>
        <text x="400" y="355" textAnchor="middle" fontFamily="serif" fontSize="9" fill="#0055a4" opacity="0.7">Sân bay</text>
      </g>

      {/* For A1 phase highlight */}
      {(phase === "all" || phase === "phase3") && (
        <circle cx="390" cy="300" r="30" fill="none" stroke="#ffd700" strokeWidth="2" strokeDasharray="4,4" opacity="0.8">
          <animate attributeName="r" from="25" to="35" dur="1.5s" repeatCount="indefinite"/>
        </circle>
      )}

      {/* Legend box */}
      <g id="legend" opacity="0.95">
        <rect x="50" y="420" width="280" height="130" fill="#f5e9cc" stroke="#8b7d6b" strokeWidth="1.5"/>
        <text x="60" y="440" fontFamily="serif" fontSize="13" fontWeight="bold" fill="#4a3728">CHỈ GIẢI:</text>
        
        <g>
          <circle cx="70" cy="460" r="8" fill="none" stroke="#c8102e" strokeWidth="2.5"/>
          <text x="90" y="465" fontFamily="serif" fontSize="11" fill="#4a3728">Lực lượng Việt Minh</text>
        </g>

        <g>
          <circle cx="70" cy="485" r="8" fill="rgba(0,85,164,0.4)" stroke="#0055a4" strokeWidth="2"/>
          <text x="90" y="490" fontFamily="serif" fontSize="11" fill="#4a3728">Cứ điểm Pháp</text>
        </g>

        <g>
          <circle cx="70" cy="510" r="8" fill="rgba(255,215,0,0.4)" stroke="#f5c842" strokeWidth="2.5"/>
          <text x="90" y="515" fontFamily="serif" fontSize="11" fill="#4a3728">Đồi A1 (Éliane 2)</text>
        </g>

        <g>
          <path d="M60 535 L80 535" stroke="#c8102e" strokeWidth="2.5" strokeDasharray="4,3" markerEnd="url(#arrowRed)"/>
          <text x="90" y="540" fontFamily="serif" fontSize="11" fill="#4a3728">Hướng tấn công</text>
        </g>
      </g>

      {/* Date and info */}
      <text x="600" y="520" fontFamily="serif" fontSize="10" fill="#8b7d6b" opacity="0.8">56 ngày (13/3 - 7/5/1954)</text>
      <text x="600" y="540" fontFamily="serif" fontSize="10" fill="#8b7d6b" opacity="0.8">16.200 tù binh Pháp</text>

      {/* Scale */}
      <g id="scale" opacity="0.7">
        <text x="60" y="570" fontFamily="serif" fontSize="10" fill="#4a3728">Tỷ lệ:</text>
        <line x1="110" y1="565" x2="160" y2="565" stroke="#4a3728" strokeWidth="1.5"/>
        <line x1="110" y1="560" x2="110" y2="570" stroke="#4a3728" strokeWidth="1.5"/>
        <line x1="160" y1="560" x2="160" y2="570" stroke="#4a3728" strokeWidth="1.5"/>
        <text x="135" y="580" textAnchor="middle" fontFamily="serif" fontSize="9" fill="#4a3728">5 km</text>
      </g>

      {/* Compass rose */}
      <g id="compass" opacity="0.6">
        <circle cx="720" cy="480" r="20" fill="none" stroke="#8b7d6b" strokeWidth="1"/>
        <line x1="720" y1="460" x2="720" y2="440" stroke="#c8102e" strokeWidth="2"/>
        <text x="720" y="432" textAnchor="middle" fontFamily="serif" fontSize="14" fontWeight="bold" fill="#c8102e">N</text>
        <path d="M715 475 L720 480 L725 475" fill="none" stroke="#8b7d6b" strokeWidth="1"/>
        <path d="M720 500 L720 505" stroke="#8b7d6b" strokeWidth="1"/>
      </g>
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mapPhase, setMapPhase] = useState("all");
  const [commanderSlide, setCommanderSlide] = useState(0);
  const [mapTab, setMapTab] = useState("interactive");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handlePrevCommanders = () => {
    setCommanderSlide(prev => prev === 0 ? COMMANDERS.length - 1 : prev - 1);
  };

  const handleNextCommanders = () => {
    setCommanderSlide(prev => prev === COMMANDERS.length - 1 ? 0 : prev + 1);
  };

  return (
    <>
      <style>{style}</style>

      {/* NAVBAR */}
      <nav className={`nav${scrolled ? " opaque" : ""}`}>
        <div className="nav-brand">
          <div className="nav-flag"><span>★</span></div>
          <h1 className="nav-title">Chiến dịch Điện Biên Phủ</h1>
        </div>
        <div className="nav-links">
          <a href="#">Trang chủ</a>
          <a href="#a1">Đồi A1</a>
          <a href="#theory">Lý thuyết</a>
          <a href="#map">Bản đồ</a>
          <a href="#commanders">Chỉ huy</a>
          <a href="#timeline">Chiến dịch</a>
          <a href="#gallery">Hình ảnh</a>
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
                onError={e => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop&q=80";
                }}
              />
              <div className="a1-img-cap">
                🏔️ Đồi A1 (Éliane 2) – cứ điểm kiên cố nhất của quân Pháp
              </div>
            </div>

            <div className="a1-info">
              <h3>Cứ điểm Éliane 2 – Đồi A1</h3>
              <p>
                Đồi A1 (Pháp gọi là Éliane 2) là cứ điểm then chốt và kiên cố nhất
                trong hệ thống phòng thủ của quân Pháp tại Điện Biên Phủ. Nằm ở
                phía Đông Mường Thanh, đồi A1 khống chế toàn bộ khu trung tâm
                và sân bay — yết hầu tiếp tế duy nhất của quân Pháp.
              </p>
              <p>
                Trận chiến giành giật đồi A1 kéo dài gần <strong>2 tháng</strong> với
                những trận đánh đẫm máu nhất. Đêm 6/5/1954, quân ta kích nổ
                1.000 kg thuốc nổ trong đường hầm bí mật, phá vỡ hoàn toàn tuyến
                phòng thủ và mở đường cho đợt tổng công kích lịch sử.
              </p>
              <div className="stats">
                <div className="stat">
                  <span className="stat-n">56</span>
                  <span className="stat-l">ngày đêm chiến đấu</span>
                </div>
                <div className="stat">
                  <span className="stat-n">16.200</span>
                  <span className="stat-l">tù binh Pháp</span>
                </div>
                <div className="stat">
                  <span className="stat-n">7/5</span>
                  <span className="stat-l">ngày toàn thắng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THEORY SECTION */}
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

      {/* MAP SECTION */}
      <section className="sec sec-map" id="map">
        <div className="sec-inner">
          <div className="sec-label">Địa lý chiến trường</div>
          <h2 className="sec-title">Bản đồ Điện Biên Phủ - Tương tác</h2>
          
          <div className="map-tabs">
            <button 
              className={`map-tab-btn ${mapTab === "interactive" ? "active" : ""}`}
              onClick={() => setMapTab("interactive")}
            >
              Bản đồ tương tác
            </button>
            <button 
              className={`map-tab-btn ${mapTab === "historical" ? "active" : ""}`}
              onClick={() => setMapTab("historical")}
            >
              Bản đồ lịch sử
            </button>
          </div>

          {/* Interactive Map Tab */}
          {mapTab === "interactive" && (
            <div className="map-content active">
              <div className="map-phase-buttons">
                <button 
                  className={`map-phase-btn ${mapPhase === "all" ? "active" : ""}`}
                  onClick={() => setMapPhase("all")}
                >
                  Tất cả giai đoạn
                </button>
                {ATTACK_PHASES.map((phase) => (
                  <button 
                    key={phase.id}
                    className={`map-phase-btn ${mapPhase === phase.id ? "active" : ""}`}
                    onClick={() => setMapPhase(phase.id)}
                  >
                    {phase.label}
                  </button>
                ))}
              </div>

              <div className="map-container">
                <div className="map-visual">
                  <DienBienMap phase={mapPhase} />
                </div>
                <div className="map-legend">
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: "#c8102e"}}></div>
                    <div className="legend-text"><strong>Lực lượng Việt Minh</strong> - Vòng vây từ các đồi cao xung quanh</div>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: "rgba(0,85,164,.6)"}}></div>
                    <div className="legend-text"><strong>Căn cứ Pháp</strong> - Mường Thanh, nằm trong lòng chảo</div>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: "#f5c842", opacity: "0.6"}}></div>
                    <div className="legend-text"><strong>Đồi A1</strong> - Cứ điểm then chốt</div>
                  </div>
                  {mapPhase !== "all" && (
                    <div className="map-phase-info">
                      <h4>{ATTACK_PHASES.find(p => p.id === mapPhase)?.title}</h4>
                      <p>{ATTACK_PHASES.find(p => p.id === mapPhase)?.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Historical Map Tab */}
          {mapTab === "historical" && (
            <div className="map-content active">
              <img 
                src="https://static.laodong.vn/storage/newsportal/2024/3/14/1314940/documents/Pic2.png"
                alt="Bản đồ Điện Biên Phủ lịch sử"
                style={{width: "100%", maxWidth: "600px", height: "auto", borderRadius: "3px", border: "2px solid rgba(245,200,66,.22)", display: "block", margin: "0 auto"}}
              />
              <p style={{textAlign: "center", marginTop: "16px", fontFamily: "'Crimson Text', serif", color: "rgba(245,233,204,.7)", fontSize: "14px"}}>
                Bản đồ lịch sử chiến dịch Điện Biên Phủ - Tư liệu quý từ Lao Động
              </p>
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

      {/* COMMANDERS SECTION */}
      <section className="sec sec-commanders" id="commanders">
        <div className="sec-inner">
          <div className="sec-label">Nhân vật lịch sử</div>
          <h2 className="sec-title">Chỉ huy hai bên quân</h2>
          
          <div className="commanders-carousel">
            <div className="commanders-title" style={{textAlign: "center", marginBottom: "24px", fontSize: "clamp(1.3rem, 2.2vw, 1.8rem)", color: "var(--gold)"}}>
              {COMMANDERS[commanderSlide].title}
            </div>
            
            <div className="carousel-inner">
              {COMMANDERS[commanderSlide].commanders.map((cmd, j) => (
                <div className="commander-card" key={j}>
                  <div className="commander-avatar">
                    {cmd.avatar}
                  </div>
                  <div className="commander-info">
                    <div className="commander-name">{cmd.name}</div>
                    <div className="commander-rank">{cmd.rank}</div>
                    <div className="commander-role">{cmd.role}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="carousel-controls">
              <button 
                className="carousel-btn" 
                onClick={handlePrevCommanders}
                disabled={COMMANDERS.length <= 1}
              >
                ← Bên trước
              </button>
              <span style={{color: "var(--gold)", display: "flex", alignItems: "center", fontSize: "14px"}}>
                {commanderSlide + 1} / {COMMANDERS.length}
              </span>
              <button 
                className="carousel-btn" 
                onClick={handleNextCommanders}
                disabled={COMMANDERS.length <= 1}
              >
                Bên sau →
              </button>
            </div>
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
            Chiến thắng Điện Biên Phủ ngày 7/5/1954 đập tan tập đoàn cứ điểm mạnh nhất
            của thực dân Pháp, tiêu diệt và bắt sống 16.200 quân địch — trong đó có
            tướng De Castries và toàn bộ bộ tham mưu. Chiến thắng buộc Pháp ký
            Hiệp định Genève 20/7/1954, chấm dứt 9 năm kháng chiến trường kỳ, giải phóng
            miền Bắc Việt Nam. Chiến thắng này còn cổ vũ mạnh mẽ phong trào giải phóng
            dân tộc trên toàn thế giới, trở thành biểu tượng bất diệt của ý chí quật cường.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <strong>Chiến dịch Điện Biên Phủ 1954</strong> &nbsp;•&nbsp;
        VNR202 Project &nbsp;•&nbsp; Lịch sử Việt Nam<br/>
        7 tháng 5, 1954 – Ngày Chiến thắng
      </footer>
    </>
  );
}