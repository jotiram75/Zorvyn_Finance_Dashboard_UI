import { CreditCard, Plus, ArrowRight, MoreHorizontal } from 'lucide-react';

export const MyBalance: React.FC = () => {
  return (
    <div className="my-balance-card glass-card">
      <div className="card-header">
        <h3>My Balance</h3>
        <div className="card-date">
          <span>Sep 25</span>
          <ArrowRight size={14} className="rotate-90" />
        </div>
      </div>
      
      <div className="card-body">
        <div className="balance-info">
          <div className="growth-tag">
            <ArrowRight size={14} className="-rotate-45" />
            <span>16.8%</span>
          </div>
          <h2 className="balance-amount">$45,090.80</h2>
          <p className="card-number">**** **** **** 3456 <CreditCard size={16} /></p>
        </div>
        
        <div className="card-actions">
          <button className="icon-btn-primary"><Plus size={20} /></button>
          <button className="icon-btn-secondary"><ArrowRight size={20} /></button>
        </div>
      </div>

      <style>{`
        .my-balance-card {
          background: linear-gradient(135deg, var(--accent-primary), #1a365d);
          color: #fff;
          padding: 2rem;
          min-height: 220px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: none;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-header h3 {
          font-size: 1.1rem;
          font-weight: 600;
          opacity: 0.9;
        }

        .card-date {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .balance-info {
          margin-top: 1.5rem;
        }

        .growth-tag {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          width: fit-content;
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin-bottom: 0.5rem;
        }

        .balance-amount {
          font-size: 2.25rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .card-number {
          font-size: 0.9rem;
          opacity: 0.6;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .card-body {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .card-actions {
          display: flex;
          gap: 1rem;
        }

        .icon-btn-primary {
          background: #fff;
          color: var(--accent-primary);
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rotate-90 { transform: rotate(90deg); }
      `}</style>
    </div>
  );
};


export const AccountGallery: React.FC = () => {
  const accounts = [
    { currency: 'USD', amount: '45,090.80', limit: '10k', status: 'Active', icon: '🇺🇸', color: '#10b981' },
    { currency: 'EUR', amount: '29,123.35', limit: '10k', status: 'Inactive', icon: '🇩🇪', color: '#fe5c73' },
    { currency: 'GBP', amount: '12,234.12', limit: '10k', status: 'Inactive', icon: '🇬🇧', color: '#fe5c73' },
    { currency: 'BDT', amount: '13,345.34', limit: '10k', status: 'Active', icon: '🇧🇩', color: '#10b981' },
  ];

  return (
    <div className="account-grid">
      {accounts.map((acc, i) => (
        <div key={i} className="account-card glass-card">
          <div className="acc-header">
            <div className="acc-tag">
              <span>{acc.icon}</span>
              <span>{acc.currency}</span>
            </div>
            <MoreHorizontal size={18} className="text-secondary" />
          </div>
          
          <div className="acc-body">
            <h3 className="acc-amount">${acc.amount}</h3>
            <p className="acc-limit">Limit is ${acc.limit} a month</p>
          </div>
          
          <div className="acc-footer" style={{ color: acc.color }}>
            {acc.status}
          </div>
        </div>
      ))}

      <style>{`
        .account-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        .account-card {
          padding: 1.25rem;
          min-height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .acc-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .acc-tag {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .acc-amount {
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .acc-limit {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .acc-footer {
          font-size: 0.85rem;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};
