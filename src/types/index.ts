export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  type: TransactionType;
}

export type Role = 'viewer' | 'admin';

export interface FinanceState {
  transactions: Transaction[];
  role: Role;
  searchQuery: string;
  categoryFilter: string;
  typeFilter: TransactionType | 'all';
}

export interface FinanceContextType extends FinanceState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setRole: (role: Role) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  setTypeFilter: (type: TransactionType | 'all') => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (transaction: Transaction) => void;
}
