'use client';

import React, { useState } from 'react';
import PillNav from "@/components/PillNav";
import Footer from "@/components/Footer";
import { Send, Copy, Shield, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { api, type VerifyResponse } from '@/lib/api';

export default function VerifyPage() {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<VerifyResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Verify', href: '/verify' },
        { label: 'Live Feed', href: '/feed' },
        { label: 'Report Scam', href: '/report' }
    ];

    const handleVerify = async () => {
        if (!text.trim()) {
            setError('Please enter some text to analyze');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await api.verifyText(text);
            setResult(response);
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to verify text. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    const copyHash = () => {
        if (result?.hash) {
            navigator.clipboard.writeText(result.hash);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const getTrustColor = (score: number) => {
        if (score < 30) return '#ef4444'; // Red
        if (score < 50) return '#f59e0b'; // Orange
        if (score < 70) return '#eab308'; // Yellow
        return '#10b981'; // Green
    };

    const getTrustLabel = (score: number) => {
        if (score < 30) return 'LIKELY FALSE';
        if (score < 50) return 'UNCERTAIN';
        if (score < 70) return 'MODERATE';
        return 'LIKELY TRUE';
    };

    return (
        <main style={{ minHeight: '100vh', background: '#05070a' }}>
            <PillNav
                items={navItems}
                activeHref="/verify"
                baseColor="#3b82f6"
                pillColor="#0c111a"
                pillTextColor="#3b82f6"
                hoveredPillTextColor="white"
            />

            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '8rem 1.5rem 4rem 1.5rem' }}>
                {/* Header */}
                <div style={{ marginBottom: '3rem', borderLeft: '4px solid #3b82f6', paddingLeft: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <Shield size={20} color="#3b82f6" />
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#3b82f6', letterSpacing: '0.1em' }}>
                            AI VERIFICATION ENGINE
                        </span>
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white' }}>
                        Text Analysis
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', marginTop: '0.5rem' }}>
                        Analyze content for misinformation using DistilRoBERTa transformer model
                    </p>
                </div>

                {/* Input Section */}
                <div className="glass" style={{
                    borderRadius: '16px',
                    padding: '2rem',
                    background: 'rgba(25, 30, 40, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    marginBottom: '2rem'
                }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: 'rgba(255,255,255,0.7)',
                        marginBottom: '0.75rem'
                    }}>
                        Enter Text to Verify
                    </label>

                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Paste suspicious text, news article, or claim here..."
                        style={{
                            width: '100%',
                            minHeight: '150px',
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            padding: '1rem',
                            color: 'white',
                            fontSize: '0.95rem',
                            lineHeight: 1.6,
                            resize: 'vertical',
                            fontFamily: 'inherit'
                        }}
                    />

                    <button
                        onClick={handleVerify}
                        disabled={loading}
                        style={{
                            marginTop: '1rem',
                            padding: '1rem 2rem',
                            background: loading ? 'rgba(59, 130, 246, 0.5)' : '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        {loading ? (
                            <>
                                <div style={{
                                    width: '16px',
                                    height: '16px',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    borderTopColor: 'white',
                                    borderRadius: '50%',
                                    animation: 'spin 0.8s linear infinite'
                                }} />
                                ANALYZING...
                            </>
                        ) : (
                            <>
                                <Send size={16} />
                                VERIFY TEXT
                            </>
                        )}
                    </button>
                </div>

                {/* Error Display */}
                {error && (
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '8px',
                        color: '#ef4444',
                        marginBottom: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <AlertTriangle size={20} />
                        {error}
                    </div>
                )}

                {/* Results Display */}
                {result && (
                    <div className="animate-fade-in">
                        {/* Trust Score Gauge */}
                        <div className="glass" style={{
                            borderRadius: '16px',
                            padding: '2.5rem',
                            background: 'rgba(25, 30, 40, 0.4)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            marginBottom: '1.5rem',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.3)', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                                TRUST SCORE
                            </div>

                            <div style={{
                                fontSize: '6rem',
                                fontWeight: 900,
                                color: getTrustColor(result.trust_score),
                                lineHeight: 1,
                                marginBottom: '0.5rem'
                            }}>
                                {result.trust_score}
                            </div>

                            <div style={{
                                display: 'inline-block',
                                padding: '0.5rem 1rem',
                                background: `${getTrustColor(result.trust_score)}22`,
                                border: `1px solid ${getTrustColor(result.trust_score)}44`,
                                borderRadius: '50px',
                                fontSize: '0.85rem',
                                fontWeight: 800,
                                color: getTrustColor(result.trust_score),
                                marginBottom: '1.5rem'
                            }}>
                                {getTrustLabel(result.trust_score)}
                            </div>

                            {/* Confidence Bar */}
                            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '0.75rem',
                                    color: 'rgba(255,255,255,0.5)',
                                    marginBottom: '0.5rem'
                                }}>
                                    <span>Model Confidence</span>
                                    <span>{Math.round(result.confidence * 100)}%</span>
                                </div>
                                <div style={{
                                    width: '100%',
                                    height: '8px',
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: '50px',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        width: `${result.confidence * 100}%`,
                                        height: '100%',
                                        background: `linear-gradient(90deg, ${getTrustColor(result.trust_score)}, ${getTrustColor(result.trust_score)}dd)`,
                                        transition: 'width 0.5s ease'
                                    }} />
                                </div>
                            </div>
                        </div>

                        {/* Explanation */}
                        {result.explanation && result.explanation.length > 0 && (
                            <div className="glass" style={{
                                borderRadius: '16px',
                                padding: '1.5rem',
                                background: 'rgba(25, 30, 40, 0.4)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                marginBottom: '1.5rem'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '1rem',
                                    fontSize: '0.85rem',
                                    fontWeight: 800,
                                    color: 'rgba(255,255,255,0.7)'
                                }}>
                                    <Info size={16} />
                                    ANALYSIS EXPLANATION
                                </div>

                                {result.explanation.map((exp, idx) => (
                                    <div key={idx} style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '0.75rem',
                                        padding: '0.75rem 0',
                                        borderTop: idx > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                                    }}>
                                        <CheckCircle2 size={16} color="#3b82f6" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                                        <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>{exp}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Blockchain Hash */}
                        <div className="glass" style={{
                            borderRadius: '16px',
                            padding: '1.5rem',
                            background: 'rgba(25, 30, 40, 0.4)',
                            border: '1px solid rgba(59, 130, 246, 0.2)',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                color: '#3b82f6',
                                marginBottom: '0.75rem',
                                letterSpacing: '0.05em'
                            }}>
                                BLOCKCHAIN FINGERPRINT (SHA-256)
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                background: 'rgba(0,0,0,0.3)',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(255, 255, 255, 0.05)'
                            }}>
                                <code style={{
                                    flex: 1,
                                    fontSize: '0.85rem',
                                    color: 'rgba(255,255,255,0.7)',
                                    fontFamily: 'monospace',
                                    wordBreak: 'break-all'
                                }}>
                                    {result.hash}
                                </code>

                                <button
                                    onClick={copyHash}
                                    style={{
                                        padding: '0.5rem',
                                        background: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                                        border: `1px solid ${copied ? '#10b981' : '#3b82f6'}`,
                                        borderRadius: '6px',
                                        color: copied ? '#10b981' : '#3b82f6',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: 700
                                    }}
                                >
                                    <Copy size={14} />
                                    {copied ? 'COPIED!' : 'COPY'}
                                </button>
                            </div>

                            <p style={{
                                fontSize: '0.75rem',
                                color: 'rgba(255,255,255,0.4)',
                                marginTop: '0.75rem',
                                lineHeight: 1.5
                            }}>
                                This cryptographic hash serves as an immutable proof that can be stored on-chain for permanent verification.
                            </p>
                        </div>

                        {/* Timestamp */}
                        <div style={{
                            textAlign: 'center',
                            fontSize: '0.75rem',
                            color: 'rgba(255,255,255,0.3)',
                            fontFamily: 'monospace'
                        }}>
                            Analyzed at: {new Date(result.timestamp).toLocaleString()}
                        </div>
                    </div>
                )}
            </div>

            <Footer />

            <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .glass:hover {
          border-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>
        </main>
    );
}
