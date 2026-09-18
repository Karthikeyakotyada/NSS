import React, { useState } from 'react';
import { useNSS } from '../../context/NSSContext';
import {
  Award,
  Bell,
  CheckCircle,
  RotateCcw,
  User,
  Shield,
  ShieldAlert,
  ChevronDown,
  Sparkles,
  Check
} from 'lucide-react';
import { ResetModal } from '../common/ResetModal';

export const Navbar = () => {
  const { role, switchRole, volunteer, notifications, setNotifications } = useNSS();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <>
      <header
        style={{
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-glass)',
          padding: '0.75rem 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          sticky: 'top',
          top: 0,
          zIndex: 50
        }}
      >
        {/* Left Brand Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
              border: '2px solid var(--nss-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(245, 158, 11, 0.3)',
              color: '#fff',
              fontWeight: 800,
              fontSize: '1.1rem'
            }}
          >
            NSS
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#fff', letterSpacing: '-0.01em' }}>
                NSS DIGITAL PLATFORM
              </span>
              <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
                PROTOTYPE DEMO
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>
              National Service Scheme • Digital Management System
            </p>
          </div>
        </div>

        {/* Center / Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Persona / Role Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(30, 41, 59, 0.9)',
                border: '1px solid var(--nss-blue)',
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-md)',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Shield size={16} color="var(--nss-gold)" />
              <span>Persona: <strong style={{ color: '#60a5fa' }}>{role}</strong></span>
              <ChevronDown size={14} />
            </button>

            {showRoleDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  width: '180px',
                  background: 'var(--nss-navy)',
                  border: '1px solid var(--nss-navy-light)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  padding: '0.5rem',
                  zIndex: 100
                }}
              >
                {['VOLUNTEER', 'OFFICER', 'ADMIN'].map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      switchRole(r);
                      setShowRoleDropdown(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      background: role === r ? 'rgba(37, 99, 235, 0.2)' : 'transparent',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      color: role === r ? '#60a5fa' : 'var(--text-sub)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{r}</span>
                    {role === r && <Check size={14} color="#60a5fa" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reset Demo Data Button */}
          <button
            className="btn btn-outline"
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem', borderColor: 'rgba(245, 158, 11, 0.4)', color: '#fbbf24' }}
            onClick={() => setShowResetModal(true)}
            title="Reset to initial prototype seed state"
          >
            <RotateCcw size={14} />
            <span>Reset Demo</span>
          </button>

          {/* Notifications Bell */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                position: 'relative',
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid var(--border-glass)',
                padding: '0.55rem',
                borderRadius: '50%',
                color: 'var(--text-sub)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    background: 'var(--nss-crimson)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div
                style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  width: '320px',
                  background: 'var(--nss-navy)',
                  border: '1px solid var(--nss-navy-light)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                  padding: '1rem',
                  zIndex: 100
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-glass)' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      style={{ background: 'none', border: 'none', color: '#60a5fa', fontSize: '0.75rem', cursor: 'pointer' }}
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '280px', overflowY: 'auto' }}>
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      style={{
                        padding: '0.6rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        background: n.read ? 'transparent' : 'rgba(37, 99, 235, 0.12)',
                        borderLeft: n.read ? '3px solid transparent' : '3px solid var(--nss-blue-light)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>
                        <span>{n.title}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>{n.time}</span>
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-sub)', marginTop: '0.2rem' }}>{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              background: 'rgba(30, 41, 59, 0.5)',
              padding: '0.35rem 0.75rem 0.35rem 0.4rem',
              borderRadius: '9999px',
              border: '1px solid var(--border-glass)'
            }}
          >
            <img
              src={volunteer.photoUrl}
              alt={volunteer.name}
              style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
                {role === 'VOLUNTEER' ? volunteer.name : 'Prof. R. V. Sharma'}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#60a5fa' }}>
                {role === 'VOLUNTEER' ? volunteer.id : 'NSS Program Officer'}
              </div>
            </div>
          </div>
        </div>
      </header>

      <ResetModal isOpen={showResetModal} onClose={() => setShowResetModal(false)} />
    </>
  );
};
