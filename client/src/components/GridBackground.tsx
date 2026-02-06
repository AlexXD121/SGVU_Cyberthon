'use client';

import React from 'react';

const GridBackground = () => {
    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: -1,
            backgroundColor: '#05070a',
            backgroundImage: `
                linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
        }}>
            {/* Subtle radial vignette to soften the edges */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, transparent 20%, #05070a 100%)',
            }} />

            {/* Scanning line animation */}
            <style jsx>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); opacity: 0; }
                    50% { opacity: 0.1; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
                .scan-line {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(to right, transparent, rgba(59, 130, 246, 0.5), transparent);
                    animation: scan 10s linear infinite;
                }
            `}</style>
            <div className="scan-line" />
        </div>
    );
};

export default GridBackground;
