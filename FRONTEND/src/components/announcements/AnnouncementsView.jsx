import React, { useState } from 'react';
import { useNSS } from '../../context/NSSContext';
import { Megaphone, Plus, Send, AlertTriangle, BellRing, Sparkles, X } from 'lucide-react';

export const AnnouncementsView = () => {
  const { announcements, role, publishAnnouncement } = useNSS();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    priority: 'NORMAL',
    category: 'General Notice'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.message) return;
    publishAnnouncement(formData);
    setFormData({ title: '', message: '', priority: 'NORMAL', category: 'General Notice' });
    setShowCreateModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="page-title">NSS Announcements & Directives</h1>
          <p className="page-sub">Official notices, event alerts, and administrative broadcasts for all NSS units.</p>
        </div>

        {role !== 'VOLUNTEER' && (
          <button className="btn btn-gold" onClick={() => setShowCreateModal(true)}>
            <Plus size={16} /> Broadcast New Announcement
          </button>
        )}
      </div>

      {/* Announcements List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {announcements.map((ann) => {
          const isHigh = ann.priority === 'HIGH';

          return (
            <div
              key={ann.id}
              className="nss-card"
              style={{
                borderLeft: isHigh ? '4px solid var(--nss-crimson)' : '4px solid var(--nss-blue-light)',
                background: isHigh
                  ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(15, 23, 42, 0.9) 100%)'
                  : 'rgba(30, 41, 59, 0.7)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  {isHigh ? <AlertTriangle size={20} color="var(--nss-crimson)" /> : <Megaphone size={20} color="#60a5fa" />}
                  <span className={isHigh ? 'badge badge-crimson' : 'badge badge-blue'}>
                    {ann.category || 'Official Notice'}
                  </span>
                  {isHigh && <span className="badge badge-crimson">HIGH PRIORITY</span>}
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>{ann.date}</span>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
                {ann.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '1rem' }}>
                {ann.message}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', paddingTop: '0.75rem', borderTop: '1px solid var(--border-glass)' }}>
                <span>Issued by: <strong style={{ color: 'var(--text-sub)' }}>{ann.author}</strong></span>
                <span>Ref: {ann.id}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Officer Broadcast Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Megaphone size={22} color="var(--nss-gold)" />
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>Broadcast Announcement</h2>
              </div>
              <button onClick={() => setShowCreateModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Announcement Title *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Reporting Instructions for Beach Clean Drive"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Priority Level</label>
                  <select
                    className="form-select"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="NORMAL">NORMAL</option>
                    <option value="HIGH">HIGH PRIORITY</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Notice Category</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="General Notice">General Notice</option>
                    <option value="Event Alert">Event Alert</option>
                    <option value="Certificates">Certificates</option>
                    <option value="Emergency">Emergency Drive</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Announcement Message *</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="Provide detailed instructions for NSS volunteers..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold">
                  <Send size={16} /> Broadcast Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
