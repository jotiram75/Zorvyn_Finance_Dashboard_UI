import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Trash2, Edit2, Plus } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import type { Transaction } from '../types';

interface TransactionListProps {
  onAddClick: () => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ onAddClick }) => {
  const { 
    transactions, 
    role, 
    searchQuery, 
    deleteTransaction, 
    typeFilter, 
    setTypeFilter 
  } = useFinance();

  const [sortField, setSortField] = useState<keyof Transaction>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredTransactions = transactions
    .filter(t => 
      (t.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
       t.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (typeFilter === 'all' || t.type === typeFilter)
    )
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        const res = aVal.localeCompare(bVal);
        return sortOrder === 'asc' ? res : -res;
      }
      const res = (aVal as number) - (bVal as number);
      return sortOrder === 'asc' ? res : -res;
    });

  const handleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="glass-card transactions-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="transactions-header">
        <h3 className="section-title">Recent Transactions</h3>
        
        <div className="filter-controls">
          <div className="type-filters">
            {['all', 'income', 'expense'].map((t) => (
              <button
                key={t}
                className={`filter-btn ${typeFilter === t ? 'active' : ''}`}
                onClick={() => setTypeFilter(t as any)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          
          {role === 'admin' && (
            <button className="add-btn" onClick={onAddClick}>
              <Plus size={18} />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>

      <div className="table-responsive">
        <table className="transactions-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('date')}>Date {sortField === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('description')}>Description {sortField === 'description' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('category')}>Category {sortField === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('amount')}>Amount {sortField === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              {role === 'admin' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty-state">
                  No transactions found.
                </td>
              </tr>
            ) : (
              filteredTransactions.map((t) => (
                <tr key={t.id}>
                  <td className="date-cell">{t.date}</td>
                  <td className="desc-cell">
                    <div className="type-icon" style={{ 
                      color: t.type === 'income' ? 'var(--accent-success)' : 'var(--accent-danger)' 
                    }}>
                      {t.type === 'income' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    </div>
                    {t.description}
                  </td>
                  <td className="category-cell">
                    <span className="category-tag">{t.category}</span>
                  </td>
                  <td className={`amount-cell ${t.type}`}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                  </td>
                  {role === 'admin' && (
                    <td className="actions-cell">
                      <div className="action-row">
                        <button className="icon-action-btn" title="Delete" onClick={() => deleteTransaction(t.id)}>
                          <Trash2 size={16} />
                        </button>
                        <button className="icon-action-btn" title="Edit">
                          <Edit2 size={16} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .transactions-card {
          padding: 1.5rem;
          margin-top: 2rem;
        }

        .transactions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .filter-controls {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .type-filters {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.25rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .filter-btn {
          padding: 0.4rem 1rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-muted);
          background: transparent;
        }

        .filter-btn.active {
          background: var(--bg-card);
          color: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .add-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--accent-primary);
          color: #fff;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .add-btn:hover {
          background: var(--accent-primary-hover);
        }

        .table-responsive {
          width: 100%;
          overflow-x: auto;
        }

        .transactions-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .transactions-table th {
          padding: 1rem;
          color: var(--text-muted);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--border-color);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .transactions-table th:hover {
          color: #fff;
        }

        .transactions-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--border-glass);
          font-size: 0.95rem;
        }

        .date-cell {
          color: var(--text-secondary);
        }

        .desc-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 500;
        }

        .category-tag {
          background: rgba(255, 255, 255, 0.05);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          color: var(--text-secondary);
          border: 1px solid var(--border-glass);
        }

        .amount-cell {
          font-weight: 700;
        }

        .amount-cell.income {
          color: var(--accent-success);
        }

        .amount-cell.expense {
          color: var(--accent-danger);
        }

        .empty-state {
          text-align: center;
          padding: 3rem !important;
          color: var(--text-muted);
        }

        .action-row {
          display: flex;
          gap: 0.5rem;
        }

        .icon-action-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          background: transparent;
          color: var(--text-muted);
          border: 1px solid transparent;
        }

        .icon-action-btn:hover {
          color: var(--accent-danger);
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.2);
        }
      `}</style>
    </div>
  );
};

export default TransactionList;
