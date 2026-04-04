import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { ArrowRight } from 'lucide-react';

const data = [
  { name: 'Jan', value: 1800, secondary: 2200 },
  { name: 'Feb', value: 2800, secondary: 3000 },
  { name: 'Mar', value: 4200, secondary: 4500 },
  { name: 'Apr', value: 2400, secondary: 3200 },
  { name: 'May', value: 1500, secondary: 2000 },
  { name: 'Jun', value: 3800, secondary: 4000 },
  { name: 'Jul', value: 2200, secondary: 3400 },
  { name: 'Aug', value: 4000, secondary: 4200 },
  { name: 'Sep', value: 2800, secondary: 3600 },
];

const CashflowChart: React.FC = () => {
  return (
    <div className="cashflow-card glass-card">
      <div className="card-header-row">
        <h3>Cashflow</h3>
        <div className="card-date-tag">
          <span>2025</span>
          <ArrowRight size={14} className="rotate-90" />
        </div>
      </div>
      
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }} 
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.03)' }}
              contentStyle={{ 
                backgroundColor: '#151921', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px'
              }}
            />
            <Bar dataKey="secondary" fill="rgba(255,255,255,0.05)" radius={[6, 6, 0, 0]} barSize={20} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={20}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'var(--accent-primary)' : '#4d7cfe'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <style>{`
        .cashflow-card {
          padding: 1.5rem;
          background: var(--bg-card);
        }

        .card-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-date-tag {
          background: rgba(255, 255, 255, 0.05);
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
        }

        .chart-wrapper {
          margin-top: 1.5rem;
        }

        .rotate-90 { transform: rotate(90deg); }
      `}</style>
    </div>
  );
};

export default CashflowChart;
