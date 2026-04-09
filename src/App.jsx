import { useEffect, useRef } from 'react';
import { SearchModal } from '@fern-api/search-widget';
import '@fern-api/search-widget/styles';
import './App.css';

const plants = [
  { name: 'Monstera Deliciosa', status: 'Thriving', water: '3 days ago', light: 'Indirect', humidity: '68%', emoji: '\uD83C\uDF3F' },
  { name: 'Fiddle Leaf Fig', status: 'Needs water', water: '6 days ago', light: 'Bright', humidity: '52%', emoji: '\uD83C\uDF31' },
  { name: 'Snake Plant', status: 'Thriving', water: '12 days ago', light: 'Low', humidity: '41%', emoji: '\uD83C\uDF35' },
  { name: 'Pothos', status: 'Thriving', water: '4 days ago', light: 'Low', humidity: '55%', emoji: '\uD83C\uDF40' },
  { name: 'Bird of Paradise', status: 'New leaf!', water: '2 days ago', light: 'Bright', humidity: '63%', emoji: '\uD83C\uDF3A' },
  { name: 'Calathea Orbifolia', status: 'Crispy tips', water: '1 day ago', light: 'Indirect', humidity: '44%', emoji: '\uD83C\uDF3E' },
];

const stats = [
  { label: 'Total Plants', value: '24', sub: '+3 this month' },
  { label: 'Need Water', value: '5', sub: '2 overdue' },
  { label: 'Avg Humidity', value: '58%', sub: 'Target: 60%' },
  { label: 'New Growth', value: '12', sub: 'leaves this week' },
];

function StatusDot({ status }) {
  const color =
    status === 'Thriving' ? '#22c55e' :
    status === 'New leaf!' ? '#3b82f6' :
    '#f59e0b';
  return <span className="status-dot" style={{ background: color }} />;
}

function App() {
  const searchRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.click();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">{'\uD83C\uDF3F'} Planthaus</div>
        <nav>
          <a href="#" className="nav-item active">Dashboard</a>
          <a href="#" className="nav-item">My Plants</a>
          <a href="#" className="nav-item">Watering Schedule</a>
          <a href="#" className="nav-item">Sensors</a>
          <a href="#" className="nav-item">Plant Journal</a>
          <a href="#" className="nav-item">Settings</a>
        </nav>
        <div className="sidebar-footer">
          Free Plan &middot; 24/50 plants
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <h1>Dashboard</h1>
          <SearchModal
            ref={searchRef}
            domain="https://buildwithfern.com/learn"
            lang="en"
            className="search-trigger"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Search docs...
            <kbd>{'\u2318'}K</kbd>
          </SearchModal>
        </header>

        <div className="content">
          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="stat-card">
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="section-header">
            <h2>Recent Plants</h2>
            <button className="btn-outline">+ Add Plant</button>
          </div>

          <div className="plant-table">
            <div className="table-header">
              <span>Plant</span>
              <span>Status</span>
              <span>Last Watered</span>
              <span>Light</span>
              <span>Humidity</span>
            </div>
            {plants.map((p) => (
              <div key={p.name} className="table-row">
                <span className="plant-name">{p.emoji} {p.name}</span>
                <span className="plant-status"><StatusDot status={p.status} /> {p.status}</span>
                <span>{p.water}</span>
                <span>{p.light}</span>
                <span>{p.humidity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
