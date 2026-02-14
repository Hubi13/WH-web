import React, { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AcousticDemo: React.FC = () => {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInside, setIsInside] = useState(false);
    const [isVisible, setIsVisible] = useState(false); // Visibility state for performance

    // Intersection Observer to stop rendering when off-screen
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Real implementation with Refs for animation control
    const targetAmpRef = useRef(100);

    useEffect(() => {
        targetAmpRef.current = isInside ? 5 : 100;
    }, [isInside]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false }); // Optimization: alpha false
        if (!ctx) return;

        let frameId: number;
        let time = 0;
        let currentAmp = 100;

        const draw = () => {
            if (!isVisible) {
                frameId = requestAnimationFrame(draw);
                return;
            }

            time += 0.05;
            // Lerp current to target
            currentAmp += (targetAmpRef.current - currentAmp) * 0.05;

            ctx.fillStyle = '#111'; // Dark background
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const cy = canvas.height / 2;

            // Reduced line count for mobile performance
            const lineCount = window.innerWidth < 768 ? 4 : 8;

            // Draw "Noise"
            for (let line = 0; line < lineCount; line++) {
                ctx.beginPath();
                const alpha = 0.5 - (line * 0.05);
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.lineWidth = 1.5;

                // Step increased for performance on smaller screens
                const step = window.innerWidth < 768 ? 10 : 5;

                for (let x = 0; x < canvas.width; x += step) {
                    // Complex wave function
                    const noise = Math.sin(x * 0.01 + time + line) * Math.cos(x * 0.03 - time) * currentAmp;
                    const y = cy + noise + (Math.random() * currentAmp * 0.2); // Add jitter
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }

            frameId = requestAnimationFrame(draw);
        };

        const resize = () => {
            canvas.width = containerRef.current?.offsetWidth || window.innerWidth;
            canvas.height = containerRef.current?.offsetHeight || window.innerHeight * 0.6;
        };

        window.addEventListener('resize', resize);
        resize();

        draw();
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(frameId);
        };
    }, [isVisible]); // Re-bind if visibility changes, though draw loop handles the pause

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