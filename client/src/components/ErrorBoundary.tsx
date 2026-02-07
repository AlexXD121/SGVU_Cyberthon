'use client';

import React from 'react';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    minHeight: '100vh',
                    background: '#05070a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem'
                }}>
                    <div style={{
                        maxWidth: '600px',
                        padding: '2rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '16px',
                        textAlign: 'center'
                    }}>
                        <h1 style={{
                            fontSize: '2rem',
                            fontWeight: 800,
                            color: '#ef4444',
                            marginBottom: '1rem'
                        }}>
                            Something Went Wrong
                        </h1>
                        <p style={{
                            color: 'rgba(255,255,255,0.6)',
                            marginBottom: '1.5rem',
                            fontSize: '0.95rem'
                        }}>
                            The application encountered an unexpected error. Please try refreshing the page.
                        </p>
                        <button
                            onClick={() => window.location.href = '/'}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: '#3b82f6',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                fontWeight: 700,
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            Return to Home
                        </button>
                        {this.state.error && (
                            <details style={{
                                marginTop: '1.5rem',
                                fontSize: '0.75rem',
                                color: 'rgba(255,255,255,0.4)',
                                textAlign: 'left'
                            }}>
                                <summary style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
                                    Error Details
                                </summary>
                                <code style={{
                                    display: 'block',
                                    padding: '1rem',
                                    background: 'rgba(0,0,0,0.3)',
                                    borderRadius: '8px',
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-all'
                                }}>
                                    {this.state.error.toString()}
                                </code>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
