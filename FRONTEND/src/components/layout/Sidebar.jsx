import React from 'react';
import { useNSS } from '../../context/NSSContext';
import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  Award,
  FileCheck,
  QrCode,
  Megaphone,
  Users,
  UserCheck,
  BarChart3,
  FileText,
  Shield,
  Sparkles
} from 'lucide-react';

export const Sidebar = () => {
  const { role, activeTab, setActiveTab, registrations, volunteer } = useNSS();

  const registeredCount = registrations.filter(r => r.volunteerId === volunteer.id).length;

  const volunteerNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'events', label: 'Event Catalog', icon: Calendar },
    { id: 'attendance', label: 'My Attendance', icon: CheckSquare, badge: registeredCount > 0 ? registeredCount : null },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'certificates', label: 'Certificates', icon: FileCheck },
    { id: 'digital-id', label: 'Digital NSS ID', icon: QrCode },
    { id: 'announcements', label: 'Announcements', icon: Megaphone }
  ];

  const officerNav = [
    { id: 'officer-dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'volunteers', label: 'Volunteer Directory', icon: Users },
    { id: 'events', label: 'Event Manager', icon: Calendar },
    { id: 'officer-attendance', label: 'Attendance Control', icon: UserCheck },
    { id: 'certificates', label: 'Certificates', icon: FileCheck },
    { id: 'announcements', label: 'Broadcasts', icon: Megaphone },
    { id: 'analytics', label: 'Impact Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports & Export', icon: FileText }
  ];

  const currentNav = role === 'VOLUNTEER' ? volunteerNav : officerNav;

  return (
    <aside
      style={{
        width: '260px',
        background: 'var(--nss-navy)',
        borderRight: '1px solid var(--border-glass)',
        padding: '1.5rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 'calc(100vh - 65px)'
      }}
    >
      <div>
        <div style={{ padding: '0 0.5rem 1rem 0.5rem', borderBottom: '1px solid var(--border-glass)', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-sub)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {role === 'VOLUNTEER' ? 'Volunteer Portal' : `${role} Control Center`}
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {currentNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: isActive ? 'linear-gradient(90deg, rgba(37, 99, 235, 0.25) 0%, rgba(37, 99, 235, 0.05) 100%)' : 'transparent',
                  borderLeft: isActive ? '3px solid var(--nss-blue-light)' : '3px solid transparent',
                  color: isActive ? '#fff' : 'var(--text-sub)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} color={isActive ? '#60a5fa' : 'var(--text-sub)'} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Info Card */}
      <div
        className="nss-card"
        style={{
          padding: '1rem',
          background: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid var(--border-highlight)',
          marginTop: '2rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <Sparkles size={16} color="var(--nss-gold)" />
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>Hackathon Status</span>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)', lineHeight: '1.4' }}>
          Connected prototype state active. Actions persist to LocalStorage.
        </p>
      </div>
    </aside>
  );
};
