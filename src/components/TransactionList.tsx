import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { 
  ArrowRight, 
  MoreVertical, 
  Search, 
  Filter, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Trash2, 
  Edit2, 
  Plus 
} from 'lucide-react';

// --- DASHBOARD VERSION (COMPACT) ---
export const RecentActivity: React.FC = () => {
  const { transactions } = useFinance();

  const getBrandInfo = (category: string) => {
    switch (category.toLowerCase()) {
      case 'food': return { name: 'PayPal', icon: 'https://cdn-icons-png.flaticon.com/512/174/174861.png', color: '#003087' };
      case 'shopping': return { name: 'Wise', icon: 'https://yt3.googleusercontent.com/ytc/AIdro_n8-7_d_v_X_P_U_o_P_Q_Q_Q_Q=s900-c-k-c0x00ffffff-no-rj', color: '#00b9ff' };
      case 'entertainment': return { name: 'Atlassian', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png', color: '#0052cc' };
      default: return { name: 'PayPal', icon: 'https://cdn-icons-png.flaticon.com/512/174/174861.png', color: '#003087' };
    }
  };

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="recent-activity-card glass-card">
      <div className="card-header-row">
        <h3>Recent Activity</h3>
        <div className="card-date-tag">
          <span>2025</span>
          <ArrowRight size={14} className="rotate-90" />
        </div>
      </div>

      <div className="activity-list">
        {recentTransactions.map((t) => {
          const brand = getBrandInfo(t.category);
          return (
            <div key={t.id} className="activity-item">
              <div className="brand-icon-box" style={{ backgroundColor: brand.color + '20' }}>
                <img src={brand.icon} alt={brand.name} />
              </div>
              
              <div className="activity-info">
                <p className="brand-name-text">{brand.name}</p>
                <p className="activity-meta">**** **** **** 3454</p>
              </div>

              <div className="activity-date">
                {new Date(t.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>

              <div className={`activity-amount ${t.type === 'income' ? 'income' : 'expense'}`}>
                {t.type === 'income' ? '+' : '-'}${t.amount}
              </div>

              <button className="more-btn">
                <MoreVertical size={16} />
              </button>
            </div>
          );
        })}
      </div>

      <button className="see-all-btn">See All</button>

      <style>{`
        .recent-activity-card {
          padding: 1.5rem;
          background: var(--bg-card);
          display: flex;
          flex-direction: column;
        }

        .activity-list {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding-bottom: 0.25rem;
        }

        .brand-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 8px;
        }

        .brand-icon-box img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .activity-info {
          flex: 1;
        }

        .brand-name-text {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-primary);
          margin-bottom: 0.1rem;
        }

        .activity-meta {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .activity-date {
          font-size: 0.85rem;
          color: var(--text-secondary);
          width: 100px;
        }

        .activity-amount {
          font-weight: 700;
          font-size: 0.95rem;
          width: 80px;
          text-align: right;
        }

        .activity-amount.income { color: #10b981; }
        .activity-amount.expense { color: #fff; }

        .more-btn {
          background: transparent;
          color: var(--text-muted);
          padding: 0.5rem;
        }

        .see-all-btn {
          margin-top: 2rem;
          background: transparent;
          color: var(--accent-primary);
          font-weight: 600;
          font-size: 0.9rem;
          width: 100%;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

// --- FULL PAGE VERSION (WITH FILTERS & ACTIONS) ---
interface TransactionListProps {
  onAddClick: () => void;
  onEditClick: (transaction: any) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({ onAddClick, onEditClick }) => {
  const { 
    transactions, 
    role, 
    searchQuery, 
    setSearchQuery,
    deleteTransaction, 
    typeFilter, 
    setTypeFilter 
  } = useFinance();

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredTransactions = transactions
    .filter(t => 
      (t.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
       t.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (typeFilter === 'all' || t.type === typeFilter)
    )
    .sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
    });

  return (
    <div className="transactions-view animate-fade-in">
      <div className="view-header">
        <div>
          <h2 className="view-title">Transactions</h2>
          <p className="view-subtitle">Search and manage your financial history</p>
        </div>
        {role === 'admin' && (
          <button className="add-btn-primary" onClick={onAddClick}>
            <Plus size={18} />
            <span>Add Transaction</span>
          </button>
        )}
      </div>

      <div className="controls-row">
        <div className="search-pill">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search by description or category..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filter-pill">
          <Filter size={18} />
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as any)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <button className="sort-pill" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
           Date: {sortOrder === 'desc' ? 'Newest' : 'Oldest'}
        </button>
      </div>

      <div className="table-card glass-card">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              {role === 'admin' && <th className="text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t) => (
                <tr key={t.id}>
                  <td>
                    <div className={`status-dot ${t.type}`}>
                      {t.type === 'income' ? <ArrowUpCircle size={18} /> : <ArrowDownCircle size={18} />}
                    </div>
                  </td>
                  <td className="font-bold">{t.description}</td>
                  <td>
                    <span className="category-pill">{t.category}</span>
                  </td>
                  <td>{t.date}</td>
                  <td className={`amount-text ${t.type}`}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                  </td>
                  {role === 'admin' && (
                    <td className="text-right">
                      <div className="action-btns">
                        <button className="edit" onClick={() => onEditClick(t)}><Edit2 size={16} /></button>
                        <button className="delete" onClick={() => deleteTransaction(t.id)}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === 'admin' ? 6 : 5} className="empty-row">
                  No transactions found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .transactions-view {
          padding-bottom: 2rem;
        }

        .view-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .view-title { font-size: 1.75rem; font-weight: 700; margin-bottom: 0.25rem; }
        .view-subtitle { color: var(--text-muted); }

        .add-btn-primary {
          background: var(--accent-primary);
          color: white;
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          transition: all 0.2s;
        }

        .controls-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .search-pill, .filter-pill, .sort-pill {
          background: #111418;
          border: 1px solid var(--border-color);
          padding: 0.6rem 1rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-secondary);
        }

        .search-pill { flex: 1; min-width: 300px; }
        .search-pill input {
          background: transparent;
          border: none;
          color: var(--text-primary);
          width: 100%;
          outline: none;
          font-size: 0.9rem;
        }

        .filter-pill select {
          background: transparent;
          border: none;
          color: var(--text-primary);
          outline: none;
          font-weight: 600;
          cursor: pointer;
        }

        .table-card { 
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        
        .custom-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          min-width: 600px;
        }

        @media (max-width: 500px) {
          .custom-table {
            min-width: 450px;
          }
          .custom-table th:nth-child(3), .custom-table td:nth-child(3),
          .custom-table th:nth-child(4), .custom-table td:nth-child(4) {
            display: none;
          }
        }

        .custom-table th {
          padding: 1.25rem 1.5rem;
          color: var(--text-muted);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--border-color);
        }

        .custom-table td {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          font-size: 0.95rem;
        }

        .status-dot.income { color: #10b981; }
        .status-dot.expense { color: #f87171; }

        .category-pill {
          background: rgba(255, 255, 255, 0.05);
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .amount-text.income { color: #10b981; font-weight: 700; }
        .amount-text.expense { color: #fff; font-weight: 700; }

        .action-btns {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }

        .action-btns button {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          transition: all 0.2s;
        }

        .action-btns button.edit:hover { color: var(--accent-primary); background: rgba(99, 102, 241, 0.1); }
        .action-btns button.delete:hover { color: #f87171; background: rgba(248, 113, 113, 0.1); }

        .text-right { text-align: right; }
        .font-bold { font-weight: 700; }
        .empty-row { text-align: center; padding: 4rem !important; color: var(--text-muted); }
      `}</style>
    </div>
  );
};
