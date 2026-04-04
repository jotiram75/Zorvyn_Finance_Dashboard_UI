import React from 'react';
import { Search, Bell, Settings, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const TopBar: React.FC = () => {
  const { searchQuery, setSearchQuery, role, setRole } = useFinance();

  return (
    <header className="topbar">
      <div className="search-wrapper">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="search-shortcut">
            <Settings size={14} />
          </div>
        </div>
      </div>

      <div className="topbar-right">
        <div className="role-selector-box">
          <div 
            className={`role-toggle-btn ${role === 'admin' ? 'admin' : 'viewer'}`}
            onClick={() => setRole(role === 'admin' ? 'viewer' : 'admin')}
          >
            {role === 'admin' ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
            <span>{role.toUpperCase()} MODE</span>
          </div>
        </div>

        <button className="icon-btn-ghost">
          <Bell size={20} />
          <div className="notification-dot"></div>
        </button>

        <div className="user-profile-simple">
          <div className="user-avatar-small">
            <img src="https://i.pravatar.cc/150?u=alex" alt="Alex Smith" />
          </div>
          <div className="user-meta">
            <p className="user-name">Alex Williamson</p>
            <p className="user-email">muraddco@gmail.com</p>
          </div>
        </div>
      </div>

      <style>{`
        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
          margin-bottom: 2rem;
          width: 100%;
        }

        .search-wrapper {
          flex: 1;
        }

        .search-box {
          position: relative;
          width: 400px;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 1.25rem;
          color: var(--text-muted);
        }

        .search-box input {
          width: 100%;
          background: #111418;
          border: 1px solid var(--border-color);
          padding: 0.8rem 1.25rem 0.8rem 3.25rem;
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 0.9rem;
          outline: none;
        }

        .search-shortcut {
          position: absolute;
          right: 0.75rem;
          width: 28px;
          height: 28px;
          background: #fff;
          color: #000;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .role-selector-box {
          margin-right: 0.5rem;
        }

        .role-toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 1rem;
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid transparent;
        }

        .role-toggle-btn.admin {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border-color: rgba(16, 185, 129, 0.2);
        }

        .role-toggle-btn.viewer {
          background: rgba(45, 96, 255, 0.1);
          color: #2d60ff;
          border-color: rgba(45, 96, 255, 0.2);
        }

        .icon-btn-ghost {
          background: transparent;
          color: var(--text-secondary);
          position: relative;
          padding: 0.5rem;
          border-radius: 50%;
        }

        .notification-dot {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          width: 8px;
          height: 8px;
          background: var(--accent-danger);
          border-radius: 50%;
          border: 2px solid var(--bg-main);
        }

        .user-profile-simple {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
        }

        .user-avatar-small {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          overflow: hidden;
        }

        .user-avatar-small img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-meta {
          text-align: left;
        }

        .user-name {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.1rem;
        }

        .user-email {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        @media (max-width: 900px) {
          .role-toggle-btn span { display: none; }
        }

        @media (max-width: 768px) {
          .topbar {
             margin-bottom: 1rem;
             padding: 0.5rem 0;
          }

          .search-box {
             width: 44px;
             background: transparent;
             border: none;
             padding-left: 0;
          }

          .search-box input, .search-shortcut {
             display: none;
          }

          .search-icon {
             position: static;
             color: var(--text-primary);
          }

          .user-meta, .role-selector-box {
             display: none;
          }

          .topbar-right {
             gap: 1rem;
          }

          .user-avatar-small {
             width: 32px;
             height: 32px;
          }
        }
      `}</style>
    </header>
  );
};

export default TopBar;
