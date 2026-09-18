import React from 'react';
import { useNSS } from '../../context/NSSContext';
import {
  Award,
  ShieldCheck,
  Trees,
  Clock,
  Star,
  HeartPulse,
  Lock,
  Sparkles,
  TrendingUp,
  Zap,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const AchievementsView = () => {
  const { achievements, volunteer, events, registerForEvent, setActiveTab } = useNSS();

  const iconMap = {
    ShieldCheck: ShieldCheck,
    Trees: Trees,
    Clock: Clock,
    Star: Star,
    Award: Award,
    HeartPulse: HeartPulse
  };

  // Recommendations
  const recommendedEvents = events.filter((e) => e.category === 'Environmental' || e.category === 'Blood Donation');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h1 className="page-title">Achievements & NSS Performance</h1>
        <p className="page-sub">Track milestone achievements, service honors, and NSS impact score metrics.</p>
      </div>

      {/* Top Banner: NSS Impact Score & Engagement Level */}
      <div
        className="nss-card"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%)',
          border: '1px solid var(--border-highlight)'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <Zap size={20} color="var(--nss-gold)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-sub)' }}>INNOVATION INDEX</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
              NSS Impact Score: <span style={{ color: '#fbbf24' }}>{volunteer.stats.impactScore}</span> pts
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', marginTop: '0.2rem' }}>
              Calculated dynamically from total accredited hours ({volunteer.stats.hours} hrs), attendance consistency ({volunteer.stats.attendanceRate}%), and completed service drives.
            </p>
          </div>

          <div style={{ textAlign: 'right', minWidth: '200px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Engagement Indicator</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
              <span className="badge badge-emerald" style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
                <TrendingUp size={14} /> HIGHLY ACTIVE VOLUNTEER
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Milestone Progress Cards */}
      <div className="section-title">
        <Clock size={20} color="#60a5fa" />
        <span>Milestone Goals</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        <div className="nss-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>50 Service Hours Milestone</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#60a5fa' }}>
              {volunteer.stats.hours} / 50 hrs
            </span>
          </div>
          <div className="progress-bar-bg" style={{ height: '10px', marginBottom: '0.5rem' }}>
            <div
              className="progress-bar-fill"
              style={{ width: `${Math.min(100, (volunteer.stats.hours / 50) * 100)}%` }}
            />
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>
            {volunteer.stats.hours >= 50 ? '✓ Goal Achieved!' : `${50 - volunteer.stats.hours} more hours required to unlock dedicated badge.`}
          </p>
        </div>

        <div className="nss-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>10 Events Milestone</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399' }}>
              {volunteer.stats.eventsParticipated} / 10 events
            </span>
          </div>
          <div className="progress-bar-bg" style={{ height: '10px', marginBottom: '0.5rem' }}>
            <div
              className="progress-bar-fill"
              style={{
                width: `${Math.min(100, (volunteer.stats.eventsParticipated / 10) * 100)}%`,
                background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)'
              }}
            />
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>
            {volunteer.stats.eventsParticipated >= 10 ? '✓ Goal Achieved!' : `${10 - volunteer.stats.eventsParticipated} more event to unlock Community Champion honor.`}
          </p>
        </div>
      </div>

      {/* Badges Grid Showcase */}
      <div className="section-title">
        <Award size={20} color="var(--nss-gold)" />
        <span>NSS Honors & Badges</span>
      </div>

      <div className="grid-cards">
        {achievements.map((ach) => {
          const IconComponent = iconMap[ach.iconName] || Award;
          const isUnlocked = ach.unlocked;

          return (
            <div
              key={ach.id}
              className="nss-card"
              style={{
                background: isUnlocked
                  ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)'
                  : 'rgba(15, 23, 42, 0.4)',
                border: isUnlocked ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid var(--border-glass)',
                opacity: isUnlocked ? 1 : 0.7
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: isUnlocked ? 'rgba(245, 158, 11, 0.2)' : 'rgba(148, 163, 184, 0.1)',
                    border: isUnlocked ? '2px solid var(--nss-gold)' : '1px solid var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isUnlocked ? '#fbbf24' : '#64748b'
                  }}
                >
                  {isUnlocked ? <IconComponent size={24} /> : <Lock size={20} />}
                </div>

                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: isUnlocked ? '#fff' : 'var(--text-sub)' }}>
                    {ach.title}
                  </h4>
                  {isUnlocked ? (
                    <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
                      UNLOCKED • {ach.unlockedDate || 'Active'}
                    </span>
                  ) : (
                    <span className="badge badge-gray" style={{ fontSize: '0.65rem' }}>
                      IN PROGRESS ({ach.progress}%)
                    </span>
                  )}
                </div>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-sub)', lineHeight: '1.4' }}>
                {ach.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Impact Timeline (Innovation Feature #4) */}
      <div className="nss-card">
        <h3 className="section-title">
          <Sparkles size={18} color="#60a5fa" /> Impact Journey Timeline
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', position: 'relative', marginTop: '1.5rem', gap: '1rem' }}>
          {[
            { step: '1', title: 'Joined NSS', desc: 'August 2024', done: true },
            { step: '2', title: 'First Drive', desc: 'Winter Blanket Drive', done: true },
            { step: '3', title: '10 Hours Logged', desc: 'March 2026', done: true },
            { step: '4', title: 'First Certificate', desc: 'Orientation Cert', done: true },
            { step: '5', title: '40+ Hours Milestone', desc: 'Current Stage', done: volunteer.stats.hours >= 40 },
            { step: '6', title: 'Community Champion', desc: 'Target 10 Events', done: volunteer.stats.eventsParticipated >= 10 }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1 1 120px', textAlign: 'center' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: item.done ? 'var(--nss-blue)' : 'var(--nss-navy-light)',
                  color: item.done ? '#fff' : 'var(--text-sub)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                  boxShadow: item.done ? '0 0 15px rgba(37, 99, 235, 0.4)' : 'none'
                }}
              >
                {item.done ? <CheckCircle2 size={18} /> : item.step}
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: item.done ? '#fff' : 'var(--text-sub)' }}>{item.title}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Event Recommendations (Innovation Feature #2) */}
      <div className="nss-card">
        <h3 className="section-title">
          <Sparkles size={18} color="var(--nss-gold)" /> Smart Event Suggestions for You
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', marginBottom: '1rem' }}>
          Based on your active participation in Environmental and Community drives:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {recommendedEvents.map((evt) => (
            <div key={evt.id} style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
              <span className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>{evt.category}</span>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{evt.title}</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-sub)', margin: '0.3rem 0' }}>{evt.date} • {evt.hours} Hours Credit</p>
              <button className="btn btn-outline" style={{ fontSize: '0.78rem', width: '100%', marginTop: '0.5rem' }} onClick={() => setActiveTab('events')}>
                View in Event Catalog
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
