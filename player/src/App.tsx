import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DemoMeta } from './types';

export default function App() {
  const [demos, setDemos] = useState<DemoMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/demos')
      .then(r => r.json())
      .then(data => { setDemos(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0b', padding: '40px 24px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <h1 style={{
            fontSize: 32,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 8,
          }}>
            Tuto
          </h1>
          <p style={{ color: '#666', fontSize: 15 }}>Your internal demo library</p>
        </div>

        {loading && (
          <div style={{ color: '#555', fontSize: 14 }}>Loading demos...</div>
        )}

        {!loading && demos.length === 0 && (
          <div style={{
            border: '1px dashed #222',
            borderRadius: 12,
            padding: 48,
            textAlign: 'center',
            color: '#555',
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🎬</div>
            <p style={{ fontSize: 15, marginBottom: 4 }}>No demos yet</p>
            <p style={{ fontSize: 13 }}>Install the extension and start recording!</p>
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {demos.map(demo => (
            <div
              key={demo.id}
              onClick={() => navigate(`/demo/${demo.id}`)}
              style={{
                background: '#111113',
                border: '1px solid #1e1e22',
                borderRadius: 12,
                padding: 20,
                cursor: 'pointer',
                transition: 'border-color 0.15s, transform 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = '#6366f1';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = '#1e1e22';
                (e.currentTarget as HTMLDivElement).style.transform = 'none';
              }}
            >
              <div style={{
                width: '100%',
                height: 120,
                background: '#1a1a1e',
                borderRadius: 8,
                marginBottom: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
              }}>
                🎬
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: '#fff' }}>
                {demo.title}
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#555' }}>
                  {demo.stepCount} steps
                </span>
                <span style={{ fontSize: 12, color: '#555' }}>
                  {new Date(demo.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
