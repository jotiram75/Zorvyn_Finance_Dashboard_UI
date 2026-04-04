import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const SummaryCards: React.FC = () => {
  const { transactions } = useFinance();

  const totalBalance = transactions.reduce((acc, curr) => 
    curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0);
  
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const cards = [
    { 
      label: 'Total Balance', 
      value: totalBalance, 
      icon: Wallet, 
      trend: '+12.5%', 
      trendUp: true, 
      color: 'var(--accent-primary)' 
    },
    { 
      label: 'Monthly Income', 
      value: totalIncome, 
      icon: ArrowUpRight, 
      trend: '+8.2%', 
      trendUp: true, 
      color: 'var(--accent-success)' 
    },
    { 
      label: 'Monthly Expenses', 
      value: totalExpenses, 
      icon: ArrowDownRight, 
      trend: '+5.4%', 
      trendUp: false, 
      color: 'var(--accent-danger)' 
    },
  ];

  return (
    <div className="summary-grid">
      {cards.map((card, i) => (
        <div key={i} className="glass-card summary-card animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="card-header">
            <div className="icon-badge" style={{ background: `${card.color}20`, color: card.color }}>
              <card.icon size={24} />
            </div>
            <div className={`trend-badge ${card.trendUp ? 'up' : 'down'}`}>
              {card.trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{card.trend}</span>
            </div>
          </div>
          <div className="card-body">
            <p className="card-label">{card.label}</p>
            <h3 className="card-value">${card.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
          </div>
        </div>
      ))}

      <style>{`
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .summary-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .icon-badge {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .trend-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .trend-badge.up {
          background: rgba(16, 185, 129, 0.1);
          color: var(--accent-success);
        }

        .trend-badge.down {
          background: rgba(239, 68, 68, 0.1);
          color: var(--accent-danger);
        }

        .card-label {
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .card-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default SummaryCards;
