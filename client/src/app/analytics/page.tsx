'use client';
import PillNav from "@/components/PillNav";
import { mockData } from "@/data/mockData";
import { Share2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Analytics() {
    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Live Feed', href: '/feed' }
    ];

    return (
        <main style={{ minHeight: '100vh', paddingTop: '6rem' }}>
            <PillNav
                logo="/next.svg"
                items={navItems}
                activeHref="/analytics"
                baseColor="#3b82f6"
                pillColor="#05070a"
                pillTextColor="#3b82f6"
                hoveredPillTextColor="white"
            />
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Misinformation Propagation Tree</h2>
                    <p style={{ color: 'rgba(255,255,255,0.4)' }}>Visualizing how false narratives evolve and spread across the network.</p>
                </div>

                <div className="glass" style={{
                    height: '600px',
                    borderRadius: '24px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}>
                    {/* Placeholder for the Tree Visualization */}
                    <div style={{ textAlign: 'center', zIndex: 10 }}>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            style={{ marginBottom: '1.5rem', display: 'inline-block' }}
                        >
                            <Share2 size={48} color="var(--accent-primary)" opacity={0.5} />
                        </motion.div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Tree Visualization Initializing...</h3>
                        <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '400px' }}>
                            We are connecting the dots between {(mockData as any).posts?.length || 0} detected nodes.
                            The D3.js engine is mapping parent-child relationships.
                        </p>
                    </div>

                    {/* Abstract Grid background */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'radial-gradient(var(--bg-tertiary) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        opacity: 0.3
                    }} />
                </div>

                <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', display: 'flex', gap: '1rem' }}>
                        <div style={{ background: 'var(--error)20', padding: '0.75rem', borderRadius: '12px' }}>
                            <AlertCircle color="var(--error)" />
                        </div>
                        <div>
                            <h4 style={{ marginBottom: '0.2rem' }}>Branching Factor</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Average of 3.2 related posts per misinformation root.</p>
                        </div>
                    </div>
                    {/* More analysis cards could go here */}
                </div>
            </div>
        </main>
    );
}
