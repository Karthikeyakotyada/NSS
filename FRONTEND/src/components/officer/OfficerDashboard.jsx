import React, { useState } from 'react';
import { useNSS } from '../../context/NSSContext';
import {
  Users,
  Calendar,
  Clock,
  UserCheck,
  Plus,
  BarChart3,
  FileText,
  Megaphone,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { EventCreatorModal } from '../events/EventCreatorModal';

export const OfficerDashboard = () => {
  const {
    impactStats,
    events,
    roster,
    attendance,
    activities,
    setActiveTab
  } = useNSS();

  const [showEventModal, setShowEventModal] = useState(false);

  const activeEventsCount = events.filter((e) => e.status === 'UPCOMING').length;
  const recentAttendance = attendance.slice(0, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Command Center Banner */}
      <div
        className="nss-card"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: '1px solid var(--border-highlight)',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="badge badge-gold">COMMAND CENTER</span>
              <span className="badge badge-blue">NSS PROGRAM OFFICER</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>Prof. R. V. Sharma</h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', marginTop: '0.2rem' }}>
              NSS Central Unit • University Operations & Field Accreditation Control
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-gold" onClick={() => setShowEventModal(true)}>
              <Plus size={16} /> Create Event
            </button>
            <button className="btn btn-primary" onClick={() => setActiveTab('officer-attendance')}>
              <UserCheck size={16} /> Attendance Control
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 Key Metrics */}
      <div className="grid-stats">
        <div className="nss-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-sub)' }}>Total Enrolled Volunteers</span>
            <Users size={20} color="#60a5fa" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>{impactStats.totalVolunteers}</div>
          <p style={{ fontSize: '0.75rem', color: 'var(--nss-emerald)', marginTop: '0.25rem' }}>Across 5 Departments</p>
        </div>

        <div className="nss-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-sub)' }}>Active Upcoming Events</span>
            <Calendar size={20} color="#34d399" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>{activeEventsCount}</div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)', marginTop: '0.25rem' }}>Catalog open for registration</p>
        </div>

        <div className="nss-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-sub)' }}>Total Accredited Hours</span>
            <Clock size={20} color="#fbbf24" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>{impactStats.volunteerHours} <span style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>hrs</span></div>
          <p style={{ fontSize: '0.75rem', color: '#fbbf24', marginTop: '0.25rem' }}>State-wide Accredited</p>
        </div>

        <div className="nss-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-sub)' }}>Pending Actions</span>
            <AlertCircle size={20} color="#a78bfa" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>14</div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)', marginTop: '0.25rem' }}>Certificates pending review</p>
        </div>
      </div>

      {/* Quick Action Matrix */}
      <div className="nss-card">
        <h3 className="section-title">
          <Sparkles size={18} color="var(--nss-gold)" /> Command Actions & Tools
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <button
            onClick={() => setShowEventModal(true)}
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(37, 99, 235, 0.12)',
              border: '1px solid rgba(37, 99, 235, 0.3)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.9rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <Plus size={24} color="#60a5fa" />
            <span>Create Event</span>
          </button>

          <button
            onClick={() => setActiveTab('officer-attendance')}
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.9rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <UserCheck size={24} color="#34d399" />
            <span>Mark Attendance</span>
          </button>

          <button
            onClick={() => setActiveTab('volunteers')}
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.9rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <Users size={24} color="#fbbf24" />
            <span>Manage Volunteers</span>
          </button>

          <button
            onClick={() => setActiveTab('announcements')}
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(139, 92, 246, 0.12)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.9rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <Megaphone size={24} color="#a78bfa" />
            <span>Post Notice</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(59, 130, 246, 0.12)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.9rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <BarChart3 size={24} color="#60a5fa" />
            <span>Impact Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(236, 72, 153, 0.12)',
              border: '1px solid rgba(236, 72, 153, 0.3)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.9rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <FileText size={24} color="#f472b6" />
            <span>Export Reports</span>
          </button>
        </div>
      </div>

      {/* Split Section: Today's Live Attendance & Recent Roster Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Attendance Feed */}
        <div className="nss-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserCheck size={18} color="#34d399" /> Real-Time Attendance Log
            </h3>
            <button className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }} onClick={() => setActiveTab('officer-attendance')}>
              Control Table
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recentAttendance.map((att) => (
              <div
                key={att.id}
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
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#fff' }}>Sudheer K ({att.volunteerId})</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Time: {att.checkInTime} • +{att.hours} Hrs Credited</div>
                </div>
                <span className="badge badge-emerald">PRESENT ✓</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Volunteers Leaderboard */}
        <div className="nss-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={18} color="#fbbf24" /> Top Active Volunteers
            </h3>
            <button className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }} onClick={() => setActiveTab('volunteers')}>
              Full Roster
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {roster.slice(0, 4).map((vol, idx) => (
              <div
                key={vol.id}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span style={{ fontWeight: 800, color: 'var(--nss-gold)', width: '20px' }}>#{idx + 1}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#fff' }}>{vol.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>{vol.dept} • {vol.year}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: '#60a5fa', fontSize: '0.88rem' }}>{vol.hours} hrs</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{vol.events} events</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <EventCreatorModal isOpen={showEventModal} onClose={() => setShowEventModal(false)} />
    </div>
  );
};
