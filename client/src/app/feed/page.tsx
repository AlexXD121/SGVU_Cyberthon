'use client';

import React from 'react';
import PillNav from "@/components/PillNav";
import { ChevronRight, LayoutGrid, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

import { mockData } from "@/data/mockData";
import Link from 'next/link';

// Component for a Single story item in the right list
const StoryItem = ({ source, favicon, title, time, author, reliability }: any) => (
    <div style={{
        display: 'flex', gap: '0.75rem', padding: '0.5rem 0',
        borderTop: '1px solid rgba(255,255,255,0.05)'
    }}>
        <div style={{ flexShrink: 0, marginTop: '0.25rem' }}>
            <div style={{
                width: '16px', height: '16px', borderRadius: '4px',
                background: reliability > 80 ? '#10b981' : '#f59e0b',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px', color: 'black'
            }}>
                {source.charAt(0)}
            </div>
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>{source}</span>
                {reliability > 80 && <CheckCircle2 size={12} color="#10b981" />}
            </div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '0.25rem' }}>{title}</h4>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                {time} {author && `• By ${author}`}
            </div>
        </div>
    </div>
);

// Component for the "Full Coverage" Story Cluster
const StoryCluster = ({ id, mainHeadline, clusterTitle, mainStory, relatedStories, image }: any) => (
    <div className="glass" style={{
        borderRadius: '24px', padding: '1.5rem',
        background: 'rgba(25, 30, 40, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        marginBottom: '2rem'
    }}>
        {/* Cluster Header */}
        <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '1.5rem', paddingBottom: '1rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>
                {clusterTitle}
                <span style={{ marginLeft: '0.5rem', color: 'rgba(255,255,255,0.3)' }}><ChevronRight size={18} /></span>
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#3b82f6', fontWeight: 700 }}>
                <AlertCircle size={14} />
                MONITORING ACTIVE
            </div>
        </div>

        {/* Main Component: Grid of 2 Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '2rem' }}>
            {/* Left: Featured Story */}
            <div style={{ position: 'relative' }}>
                <div style={{
                    borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/9',
                    marginBottom: '1rem', background: '#0a0a0a',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <img src={image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="News" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                    <div style={{ background: '#ef4444', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '10px', fontWeight: 900 }}>LIVE</div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{mainStory.source}</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.75rem' }}>
                    {mainStory.title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                    {mainStory.time} • By {mainStory.author}
                </p>

                {/* Reliability Overlay Badge */}
                <div style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                    padding: '0.4rem 0.8rem', borderRadius: '50px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', gap: '0.4rem'
                }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: mainStory.risk > 70 ? '#ef4444' : '#10b981' }} />
                    <span style={{ fontSize: '0.7rem', fontWeight: 800 }}>{mainStory.risk}% RISK</span>
                </div>
            </div>

            {/* Right: Perspectives List */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.2)', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                        RELATED PERSPECTIVES
                    </div>
                    {relatedStories.map((story: any, i: number) => (
                        <StoryItem key={i} {...story} />
                    ))}
                </div>

                {/* Analyze Button */}
                <Link href={`/analytics/${id}`} style={{
                    marginTop: '1.5rem', width: '100%', padding: '1rem',
                    borderRadius: '50px', background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    color: 'white', fontSize: '0.85rem', fontWeight: 700,
                    cursor: 'pointer', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: '0.75rem', transition: 'all 0.2s ease',
                    textDecoration: 'none'
                }}>
                    <LayoutGrid size={16} color="#3b82f6" />
                    ANALYZE TRUTH ORIGIN
                </Link>
            </div>
        </div>
    </div>
);

export default function Feed() {
    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Live Feed', href: '/feed' }
    ];

    return (
        <main style={{ minHeight: '100vh', background: '#05070a' }}>
            <PillNav
                items={navItems}
                activeHref="/feed"
                baseColor="#3b82f6"
                pillColor="#0c111a"
                pillTextColor="#3b82f6"
                hoveredPillTextColor="white"
            />

            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '8rem 1.5rem 4rem 1.5rem' }}>
                {/* Feed Header */}
                <div style={{ marginBottom: '3rem', borderLeft: '4px solid #3b82f6', paddingLeft: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', boxShadow: '0 0 10px #3b82f6' }} />
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#3b82f6', letterSpacing: '0.1em' }}>LIVE DATA COVERAGE</span>
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white' }}>Incident Hub</h2>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', marginTop: '0.5rem' }}>
                        Clustered perspectives on trending misinformation events.
                    </p>
                </div>

                {/* Clusters */}
                <div className="animate-fade-in">
                    {mockData.clusters.map((cluster, i) => (
                        <StoryCluster key={i} {...cluster} />
                    ))}
                </div>

                {/* Bottom Status */}
                <div style={{
                    textAlign: 'center', padding: '2rem',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem',
                    fontFamily: 'monospace'
                }}>
                    [END OF STREAM] REFRESH TO SYNC WITH LATEST NODES
                </div>
            </div>
        </main>
    );
}

