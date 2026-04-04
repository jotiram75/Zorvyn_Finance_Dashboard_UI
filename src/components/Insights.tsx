import React from 'react';
import { Target, TrendingUp, Lightbulb, Zap } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const Insights: React.FC = () => {
  const { transactions } = useFinance();



  const categoriesMap = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const highestCategory = Object.entries(categoriesMap)
    .sort(([, a], [, b]) => b - a)[0] || ['None', 0];

  const insights = [
    {
      title: 'Highest Spending',
      description: `You've spent the most on ${highestCategory[0]} this month.`,
      value: `$${highestCategory[1].toLocaleString()}`,
      icon: Target,
      color: 'var(--accent-danger)',
      improvement: 'Consider setting a budget for this category.'
    },
    {
      title: 'Savings Potential',
      description: 'Based on your income, you could save 15% more by reducing "Other" expenses.',
      value: '+$450.00',
      icon: Zap,
      color: 'var(--accent-warning)',
      improvement: 'Try the 50/30/20 rule for better balance.'
    },
    {
      title: 'Transaction Peak',
      description: 'Most of your spending happens on weekends (42% of total).',
      value: 'Weekend Peak',
      icon: TrendingUp,
      color: 'var(--accent-info)',
      improvement: 'Planning weekend activities in advance can save up to 10%.'
    }
  ];

  return (
    <div className="insights-view animate-fade-in">
      <div className="insights-header">
        <h2 className="view-title">Financial Insights</h2>
        <p className="view-subtitle">AI-powered analysis of your spending habits</p>
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
                <Lightbulb size={16} />
                <span>{insight.improvement}</span>
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
