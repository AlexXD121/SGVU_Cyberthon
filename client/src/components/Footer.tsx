'use client';

import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            width: '100%',
            padding: '4rem 2rem 2rem 2rem',
            background: 'rgba(5, 7, 10, 0.8)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid rgba(59, 130, 246, 0.1)',
            position: 'relative',
            zIndex: 10
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '3rem',
                marginBottom: '4rem'
            }}>
                {/* Brand Section */}
                <div>
                    <h3 style={{
                        color: 'white',
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        marginBottom: '1.5rem',
                        letterSpacing: '-0.02em',
                        fontFamily: 'var(--font-heading)'
                    }}>
                        INTELLI<span style={{ color: '#3b82f6' }}>SCAN</span>
                    </h3>
                    <p style={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        lineHeight: 1.6,
                        fontSize: '0.9rem',
                        marginBottom: '1.5rem'
                    }}>
                        Advanced misinformation intelligence and data streaming analysis framework. Protecting digital ecosystems with real-time verification.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {[
                            { Icon: Github, href: '#' },
                            { Icon: Twitter, href: '#' },
                            { Icon: Linkedin, href: '#' },
                            { Icon: Mail, href: '#' }
                        ].map(({ Icon, href }, index) => (
                            <a
                                key={index}
                                href={href}
                                style={{
                                    color: 'rgba(255, 255, 255, 0.4)',
                                    transition: 'color 0.2s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.color = '#3b82f6')}
                                onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)')}
                            >
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '1.5rem', fontSize: '1rem' }}>RESOURCES</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {['Documentation', 'API Reference', 'Case Studies', 'Security Whitepaper'].map((link) => (
                            <li key={link} style={{ marginBottom: '0.75rem' }}>
                                <a href="#" style={{
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    transition: 'color 0.2s ease'
                                }}
                                    onMouseOver={(e) => (e.currentTarget.style.color = '#3b82f6')}
                                    onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)')}
                                >
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Platform */}
                <div>
                    <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '1.5rem', fontSize: '1rem' }}>PLATFORM</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {['Verify Engine', 'Live Stream Feed', 'Threat Monitoring', 'System Status'].map((link) => (
                            <li key={link} style={{ marginBottom: '0.75rem' }}>
                                <a href="#" style={{
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    transition: 'color 0.2s ease'
                                }}
                                    onMouseOver={(e) => (e.currentTarget.style.color = '#3b82f6')}
                                    onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)')}
                                >
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '1.5rem', fontSize: '1rem' }}>CONTACT</h4>
                    <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                        Have questions? Our support team is available 24/7 for emergency reporting and technical assistance.
                    </p>
                    <a href="mailto:support@intelliscan.ai" style={{
                        color: '#3b82f6',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: 500
                    }}>
                        support@intelliscan.ai
                    </a>
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <p style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: '0.8rem' }}>
                    © {new Date().getFullYear()} INTELLISCAN. PROPRIETARY AND CONFIDENTIAL.
                </p>
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <a href="#" style={{ color: 'rgba(255, 255, 255, 0.3)', textDecoration: 'none', fontSize: '0.8rem' }}>Privacy Policy</a>
                    <a href="#" style={{ color: 'rgba(255, 255, 255, 0.3)', textDecoration: 'none', fontSize: '0.8rem' }}>Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
