import React from 'react';
import { X, Calendar, Clock, MapPin, User, ShieldCheck, CheckCircle2, UserCheck } from 'lucide-react';
import { useNSS } from '../../context/NSSContext';

export const EventDetailModal = ({ event, isOpen, onClose }) => {
  const { volunteer, registrations, attendance, registerForEvent, setActiveTab } = useNSS();

  if (!isOpen || !event) return null;

  const isRegistered = registrations.some(
    (r) => r.eventId === event.id && r.volunteerId === volunteer.id
  );
  const isCheckedIn = attendance.some(
    (a) => a.eventId === event.id && a.volunteerId === volunteer.id && a.status === 'PRESENT'
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>{event.category}</span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{event.title}</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)', marginBottom: '1.25rem', lineHeight: '1.6' }}>
          {event.description}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'rgba(15, 23, 42, 0.7)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <Calendar size={16} color="#60a5fa" />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Date & Time</div>
              <div style={{ color: '#fff', fontWeight: 600 }}>{event.date}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <MapPin size={16} color="#f59e0b" />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Venue</div>
              <div style={{ color: '#fff', fontWeight: 600 }}>{event.venue}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <Clock size={16} color="#34d399" />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Volunteer Credit</div>
              <div style={{ color: '#fff', fontWeight: 600 }}>{event.hours} Accredited Hours</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <User size={16} color="#a78bfa" />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Organizer</div>
              <div style={{ color: '#fff', fontWeight: 600 }}>{event.organizer}</div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        {event.requirements && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Volunteer Requirements</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {event.requirements.map((req, idx) => (
                <span key={idx} className="badge badge-gray" style={{ fontSize: '0.75rem' }}>
                  ✓ {req}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button className="btn btn-outline" onClick={onClose}>
            Close
          </button>
          {!isRegistered ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                registerForEvent(event.id);
              }}
            >
              REGISTER NOW
            </button>
          ) : !isCheckedIn ? (
            <button
              className="btn btn-emerald"
              onClick={() => {
                onClose();
                setActiveTab('attendance');
              }}
            >
              <UserCheck size={16} /> GO TO ATTENDANCE
            </button>
          ) : (
            <span className="btn btn-emerald" style={{ cursor: 'default' }}>
              <CheckCircle2 size={16} /> CHECKED IN PRESENT
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
