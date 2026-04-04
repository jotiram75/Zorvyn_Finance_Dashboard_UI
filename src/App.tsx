import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import SummaryCards from './components/SummaryCards';
import BalanceChart from './components/BalanceChart';
import SpendingBreakdown from './components/SpendingBreakdown';
import TransactionList from './components/TransactionList';
import Insights from './components/Insights';
import TransactionModal from './components/TransactionModal';
import { FinanceProvider } from './context/FinanceContext';

const AppContent: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <main className="main-content">
        <TopBar />
        
        {activeView === 'dashboard' && (
          <>
            <SummaryCards />
            <div className="dashboard-charts">
              <BalanceChart />
              <SpendingBreakdown />
            </div>
            <TransactionList onAddClick={() => setIsModalOpen(true)} />
          </>
        )}

        {activeView === 'transactions' && (
          <TransactionList onAddClick={() => setIsModalOpen(true)} />
        )}

        {activeView === 'insights' && (
          <Insights />
        )}

        <TransactionModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </main>

      <style>{`
        .dashboard-charts {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        @media (max-width: 1024px) {
          .dashboard-charts {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  );
};

export default App;
