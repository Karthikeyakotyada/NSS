import React from 'react';
import { useNSS } from '../../context/NSSContext';
import {
  Clock,
  Calendar,
  CheckCircle2,
  Award,
  Trophy,
  ArrowRight,
  Sparkles,
  MapPin,
  Megaphone,
  UserCheck
} from 'lucide-react';

export const VolunteerDashboard = () => {
  const {
    volunteer,
    events,
    registrations,
    attendance,
    activities,
    announcements,
    registerForEvent,
    checkInAttendance,
    setActiveTab
  } = useNSS();

  // Find primary demo event
  const beachEvent = events.find((e) => e.id === 'EVT-BEACH-01');
  const isRegisteredForBeach = registrations.some(
    (r) => r.eventId === 'EVT-BEACH-01' && r.volunteerId === volunteer.id
  );
  const isCheckedInBeach = attendance.some(
    (a) => a.eventId === 'EVT-BEACH-01' && a.volunteerId === volunteer.id && a.status === 'PRESENT'
  );

  const hoursToMilestone = Math.max(0, 50 - volunteer.stats.hours);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Hero Profile Banner */}
      <div
        className="nss-card"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: '1px solid var(--border-highlight)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <img
              src={volunteer.photoUrl}
              alt={volunteer.name}
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--nss-blue)',
                boxShadow: '0 0 20px rgba(37, 99, 235, 0.3)'
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>{volunteer.name}</h1>
                <span className="badge badge-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Trophy size={12} /> Rank #{volunteer.stats.rank}
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', marginTop: '0.2rem' }}>
                ID: <strong style={{ color: '#60a5fa' }}>{volunteer.id}</strong> • {volunteer.department} • {volunteer.year}
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                {volunteer.institution}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-outline" onClick={() => setActiveTab('digital-id')}>
              View Digital ID
            </button>
            <button className="btn btn-primary" onClick={() => setActiveTab('events')}>
              Explore Events <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="grid-stats">
        <div className="nss-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-sub)' }}>Volunteer Hours</span>
            <div style={{ padding: '0.4rem', borderRadius: 'var(--radius-sm)', background: 'rgba(37, 99, 235, 0.15)', color: '#60a5fa' }}>
              <Clock size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>{volunteer.stats.hours} <span style={{ fontSize: '0.9rem', color: 'var(--text-sub)', fontWeight: 500 }}>hrs</span></div>
          <p style={{ fontSize: '0.75rem', color: 'var(--nss-emerald)', marginTop: '0.25rem' }}>Accredited NSS Service</p>
        </div>

        <div className="nss-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-sub)' }}>Events Participated</span>
            <div style={{ padding: '0.4rem', borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              <Calendar size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>{volunteer.stats.eventsParticipated}</div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)', marginTop: '0.25rem' }}>Across all categories</p>
        </div>

        <div className="nss-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-sub)' }}>Activities Completed</span>
            <div style={{ padding: '0.4rem', borderRadius: 'var(--radius-sm)', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>{volunteer.stats.activitiesCompleted}</div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)', marginTop: '0.25rem' }}>Verified by Officer</p>
        </div>

        <div className="nss-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-sub)' }}>Certificates Earned</span>
            <div style={{ padding: '0.4rem', borderRadius: 'var(--radius-sm)', background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa' }}>
              <Award size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>{volunteer.stats.certificatesCount}</div>
          <p style={{ fontSize: '0.75rem', color: '#a78bfa', marginTop: '0.25rem' }}>Verified e-Certificates</p>
        </div>
      </div>

      {/* Smart Insights Banner (Innovation Feature) */}
      <div
        className="nss-card"
        style={{
          background: 'linear-gradient(90deg, rgba(37, 99, 235, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%)',
          border: '1px solid rgba(37, 99, 235, 0.25)',
          padding: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <Sparkles size={20} color="var(--nss-gold)" />
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>Smart Dashboard Insights</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '0.75rem' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#60a5fa' }}>💡</span>
            <span>
              {hoursToMilestone > 0
                ? `You are ${hoursToMilestone} hours away from the '50 Service Hours' milestone!`
                : `Congratulations! You unlocked the '50 Service Hours' milestone!`}
            </span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#34d399' }}>📈</span>
            <span>You completed 3 more service hours this month than last month.</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#fbbf24' }}>⭐</span>
            <span>You have maintained a {volunteer.stats.attendanceRate}% attendance rate.</span>
          </div>
        </div>
      </div>

      {/* Primary Hackathon Demo Event Highlight */}
      <div>
        <div className="section-title">
          <Calendar size={20} color="var(--nss-blue-light)" />
          <span>Featured Upcoming Event (Primary Demo)</span>
        </div>

        {beachEvent && (
          <div
            className="nss-card"
            style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.85) 100%)',
              border: isCheckedInBeach
                ? '1px solid var(--nss-emerald)'
                : isRegisteredForBeach
                ? '1px solid var(--nss-blue-light)'
                : '1px solid var(--border-glass)',
              boxShadow: isCheckedInBeach ? '0 0 25px rgba(16, 185, 129, 0.2)' : 'none'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1.25rem' }}>
              <div style={{ flex: '1 1 300px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span className="badge badge-emerald">{beachEvent.category}</span>
                  <span className="badge badge-blue">4 Volunteer Hours</span>
                  {isCheckedInBeach && <span className="badge badge-emerald">ATTENDANCE: PRESENT ✓</span>}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '0.4rem' }}>
                  {beachEvent.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', marginBottom: '0.75rem', lineHeight: '1.5' }}>
                  {beachEvent.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-sub)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={14} color="#60a5fa" />
                    <span>{beachEvent.date} ({beachEvent.time})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={14} color="#f59e0b" />
                    <span>{beachEvent.venue}</span>
                  </div>
                </div>
              </div>

              {/* Demo Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.75rem', minWidth: '200px' }}>
                {!isRegisteredForBeach ? (
                  <button className="btn btn-primary" onClick={() => registerForEvent(beachEvent.id)}>
                    REGISTER NOW
                  </button>
                ) : !isCheckedInBeach ? (
                  <>
                    <button className="btn btn-emerald" onClick={() => setActiveTab('attendance')}>
                      <UserCheck size={16} /> CHECK-IN NOW
                    </button>
                    <span style={{ fontSize: '0.75rem', color: 'var(--nss-emerald)', textAlign: 'center', fontWeight: 600 }}>
                      Registered ✓ (Attendance Open)
                    </span>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '0.75rem', background: 'rgba(16, 185, 129, 0.15)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                    <div style={{ fontWeight: 800, color: '#34d399', fontSize: '0.9rem' }}>CHECKED IN ✓</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)', marginTop: '0.2rem' }}>+4 Hours Credited</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Two Column Layout: Recent Activities & Announcements */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Activity Timeline */}
        <div className="nss-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} color="#60a5fa" /> Activity History
            </h3>
            <button
              onClick={() => setActiveTab('achievements')}
              style={{ background: 'none', border: 'none', color: '#60a5fa', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              View All
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {activities.slice(0, 4).map((act) => (
              <div
                key={act.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--border-glass)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#fff' }}>{act.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>{act.date} • {act.category}</div>
                </div>
                <span className="badge badge-emerald">+{act.hours} Hrs</span>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements Feed */}
        <div className="nss-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Megaphone size={16} color="#fbbf24" /> Announcements
            </h3>
            <button
              onClick={() => setActiveTab('announcements')}
              style={{ background: 'none', border: 'none', color: '#60a5fa', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              View Feed
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {announcements.slice(0, 3).map((ann) => (
              <div
                key={ann.id}
                style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(15, 23, 42, 0.6)',
                  borderLeft: ann.priority === 'HIGH' ? '3px solid var(--nss-crimson)' : '3px solid var(--nss-blue)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#fff' }}>{ann.title}</span>
                  {ann.priority === 'HIGH' && <span className="badge badge-crimson" style={{ fontSize: '0.65rem' }}>HIGH</span>}
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-sub)', marginTop: '0.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {ann.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
