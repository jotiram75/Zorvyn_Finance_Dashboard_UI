import React, { useState } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import type { TransactionType } from '../types';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose }) => {
  const { addTransaction } = useFinance();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    type: 'expense' as TransactionType,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTransaction({
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      type: formData.type,
    });
    onClose();
    setFormData({
      description: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
      type: 'expense',
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-card animate-fade-in">
        <div className="modal-header">
          <h3>Add New Transaction</h3>
          <button onClick={onClose} className="close-btn"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Description</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Netflix Subscription"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Amount ($)</label>
              <input 
                type="number" 
                step="0.01" 
                required 
                placeholder="0.00"
                value={formData.amount}
                onChange={e => setFormData({...formData, amount: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select 
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value as TransactionType})}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option value="Food">Food</option>
                <option value="Salary">Salary</option>
                <option value="Rent">Rent</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Transport">Transport</option>
                <option value="Utilities">Utilities</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input 
                type="date" 
                required
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="save-btn">
              <Save size={18} />
              <span>Save Transaction</span>
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          width: 100%;
          max-width: 500px;
          background: var(--bg-sidebar);
          border: 1px solid var(--border-color);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          padding: 0 !important;
          overflow: hidden;
        }

        .modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-form {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        label {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        input, select {
          background: #1a1a1e;
          border: 1px solid var(--border-color);
          padding: 0.75rem;
          border-radius: var(--radius-md);
          color: #fff;
          font-family: inherit;
          outline: none;
          appearance: none; /* Remove default browser styling */
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1rem;
        }

        option {
          background-color: var(--bg-sidebar);
          color: #fff;
          padding: 10px;
        }

        input:focus, select:focus {
          border-color: var(--accent-primary);
          background-color: #1f1f23;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1rem;
        }

        .cancel-btn {
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-md);
          background: transparent;
          color: var(--text-secondary);
        }

        .save-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--accent-primary);
          color: #fff;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-md);
          font-weight: 600;
        }

        .close-btn {
          background: transparent;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};

export default TransactionModal;
