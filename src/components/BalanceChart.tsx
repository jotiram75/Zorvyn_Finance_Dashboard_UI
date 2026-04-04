import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFinance } from '../context/FinanceContext';

const BalanceChart: React.FC = () => {
  const { transactions } = useFinance();

  // Simple data transformation for the chart: daily balance trend
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime());
  
  let currentBalance = 0;
  const chartData = sortedTransactions.map(t => {
    currentBalance += (t.type === 'income' ? t.amount : -t.amount);
    return {
      date: t.date,
      balance: currentBalance,
    };
  });

  return (
    <div className="glass-card chart-container animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="chart-header">
        <h3 className="chart-title">Balance Trend</h3>
        <p className="chart-subtitle">Daily overview of your wealth</p>
      </div>
      
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="var(--text-muted)" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(str) => {
                const date = new Date(str);
                return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
              }}
            />
            <YAxis 
              stroke="var(--text-muted)" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(val) => `$${val}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--bg-sidebar)', 
                borderColor: 'var(--border-color)',
                borderRadius: '8px',
                color: '#fff'
              }}
              itemStyle={{ color: 'var(--accent-primary)' }}
            />
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke="var(--accent-primary)" 
              fillOpacity={1} 
              fill="url(#colorBalance)" 
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <style>{`
        .chart-container {
          grid-column: span 2;
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

        @media (max-width: 1024px) {
          .chart-container {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  );
};

export default BalanceChart;
