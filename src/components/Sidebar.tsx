import React from 'react';
import { LayoutDashboard, ReceiptText, BarChart3, Settings, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const Sidebar: React.FC<{ activeView: string; setActiveView: (view: string) => void }> = ({ activeView, setActiveView }) => {
  const { role, setRole } = useFinance();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ReceiptText },
    { id: 'insights', label: 'Insights', icon: BarChart3 },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">
          <div className="logo-icon"></div>
        </div>
        <h2 className="brand-name">FinPulse</h2>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => setActiveView(item.id)}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="role-switcher">
          <p className="role-label text-muted">CURRENT ROLE</p>
          <div 
            className={`role-badge ${role === 'admin' ? 'admin' : 'viewer'}`}
            onClick={() => setRole(role === 'admin' ? 'viewer' : 'admin')}
            title="Click to toggle role"
          >
            {role === 'admin' ? <ShieldCheck size={16} /> : <ShieldAlert size={16} />}
            <span>{role.toUpperCase()}</span>
          </div>
        </div>
        
        <div className="nav-item text-muted" style={{ marginTop: '1rem', cursor: 'pointer' }}>
          <Settings size={20} />
          <span>Settings</span>
        </div>
      </div>

      <style>{`
        .sidebar {
          width: 260px;
          background: var(--bg-sidebar);
          height: 100vh;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--border-color);
          position: sticky;
          top: 0;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 3rem;
          padding: 0 0.5rem;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, var(--accent-primary), #a78bfa);
          border-radius: 8px;
        }

        .brand-name {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(to right, #fff, #a1a1aa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          background: transparent;
          text-align: left;
          font-weight: 500;
        }

        .nav-item:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.05);
        }

        .nav-item.active {
          color: #fff;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.2);
        }

        .sidebar-footer {
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-color);
        }

        .role-switcher {
          padding: 0.5rem;
        }

        .role-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .role-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .role-badge.admin {
          background: rgba(16, 185, 129, 0.1);
          color: var(--accent-success);
        }

        .role-badge.viewer {
          background: rgba(59, 130, 246, 0.1);
          color: var(--accent-info);
        }

        .role-badge:hover {
          filter: brightness(1.2);
        }

        .text-muted {
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
