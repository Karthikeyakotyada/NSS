import React, { useState } from 'react';
import { useNSS } from '../../context/NSSContext';
import { CheckSquare, Calendar, MapPin, Clock, UserCheck, CheckCircle2, Sparkles, X, Award } from 'lucide-react';

export const AttendanceView = () => {
  const { events, volunteer, registrations, attendance, checkInAttendance, setActiveTab } = useNSS();
  const [showSuccessModal, setShowSuccessModal] = useState(null);

  // Filter events registered by current volunteer
  const registeredEvents = events.filter((evt) =>
    registrations.some((r) => r.eventId === evt.id && r.volunteerId === volunteer.id)
  );

  const handleCheckInClick = (eventId) => {
    const evt = events.find((e) => e.id === eventId);
    checkInAttendance(eventId);
    setShowSuccessModal(evt);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 className="page-title">My Registrations & Attendance</h1>
        <p className="page-sub">Mark your attendance for registered NSS activities to credit volunteer service hours.</p>
      </div>

      {registeredEvents.length === 0 ? (
        <div className="nss-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <CheckSquare size={48} color="var(--text-sub)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>No Event Registrations Found</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', marginBottom: '1.5rem' }}>
            You have not registered for any upcoming NSS events yet.
          </p>
          <button className="btn btn-primary" onClick={() => setActiveTab('events')}>
            Explore Event Catalog
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {registeredEvents.map((evt) => {
            const attRecord = attendance.find(
              (a) => a.eventId === evt.id && a.volunteerId === volunteer.id
            );
            const isPresent = attRecord && attRecord.status === 'PRESENT';

            return (
              <div
                key={evt.id}
                className="nss-card"
                style={{
                  border: isPresent ? '1px solid var(--nss-emerald)' : '1px solid var(--nss-blue-light)',
                  boxShadow: isPresent ? '0 0 20px rgba(16, 185, 129, 0.15)' : 'none'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ flex: '1 1 300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <span className="badge badge-emerald">{evt.category}</span>
                      <span className="badge badge-gold">+{evt.hours} Hours Accredited</span>
                      {isPresent && <span className="badge badge-emerald">STATUS: PRESENT</span>}
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '0.3rem' }}>
                      {evt.title}
                    </h3>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-sub)', marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Calendar size={14} color="#60a5fa" />
                        <span>{evt.date} ({evt.time})</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <MapPin size={14} color="#f59e0b" />
                        <span>{evt.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Attendance Check In Button / Status */}
                  <div style={{ minWidth: '180px', textAlign: 'right' }}>
                    {!isPresent ? (
                      <button
                        className="btn btn-emerald"
                        style={{ width: '100%', padding: '0.75rem 1.25rem', fontSize: '0.95rem' }}
                        onClick={() => handleCheckInClick(evt.id)}
                      >
                        <UserCheck size={18} /> CHECK-IN NOW
                      </button>
                    ) : (
                      <div
                        style={{
                          padding: '0.75rem 1rem',
                          background: 'rgba(16, 185, 129, 0.15)',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          borderRadius: 'var(--radius-md)',
                          textAlign: 'center'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', color: '#34d399', fontWeight: 800, fontSize: '0.95rem' }}>
                          <CheckCircle2 size={18} /> PRESENT
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)', marginTop: '0.2rem' }}>
                          Check-In: {attRecord.checkInTime || '08:14 AM'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Attendance Success Modal Overlay */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={() => setShowSuccessModal(null)}>
          <div className="modal-content" style={{ maxWidth: '480px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '2px solid var(--nss-emerald)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                boxShadow: '0 0 25px rgba(16, 185, 129, 0.4)'
              }}
            >
              <CheckCircle2 size={36} color="#34d399" />
            </div>

            <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>
              ✓ ATTENDANCE MARKED SUCCESSFUL
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: '0.5rem 0' }}>
              Check-In Confirmed!
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', marginBottom: '1.25rem' }}>
              Your attendance for <strong>{showSuccessModal.title}</strong> has been logged into the NSS central registry.
            </p>

            <div
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-glass)',
                marginBottom: '1.5rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
                textAlign: 'left'
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Status</span>
                <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.95rem' }}>PRESENT ✓</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Check-In Time</span>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>08:14 AM</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Volunteer Credit</span>
                <div style={{ color: '#fbbf24', fontWeight: 700, fontSize: '0.95rem' }}>+{showSuccessModal.hours} Hours</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Certificate Status</span>
                <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.95rem' }}>CERT-NSS-2026-00421</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button className="btn btn-outline" onClick={() => setShowSuccessModal(null)}>
                Close
              </button>
              <button className="btn btn-primary" onClick={() => { setShowSuccessModal(null); setActiveTab('certificates'); }}>
                <Award size={16} /> View Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
