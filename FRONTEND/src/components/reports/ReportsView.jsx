import React from 'react';
import { useNSS } from '../../context/NSSContext';
import { FileText, Download, Eye, Sparkles, CheckCircle2 } from 'lucide-react';

export const ReportsView = () => {
  const { addToast, roster, events, certificates } = useNSS();

  const reportsList = [
    {
      id: 'REP-01',
      title: 'Volunteer Participation Summary',
      type: 'Participant Audit',
      description: 'Detailed roster export containing volunteer IDs, department breakdowns, total accredited service hours, and participation counts.',
      getData: () => roster.map(r => `${r.id},"${r.name}","${r.dept}",${r.year},${r.hours},${r.events},"${r.attendance}",${r.status}`).join('\n')
    },
    {
      id: 'REP-02',
      title: 'Attendance Accreditation Log',
      type: 'Field Verification',
      description: 'Individual activity check-in records with timestamps, officer verification status, and accredited hour allocations.',
      getData: () => `ATT_ID,VOLUNTEER_ID,NAME,EVENT,CHECKIN_TIME,HOURS,STATUS\nATT-01,NSS-2026-0142,"Sudheer K","Beach Clean-Up Drive","08:14 AM",4,PRESENT\nATT-02,NSS-2026-0104,"Ananya Sharma","Beach Clean-Up Drive","08:10 AM",4,PRESENT`
    },
    {
      id: 'REP-03',
      title: 'Event Performance & Capacity Report',
      type: 'Event Analytics',
      description: 'Comparative study of registered capacity vs actual attendance across all environmental, health, and literacy drives.',
      getData: () => events.map(e => `"${e.id}","${e.title}","${e.category}","${e.date}",${e.registeredCount},${e.capacity},${e.hours},"${e.status}"`).join('\n')
    },
    {
      id: 'REP-04',
      title: 'NSS e-Certificates Issued Ledger',
      type: 'Registry Audit',
      description: 'Official hash ledger of all e-certificates generated, recipient credentials, and verification keys.',
      getData: () => certificates.map(c => `"${c.id}","${c.recipient}","${c.nssId}","${c.title}","${c.eventTitle}","${c.issueDate}",${c.hours},"${c.status}"`).join('\n')
    }
  ];

  const exportCSV = (report) => {
    try {
      const header = report.id === 'REP-01' ? 'NSS_ID,NAME,DEPT,YEAR,HOURS,EVENTS,ATTENDANCE_RATE,STATUS\n' : 'ID,FIELD_1,FIELD_2,FIELD_3,FIELD_4,FIELD_5,FIELD_6,FIELD_7\n';
      const content = header + report.getData();
      const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${report.title.replaceAll(' ', '_')}_2026.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      addToast(`CSV Export Complete: "${report.title}.csv" downloaded successfully!`, 'success');
    } catch (e) {
      addToast('Export failed. Please try again.', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h1 className="page-title">Reports & Data Export Center</h1>
        <p className="page-sub">Generate, preview, and download official CSV administrative statements and audit logs.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {reportsList.map((rep) => (
          <div key={rep.id} className="nss-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge badge-blue">{rep.type}</span>
                <span className="badge badge-gold">CSV ACCESSIBLE</span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
                {rep.title}
              </h3>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                {rep.description}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-glass)' }}>
              <button
                className="btn btn-outline"
                style={{ flex: 1, fontSize: '0.8rem' }}
                onClick={() => addToast(`Previewing report ${rep.id} on screen.`, 'info')}
              >
                <Eye size={14} /> View Report
              </button>
              <button
                className="btn btn-gold"
                style={{ flex: 1.2, fontSize: '0.8rem' }}
                onClick={() => exportCSV(rep)}
              >
                <Download size={14} /> Export CSV
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
