import React from 'react';
import { Target, TrendingUp, Zap } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const Insights: React.FC = () => {
  const { transactions } = useFinance();

  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  
  // 1. Highest Spending Category Logic
  const categoriesMap = expenseTransactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const highestCategory = Object.entries(categoriesMap)
    .sort(([, a], [, b]) => b - a)[0] || ['None', 0];

  // 2. Monthly Comparison Logic (Simple)
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const thisMonthTotal = expenseTransactions
    .filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((acc, t) => acc + t.amount, 0);

  const lastMonthTotal = expenseTransactions
    .filter(t => {
      const d = new Date(t.date);
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return d.getMonth() === lastMonth && d.getFullYear() === lastYear;
    })
    .reduce((acc, t) => acc + t.amount, 0);

  const percentChange = lastMonthTotal > 0 
    ? ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100 
    : 0;

  const insights = [
    {
      title: 'Top Spending Category',
      description: highestCategory[0] !== 'None' 
        ? `Your highest expense is ${highestCategory[0]}.` 
        : 'Connect more data to see patterns.',
      value: highestCategory[0] !== 'None' ? `$${(highestCategory[1] as number).toLocaleString()}` : '$0',
      icon: Target,
      color: 'var(--accent-danger)',
      tip: 'Try setting a limit for this category next month.'
    },
    {
      title: 'Monthly Comparison',
      description: percentChange > 0 
        ? `Spending increased by ${percentChange.toFixed(0)}% from last month.`
        : percentChange < 0 
          ? `Great! You spent ${Math.abs(percentChange).toFixed(0)}% less than last month.`
          : 'Spending is consistent with the previous period.',
      value: percentChange >= 0 ? `+${percentChange.toFixed(0)}%` : `${percentChange.toFixed(0)}%`,
      icon: Zap,
      color: percentChange > 0 ? 'var(--accent-warning)' : 'var(--accent-success)',
      tip: percentChange > 0 ? 'Review your recent large purchases.' : 'Keep up the good saving habits!'
    },
    {
      title: 'Savings Observation',
      description: 'You have a healthy income-to-expense ratio this month.',
      value: 'Stable',
      icon: TrendingUp,
      color: 'var(--accent-info)',
      tip: 'Consider moving surplus to your savings account.'
    }
  ];

  if (transactions.length === 0) {
    return (
      <div className="insights-view animate-fade-in">
        <div className="insights-header">
          <h2 className="view-title">Financial Insights</h2>
          <p className="view-subtitle">Observations based on your spending patterns</p>
        </div>
        <div className="glass-card empty-insights" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border-color)' }}>
          <p>Not enough data to generate insights yet. Add some transactions to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="insights-view animate-fade-in">
      <div className="insights-header">
        <h2 className="view-title">Financial Insights</h2>
        <p className="view-subtitle">Data-driven observations of your spending habits</p>
      </div>

      <div className="insights-grid">
        {insights.map((insight, i) => (
          <div key={i} className="glass-card insight-card">
            <div className="insight-top">
              <div className="insight-icon" style={{ background: `${insight.color}20`, color: insight.color }}>
                <insight.icon size={24} />
              </div>
              <div className="insight-meta">
                <h4>{insight.title}</h4>
                <p>{insight.value}</p>
              </div>
            </div>
            <div className="insight-body">
              <p className="main-desc">{insight.description}</p>
              <div className="insight-tip">
                <span>{insight.tip}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .insights-view {
          padding-bottom: 2rem;
        }

        .insights-header {
          margin-bottom: 2rem;
        }

        .view-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .view-subtitle {
          color: var(--text-muted);
        }

        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .insight-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          border: 1px solid var(--border-color);
        }

        .insight-top {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .insight-icon {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .insight-meta h4 {
          font-size: 1rem;
          font-weight: 600;
        }

        .insight-meta p {
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
        }

        .main-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 1rem;
        }

        .insight-tip {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          padding: 1rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          color: var(--text-muted);
          border: 1px solid var(--border-glass);
        }

        .insight-tip span {
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
};

export default Insights;
