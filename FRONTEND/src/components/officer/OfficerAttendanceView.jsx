import React, { useState } from 'react';
import { useNSS } from '../../context/NSSContext';
import { UserCheck, Calendar, MapPin, CheckCircle2, XCircle, Clock, Shield } from 'lucide-react';

export const OfficerAttendanceView = () => {
  const { events, roster, attendance, markOfficerAttendance, volunteer } = useNSS();
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || 'EVT-BEACH-01');

  const currentEvent = events.find((e) => e.id === selectedEventId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h1 className="page-title">Officer Attendance Control</h1>
        <p className="page-sub">Review field attendance logs, mark volunteer presence, and credit accredited service hours.</p>
      </div>

      {/* Event Select Header */}
      <div
        className="nss-card"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%)',
          border: '1px solid var(--border-highlight)'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div>
            <label className="form-label" style={{ color: 'var(--nss-gold)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Select Active Event Drive
            </label>
            <select
              className="form-select"
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              style={{ width: '340px', fontWeight: 700, fontSize: '1rem' }}
            >
              {events.map((evt) => (
                <option key={evt.id} value={evt.id}>
                  {evt.title} ({evt.category})
                </option>
              ))}
            </select>
          </div>

          {currentEvent && (
            <div style={{ textAlign: 'right' }}>
              <span className="badge badge-gold">+{currentEvent.hours} Hours Credit</span>
              <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 700, marginTop: '0.25rem' }}>
                {currentEvent.date}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>{currentEvent.venue}</div>
            </div>
          )}
        </div>
      </div>

      {/* Registered Volunteers Roster Table */}
      <div className="table-container">
        <table className="nss-table">
          <thead>
            <tr>
              <th>Volunteer Name</th>
              <th>NSS ID</th>
              <th>Department</th>
              <th>Year</th>
              <th>Registration</th>
              <th>Current Attendance</th>
              <th>Accredited Credit</th>
              <th>Officer Override Actions</th>
            </tr>
          </thead>
          <tbody>
            {roster.map((vol) => {
              const attRecord = attendance.find(
                (a) => a.eventId === selectedEventId && a.volunteerId === vol.id
              );
              const currentStatus = attRecord ? attRecord.status : 'NOT MARKED';

              return (
                <tr key={vol.id}>
                  <td style={{ fontWeight: 700, color: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {vol.name}
                      {vol.id === volunteer.id && <span className="badge badge-gold" style={{ fontSize: '0.6rem' }}>PRIMARY DEMO</span>}
                    </div>
                  </td>
                  <td style={{ fontFamily: 'monospace', color: '#60a5fa' }}>{vol.id}</td>
                  <td style={{ color: 'var(--text-sub)' }}>{vol.dept}</td>
                  <td>{vol.year}</td>
                  <td>
                    <span className="badge badge-blue">CONFIRMED</span>
                  </td>
                  <td>
                    {currentStatus === 'PRESENT' ? (
                      <span className="badge badge-emerald">PRESENT ✓</span>
                    ) : currentStatus === 'ABSENT' ? (
                      <span className="badge badge-crimson">ABSENT ✖</span>
                    ) : currentStatus === 'LATE' ? (
                      <span className="badge badge-gold">LATE</span>
                    ) : (
                      <span className="badge badge-gray">PENDING</span>
                    )}
                  </td>
                  <td style={{ fontWeight: 800, color: '#fbbf24' }}>
                    {currentStatus === 'PRESENT' ? `+${currentEvent?.hours || 4} Hrs` : '0 Hrs'}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        className={currentStatus === 'PRESENT' ? 'btn btn-emerald' : 'btn btn-outline'}
                        style={{ fontSize: '0.72rem', padding: '0.25rem 0.55rem' }}
                        onClick={() => markOfficerAttendance(selectedEventId, vol.id, 'PRESENT')}
                      >
                        PRESENT
                      </button>
                      <button
                        className={currentStatus === 'ABSENT' ? 'btn btn-danger' : 'btn btn-outline'}
                        style={{ fontSize: '0.72rem', padding: '0.25rem 0.55rem' }}
                        onClick={() => markOfficerAttendance(selectedEventId, vol.id, 'ABSENT')}
                      >
                        ABSENT
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
