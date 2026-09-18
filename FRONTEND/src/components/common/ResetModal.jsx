import React from 'react';
import { RotateCcw, AlertTriangle, X } from 'lucide-react';
import { useNSS } from '../../context/NSSContext';

export const ResetModal = ({ isOpen, onClose }) => {
  const { resetDemoData } = useNSS();

  if (!isOpen) return null;

  const handleConfirm = () => {
    resetDemoData();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontWeight: 700 }}>
            <AlertTriangle size={22} />
            <span>Reset Demo Data</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '0.92rem', color: 'var(--text-sub)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          Are you sure you want to reset all prototype state? This will clear modified events, attendance records, generated certificates, and restore initial seed values (Volunteer Hours: 42, Events: 8, Rank: #12).
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-gold" onClick={handleConfirm}>
            <RotateCcw size={16} /> Restore Initial Seed State
          </button>
        </div>
      </div>
    </div>
  );
};
