import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ArrowDown, WifiHigh, Lightning, ShieldCheck } from '@phosphor-icons/react';
import { useCart } from '../hooks/useCart';
import hubDeviceImg from '../assets/hub_device_compressed.webp';

// ─── Custom cubic-bezier — spring-like mass physics ───────────────────────
const SPRING = [0.32, 0.72, 0, 1] as const;

// ─── Stat chips data ───────────────────────────────────────────────────────
const STAT_CHIPS = [
  { icon: WifiHigh,    label: '128 thiết bị', sub: 'kết nối' },
  { icon: Lightning,   label: '< 50ms',        sub: 'độ trễ' },
  { icon: ShieldCheck, label: '256-bit',        sub: 'AES mã hoá' },
] as const;

// ─── Framer variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)' },
};

/**
 * Hero — High-End Redesign w/ Dark / Light mode.
 * Layout : Editorial Split (text left / device right) on desktop,
 *          vertical stack on mobile.
 * Vibe   : Ethereal Glass — OLED black (dark) / warm off-white (light).
 */
export const Hero = React.memo(function Hero() {
  const { addToCart } = useCart();
  const prefersReduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Fire float animation even when image is browser-cached
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  const scrollToFeatures = () => {
    const el = document.getElementById('dashboard');
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
  };

  const transition = (delay = 0) => ({
    duration: prefersReduced ? 0 : 0.85,
    delay:    prefersReduced ? 0 : delay,
    ease: SPRING,
  });

  return (
    <section
      id="hero"
      aria-label="Helicorp Hub — Bộ điều khiển nhà thông minh"
      className="
        relative min-h-[100dvh] overflow-hidden
        bg-zinc-50   dark:bg-oled-black
        flex flex-col items-center justify-center
        px-6 pt-28 pb-16 lg:py-0
        transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
      "
    >

      {/* ── Background: radial mesh gradient orbs ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Primary teal orb — top-left */}
        <div className="
          absolute -top-40 -left-32 w-[600px] h-[600px] rounded-full
          bg-[radial-gradient(ellipse_at_center,rgba(0,242,254,0.08)_0%,transparent_70%)]
          dark:bg-[radial-gradient(ellipse_at_center,rgba(0,242,254,0.14)_0%,transparent_70%)]
        " />

        {/* Secondary blue orb — bottom-right */}
        <div className="
          absolute -bottom-24 -right-24 w-[500px] h-[500px] rounded-full
          bg-[radial-gradient(ellipse_at_center,rgba(79,172,254,0.06)_0%,transparent_70%)]
          dark:bg-[radial-gradient(ellipse_at_center,rgba(79,172,254,0.10)_0%,transparent_70%)]
        " />

        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 opacity-[0.018] dark:opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,242,254,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(0,242,254,0.6) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 lg:gap-0 relative z-10">
        {/* ══════════════════════════════════════════════════════════════════
            LEFT COLUMN — Typography + CTAs + Stat chips
        ══════════════════════════════════════════════════════════════════ */}
      <div className="
        relative z-10 flex flex-col items-start gap-7
        w-full lg:w-[52%] xl:w-[48%]
        text-left
      ">

        {/* Eyebrow badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={transition(0)}
          className="
            inline-flex items-center gap-2
            px-3.5 py-1.5 rounded-full
            border border-zinc-200/80 dark:border-white/10
            bg-zinc-100/70    dark:bg-white/5
            shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]
            dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]
          "
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
          <span className="
            text-[10px] uppercase tracking-[0.22em] font-semibold font-sans
            text-zinc-500 dark:text-zinc-400
          ">
            Bộ Điều Khiển Thế Hệ Mới
          </span>
        </motion.div>

        {/* H1 — Massive editorial headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={transition(0.08)}
          className="
            font-display font-black tracking-tighter leading-[1.02]
            text-3xl sm:text-4xl lg:text-5xl
            text-zinc-900 dark:text-white
          "
        >
          Một chạm kết&nbsp;nối.{' '}
          <br />
          <span className="
            text-transparent bg-clip-text
            bg-[linear-gradient(90deg,#00c9b1_0%,#0099cc_60%,#7c5cbf_100%)]
            dark:bg-[linear-gradient(90deg,#00f2fe_0%,#4facfe_60%,#a78bfa_100%)]
          ">
            Vạn thiết bị&nbsp;thông minh.
          </span>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={transition(0.16)}
          className="
            text-[15px] leading-[1.75] max-w-[42ch] font-sans
            text-zinc-500 dark:text-zinc-400
          "
        >
          Helicorp OS hợp nhất toàn bộ hệ sinh thái thiết bị thông minh vào
          một giao diện trực quan — kiểm soát năng lượng, an ninh và tiện nghi
          theo thời gian thực từ bất kỳ đâu.
        </motion.p>

        {/* CTA row — Button-in-Button architecture */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={transition(0.24)}
          className="flex flex-row flex-wrap items-center gap-4"
        >
          {/* PRIMARY CTA */}
          <button
            id="hero-cta-buy"
            onClick={() =>
              addToCart({
                id: 'helicorp-hub-01',
                name: 'Bộ Điều Khiển Helicorp Hub',
                price: 4_890_000,
                image: hubDeviceImg,
              })
            }
            className="
              group flex items-center gap-3.5
              pl-6 pr-2.5 py-2.5 rounded-full
              bg-[linear-gradient(135deg,#00c9b1,#0099cc)]
              dark:bg-[linear-gradient(135deg,#00f2fe,#4facfe)]
              text-white dark:text-zinc-950
              font-bold text-sm font-sans
              shadow-[0_0_20px_rgba(0,153,204,0.22)]
              dark:shadow-[0_0_28px_rgba(0,242,254,0.25)]
              hover:shadow-[0_0_36px_rgba(0,153,204,0.38)]
              dark:hover:shadow-[0_0_40px_rgba(0,242,254,0.40)]
              active:scale-[0.97]
              transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
              cursor-pointer
            "
            aria-label="Thêm Helicorp Hub vào giỏ hàng"
          >
            <span>Mua ngay</span>
            {/* Trailing icon circle — kinetic Button-in-Button */}
            <span className="
              w-8 h-8 rounded-full
              bg-white/20 dark:bg-black/12
              flex items-center justify-center
              group-hover:translate-x-[3px] group-hover:-translate-y-[2px] group-hover:scale-105
              transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
            ">
              <ArrowUpRight size={14} weight="bold" />
            </span>
          </button>

          {/* SECONDARY CTA */}
          <button
            id="hero-cta-explore"
            onClick={scrollToFeatures}
            className="
              px-6 py-3 rounded-full
              border border-zinc-300/80 dark:border-white/12
              bg-white/60          dark:bg-white/5
              shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]
              dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]
              text-zinc-700 dark:text-zinc-300
              text-sm font-semibold font-sans
              hover:border-accent-teal/50 hover:text-zinc-900 dark:hover:text-white
              hover:bg-white/90       dark:hover:bg-white/8
              active:scale-[0.97]
              transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
              cursor-pointer
            "
          >
            Xem tính năng
          </button>
        </motion.div>

        {/* Stat chips row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={transition(0.34)}
          className="flex flex-row flex-wrap gap-3 mt-1"
        >
          {STAT_CHIPS.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="
                flex items-center gap-2.5
                px-4 py-2.5 rounded-[1.2rem]
                border border-zinc-200/80 dark:border-white/8
                bg-white/70            dark:bg-white/[0.04]
                shadow-[0_1px_3px_rgba(0,0,0,0.06)]
                dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
              "
            >
              {/* Double-bezel icon pip */}
              <span className="
                w-7 h-7 rounded-[0.6rem]
                border border-accent-teal/25 dark:border-accent-teal/20
                bg-accent-teal/10
                flex items-center justify-center shrink-0
              ">
                <Icon size={14} weight="light" className="text-accent-teal dark:text-accent-teal" />
              </span>
              <div className="flex flex-col leading-none">
                <span className="text-[12px] font-bold font-sans text-zinc-800 dark:text-white">{label}</span>
                <span className="text-[10px] font-sans mt-0.5 text-zinc-500 dark:text-zinc-500">{sub}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToFeatures}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: prefersReduced ? 0 : 1.4, duration: 0.6 }}
          className="
            flex items-center gap-2.5 mt-2
            text-zinc-400 dark:text-zinc-600
            hover:text-accent-teal dark:hover:text-accent-teal
            transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
            cursor-pointer
            w-full justify-center md:justify-start md:ml-2
          "
          aria-label="Cuộn xuống xem tính năng"
        >
          <span className="text-[10px] uppercase tracking-widest font-semibold font-sans">Khám phá</span>
          <motion.span
            animate={prefersReduced ? {} : { y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} />
          </motion.span>
        </motion.button>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          RIGHT COLUMN — Device in Double-Bezel frame
      ══════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: prefersReduced ? 0 : 1.1,
          delay:    prefersReduced ? 0 : 0.3,
          ease: SPRING,
        }}
        className="
          relative z-10
          w-full lg:w-[48%] xl:w-[52%]
          flex items-center justify-center
          lg:h-[100dvh]
          
        "
        aria-hidden="true"
      >
        {/* Ambient glow behind device */}
        <div className="
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          
          w-[110%] h-[110%] rounded-full pointer-events-none
          bg-[radial-gradient(ellipse_at_center,rgba(0,201,177,0.07)_0%,transparent_65%)]
          dark:bg-[radial-gradient(ellipse_at_center,rgba(0,242,254,0.10)_0%,transparent_65%)]
        " />

        {/* ── OUTER BEZEL SHELL ──────────────────────────────────────── */}
        <div className="
          hidden md:block
          relative w-full max-w-[520px]
          p-2 rounded-[2.4rem]
          border border-zinc-200/70       dark:border-white/10
          bg-zinc-100/50                  dark:bg-white/[0.03]
          shadow-[0_4px_32px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)]
          dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.07),0_0_80px_rgba(0,242,254,0.06)]
        ">
          {/* ── INNER CORE ─────────────────────────────────────────── */}
          <div className="
            relative w-full overflow-hidden rounded-[calc(2.4rem-0.5rem)]
            border border-zinc-200/60 dark:border-white/8
            bg-white            dark:bg-zinc-950
            shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]
            dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]
          ">
            {/* Top chrome bar */}
            <div className="
              absolute top-0 left-0 right-0 h-7 z-10
              flex items-center justify-between px-4
              border-b border-zinc-200/60 dark:border-white/6
              bg-zinc-50/90 dark:bg-zinc-950/80
            ">
              <span className="flex gap-1.5">
                {['bg-zinc-300 dark:bg-zinc-700', 'bg-zinc-300 dark:bg-zinc-700', 'bg-zinc-300 dark:bg-zinc-700'].map((c, i) => (
                  <span key={i} className={`w-2 h-2 rounded-full ${c}`} />
                ))}
              </span>
              <span className="text-[9px] uppercase tracking-widest font-sans font-semibold text-zinc-400 dark:text-zinc-600">
                Helicorp OS
              </span>
              <span className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
            </div>

            {/* Device image */}
            <motion.img
              ref={imgRef}
              src={hubDeviceImg}
              alt="Bộ điều khiển thông minh Helicorp Hub — Smart Home Controller"
              width={520}
              height={520}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-auto object-cover object-top pt-7"
              onLoad={() => setLoaded(true)}
              animate={loaded && !prefersReduced ? { y: [0, -7, 0] } : {}}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Gradient vignette bottom */}
            <div className="
              absolute bottom-0 left-0 right-0 h-28 pointer-events-none
              bg-[linear-gradient(to_top,#ffffff_0%,transparent_100%)]
              dark:bg-[linear-gradient(to_top,#050505_0%,transparent_100%)]
            " />

            {/* Live badge — bottom-left */}
            <div className="
              absolute bottom-5 left-4 z-20
              flex items-center gap-2
              px-3 py-1.5 rounded-full
              border border-accent-teal/25 dark:border-accent-teal/20
              bg-white/80          dark:bg-zinc-950/80
              shadow-[0_2px_8px_rgba(0,0,0,0.08)]
              dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
            ">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest font-sans text-zinc-500 dark:text-zinc-400">
                Live
              </span>
            </div>

            {/* Energy badge — bottom-right */}
            <div className="
              absolute bottom-5 right-4 z-20
              flex items-center gap-1.5
              px-3 py-1.5 rounded-full
              border border-zinc-200/70 dark:border-white/8
              bg-white/80 dark:bg-zinc-950/80
              shadow-[0_2px_8px_rgba(0,0,0,0.08)]
            ">
              <Lightning size={11} weight="fill" className="text-amber-400" />
              <span className="text-[10px] font-bold font-sans text-zinc-700 dark:text-zinc-300">−28% điện</span>
            </div>
          </div>
        </div>
      </motion.div>
      </div>
    </section>
  );
});
