'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import {
    Twitter,
    Facebook,
    MessageSquare,
    Cpu,
    Database,
    Activity,
    Zap,
    BarChart3,
    Globe,
    Terminal,
    Search,
    CheckCircle2
} from 'lucide-react';

const WorkflowPipeline = () => {
    const [analysisText, setAnalysisText] = useState("Analyzing Signal...");
    const [trustScore, setTrustScore] = useState(94.2);
    const [isPinging, setIsPinging] = useState(false);
    const [step, setStep] = useState(0); // 0: Harvest, 1: Line 1, 2: Processor, 3: Line 2, 4: Results
    const containerRef = useRef<HTMLElement>(null);

    const texts = [
        "Analyzing Bias...",
        "Pattern Identified: Fallacy detected",
        "Cross-referencing Reddit...",
        "Validating Source Credibility...",
        "LLM Engine: TrueSight Active"
    ];

    // Mouse Spotlight Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    useEffect(() => {
        // Sequential Animation Loop
        const sequenceInterval = setInterval(() => {
            setStep(prev => (prev + 1) % 5);
        }, 2000);

        // Analysis Text Cycle
        const textInterval = setInterval(() => {
            setAnalysisText(texts[Math.floor(Math.random() * texts.length)]);
        }, 3000);

        // Trust Score Oscillator
        const scoreInterval = setInterval(() => {
            const delta = (Math.random() * 0.4 - 0.2);
            setTrustScore(prev => prev + delta);
        }, 2000);

        return () => {
            clearInterval(sequenceInterval);
            clearInterval(textInterval);
            clearInterval(scoreInterval);
        };
    }, []);

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            style={{
                width: '100%',
                padding: '12rem 2rem',
                backgroundColor: '#05070a',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 1
            }}
        >
            {/* Mouse Spotlight */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: useMotionTemplate`
            radial-gradient(
              600px circle at ${springX}px ${springY}px,
              rgba(59, 130, 246, 0.08),
              transparent 80%
            )
          `,
                    zIndex: 2
                }}
            />

            {/* Grid Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)',
                backgroundSize: '80px 80px',
                zIndex: -1
            }} />

            <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>

                {/* Header Section */}
                <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '8px 20px',
                            background: 'rgba(59, 130, 246, 0.05)',
                            border: '1px solid rgba(59, 130, 246, 0.2)',
                            borderRadius: '100px',
                            marginBottom: '2rem'
                        }}
                    >
                        <Activity size={14} color="#3b82f6" />
                        <span style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase' }}>Operational_Framework</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
                            color: 'white',
                            fontWeight: 900,
                            lineHeight: 1.1,
                            letterSpacing: '-0.03em'
                        }}
                    >
                        The Intelligence <span style={{ color: '#3b82f6' }}>Engine</span>
                    </motion.h2>
                </div>

                {/* Pipeline Diagram */}
                <div className="pipeline-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 100px 1.2fr 100px 1fr',
                    alignItems: 'center',
                    gap: '0',
                    position: 'relative',
                    paddingBottom: '4rem'
                }}>
                    {/* Node 1: Digital Harvest */}
                    <motion.div
                        animate={{
                            borderColor: step === 0 ? '#3b82f6' : 'rgba(255, 255, 255, 0.05)',
                            boxShadow: step === 0 ? '0 0 50px rgba(59, 130, 246, 0.2)' : '0 10px 30px rgba(0,0,0,0.3)',
                            opacity: step === 0 ? 1 : 0.6
                        }}
                        transition={{ duration: 0.5 }}
                        style={{
                            background: 'rgba(5, 7, 10, 0.8)',
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            borderRadius: '32px',
                            padding: '3rem',
                            backdropFilter: 'blur(40px)',
                            zIndex: 10,
                            minHeight: '400px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '16px',
                                    background: 'rgba(59, 130, 246, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid rgba(59, 130, 246, 0.2)',
                                }}>
                                    <Search size={24} color="#3b82f6" />
                                </div>
                                <div>
                                    <h4 style={{ color: 'white', fontWeight: 800, fontSize: '1.2rem', margin: 0 }}>DIGITAL HARVEST</h4>
                                    <p style={{ color: '#3b82f6', fontSize: '0.65rem', fontWeight: 900, marginTop: '0.25rem' }}>INCOMING_SIGNALS</p>
                                </div>
                            </div>

                            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.03)', marginBottom: '1.5rem' }}>
                                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', marginBottom: '1rem', fontWeight: 700, letterSpacing: '0.05em' }}>SOURCE_ENDPOINTS:</p>
                                <div style={{ display: 'flex', gap: '1.25rem' }}>
                                    <Twitter size={20} color="rgba(255,255,255,0.6)" />
                                    <Facebook size={20} color="rgba(255,255,255,0.6)" />
                                    <MessageSquare size={20} color="rgba(255,255,255,0.6)" />
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                            <span style={{ color: '#10b981', fontSize: '0.65rem', fontWeight: 900 }}>SCANNER_STATUS: ACTIVE</span>
                            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6rem', marginTop: '0.5rem', fontFamily: 'monospace' }}>BUFFER: 102.4 GB/s</p>
                        </div>
                    </motion.div>

                    {/* Connection 1 */}
                    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                        <svg width="100%" height="100%" style={{ position: 'absolute', overflow: 'visible' }}>
                            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="2" />
                            {/* Neon Tube Glow */}
                            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="8" style={{ filter: 'blur(8px)' }} />

                            {/* The Comet Pulse */}
                            <motion.line
                                initial={{ strokeDashoffset: 1000 }}
                                animate={{ strokeDashoffset: step === 1 ? -1000 : 1000 }}
                                transition={{ duration: 1.5, ease: "linear" }}
                                x1="0" y1="50%" x2="100%" y2="50%"
                                stroke="#ffffff" strokeWidth="2" strokeDasharray="60, 1000"
                                style={{ filter: 'drop-shadow(0 0 5px #3b82f6)' }}
                            />
                        </svg>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 12 }}>
                            <motion.div
                                animate={{
                                    scale: step === 1 ? 1.4 : 1,
                                    boxShadow: step === 1 ? '0 0 30px #3b82f6' : '0 0 10px rgba(59,130,246,0.1)',
                                    borderColor: step === 1 ? '#3b82f6' : 'rgba(59,130,246,0.3)'
                                }}
                                style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#05070a', border: '1px solid #3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <Zap size={16} color="#3b82f6" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Node 2: Cognitive Processing */}
                    <motion.div
                        animate={{
                            borderColor: step === 2 ? '#3b82f6' : 'rgba(255, 255, 255, 0.05)',
                            boxShadow: step === 2 ? '0 0 50px rgba(59, 130, 246, 0.2)' : '0 10px 30px rgba(0,0,0,0.3)',
                            opacity: step === 2 ? 1 : 0.6
                        }}
                        transition={{ duration: 0.5 }}
                        style={{
                            background: 'rgba(5, 7, 10, 0.8)',
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            borderRadius: '32px',
                            padding: '3rem',
                            backdropFilter: 'blur(50px)',
                            zIndex: 10,
                            position: 'relative',
                            minHeight: '400px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '16px',
                                    background: 'rgba(59, 130, 246, 0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid rgba(59, 130, 246, 0.3)'
                                }}>
                                    <Cpu size={32} color="#3b82f6" />
                                </div>
                                <div>
                                    <h4 style={{ color: 'white', fontWeight: 900, fontSize: '1.4rem', margin: 0 }}>COGNITIVE UNIT</h4>
                                    <p style={{ color: '#3b82f6', fontSize: '0.7rem', fontWeight: 900, fontFamily: 'monospace' }}>LLM: TRUESIGHT_v4</p>
                                </div>
                            </div>

                            <div style={{
                                background: 'rgba(0,0,0,0.6)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(255,255,255,0.08)',
                                minHeight: '80px',
                                display: 'flex',
                                alignItems: 'center',
                                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                                overflow: 'hidden',
                                position: 'relative'
                            }}>
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={analysisText}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        style={{ color: '#3b82f6', fontFamily: 'monospace', fontSize: '1rem', margin: 0, fontWeight: 500 }}
                                    >
                                        {'>'} {analysisText}
                                    </motion.p>
                                </AnimatePresence>
                                <motion.div
                                    animate={{ top: ['-100%', '200%'] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                    style={{ position: 'absolute', left: 0, width: '100%', height: '40px', background: 'linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.1), transparent)', zIndex: 1 }}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', fontWeight: 700 }}>ANALYSIS_PROGRESS</span>
                                <span style={{ color: '#3b82f6', fontSize: '0.65rem', fontWeight: 900 }}>{step === 2 ? 'PROCESSING' : 'STABLE'}</span>
                            </div>
                            <div style={{ height: '3px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                                <motion.div
                                    animate={{ scaleX: step === 2 ? [0, 1] : 1 }}
                                    transition={{ duration: 2 }}
                                    style={{ height: '100%', width: '100%', background: 'linear-gradient(90deg, #3b82f6, #10b981)', originX: 0, borderRadius: '10px' }}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Connection 2 (Splitter) */}
                    <div style={{ position: 'relative', width: '100%', height: '350px' }}>
                        <svg width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', overflow: 'visible' }}>
                            {/* Background Glows */}
                            <path d="M0 175 C50 175, 50 45, 100 45" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="8" fill="none" style={{ filter: 'blur(8px)' }} />
                            <path d="M0 175 L100 175" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="8" fill="none" style={{ filter: 'blur(8px)' }} />
                            <path d="M0 175 C50 175, 50 305, 100 305" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="8" fill="none" style={{ filter: 'blur(8px)' }} />

                            {/* Main Lines */}
                            <path d="M0 175 C50 175, 50 45, 100 45" stroke="#3b82f6" strokeWidth="2.5" fill="none" style={{ opacity: 0.1 }} />
                            <path d="M0 175 L100 175" stroke="#3b82f6" strokeWidth="2.5" fill="none" style={{ opacity: 0.1 }} />
                            <path d="M0 175 C50 175, 50 305, 100 305" stroke="#3b82f6" strokeWidth="2.5" fill="none" style={{ opacity: 0.1 }} />

                            {/* High-Intensity Split Comets (The Blue Bright Lines) */}
                            <motion.path
                                initial={{ strokeDashoffset: 400, opacity: 0 }}
                                animate={{
                                    strokeDashoffset: step === 3 ? [400, -400] : 400,
                                    opacity: step === 3 ? [0, 1, 1, 0] : 0
                                }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                d="M0 175 C50 175, 50 45, 100 45"
                                stroke="#3b82f6"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray="100, 400"
                                style={{ filter: 'blur(1px) drop-shadow(0 0 10px #3b82f6)' }}
                            />
                            <motion.path
                                initial={{ strokeDashoffset: 400, opacity: 0 }}
                                animate={{
                                    strokeDashoffset: step === 3 ? [400, -400] : 400,
                                    opacity: step === 3 ? [0, 1, 1, 0] : 0
                                }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                                d="M0 175 L100 175"
                                stroke="#3b82f6"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray="100, 400"
                                style={{ filter: 'blur(1px) drop-shadow(0 0 10px #3b82f6)' }}
                            />
                            <motion.path
                                initial={{ strokeDashoffset: 400, opacity: 0 }}
                                animate={{
                                    strokeDashoffset: step === 3 ? [400, -400] : 400,
                                    opacity: step === 3 ? [0, 1, 1, 0] : 0
                                }}
                                transition={{ duration: 1.8, ease: "easeInOut" }}
                                d="M0 175 C50 175, 50 305, 100 305"
                                stroke="#3b82f6"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray="100, 400"
                                style={{ filter: 'blur(1px) drop-shadow(0 0 10px #3b82f6)' }}
                            />
                        </svg>
                    </div>

                    {/* Node 3: Result Nodes */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', zIndex: 10 }}>
                        {[
                            { title: 'LIVE FEED', label: 'POST_PUBLISHED', icon: Globe, color: '#3b82f6' },
                            { title: 'TRUST INDEX', label: 'RISK_SCORE', icon: BarChart3, color: '#3b82f6' },
                            { title: 'ARCHIVE', label: 'LEDGER_FINALITY', icon: Database, color: '#10b981' }
                        ].map((node, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    borderColor: step === 4 ? node.color : 'rgba(255, 255, 255, 0.05)',
                                    boxShadow: step === 4 ? `0 0 30px ${node.color}33` : '0 10px 30px rgba(0,0,0,0.3)',
                                    opacity: step === 4 ? 1 : 0.6
                                }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    background: 'rgba(5, 7, 10, 0.8)',
                                    padding: '1.5rem',
                                    borderRadius: '20px',
                                    border: `1px solid rgba(255,255,255,0.05)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1.25rem',
                                    backdropFilter: 'blur(20px)'
                                }}
                            >
                                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${node.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <node.icon size={20} color={node.color} />
                                </div>
                                <div>
                                    <h5 style={{ color: 'white', fontSize: '0.9rem', fontWeight: 800, margin: 0 }}>{node.title}</h5>
                                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>{node.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>

            <style jsx>{`
        @media (max-width: 1100px) {
          .pipeline-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
          svg { display: none !important; }
        }
      `}</style>
        </section>
    );
};

export default WorkflowPipeline;
