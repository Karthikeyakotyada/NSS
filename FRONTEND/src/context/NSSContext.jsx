import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_VOLUNTEER,
  INITIAL_EVENTS,
  INITIAL_REGISTRATIONS,
  INITIAL_ATTENDANCE,
  INITIAL_ACTIVITIES,
  INITIAL_CERTIFICATES,
  INITIAL_ACHIEVEMENTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_ROSTER,
  INITIAL_IMPACT_STATS
} from '../data/mockData';

const NSSContext = createContext();

const STORAGE_KEY = 'nss_digital_prototype_state_v1';

export const NSSProvider = ({ children }) => {
  // Load initial state from LocalStorage or seed data
  const loadInitialState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.volunteer && parsed.volunteer.name === 'Karthikeya K') {
          parsed.volunteer.name = 'Sudheer K';
          parsed.volunteer.email = 'sudheer.nss@univ.edu';
          parsed.volunteer.photoUrl = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80';
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load local state:', e);
    }
    return {
      role: 'VOLUNTEER',
      volunteer: INITIAL_VOLUNTEER,
      events: INITIAL_EVENTS,
      registrations: INITIAL_REGISTRATIONS,
      attendance: INITIAL_ATTENDANCE,
      activities: INITIAL_ACTIVITIES,
      certificates: INITIAL_CERTIFICATES,
      achievements: INITIAL_ACHIEVEMENTS,
      announcements: INITIAL_ANNOUNCEMENTS,
      roster: INITIAL_ROSTER,
      impactStats: INITIAL_IMPACT_STATS
    };
  };

  const initialState = loadInitialState();

  const [role, setRole] = useState(initialState.role);
  const [volunteer, setVolunteer] = useState(initialState.volunteer);
  const [events, setEvents] = useState(initialState.events);
  const [registrations, setRegistrations] = useState(initialState.registrations);
  const [attendance, setAttendance] = useState(initialState.attendance);
  const [activities, setActivities] = useState(initialState.activities);
  const [certificates, setCertificates] = useState(initialState.certificates);
  const [achievements, setAchievements] = useState(initialState.achievements);
  const [announcements, setAnnouncements] = useState(initialState.announcements);
  const [roster, setRoster] = useState(initialState.roster);
  const [impactStats, setImpactStats] = useState(initialState.impactStats);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toasts, setToasts] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Event Reminder', text: 'Beach Clean-Up Drive starts tomorrow at 8:00 AM.', time: '10m ago', read: false },
    { id: 2, title: 'Announcement', text: 'National Service Week scheduled for next Monday.', time: '2h ago', read: false }
  ]);

  // Persist state changes
  useEffect(() => {
    const stateToSave = {
      role,
      volunteer,
      events,
      registrations,
      attendance,
      activities,
      certificates,
      achievements,
      announcements,
      roster,
      impactStats
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  }, [role, volunteer, events, registrations, attendance, activities, certificates, achievements, announcements, roster, impactStats]);

  // Toast Handler
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Role Switcher
  const switchRole = (newRole) => {
    setRole(newRole);
    if (newRole === 'VOLUNTEER') {
      setActiveTab('dashboard');
    } else {
      setActiveTab('officer-dashboard');
    }
    addToast(`Switched active persona to ${newRole}`, 'info');
  };

  // Event Registration
  const registerForEvent = (eventId) => {
    const event = events.find((e) => e.id === eventId);
    if (!event) return;

    const existing = registrations.find((r) => r.eventId === eventId && r.volunteerId === volunteer.id);
    if (existing) {
      addToast(`Already registered for ${event.title}`, 'info');
      return;
    }

    const newReg = {
      id: `REG-${Date.now()}`,
      eventId,
      volunteerId: volunteer.id,
      status: 'REGISTERED',
      registeredAt: new Date().toISOString().split('T')[0]
    };

    setRegistrations((prev) => [newReg, ...prev]);

    // Increment registered count for event
    setEvents((prev) =>
      prev.map((evt) =>
        evt.id === eventId ? { ...evt, registeredCount: evt.registeredCount + 1 } : evt
      )
    );

    // Push Notification
    setNotifications((prev) => [
      {
        id: Date.now(),
        title: 'Registration Confirmed',
        text: `You have successfully registered for ${event.title}.`,
        time: 'Just now',
        read: false
      },
      ...prev
    ]);

    addToast(`Registration Confirmed for "${event.title}"!`, 'success');
  };

  // Attendance Check-In (Core Demo Workflow Action)
  const checkInAttendance = (eventId) => {
    const event = events.find((e) => e.id === eventId);
    if (!event) return;

    // Check if already checked in
    const existingAtt = attendance.find((a) => a.eventId === eventId && a.volunteerId === volunteer.id);
    if (existingAtt && existingAtt.status === 'PRESENT') {
      addToast(`Attendance already marked PRESENT for ${event.title}`, 'info');
      return;
    }

    // Ensure registration exists
    let updatedRegs = registrations;
    const existingReg = registrations.find((r) => r.eventId === eventId && r.volunteerId === volunteer.id);
    if (!existingReg) {
      const newReg = {
        id: `REG-${Date.now()}`,
        eventId,
        volunteerId: volunteer.id,
        status: 'CHECKED_IN',
        registeredAt: new Date().toISOString().split('T')[0]
      };
      updatedRegs = [newReg, ...registrations];
      setRegistrations(updatedRegs);
    } else {
      setRegistrations((prev) =>
        prev.map((r) => (r.eventId === eventId && r.volunteerId === volunteer.id ? { ...r, status: 'CHECKED_IN' } : r))
      );
    }

    // Add Attendance Record
    const newAtt = {
      id: `ATT-${Date.now()}`,
      eventId,
      volunteerId: volunteer.id,
      status: 'PRESENT',
      checkInTime: '08:14 AM',
      hours: event.hours
    };
    setAttendance((prev) => [newAtt, ...prev]);

    // Update Volunteer Stats (42 -> 46 hours, 8 -> 9 events, 7 -> 8 activities, rank #12 -> #10)
    const addedHours = event.hours;
    const newTotalHours = volunteer.stats.hours + addedHours;
    const newEventsCount = volunteer.stats.eventsParticipated + 1;
    const newActivitiesCount = volunteer.stats.activitiesCompleted + 1;
    const newCertCount = volunteer.stats.certificatesCount + 1;

    setVolunteer((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        hours: newTotalHours,
        eventsParticipated: newEventsCount,
        activitiesCompleted: newActivitiesCount,
        certificatesCount: newCertCount,
        rank: 10,
        impactScore: prev.stats.impactScore + addedHours * 25
      }
    }));

    // Update Officer Roster view for Sudheer K
    setRoster((prev) =>
      prev.map((vol) =>
        vol.id === volunteer.id
          ? { ...vol, hours: newTotalHours, events: newEventsCount }
          : vol
      )
    );

    // Add Activity Entry
    const newAct = {
      id: `ACT-${Date.now()}`,
      eventId: event.id,
      title: event.title,
      category: event.category,
      date: '18 September 2026',
      hours: event.hours,
      status: 'COMPLETED'
    };
    setActivities((prev) => [newAct, ...prev]);

    // Update Achievements
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.id === 'ACH-03') { // 50 Hours milestone
          const curr = newTotalHours;
          const prog = Math.min(100, Math.round((curr / ach.target) * 100));
          return { ...ach, current: curr, progress: prog, unlocked: curr >= ach.target };
        }
        if (ach.id === 'ACH-05') { // 10 Events milestone
          const curr = newEventsCount;
          const prog = Math.min(100, Math.round((curr / ach.target) * 100));
          return { ...ach, current: curr, progress: prog, unlocked: curr >= ach.target };
        }
        return ach;
      })
    );

    // Issue Certificate
    const certId = 'CERT-NSS-2026-00421';
    const existingCert = certificates.find((c) => c.id === certId || (c.eventTitle === event.title && c.nssId === volunteer.id));
    if (!existingCert) {
      const newCert = {
        id: certId,
        title: `Certificate of ${event.category} Service`,
        eventTitle: event.title,
        category: event.category,
        issueDate: '18 September 2026',
        hours: event.hours,
        status: 'VERIFIED',
        recipient: volunteer.name,
        nssId: volunteer.id
      };
      setCertificates((prev) => [newCert, ...prev]);
    }

    // Update Overall Impact Analytics Stats
    setImpactStats((prev) => ({
      ...prev,
      volunteerHours: prev.volunteerHours + addedHours,
      completedActivities: prev.completedActivities + 1
    }));

    // Trigger Confetti Celebration
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Confetti fallback
    }

    // Toast & Notification
    setNotifications((prev) => [
      {
        id: Date.now(),
        title: 'Attendance Marked Present',
        text: `Attendance recorded at 08:14 AM for ${event.title}. +${event.hours} Volunteer Hours credited!`,
        time: 'Just now',
        read: false
      },
      {
        id: Date.now() + 1,
        title: 'Certificate Issued',
        text: `New Certificate CERT-NSS-2026-00421 is now available for download.`,
        time: 'Just now',
        read: false
      },
      ...prev
    ]);

    addToast(`✓ Attendance Marked PRESENT! +${event.hours} Hours Credited. Certificate Issued!`, 'success');
  };

  // Officer Mark Attendance
  const markOfficerAttendance = (eventId, volunteerId, status) => {
    setAttendance((prev) => {
      const existingIndex = prev.findIndex((a) => a.eventId === eventId && a.volunteerId === volunteerId);
      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex] = { ...copy[existingIndex], status };
        return copy;
      } else {
        return [
          {
            id: `ATT-${Date.now()}`,
            eventId,
            volunteerId,
            status,
            checkInTime: '08:15 AM',
            hours: events.find((e) => e.id === eventId)?.hours || 4
          },
          ...prev
        ];
      }
    });

    addToast(`Updated attendance status to ${status}`, 'success');
  };

  // Create Event (Officer)
  const createEvent = (eventData) => {
    const newEvt = {
      id: `EVT-${Date.now()}`,
      title: eventData.title,
      category: eventData.category || 'Community Service',
      date: eventData.date || 'Upcoming Date',
      time: eventData.time || '09:00 AM - 01:00 PM',
      venue: eventData.venue || 'University Main Campus',
      organizer: eventData.organizer || 'NSS Officer Cell',
      description: eventData.description || 'NSS Community Service Drive',
      capacity: parseInt(eventData.capacity || 50, 10),
      registeredCount: 0,
      hours: parseInt(eventData.hours || 4, 10),
      status: 'UPCOMING',
      requirements: eventData.requirements ? eventData.requirements.split(',') : ['NSS Volunteer Badge'],
      tags: [eventData.category || 'Service']
    };

    setEvents((prev) => [newEvt, ...prev]);

    // Update Impact Stats total activities
    setImpactStats((prev) => ({
      ...prev,
      totalActivities: prev.totalActivities + 1
    }));

    addToast(`Event "${newEvt.title}" published successfully to catalog!`, 'success');
  };

  // Publish Announcement (Officer)
  const publishAnnouncement = (annData) => {
    const newAnn = {
      id: `ANN-${Date.now()}`,
      title: annData.title,
      message: annData.message,
      priority: annData.priority || 'NORMAL',
      date: '18 September 2026',
      author: annData.author || 'NSS Officer Command',
      category: annData.category || 'General Notice'
    };

    setAnnouncements((prev) => [newAnn, ...prev]);
    addToast('New announcement broadcasted to all volunteers!', 'success');
  };

  // Verify Certificate Lookup
  const verifyCertificate = (certId) => {
    if (!certId) return null;
    const cleaned = certId.trim().toUpperCase();
    return certificates.find((c) => c.id.toUpperCase() === cleaned) || null;
  };

  // Reset Demo Data
  const resetDemoData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}

    setRole('VOLUNTEER');
    setVolunteer(INITIAL_VOLUNTEER);
    setEvents(INITIAL_EVENTS);
    setRegistrations(INITIAL_REGISTRATIONS);
    setAttendance(INITIAL_ATTENDANCE);
    setActivities(INITIAL_ACTIVITIES);
    setCertificates(INITIAL_CERTIFICATES);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setRoster(INITIAL_ROSTER);
    setImpactStats(INITIAL_IMPACT_STATS);
    setActiveTab('dashboard');

    addToast('Demo state successfully reset to original seed data!', 'info');
  };

  return (
    <NSSContext.Provider
      value={{
        role,
        switchRole,
        volunteer,
        events,
        registrations,
        attendance,
        activities,
        certificates,
        achievements,
        announcements,
        roster,
        impactStats,
        activeTab,
        setActiveTab,
        toasts,
        addToast,
        removeToast,
        notifications,
        setNotifications,
        registerForEvent,
        checkInAttendance,
        markOfficerAttendance,
        createEvent,
        publishAnnouncement,
        verifyCertificate,
        resetDemoData
      }}
    >
      {children}
    </NSSContext.Provider>
  );
};

export const useNSS = () => {
  const context = useContext(NSSContext);
  if (!context) {
    throw new Error('useNSS must be used within an NSSProvider');
  }
  return context;
};
