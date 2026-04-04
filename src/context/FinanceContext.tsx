import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Transaction, TransactionType, Role, FinanceContextType } from '../types';

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2024-03-28', amount: 2500, category: 'Salary', description: 'Monthly Salary', type: 'income' },
  { id: '2', date: '2024-03-27', amount: 85.50, category: 'Food', description: 'Grocery Shopping', type: 'expense' },
  { id: '3', date: '2024-03-26', amount: 45.00, category: 'Entertainment', description: 'Movie Night', type: 'expense' },
  { id: '4', date: '2024-03-25', amount: 1200.00, category: 'Rent', description: 'Monthly Rent', type: 'expense' },
  { id: '5', date: '2024-03-24', amount: 350.00, category: 'Investment', description: 'Stock Dividend', type: 'income' },
  { id: '6', date: '2024-03-23', amount: 62.00, category: 'Transport', description: 'Gas Refill', type: 'expense' },
  { id: '7', date: '2024-03-22', amount: 120.00, category: 'Utilities', description: 'Electricity Bill', type: 'expense' },
  { id: '8', date: '2024-03-21', amount: 15.00, category: 'Food', description: 'Coffee', type: 'expense' },
  { id: '9', date: '2024-03-20', amount: 200.00, category: 'Shopping', description: 'New Running Shoes', type: 'expense' },
  { id: '10', date: '2024-03-19', amount: 50.00, category: 'Transport', description: 'Public Transit Pass', type: 'expense' },
];

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('finance_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [role, setRole] = useState<Role>('admin'); // Default to admin for assignment demonstration
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState<TransactionType | 'all'>('all');

  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    if (role !== 'admin') return;
    const newTransaction = { ...t, id: Date.now().toString() };
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (id: string) => {
    if (role !== 'admin') return;
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const updateTransaction = (t: Transaction) => {
    if (role !== 'admin') return;
    setTransactions(transactions.map((item) => (item.id === t.id ? t : item)));
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        role,
        searchQuery,
        categoryFilter,
        typeFilter,
        setRole,
        setSearchQuery,
        setCategoryFilter,
        setTypeFilter,
        addTransaction,
        deleteTransaction,
        updateTransaction,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
