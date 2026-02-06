'use client';

import React, { useState } from 'react';
import PillNav from "@/components/PillNav";
import { Send, CheckCircle2, AlertCircle, DollarSign } from 'lucide-react';
import { api, type ReportResponse } from '@/lib/api';

export default function ReportPage() {
    const [url, setUrl] = useState('');
    const [reason, setReason] = useState('');
    const [stakeAmount, setStakeAmount] = useState(10);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ReportResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Verify', href: '/verify' },
        { label: 'Live Feed', href: '/feed' },
        { label: 'Report Scam', href: '/report' }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!url.trim() || !reason.trim()) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await api.submitReport(url, reason, stakeAmount);
            setResult(response);
            // Clear form on success
            setUrl('');
            setReason('');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to submit report. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={{ minHeight: '100vh', background: '#05070a' }}>
            <PillNav
                items={navItems}
                activeHref="/report"
                baseColor="#3b82f6"
                pillColor="#0c111a"
                pillTextColor="#3b82f6"
                hoveredPillTextColor="white"
            />

            <div style={{ maxWidth: '700px', margin: '0 auto', padding: '8rem 1.5rem 4rem 1.5rem' }}>
                {/* Header */}
                <div style={{ marginBottom: '3rem', borderLeft: '4px solid #ef4444', paddingLeft: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <AlertCircle size={20} color="#ef4444" />
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ef4444', letterSpacing: '0.1em' }}>
                            COMMUNITY REPORTING
                        </span>
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white' }}>
                        Report Scam
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', marginTop: '0.5rem' }}>
                        Help protect the community by reporting phishing sites, scams, and fake news
                    </p>
                </div>

                {/* Success Message */}
                {result && (
                    <div className="glass animate-fade-in" style={{
                        borderRadius: '16px',
                        padding: '2rem',
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        marginBottom: '2rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <CheckCircle2 size={32} color="#10b981" />
                            <div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981', marginBottom: '0.25rem' }}>
                                    Report Submitted Successfully!
                                </div>
                                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                                    Your report is pending admin verification
                                </div>
                            </div>
                        </div>

                        <div style={{
                            background: 'rgba(0,0,0,0.3)',
                            padding: '1rem',
                            borderRadius: '8px',
                            marginTop: '1rem'
                        }}>
                            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>
                                Report ID
                            </div>
                            <code style={{ fontSize: '0.9rem', color: '#10b981', fontFamily: 'monospace' }}>
                                {result.reportId}
                            </code>

                            <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>Tokens Staked</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981' }}>{result.staked_tokens} TRU</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>Status</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f59e0b' }}>{result.status.toUpperCase()}</div>
                                </div>
                            </div>
                        </div>

                        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '1rem', lineHeight: 1.6 }}>
                            💡 If verified as a scam, you'll earn <strong>{result.staked_tokens + 15} TRU tokens</strong> (your stake + 15 reward).
                            If rejected, your stake will be returned.
                        </p>
                    </div>
                )}

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
                        <AlertCircle size={20} />
                        {error}
                    </div>
                )}

                {/* Report Form */}
                <form onSubmit={handleSubmit}>
                    <div className="glass" style={{
                        borderRadius: '16px',
                        padding: '2rem',
                        background: 'rgba(25, 30, 40, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                        {/* URL Input */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                color: 'rgba(255,255,255,0.7)',
                                marginBottom: '0.75rem'
                            }}>
                                Suspicious URL or Domain
                            </label>
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://fake-bank-login.com"
                                style={{
                                    width: '100%',
                                    background: 'rgba(0,0,0,0.3)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '8px',
                                    padding: '0.875rem 1rem',
                                    color: 'white',
                                    fontSize: '0.95rem',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                        {/* Reason Textarea */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                color: 'rgba(255,255,255,0.7)',
                                marginBottom: '0.75rem'
                            }}>
                                Report Reason
                            </label>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Describe why you believe this is a scam (e.g., 'Phishing site impersonating PayPal', 'Fake news about celebrity death', etc.)"
                                style={{
                                    width: '100%',
                                    minHeight: '120px',
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
                        </div>

                        {/* Stake Amount Selector */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                color: 'rgba(255,255,255,0.7)',
                                marginBottom: '0.75rem'
                            }}>
                                Stake Amount (TRU Tokens)
                            </label>

                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                {[10, 20, 50].map((amount) => (
                                    <button
                                        key={amount}
                                        type="button"
                                        onClick={() => setStakeAmount(amount)}
                                        style={{
                                            flex: 1,
                                            padding: '1rem',
                                            background: stakeAmount === amount ? 'rgba(59, 130, 246, 0.2)' : 'rgba(0,0,0,0.3)',
                                            border: stakeAmount === amount ? '2px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '8px',
                                            color: stakeAmount === amount ? '#3b82f6' : 'rgba(255,255,255,0.6)',
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '0.25rem'
                                        }}
                                    >
                                        <DollarSign size={18} />
                                        {amount} TRU
                                    </button>
                                ))}
                            </div>

                            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.75rem', lineHeight: 1.5 }}>
                                Higher stakes show confidence. If verified, you earn your stake back + 15 TRU. If rejected or fraudulent, you lose your stake.
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '1rem 2rem',
                                background: loading ? 'rgba(239, 68, 68, 0.5)' : '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: 700,
                                fontSize: '0.95rem',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
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
                                    SUBMITTING REPORT...
                                </>
                            ) : (
                                <>
                                    <Send size={16} />
                                    SUBMIT REPORT
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Info Box */}
                <div className="glass" style={{
                    borderRadius: '16px',
                    padding: '1.5rem',
                    background: 'rgba(59, 130, 246, 0.05)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    marginTop: '2rem'
                }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#3b82f6', marginBottom: '0.75rem' }}>
                        ℹ️ HOW IT WORKS
                    </div>
                    <ul style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
                        <li>You stake TRU tokens to report suspicious content</li>
                        <li>Admins verify if it's actually a scam</li>
                        <li>If verified: You get stake back + 15 TRU reward</li>
                        <li>If rejected: Stake is returned (no penalty for good faith reports)</li>
                        <li>If fraudulent report: Stake is slashed (prevents spam)</li>
                    </ul>
                </div>
            </div>

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
        input:focus,
        textarea:focus {
          outline: none;
          border-color: rgba(59, 130, 246, 0.5);
        }
      `}</style>
        </main>
    );
}
