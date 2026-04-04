import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const TopBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useFinance();

  return (
    <header className="topbar">
      <div className="search-wrapper">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search transactions, categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="topbar-actions">
        <button className="action-btn">
          <Bell size={20} />
          <div className="notification-dot"></div>
        </button>
        <div className="user-profile">
          <div className="user-info">
            <p className="user-name">Alex Smith</p>
            <p className="user-role">Finance Lead</p>
          </div>
          <div className="user-avatar">
            <User size={20} />
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
        }

        .search-wrapper {
          position: relative;
          width: 400px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-wrapper input {
          width: 100%;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 0.75rem 1rem 0.75rem 3rem;
          border-radius: var(--radius-md);
          color: #fff;
          font-size: 0.9rem;
          outline: none;
          transition: var(--transition-fast);
        }

        .search-wrapper input:focus {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
          background: rgba(23, 23, 26, 0.9);
        }

        .topbar-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .action-btn {
          background: var(--bg-card);
          color: var(--text-secondary);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          position: relative;
        }

        .notification-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background: var(--accent-danger);
          border-radius: 50%;
          border: 2px solid var(--bg-sidebar);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-md);
          cursor: pointer;
        }

        .user-info {
          text-align: right;
        }

        .user-name {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .user-role {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          background: var(--accent-primary);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }

        @media (max-width: 600px) {
          .search-wrapper { width: 200px; }
          .user-name { display: none; }
        }
      `}</style>
    </header>
  );
};

export default TopBar;
