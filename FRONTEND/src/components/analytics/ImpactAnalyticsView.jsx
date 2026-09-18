import React from 'react';
import { useNSS } from '../../context/NSSContext';
import { BarChart3, TrendingUp, Users, Clock, Award, Heart, CheckCircle2, Sparkles } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { MONTHLY_HOURS_DATA, CATEGORY_DISTRIBUTION, DEPARTMENT_ENGAGEMENT } from '../../data/mockData';

export const ImpactAnalyticsView = () => {
  const { impactStats } = useNSS();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h1 className="page-title">NSS Impact Analytics & Intelligence</h1>
        <p className="page-sub">Real-time data visualization of institution-wide volunteer hours, community reach, and activity metrics.</p>
      </div>

      {/* Top Impact KPIs */}
      <div className="grid-stats">
        <div className="nss-card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)', fontWeight: 600 }}>Total Volunteers</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', margin: '0.2rem 0' }}>{impactStats.totalVolunteers}</div>
          <span className="badge badge-emerald">+12% this month</span>
        </div>

        <div className="nss-card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)', fontWeight: 600 }}>Total Service Hours</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24', margin: '0.2rem 0' }}>{impactStats.volunteerHours} hrs</div>
          <span className="badge badge-gold">Accredited Service</span>
        </div>

        <div className="nss-card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)', fontWeight: 600 }}>Completed Drives</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399', margin: '0.2rem 0' }}>{impactStats.completedActivities} / {impactStats.totalActivities}</div>
          <span className="badge badge-emerald">81.5% Completion Rate</span>
        </div>

        <div className="nss-card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)', fontWeight: 600 }}>Community Beneficiaries</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#60a5fa', margin: '0.2rem 0' }}>{impactStats.beneficiaries}</div>
          <span className="badge badge-blue">Direct Impact</span>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {/* Monthly Hours Area Chart */}
        <div className="nss-card" style={{ height: '360px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={18} color="#60a5fa" /> Monthly Accredited Service Hours
            </h3>
            <span className="badge badge-blue">2026 Trend</span>
          </div>

          <div style={{ flex: 1, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_HOURS_DATA}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
                <Area type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Donut Chart */}
        <div className="nss-card" style={{ height: '360px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} color="var(--nss-gold)" /> Service Drives by Category
            </h3>
            <span className="badge badge-gold">Distribution</span>
          </div>

          <div style={{ flex: 1, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {CATEGORY_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
                <Legend formatter={(value) => <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Department Engagement Bar Chart */}
      <div className="nss-card" style={{ height: '380px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 size={18} color="#34d399" /> Department Participation & Hours Breakdown
          </h3>
          <span className="badge badge-emerald">Academic Units</span>
        </div>

        <div style={{ flex: 1, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DEPARTMENT_ENGAGEMENT}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="dept" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
              <Legend formatter={(value) => <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{value}</span>} />
              <Bar dataKey="volunteers" name="Volunteers" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="hours" name="Total Hours" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
