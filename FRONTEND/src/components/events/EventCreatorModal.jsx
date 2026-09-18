import React, { useState } from 'react';
import { useNSS } from '../../context/NSSContext';
import { Plus, X, Calendar, MapPin, Clock, Award, Users } from 'lucide-react';

export const EventCreatorModal = ({ isOpen, onClose }) => {
  const { createEvent } = useNSS();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Environmental',
    description: '',
    date: 'Saturday, Oct 10, 2026',
    time: '08:00 AM - 12:00 PM',
    venue: 'University Central Grounds',
    organizer: 'NSS Central Unit',
    capacity: 50,
    hours: 4,
    requirements: 'NSS Sash, Cap, Water Bottle'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.venue) return;
    createEvent(formData);
    onClose();
    setFormData({
      title: '',
      category: 'Environmental',
      description: '',
      date: 'Saturday, Oct 10, 2026',
      time: '08:00 AM - 12:00 PM',
      venue: 'University Central Grounds',
      organizer: 'NSS Central Unit',
      capacity: 50,
      hours: 4,
      requirements: 'NSS Sash, Cap, Water Bottle'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={22} color="var(--nss-gold)" />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>Create & Publish NSS Event</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Event Title / Drive Name *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Tree Plantation & Mega Greenery Drive"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Activity Category</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Environmental">Environmental</option>
                <option value="Blood Donation">Blood Donation</option>
                <option value="Education">Education</option>
                <option value="Health Camp">Health Camp</option>
                <option value="Awareness">Awareness</option>
                <option value="Community Service">Community Service</option>
                <option value="Campus Service">Campus Service</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Volunteer Hours Credit *</label>
              <input
                type="number"
                min="1"
                max="24"
                className="form-input"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description & Service Objectives *</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Describe the scope of work and community benefit..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Scheduled Date</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Saturday, Oct 10, 2026"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Time Window</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 08:00 AM - 12:00 PM"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Venue / Location *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Botanical Grounds"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Max Volunteer Capacity</label>
              <input
                type="number"
                min="1"
                className="form-input"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Organizing Unit / Department</label>
            <input
              type="text"
              className="form-input"
              value={formData.organizer}
              onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-gold">
              <Plus size={16} /> Publish Event Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
