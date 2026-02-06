'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

import { Shield } from 'lucide-react';

export type PillNavItem = {
    label: string;
    href: string;
    ariaLabel?: string;
};

export interface PillNavProps {
    logo?: string;
    logoAlt?: string;
    items: PillNavItem[];
    activeHref?: string;
    className?: string;
    ease?: string;
    baseColor?: string;
    pillColor?: string;
    hoveredPillTextColor?: string;
    pillTextColor?: string;
    onMobileMenuClick?: () => void;
    initialLoadAnimation?: boolean;
}

const PillNav: React.FC<PillNavProps> = ({
    logo,
    logoAlt = 'Logo',
    items,
    activeHref,
    className = '',
    ease = 'power3.easeOut',
    baseColor = '#3b82f6',
    pillColor = '#05070a',
    hoveredPillTextColor = '#ffffff',
    pillTextColor = '#3b82f6',
    onMobileMenuClick,
    initialLoadAnimation = true
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
    const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
    const activeTweenRefs = useRef<Array<gsap.core.Timeline | gsap.core.Tween | null>>([]);
    const logoIconRef = useRef<HTMLDivElement | null>(null);
    const logoTweenRef = useRef<gsap.core.Tween | null>(null);
    const navItemsRef = useRef<HTMLDivElement | null>(null);
    const logoRef = useRef<HTMLAnchorElement | HTMLElement | null>(null);

    useEffect(() => {
        const layout = () => {
            circleRefs.current.forEach(circle => {
                if (!circle?.parentElement) return;

                const pill = circle.parentElement as HTMLElement;
                const rect = pill.getBoundingClientRect();
                const { width: w, height: h } = rect;

                if (w === 0 || h === 0) return;

                const R = ((w * w) / 4 + h * h) / (2 * h);
                const D = Math.ceil(2 * R) + 12;
                const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 6;
                const originY = D - delta;

                circle.style.width = `${D}px`;
                circle.style.height = `${D}px`;
                circle.style.bottom = `-${delta}px`;
                circle.style.left = '50%';
                circle.style.position = 'absolute';
                circle.style.borderRadius = '50%';
                circle.style.zIndex = '1';
                circle.style.display = 'block';
                circle.style.pointerEvents = 'none';

                gsap.set(circle, {
                    xPercent: -50,
                    scale: 0,
                    transformOrigin: `50% ${originY}px`
                });

                const label = pill.querySelector<HTMLElement>('.pill-label');
                const white = pill.querySelector<HTMLElement>('.pill-label-hover');

                if (label) gsap.set(label, { y: 0, opacity: 1 });
                if (white) gsap.set(white, { y: 0, opacity: 0 });

                const index = circleRefs.current.indexOf(circle);
                if (index === -1) return;

                tlRefs.current[index]?.kill();
                const tl = gsap.timeline({ paused: true });

                tl.to(circle, {
                    scale: 1.15,
                    duration: 0.8,
                    ease: "power2.out",
                    overwrite: 'auto'
                }, 0);

                if (label) {
                    tl.to(label, {
                        opacity: 0,
                        y: -5,
                        duration: 0.4,
                        ease: "power2.inOut"
                    }, 0);
                }

                if (white) {
                    tl.fromTo(white,
                        { y: 5, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
                        0.1
                    );
                }

                tlRefs.current[index] = tl;
            });
        };

        const timer = setTimeout(layout, 300);
        window.addEventListener('resize', layout);

        if (initialLoadAnimation) {
            const navItems = navItemsRef.current;
            if (navItems) {
                gsap.set(navItems, { opacity: 0, scale: 0.95 });
                gsap.to(navItems, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.2)", delay: 0.2 });
            }
        }

        return () => {
            window.removeEventListener('resize', layout);
            clearTimeout(timer);
        };
    }, [items, ease, initialLoadAnimation]);

    const handleEnter = (i: number) => {
        const tl = tlRefs.current[i];
        if (!tl) return;
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.play();
    };

    const handleLeave = (i: number) => {
        const tl = tlRefs.current[i];
        if (!tl) return;
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.reverse();
    };

    const handleLogoEnter = () => {
        const icon = logoIconRef.current;
        if (!icon) return;
        logoTweenRef.current?.kill();
        logoTweenRef.current = gsap.to(icon, {
            scale: 1.2,
            rotate: 15,
            duration: 0.3,
            ease: "back.out(2)",
            onComplete: () => {
                gsap.to(icon, { scale: 1, rotate: 0, duration: 0.3, ease: "power2.out" });
            }
        });
    };

    const cssVars = {
        ['--base' as any]: baseColor,
        ['--pill-bg' as any]: pillColor,
        ['--hover-text' as any]: hoveredPillTextColor,
        ['--pill-text' as any]: pillTextColor,
    } as React.CSSProperties;

    return (
        <div style={{ position: 'absolute', top: '1.5rem', width: '100%', left: 0, zIndex: 1000, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
            <div style={{ pointerEvents: 'auto', ...cssVars }}>
                <nav style={{ display: 'flex', alignItems: 'center' }}>
                    <Link
                        href="/"
                        onMouseEnter={handleLogoEnter}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                        }}
                    >
                        <div
                            ref={el => { if (el) logoRef.current = el; }}
                            style={{
                                width: '50px',
                                height: '50px',
                                background: 'rgba(5, 7, 10, 0.8)',
                                backdropFilter: 'blur(12px)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
                                border: '1px solid rgba(59, 130, 246, 0.4)'
                            }}
                        >
                            {/* Inner Glow/Radar Sync Effect */}
                            <div style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                            }} />

                            <div ref={logoIconRef} style={{ zIndex: 2, position: 'relative', textAlign: 'center' }}>
                                <span style={{
                                    color: '#3b82f6',
                                    fontWeight: 900,
                                    fontSize: '0.95rem',
                                    letterSpacing: '0.05em',
                                    fontFamily: 'monospace',
                                    textShadow: '0 0 10px rgba(59, 130, 246, 0.8)'
                                }}>
                                    TRU
                                </span>
                            </div>

                            {/* Tactical Scanning Detail */}
                            <div style={{
                                position: 'absolute',
                                width: '100%',
                                height: '1px',
                                background: 'rgba(59, 130, 246, 0.5)',
                                top: '50%',
                                left: 0,
                                opacity: 0.3
                            }} />
                            <div style={{
                                position: 'absolute',
                                width: '1px',
                                height: '100%',
                                background: 'rgba(59, 130, 246, 0.5)',
                                left: '50%',
                                top: 0,
                                opacity: 0.3
                            }} />
                        </div>
                    </Link>

                    <div ref={navItemsRef} style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'var(--base)',
                        borderRadius: '99px',
                        padding: '4px',
                        marginLeft: '12px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <ul style={{ listStyle: 'none', display: 'flex', gap: '2px', margin: 0, padding: 0 }}>
                            {items.map((item, i) => {
                                const isActive = activeHref === item.href;
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onMouseEnter={() => handleEnter(i)}
                                            onMouseLeave={() => handleLeave(i)}
                                            style={{
                                                background: 'var(--pill-bg)',
                                                color: isActive ? 'var(--hover-text)' : 'var(--pill-text)',
                                                padding: '0 22px',
                                                height: '38px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderRadius: '99px',
                                                textDecoration: 'none',
                                                fontWeight: 700,
                                                fontSize: '12px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.08em',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <span
                                                ref={el => { if (el) circleRefs.current[i] = el; }}
                                                style={{
                                                    position: 'absolute',
                                                    background: 'var(--base)',
                                                    borderRadius: '50%',
                                                    pointerEvents: 'none',
                                                    zIndex: 1,
                                                    display: 'block'
                                                }}
                                            />
                                            <span style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                                <span className="pill-label" style={{ display: 'block', position: 'relative' }}>{item.label}</span>
                                                <span className="pill-label-hover" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', color: 'var(--hover-text)', display: 'block', opacity: 0 }}>{item.label}</span>
                                            </span>
                                            {isActive && (
                                                <span style={{
                                                    position: 'absolute',
                                                    bottom: '3px',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    width: '4px',
                                                    height: '4px',
                                                    borderRadius: '50%',
                                                    background: 'var(--base)',
                                                    zIndex: 3
                                                }} />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default PillNav;
