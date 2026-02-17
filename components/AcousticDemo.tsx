import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AcousticDemo: React.FC = () => {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInside, setIsInside] = useState(false);
    const isVisibleRef = useRef(false);
    const targetAmpRef = useRef(100);

    useEffect(() => {
        targetAmpRef.current = isInside ? 5 : 100;
    }, [isInside]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
        if (!ctx) return;

        let rafId = 0;
        let destroyed = false;
        let time = 0;
        let currentAmp = 100;
        let logicalWidth = 1;
        let logicalHeight = 1;
        let frameInterval = 1000 / 60;
        let lastRenderTime = 0;

        const isMobile = () => window.innerWidth < 768;

        const deterministicNoise = (x: number, line: number, t: number) => {
            const a = Math.sin((x * 0.011) + (t * 1.1) + (line * 0.71));
            const b = Math.cos((x * 0.027) - (t * 0.9) + (line * 1.37));
            const c = Math.sin(((x + line * 97) * 0.19) + (t * 2.6));
            return (a * b) + (c * 0.35);
        };

        const resizeCanvas = () => {
            const rect = container.getBoundingClientRect();
            logicalWidth = Math.max(1, Math.floor(rect.width));
            logicalHeight = Math.max(1, Math.floor(rect.height));

            const mobile = isMobile();
            const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
            frameInterval = 1000 / (mobile ? 30 : 60);

            canvas.width = Math.max(1, Math.floor(logicalWidth * dpr));
            canvas.height = Math.max(1, Math.floor(logicalHeight * dpr));
            canvas.style.width = `${logicalWidth}px`;
            canvas.style.height = `${logicalHeight}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const draw = (now: number) => {
            if (destroyed) return;
            rafId = requestAnimationFrame(draw);

            if (!isVisibleRef.current) return;
            if (now - lastRenderTime < frameInterval) return;

            lastRenderTime = now;
            time += 0.05;
            currentAmp += (targetAmpRef.current - currentAmp) * 0.06;

            ctx.fillStyle = '#111';
            ctx.fillRect(0, 0, logicalWidth, logicalHeight);

            const cy = logicalHeight / 2;
            const mobile = isMobile();
            const lineCount = mobile ? 4 : 8;
            const step = mobile ? 10 : 5;

            for (let line = 0; line < lineCount; line++) {
                ctx.beginPath();
                const alpha = 0.5 - (line * 0.05);
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.lineWidth = 1.5;

                for (let x = 0; x < logicalWidth; x += step) {
                    const wave = deterministicNoise(x, line, time) * currentAmp;
                    const jitter = deterministicNoise(x + 53, line + 11, time * 1.7) * currentAmp * 0.2;
                    const y = cy + wave + jitter;
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }

                ctx.stroke();
            }
        };

        const visibilityObserver = new IntersectionObserver(
            ([entry]) => {
                isVisibleRef.current = Boolean(entry?.isIntersecting);
                if (isVisibleRef.current) {
                    lastRenderTime = 0;
                    currentAmp += (targetAmpRef.current - currentAmp) * 0.12;
                }
            },
            { threshold: 0.1 }
        );

        visibilityObserver.observe(container);

        const resizeObserver = new ResizeObserver(() => {
            resizeCanvas();
            lastRenderTime = 0;
        });

        resizeObserver.observe(container);

        const handleViewportChange = () => {
            resizeCanvas();
            lastRenderTime = 0;
        };

        window.addEventListener('resize', handleViewportChange, { passive: true });
        window.addEventListener('orientationchange', handleViewportChange, { passive: true });

        resizeCanvas();
        isVisibleRef.current = false;
        rafId = requestAnimationFrame(draw);

        return () => {
            destroyed = true;
            cancelAnimationFrame(rafId);
            visibilityObserver.disconnect();
            resizeObserver.disconnect();
            window.removeEventListener('resize', handleViewportChange);
            window.removeEventListener('orientationchange', handleViewportChange);
        };
    }, []);

    return (
        <section className="bg-[#111] text-white py-20 md:py-32 relative overflow-hidden md:cursor-crosshair">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 mb-12 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end">
                <div className="mb-6 md:mb-0">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#666] mb-4 block">Interactive Demo</span>
                    <h2 className="font-display text-4xl md:text-5xl font-light">{t.acousticDemo.title}</h2>
                </div>
                <p className="text-sm text-[#888] max-w-md md:text-right leading-relaxed">
                    {t.acousticDemo.desc}
                </p>
            </div>

            {/* Canvas Container */}
            <div
                ref={containerRef}
                className="relative w-full h-[50vh] md:h-[60vh] bg-[#050505] border-y border-white/10 group"
                onMouseEnter={() => setIsInside(true)}
                onMouseLeave={() => setIsInside(false)}
                onTouchStart={() => setIsInside(true)}
                onTouchEnd={() => setIsInside(false)}
            >
                <canvas ref={canvasRef} className="w-full h-full block" />

                {/* Center Interaction Zone Visual */}
                <div className={`
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                w-[clamp(180px,40vw,320px)] h-[clamp(180px,40vw,320px)] rounded-full border border-white/20 
                flex items-center justify-center
                transition-all duration-700 pointer-events-none
                ${isInside ? 'bg-white/5 scale-110 border-white/50' : 'bg-transparent scale-100'}
           `}>
                    <span className={`text-[clamp(8px,1.5vw,12px)] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${isInside ? 'text-white' : 'text-white/30'}`}>
                        {isInside ? 'Sanctuary' : 'Enter Zone'}
                    </span>
                </div>

                {/* Decibel Meter */}
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-12 flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pointer-events-none">
                    <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${isInside ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                        <span className="font-mono text-xl md:text-2xl text-white tabular-nums">
                            {isInside ? '35' : '82'}<span className="text-sm text-[#666] ml-1">dB</span>
                        </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-[#666] md:border-l border-[#333] md:pl-4">
                        {isInside ? t.acousticDemo.inside : t.acousticDemo.outside}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default AcousticDemo;
