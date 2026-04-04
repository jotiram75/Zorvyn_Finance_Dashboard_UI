import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useFinance } from '../context/FinanceContext';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899'];

const SpendingBreakdown: React.FC = () => {
  const { transactions } = useFinance();

  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const categoriesMap = expenseTransactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(categoriesMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="glass-card breakdown-container animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="chart-header">
        <h3 className="chart-title">Spending Breakdown</h3>
        <p className="chart-subtitle">Top categories by volume</p>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--bg-sidebar)', 
                borderColor: 'var(--border-color)',
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: any) => `$${Number(value).toFixed(2)}`}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <style>{`
        .breakdown-container {
          padding: 1.5rem;
        }

        .chart-header {
          margin-bottom: 2rem;
        }

        .chart-title {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .chart-subtitle {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .chart-wrapper {
          width: 100%;
          height: 300px;
        }
      `}</style>
    </div>
  );
};

export default SpendingBreakdown;
