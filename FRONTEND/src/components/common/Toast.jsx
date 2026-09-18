import React from 'react';
import { useNSS } from '../../context/NSSContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useNSS();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let colorClass = 'border-emerald-500/50';
        let iconColor = '#10b981';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          colorClass = 'border-rose-500/50';
          iconColor = '#ef4444';
        } else if (toast.type === 'info') {
          Icon = Info;
          colorClass = 'border-blue-500/50';
          iconColor = '#3b82f6';
        }

        return (
          <div key={toast.id} className={`toast ${colorClass}`}>
            <Icon size={20} color={iconColor} style={{ flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: '0.88rem' }}>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-sub)',
                cursor: 'pointer',
                padding: '2px'
              }}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
