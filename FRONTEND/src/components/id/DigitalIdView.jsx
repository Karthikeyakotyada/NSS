import React, { useState } from 'react';
import { useNSS } from '../../context/NSSContext';
import { QrCode, ShieldCheck, CheckCircle2, Trophy, Clock, Award, Building, Sparkles, X, User } from 'lucide-react';

export const DigitalIdView = () => {
  const { volunteer } = useNSS();
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h1 className="page-title">Digital NSS ID Card</h1>
        <p className="page-sub">Official accredited digital volunteer identification card with dynamic service verification.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        {/* ID Card Front */}
        <div
          className="nss-card"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
            border: '2px solid var(--nss-gold)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6), 0 0 25px rgba(245, 158, 11, 0.25)',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem'
          }}
        >
          {/* Header Banner */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-glass)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
                  border: '2px solid var(--nss-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '1.1rem'
                }}
              >
                NSS
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff', letterSpacing: '0.02em' }}>NATIONAL SERVICE SCHEME</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--nss-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>OFFICIAL DIGITAL ID CARD</div>
              </div>
            </div>
            <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>OFFICIAL</span>
          </div>

          {/* Main Body */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <img
                src={volunteer.photoUrl}
                alt={volunteer.name}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  border: '3px solid var(--nss-blue-light)',
                  boxShadow: '0 0 20px rgba(37, 99, 235, 0.4)'
                }}
              />
              <div style={{ marginTop: '0.5rem' }}>
                <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                  <CheckCircle2 size={12} /> ACTIVE VOLUNTEER
                </span>
              </div>
            </div>

            <div style={{ flex: '1 1 200px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{volunteer.name}</h2>
              <div style={{ fontSize: '0.9rem', color: '#60a5fa', fontWeight: 700, margin: '0.2rem 0 0.75rem 0' }}>
                NSS ID: {volunteer.id}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.82rem', color: 'var(--text-sub)' }}>
                <div><strong style={{ color: '#fff' }}>Department:</strong> {volunteer.department}</div>
                <div><strong style={{ color: '#fff' }}>Academic Year:</strong> {volunteer.year}</div>
                <div><strong style={{ color: '#fff' }}>Joined:</strong> {volunteer.joinedDate}</div>
                <div><strong style={{ color: '#fff' }}>Institution:</strong> {volunteer.institution}</div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar inside ID */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              marginTop: '1.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-glass)',
              background: 'rgba(15, 23, 42, 0.6)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem',
              textAlign: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>Accredited Hours</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#60a5fa' }}>{volunteer.stats.hours} hrs</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>Events</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399' }}>{volunteer.stats.eventsParticipated}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>NSS Rank</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fbbf24' }}>#{volunteer.stats.rank}</div>
            </div>
          </div>

          {/* QR Code Action Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-sub)' }}>
              <ShieldCheck size={16} color="var(--nss-emerald)" />
              <span>Cryptographically Verified ID</span>
            </div>
            <button className="btn btn-gold" style={{ fontSize: '0.82rem', padding: '0.5rem 1rem' }} onClick={() => setShowVerifyModal(true)}>
              <QrCode size={16} /> Scan / Verify ID
            </button>
          </div>
        </div>

        {/* Verification Context Card */}
        <div className="nss-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} color="var(--nss-gold)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>Digital ID Authentication</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', lineHeight: '1.6' }}>
            The NSS Digital ID card provides portable, instant proof of voluntary community service hours. It updates dynamically whenever attendance is marked for accredited activities.
          </p>

          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-sub)' }}>Verification Status:</span>
              <span style={{ color: '#34d399', fontWeight: 700 }}>VERIFIED ✓</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-sub)' }}>Registry Hash:</span>
              <span style={{ color: '#60a5fa', fontFamily: 'monospace' }}>NSS-SEC-2026-0142</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-sub)' }}>Attendance Consistency:</span>
              <span style={{ color: '#fbbf24', fontWeight: 700 }}>{volunteer.stats.attendanceRate}% Rate</span>
            </div>
          </div>

          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShowVerifyModal(true)}>
            <QrCode size={18} /> Launch Mock Verification Scanner
          </button>
        </div>
      </div>

      {/* Verification Modal */}
      {showVerifyModal && (
        <div className="modal-overlay" onClick={() => setShowVerifyModal(false)}>
          <div className="modal-content" style={{ maxWidth: '520px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowVerifyModal(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X size={22} />
            </button>

            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '2px solid var(--nss-emerald)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)'
              }}
            >
              <ShieldCheck size={40} color="#34d399" />
            </div>

            <span className="badge badge-emerald" style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>
              ✓ NSS VOLUNTEER IDENTITY VERIFIED
            </span>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: '0.5rem 0' }}>
              Official Identity Verification
            </h2>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', marginBottom: '1.25rem' }}>
              Digital record successfully authenticated against National Service Scheme central directory.
            </p>

            <div
              style={{
                background: 'rgba(15, 23, 42, 0.85)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-glass)',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                marginBottom: '1.5rem',
                fontSize: '0.88rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-sub)' }}>Volunteer Name:</span>
                <strong style={{ color: '#fff' }}>{volunteer.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-sub)' }}>NSS Volunteer ID:</span>
                <strong style={{ color: '#60a5fa' }}>{volunteer.id}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-sub)' }}>Department & Year:</span>
                <span style={{ color: '#fff' }}>{volunteer.department} ({volunteer.year})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-sub)' }}>Total Accredited Hours:</span>
                <strong style={{ color: '#fbbf24' }}>{volunteer.stats.hours} Hours</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-sub)' }}>Events Participated:</span>
                <strong style={{ color: '#34d399' }}>{volunteer.stats.eventsParticipated} Events</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-sub)' }}>Verified e-Certificates:</span>
                <strong style={{ color: '#a78bfa' }}>{volunteer.stats.certificatesCount} Certificates</strong>
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShowVerifyModal(false)}>
              Done / Close Verification
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
