import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  ReceiptText, 
  PieChart, 
  Settings, 
  Moon, 
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const Sidebar: React.FC<{ activeView: string; setActiveView: (view: string) => void }> = ({ activeView, setActiveView }) => {
  const { theme, toggleTheme, role, setRole } = useFinance();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ReceiptText },
    { id: 'insights', label: 'Insights', icon: PieChart },
    { id: 'wallet', label: 'My Wallet', icon: Wallet },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand" onClick={() => setActiveView('dashboard')} style={{ cursor: 'pointer' }}>
        <div className="brand-logo">
          <div className="logo-icon"></div>
        </div>
        <h2 className="brand-name">Zorvyn</h2>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => setActiveView(item.id)}
          >
            <div className="nav-icon-box">
              <item.icon size={18} />
            </div>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="role-switcher-mini">
           <div 
             className={`role-badge-mini ${role === 'admin' ? 'admin' : 'viewer'}`}
             onClick={() => setRole(role === 'admin' ? 'viewer' : 'admin')}
             title="Toggle Role"
           >
             {role === 'admin' ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
             <span>{role.toUpperCase()}</span>
           </div>
        </div>

        <div className="theme-toggle-row">
          <div className="theme-label">
            <Moon size={18} className="text-secondary" />
            <span>Night Mood</span>
          </div>
          <button 
            className={`toggle-switch ${theme === 'dark' ? 'active' : ''}`} 
            onClick={toggleTheme}
          >
            <div className="switch-handle" />
          </button>
        </div>
      </div>

      <style>{`
        .sidebar {
          width: 250px;
          background: var(--bg-sidebar);
          height: 100vh;
          padding: 2rem 1.25rem;
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--border-color);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
          padding-left: 0.5rem;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, var(--accent-primary), #ec4899);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-icon::after {
          content: 'Z';
          font-weight: 800;
          font-size: 14px;
          color: white;
        }

        .brand-name {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.8rem 1rem;
          border-radius: 12px;
          color: var(--text-secondary);
          background: transparent;
          text-align: left;
          font-weight: 500;
          font-size: 0.95rem;
          transition: var(--transition-fast);
        }

        .nav-item:hover {
          background: rgba(45, 96, 255, 0.05);
          color: var(--text-primary);
        }

        .nav-item.active {
          background: linear-gradient(to right, rgba(45, 96, 255, 0.2), transparent);
          color: var(--accent-primary);
          border-left: 3px solid var(--accent-primary);
          border-radius: 0 12px 12px 0;
          padding-left: 0.8rem;
        }

        .nav-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .role-switcher-mini {
          padding: 0 0.5rem;
        }

        .role-badge-mini {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.75rem;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          width: fit-content;
        }

        .role-badge-mini.admin { background: rgba(16, 185, 129, 0.15); color: #10b981; }
        .role-badge-mini.viewer { background: rgba(45, 96, 255, 0.15); color: #2d60ff; }

        .theme-toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0.5rem;
        }

        .theme-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .toggle-switch {
          width: 44px;
          height: 22px;
          background: #232a34;
          border-radius: 11px;
          position: relative;
          cursor: pointer;
          padding: 3px;
          transition: background 0.3s;
        }

        .toggle-switch.active {
          background: var(--accent-primary);
        }

        .switch-handle {
          width: 16px;
          height: 16px;
          background: #fff;
          border-radius: 50%;
          transition: transform 0.3s;
        }

        .toggle-switch.active .switch-handle {
          transform: translateX(22px);
        }

        @media (max-width: 1024px) {
          .sidebar { width: 80px; padding: 2rem 0.5rem; }
          .brand-name, .nav-item span, .theme-label span, .theme-toggle-row, .role-switcher-mini { display: none; }
          .sidebar-brand { justify-content: center; padding: 0.5rem; }
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            height: 70px;
            flex-direction: row;
            bottom: 0;
            top: auto;
            position: fixed;
            padding: 0 1.5rem;
            border-right: none;
            border-top: 1px solid var(--border-color);
            justify-content: space-around;
            background: rgba(11, 14, 18, 0.95);
            backdrop-filter: blur(10px);
            z-index: 1000;
          }

          .sidebar-brand, .sidebar-footer {
            display: none;
          }

          .sidebar-nav {
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            gap: 0;
            align-items: center;
          }

          .nav-item {
            flex-direction: column;
            padding: 0.5rem;
            gap: 0.25rem;
            border-left: none !important;
            border-top: 3px solid transparent;
            border-radius: 0;
            background: transparent !important;
          }

          .nav-item.active {
            border-top: 3px solid var(--accent-primary);
            color: var(--accent-primary);
          }

          .nav-item span {
            display: none;
          }

          .nav-icon-box {
            width: 24px;
          }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
