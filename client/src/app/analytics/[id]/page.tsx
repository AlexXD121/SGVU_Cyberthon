'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import PillNav from "@/components/PillNav";
import { mockData } from "@/data/mockData";
import {
    ShieldCheck,
    AlertTriangle,
    Link as LinkIcon,
    ChevronLeft,
    Fingerprint,
    Search,
    Database,
    ExternalLink,
    FileText
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnalysisPage() {
    const params = useParams();
    const router = useRouter();
    const clusterId = params.id as string;

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Live Feed', href: '/feed' }
    ];

    const data = (mockData as any).clusters?.find((c: any) => c.id === clusterId);

    if (!data) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#05070a', color: 'white' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>404</h1>
                    <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '2rem' }}>Analysis report not found in TRU database.</p>
                    <button
                        onClick={() => router.push('/feed')}
                        style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Return to Feed
                    </button>
                </div>
            </div>
        );
    }

    const { analysis } = data;

    return (
        <main style={{ minHeight: '100vh', background: '#05070a', color: 'white' }}>
            <PillNav
                items={navItems}
                activeHref="/analytics"
                baseColor="#3b82f6"
                pillColor="#0c111a"
                pillTextColor="#3b82f6"
                hoveredPillTextColor="white"
            />

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '8rem 1.5rem 4rem 1.5rem' }}>
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    style={{
                        background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        cursor: 'pointer', marginBottom: '2rem', fontSize: '0.9rem'
                    }}
                >
                    <ChevronLeft size={18} />
                    RETURN TO FEED
                </button>

                {/* Header Section */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{
                                padding: '0.4rem 1rem', borderRadius: '4px',
                                background: analysis.verdict === 'MISLEADING' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                border: `1px solid ${analysis.verdict === 'MISLEADING' ? '#f59e0b' : '#ef4444'}`,
                                color: analysis.verdict === 'MISLEADING' ? '#f59e0b' : '#ef4444',
                                fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.1em'
                            }}>
                                VERDICT: {analysis.verdict}
                            </div>
                            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
                                REPORT_ID: {clusterId.toUpperCase()}
                            </span>
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem' }}>
                            Forensic Truth Analysis: <br />
                            <span style={{ color: '#3b82f6' }}>{data.clusterTitle}</span>
                        </h1>
                    </div>

                    <div style={{
                        background: 'rgba(59, 130, 246, 0.05)', borderRadius: '24px',
                        border: '1px solid rgba(59, 130, 246, 0.2)', padding: '2rem',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        textAlign: 'center'
                    }}>
                        <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '1rem' }}>
                            <svg width="120" height="120" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                                <circle
                                    cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" strokeWidth="8"
                                    strokeDasharray={`${analysis.trustScore * 2.82} 282`}
                                    strokeLinecap="round"
                                    transform="rotate(-90 50 50)"
                                />
                            </svg>
                            <div style={{
                                position: 'absolute', inset: 0, display: 'flex',
                                flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>{analysis.trustScore}%</span>
                                <span style={{ fontSize: '0.6rem', fontWeight: 700, opacity: 0.5 }}>TRU-SCORE</span>
                            </div>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 600 }}>CONFIDENCE LEVEL: HIGH</p>
                    </div>
                </div>

                {/* Analysis Content */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '2rem' }}>
                    <div>
                        <div className="glass" style={{
                            padding: '2rem', borderRadius: '24px', background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2rem'
                        }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem', fontWeight: 800, marginBottom: '2rem' }}>
                                <Fingerprint size={20} color="#3b82f6" />
                                AI REASONING STEPS
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {analysis.reasoning.map((step: any, i: number) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.15 }}
                                        key={i}
                                        style={{ display: 'flex', gap: '1rem' }}
                                    >
                                        <div style={{
                                            width: '24px', height: '24px', borderRadius: '50%',
                                            background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '10px', fontWeight: 800, color: '#3b82f6', flexShrink: 0
                                        }}>
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.25rem' }}>{step.step}</h4>
                                            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{step.detail}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{
                                padding: '1.5rem', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.05)',
                                border: '1px solid rgba(239, 68, 68, 0.1)'
                            }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Target Claim</span>
                                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', lineHeight: 1.6 }}>"{analysis.claim}"</p>
                            </div>
                            <div style={{
                                padding: '1.5rem', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.05)',
                                border: '1px solid rgba(16, 185, 129, 0.1)'
                            }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.1em' }}>TRU Reality</span>
                                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', lineHeight: 1.6 }}>{analysis.reality}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="glass" style={{
                            padding: '2rem', borderRadius: '24px', background: 'rgba(59, 130, 246, 0.03)',
                            border: '1px solid rgba(59, 130, 246, 0.1)', marginBottom: '2rem'
                        }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                                <Database size={20} color="#3b82f6" />
                                SOURCE REPOSITORY
                            </h3>
                            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem' }}>
                                Verification nodes used for cross-referencing this incident.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {analysis.resources.map((res: any, i: number) => (
                                    <a
                                        href={res.link}
                                        key={i}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.05)', textDecoration: 'none',
                                            color: 'white', transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            {res.type === 'Government' ? <ShieldCheck size={16} color="#3b82f6" /> : <FileText size={16} color="rgba(255,255,255,0.4)" />}
                                            <div>
                                                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{res.name}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>Type: {res.type}</div>
                                            </div>
                                        </div>
                                        <ExternalLink size={14} color="rgba(255,255,255,0.2)" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div style={{
                            padding: '1.5rem', borderRadius: '24px', border: '1px dashed rgba(255,255,255,0.1)',
                            textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem'
                        }}>
                            This report was generated by the TRU Neural Engine v4.2. All data streams are encrypted and verified against global authority nodes.
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
