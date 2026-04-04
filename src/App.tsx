import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import CashflowChart from './components/BalanceChart';
import { TransactionList, RecentActivity } from './components/TransactionList';
import { MyBalance } from './components/DashboardCards';
import SummaryCards from './components/SummaryCards';
import SpendingBreakdown from './components/SpendingBreakdown';
import Insights from './components/Insights';
import TransactionModal from './components/TransactionModal';
import { FinanceProvider } from './context/FinanceContext';

const AppContent: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<any | null>(null);

  return (
    <div className="app-container">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <main className="main-content">
        <TopBar />
        
        {activeView === 'dashboard' && (
          <div className="dashboard-grid">
            <div className="dashboard-row summary">
              <SummaryCards />
            </div>
            
            <div className="dashboard-row top">
              <MyBalance />
              <CashflowChart />
            </div>
            
            <div className="dashboard-row bottom">
               <RecentActivity />
               <SpendingBreakdown />
            </div>
          </div>
        )}

        {activeView === 'transactions' && (
          <div className="content-page">
            <TransactionList 
              onAddClick={() => setIsModalOpen(true)} 
              onEditClick={(t) => {
                setEditingTransaction(t);
                setIsModalOpen(true);
              }} 
            />
          </div>
        )}

        {activeView === 'insights' && (
          <div className="content-page">
            <Insights />
          </div>
        )}

        {activeView !== 'dashboard' && activeView !== 'transactions' && (
          <div className="coming-soon">
            <h2>{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h2>
            <p>This view is coming soon in the new Zorvyn UFinance layout.</p>
          </div>
        )}

        <TransactionModal 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            setEditingTransaction(null);
          }} 
          editingTransaction={editingTransaction}
        />
      </main>

      <style>{`
        .app-container {
          background: var(--bg-main);
          min-height: 100vh;
        }

        .dashboard-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .dashboard-row {
          display: grid;
          gap: 2rem;
        }

        .dashboard-row.summary {
          grid-template-columns: 1fr;
        }

        .dashboard-row.top {
          grid-template-columns: 400px 1fr;
        }

        .dashboard-row.bottom {
          grid-template-columns: 1fr 400px;
        }

        .content-page {
          padding-bottom: 2rem;
        }

        .coming-soon {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 60vh;
          color: var(--text-secondary);
        }

        @media (max-width: 1440px) {
          .dashboard-row.top, .dashboard-row.bottom {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .app-container {
            display: block;
          }

          .main-content {
            padding: 1.5rem 1.5rem 80px 1.5rem;
            width: 100%;
          }

          .dashboard-grid {
            gap: 1.5rem;
          }

          .dashboard-row {
            gap: 1.5rem;
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
