'use client';

import PillNav from "@/components/PillNav";
import GridBackground from "@/components/GridBackground";
import WorkflowPipeline from "@/components/WorkflowPipeline";
import Footer from "@/components/Footer";
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Verify', href: '/verify' },
    { label: 'Live Feed', href: '/feed' },
    { label: 'Report Scam', href: '/report' }
  ];

  return (
    <main style={{ minHeight: '100vh', position: 'relative', background: '#05070a' }}>
      <PillNav
        items={navItems}
        activeHref="/"
        baseColor="#3b82f6"
        pillColor="#05070a"
        pillTextColor="#3b82f6"
        hoveredPillTextColor="white"
      />

      <GridBackground />

      {/* Content Layer (Hero) */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ zIndex: 1, maxWidth: '900px', position: 'relative' }}>
          {/* Decorative Corner Accents */}
          <div style={{ position: 'absolute', top: '-40px', left: '-40px', width: '20px', height: '20px', borderTop: '2px solid rgba(59, 130, 246, 0.4)', borderLeft: '2px solid rgba(59, 130, 246, 0.4)' }} />
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '20px', height: '20px', borderTop: '2px solid rgba(59, 130, 246, 0.4)', borderRight: '2px solid rgba(59, 130, 246, 0.4)' }} />

          <div className="animate-fade-in">
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
              color: 'white',
              fontFamily: 'var(--font-heading)'
            }}>
              INTELLIGENT <span style={{ color: '#3b82f6' }}>ANALYSIS</span> <br />
              FOR DATA STREAMING
            </h1>

            <div style={{
              width: '60px',
              height: '2px',
              background: '#3b82f6',
              margin: '2rem auto'
            }} />

            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.6)',
              lineHeight: 1.8,
              marginBottom: '3rem',
              maxWidth: '650px',
              marginInline: 'auto',
              letterSpacing: '0.02em'
            }}>
              A precision framework designed for the real-time identification and tracking of misinformation patterns within complex digital ecosystems.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/verify" style={{
                background: '#3b82f6',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '2px',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                VERIFY TEXT
                <ArrowRight size={18} />
              </Link>

              <Link href="/feed" style={{
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.02)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '2px',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                LIVE FEED
              </Link>

              <Link href="/report" style={{
                border: '1px solid rgba(239, 68, 68, 0.3)',
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                padding: '1rem 2rem',
                borderRadius: '2px',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                REPORT SCAM
              </Link>
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '20px', height: '20px', borderBottom: '2px solid rgba(59, 130, 246, 0.4)', borderLeft: '2px solid rgba(59, 130, 246, 0.4)' }} />
          <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: '20px', height: '20px', borderBottom: '2px solid rgba(59, 130, 246, 0.4)', borderRight: '2px solid rgba(59, 130, 246, 0.4)' }} />
        </div>

        {/* Hero Section Footer (In-Hero) */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '0',
          right: '0',
          display: 'flex',
          justifyContent: 'center',
          gap: '4rem',
          opacity: 0.5,
          fontSize: '0.7rem',
          fontWeight: 700,
          color: 'white',
          letterSpacing: '0.2em',
          textTransform: 'uppercase'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#3b82f6' }} />
            REAL-TIME MONITORING
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#3b82f6' }} />
            AI VERIFICATION
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#3b82f6' }} />
            BLOCKCHAIN PROOF
          </div>
        </div>
      </section>

      <WorkflowPipeline />

      <Footer />
    </main>
  );
}
