import React, { useState } from 'react';
import { useNSS } from '../../context/NSSContext';
import { Calendar, Search, MapPin, Clock, Users, Plus, CheckCircle2, UserCheck, Sparkles } from 'lucide-react';
import { EventDetailModal } from './EventDetailModal';

export const EventCatalog = () => {
  const { events, volunteer, registrations, attendance, registerForEvent, role, setActiveTab } = useNSS();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventModal, setSelectedEventModal] = useState(null);

  const categories = ['All', 'Environmental', 'Blood Donation', 'Education', 'Health Camp', 'Awareness', 'Community Service'];

  const filteredEvents = events.filter((evt) => {
    const matchesCat = selectedCategory === 'All' || evt.category === selectedCategory;
    const matchesSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="page-title">NSS Event Catalog</h1>
          <p className="page-sub">Discover, register, and contribute to official National Service Scheme activities.</p>
        </div>

        {role !== 'VOLUNTEER' && (
          <button className="btn btn-gold" onClick={() => setActiveTab('events')}>
            <Plus size={16} /> Create New Event
          </button>
        )}
      </div>

      {/* Filters & Search Row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Category Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? 'btn btn-primary' : 'btn btn-outline'}
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} color="var(--text-sub)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Search events or venues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.2rem', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      {/* Recommended Event Tag for Environmental (Smart Feature) */}
      <div style={{ fontSize: '0.82rem', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Sparkles size={16} color="var(--nss-gold)" />
        <span>Smart Recommendation: Based on your previous drives, environmental activities are highly recommended for you!</span>
      </div>

      {/* Events Grid */}
      <div className="grid-cards">
        {filteredEvents.map((evt) => {
          const isRegistered = registrations.some(
            (r) => r.eventId === evt.id && r.volunteerId === volunteer.id
          );
          const isCheckedIn = attendance.some(
            (a) => a.eventId === evt.id && a.volunteerId === volunteer.id && a.status === 'PRESENT'
          );
          const isFull = evt.registeredCount >= evt.capacity;

          return (
            <div
              key={evt.id}
              className="nss-card nss-card-interactive"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: evt.id === 'EVT-BEACH-01' ? '1px solid var(--border-highlight)' : '1px solid var(--border-glass)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="badge badge-emerald">{evt.category}</span>
                  <span className="badge badge-blue">+{evt.hours} Hrs Credit</span>
                </div>

                <h3
                  onClick={() => setSelectedEventModal(evt)}
                  style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem', cursor: 'pointer' }}
                >
                  {evt.title}
                </h3>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-sub)', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {evt.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Calendar size={14} color="#60a5fa" />
                    <span>{evt.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Clock size={14} color="#34d399" />
                    <span>{evt.time}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <MapPin size={14} color="#f59e0b" />
                    <span>{evt.venue}</span>
                  </div>
                </div>

                {/* Capacity Progress */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-sub)', marginBottom: '0.25rem' }}>
                    <span>Registered Volunteers</span>
                    <span>{evt.registeredCount} / {evt.capacity}</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${Math.min(100, (evt.registeredCount / evt.capacity) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-glass)' }}>
                <button
                  className="btn btn-outline"
                  style={{ flex: 1, fontSize: '0.8rem' }}
                  onClick={() => setSelectedEventModal(evt)}
                >
                  Details
                </button>

                {!isRegistered ? (
                  <button
                    className="btn btn-primary"
                    style={{ flex: 1.5, fontSize: '0.8rem' }}
                    onClick={() => registerForEvent(evt.id)}
                    disabled={isFull}
                  >
                    {isFull ? 'FULL' : 'REGISTER NOW'}
                  </button>
                ) : !isCheckedIn ? (
                  <button
                    className="btn btn-emerald"
                    style={{ flex: 1.5, fontSize: '0.8rem' }}
                    onClick={() => setActiveTab('attendance')}
                  >
                    <UserCheck size={14} /> CHECK-IN NOW
                  </button>
                ) : (
                  <button
                    className="btn btn-emerald"
                    style={{ flex: 1.5, fontSize: '0.8rem', cursor: 'default' }}
                  >
                    <CheckCircle2 size={14} /> CHECKED IN
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <EventDetailModal
        event={selectedEventModal}
        isOpen={!!selectedEventModal}
        onClose={() => setSelectedEventModal(null)}
      />
    </div>
  );
};
