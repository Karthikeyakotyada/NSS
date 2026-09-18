import React, { useState } from 'react';
import { useNSS } from '../../context/NSSContext';
import { Users, Search, Filter, Eye, Award, CheckCircle2, Clock, X, Sparkles, Trophy } from 'lucide-react';

export const VolunteerManagementView = () => {
  const { roster, volunteer } = useNSS();
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [selectedVolModal, setSelectedVolModal] = useState(null);

  const departments = ['All', 'Computer Science & Eng', 'Electronics & Comm', 'Mechanical Eng', 'Civil Engineering', 'Electrical & Electronics', 'Information Tech'];

  const filteredRoster = roster.filter((vol) => {
    const matchesDept = deptFilter === 'All' || vol.dept === deptFilter;
    const matchesSearch =
      vol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vol.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vol.dept.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 className="page-title">Volunteer Roster & Management</h1>
        <p className="page-sub">Comprehensive central directory of enrolled NSS volunteers, service records, and individual profiles.</p>
      </div>

      {/* Filter & Search Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setDeptFilter(dept)}
              className={deptFilter === dept ? 'btn btn-primary' : 'btn btn-outline'}
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
            >
              {dept === 'All' ? 'All Departments' : dept.split(' ')[0]}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} color="var(--text-sub)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Search volunteer name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.2rem', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      {/* Roster Table */}
      <div className="table-container">
        <table className="nss-table">
          <thead>
            <tr>
              <th>Volunteer Name</th>
              <th>NSS ID</th>
              <th>Department</th>
              <th>Year</th>
              <th>Hours</th>
              <th>Events</th>
              <th>Attendance</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoster.map((vol) => (
              <tr key={vol.id}>
                <td style={{ fontWeight: 700, color: '#fff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {vol.name}
                    {vol.id === volunteer.id && <span className="badge badge-gold" style={{ fontSize: '0.6rem' }}>DEMO VOLUNTEER</span>}
                  </div>
                </td>
                <td style={{ fontFamily: 'monospace', color: '#60a5fa' }}>{vol.id}</td>
                <td style={{ color: 'var(--text-sub)' }}>{vol.dept}</td>
                <td>{vol.year}</td>
                <td style={{ fontWeight: 800, color: '#fbbf24' }}>{vol.hours} hrs</td>
                <td style={{ fontWeight: 700, color: '#34d399' }}>{vol.events}</td>
                <td>{vol.attendance}</td>
                <td>
                  <span className="badge badge-emerald">{vol.status}</span>
                </td>
                <td>
                  <button
                    className="btn btn-outline"
                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                    onClick={() => setSelectedVolModal(vol)}
                  >
                    <Eye size={14} /> Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Volunteer Profile Drawer Modal */}
      {selectedVolModal && (
        <div className="modal-overlay" onClick={() => setSelectedVolModal(null)}>
          <div className="modal-content" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={22} color="var(--nss-gold)" />
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>Volunteer Record Drawer</h2>
              </div>
              <button onClick={() => setSelectedVolModal(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(15, 23, 42, 0.7)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-glass)', marginBottom: '1.25rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--nss-navy-light)', border: '2px solid var(--nss-blue)', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                {selectedVolModal.name.charAt(0)}
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>{selectedVolModal.name}</h3>
                <p style={{ fontSize: '0.85rem', color: '#60a5fa' }}>NSS ID: {selectedVolModal.id}</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>{selectedVolModal.dept} • {selectedVolModal.year}</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem', textAlign: 'center' }}>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-sub)' }}>Accredited Hours</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fbbf24' }}>{selectedVolModal.hours} hrs</div>
              </div>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-sub)' }}>Events</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399' }}>{selectedVolModal.events}</div>
              </div>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-sub)' }}>Attendance Rate</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#60a5fa' }}>{selectedVolModal.attendance}</div>
              </div>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Active Accreditation Badges</div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="badge badge-gold">Active NSS Member</span>
                <span className="badge badge-emerald">100% Attendance Star</span>
                <span className="badge badge-blue">Community Service</span>
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setSelectedVolModal(null)}>
              Close Profile Drawer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
