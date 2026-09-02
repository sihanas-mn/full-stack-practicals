import { useEffect } from 'react';

export default function Toast({ toasts, removeToast }) {
  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => removeToast(toasts[0].id), 3500);
    return () => clearTimeout(timer);
  }, [toasts]);

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <span>{t.type === 'success' ? '✅' : '❌'}</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}

