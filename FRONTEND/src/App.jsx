import React from 'react';
import { NSSProvider, useNSS } from './context/NSSContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { VolunteerDashboard } from './components/volunteer/VolunteerDashboard';
import { EventCatalog } from './components/events/EventCatalog';
import { AttendanceView } from './components/attendance/AttendanceView';
import { AchievementsView } from './components/achievements/AchievementsView';
import { CertificateView } from './components/certificates/CertificateView';
import { DigitalIdView } from './components/id/DigitalIdView';
import { AnnouncementsView } from './components/announcements/AnnouncementsView';
import { OfficerDashboard } from './components/officer/OfficerDashboard';
import { VolunteerManagementView } from './components/volunteer/VolunteerManagementView';
import { OfficerAttendanceView } from './components/officer/OfficerAttendanceView';
import { ImpactAnalyticsView } from './components/analytics/ImpactAnalyticsView';
import { ReportsView } from './components/reports/ReportsView';
import { ToastContainer } from './components/common/Toast';
import './App.css';

const MainAppContent = () => {
  const { activeTab, role } = useNSS();

  const renderCurrentView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <VolunteerDashboard />;
      case 'events':
        return <EventCatalog />;
      case 'attendance':
        return <AttendanceView />;
      case 'achievements':
        return <AchievementsView />;
      case 'certificates':
        return <CertificateView />;
      case 'digital-id':
        return <DigitalIdView />;
      case 'announcements':
        return <AnnouncementsView />;
      case 'officer-dashboard':
        return <OfficerDashboard />;
      case 'volunteers':
        return <VolunteerManagementView />;
      case 'officer-attendance':
        return <OfficerAttendanceView />;
      case 'analytics':
        return <ImpactAnalyticsView />;
      case 'reports':
        return <ReportsView />;
      default:
        return role === 'VOLUNTEER' ? <VolunteerDashboard /> : <OfficerDashboard />;
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <main className="content-area">
          {renderCurrentView()}
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <NSSProvider>
      <MainAppContent />
    </NSSProvider>
  );
}
