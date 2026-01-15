import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const { user, apiKey, isAuthenticated } = useAuth();
  const [stats, setStats] = useState(null);
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setStats({
        totalFeedback: 1247,
        avgToxicity: 34.2,
        rejectedCount: 89,
        activeUsers: 142,
        toxicityDistribution: [
          { range: '0-20%', count: 450 },
          { range: '20-40%', count: 380 },
          { range: '40-60%', count: 220 },
          { range: '60-80%', count: 108 },
          { range: '80-100%', count: 89 }
        ],
        recentFeedback: [
          { comment: 'Mësuesi shpjegon shumë mirë konceptet komplekse', createdAt: new Date(), toxicityScore: 12.3 },
          { comment: 'Duhet të përmirësojë komunikimin me studentët', createdAt: new Date(), toxicityScore: 45.8 },
          { comment: 'Orët e konsultimit janë të pakta', createdAt: new Date(), toxicityScore: 38.5 },
          { comment: 'Eksperiencat praktike janë të shkëlqyera', createdAt: new Date(), toxicityScore: 8.2 },
          { comment: 'Ndonjëherë është vonë në mësime', createdAt: new Date(), toxicityScore: 52.1 }
        ]
      });

      setUsage({
        planType: 'Pro',
        currentUsage: 847,
        limit: 10000,
        apiCalls: 3421,
        apiLimit: 50000,
        storageUsed: 23.4,
        storageLimit: 100,
        currentMonth: new Date().toLocaleDateString('sq-AL', { month: 'long', year: 'numeric' }),
        monthlyBreakdown: [
          { month: 'Jan', count: 650 },
          { month: 'Feb', count: 720 },
          { month: 'Mar', count: 890 },
          { month: 'Apr', count: 1050 },
          { month: 'May', count: 980 },
          { month: 'Jun', count: 847 }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="dashboard-auth-required">
        <div className="auth-required-content">
          <span className="auth-icon">🔒</span>
          <h2>Kërkohet Autentifikimi</h2>
          <p>Ju duhet të jeni të loguar për të parë dashboard-in</p>
          <button className="btn btn-primary" onClick={() => window.location.href = '/'}>
            Kthehu në Home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Duke ngarkuar të dhënat...</p>
      </div>
    );
  }

  const usagePercentage = usage ? (usage.currentUsage / usage.limit * 100).toFixed(1) : 0;
  const isNearLimit = usagePercentage > 80;

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div>
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Përshëndetje, {user?.name || 'User'}! Menaxho dhe monitoro organizatën tënde</p>
          </div>
          <div className="dashboard-header-actions">
            <div className="plan-badge">
              <span className="plan-icon">⭐</span>
              <span className="plan-text">{usage?.planType || 'Free'} Plan</span>
            </div>
            <button className="btn btn-primary">
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <div className="tabs-container">
          <button
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="tab-icon">📊</span>
            Përmbledhje
          </button>
          <button
            className={`tab ${activeTab === 'usage' ? 'active' : ''}`}
            onClick={() => setActiveTab('usage')}
          >
            <span className="tab-icon">📈</span>
            Përdorimi
          </button>
          <button
            className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className="tab-icon">⚙️</span>
            Konfigurime
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="tab-content">
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-icon">📊</span>
                  <span className="stat-trend positive">+12%</span>
                </div>
                <div className="stat-value">{stats?.totalFeedback || 0}</div>
                <div className="stat-label">Feedback Totale</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-icon">📈</span>
                  <span className="stat-trend negative">-5%</span>
                </div>
                <div className="stat-value">{stats?.avgToxicity?.toFixed(1) || 0}%</div>
                <div className="stat-label">Mesatarja e Toksicitetit</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-icon">⛔</span>
                  <span className="stat-trend positive">+3%</span>
                </div>
                <div className="stat-value">{stats?.rejectedCount || 0}</div>
                <div className="stat-label">Feedback të Refuzuara</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-icon">👥</span>
                  <span className="stat-trend positive">+8%</span>
                </div>
                <div className="stat-value">{stats?.activeUsers || 0}</div>
                <div className="stat-label">Përdorues Aktivë</div>
              </div>
            </div>

            {/* Usage Alert */}
            {isNearLimit && (
              <div className="alert alert-warning">
                <span className="alert-icon">⚠️</span>
                <div className="alert-content">
                  <h3 className="alert-title">Afër limitit mujor</h3>
                  <p className="alert-text">
                    Keni përdorur {usagePercentage}% të limitit tuaj mujor ({usage.currentUsage}/{usage.limit} feedback).
                    Konsideroni të përmirësoni planin tuaj.
                  </p>
                </div>
                <button className="btn btn-warning-action">Përmirëso</button>
              </div>
            )}

            {/* Charts */}
            <div className="charts-grid">
              <div className="chart-card">
                <h3 className="chart-title">Feedback sipas Muajit</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={usage?.monthlyBreakdown || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={2} name="Feedback" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <h3 className="chart-title">Shpërndarja e Toksicitetit</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats?.toxicityDistribution || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="range" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8b5cf6" name="Numri" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="activity-card">
              <h3 className="activity-title">Aktiviteti i Fundit</h3>
              <div className="activity-list">
                {stats?.recentFeedback?.slice(0, 5).map((feedback, idx) => (
                  <div key={idx} className="activity-item">
                    <div className="activity-content">
                      <p className="activity-text">{feedback.comment}</p>
                      <p className="activity-date">
                        {new Date(feedback.createdAt).toLocaleDateString('sq-AL')}
                      </p>
                    </div>
                    <div className="activity-badge">
                      <span className={`toxicity-badge ${
                        feedback.toxicityScore < 50 
                          ? 'low'
                          : feedback.toxicityScore < 80
                          ? 'medium'
                          : 'high'
                      }`}>
                        {feedback.toxicityScore.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Usage Tab */}
        {activeTab === 'usage' && (
          <div className="tab-content">
            {/* Usage Progress */}
            <div className="usage-card">
              <div className="usage-header">
                <h3 className="usage-title">Përdorimi Mujor</h3>
                <span className="usage-month">
                  {usage?.currentMonth || new Date().toLocaleDateString('sq-AL', { month: 'long', year: 'numeric' })}
                </span>
              </div>

              <div className="usage-metrics">
                <div className="usage-metric">
                  <div className="metric-header">
                    <span className="metric-label">Feedback të Dërguara</span>
                    <span className="metric-value">
                      {usage?.currentUsage || 0} / {usage?.limit || 0}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className={`progress-fill ${
                        usagePercentage > 90 ? 'danger' :
                        usagePercentage > 75 ? 'warning' :
                        'success'
                      }`}
                      style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                    />
                  </div>
                  <p className="metric-info">{usagePercentage}% e përdorur</p>
                </div>

                <div className="usage-metric">
                  <div className="metric-header">
                    <span className="metric-label">API Calls</span>
                    <span className="metric-value">
                      {usage?.apiCalls || 0} / {usage?.apiLimit || 'Unlimited'}
                    </span>
                  </div>
                </div>

                <div className="usage-metric">
                  <div className="metric-header">
                    <span className="metric-label">Storage</span>
                    <span className="metric-value">
                      {usage?.storageUsed || 0} MB / {usage?.storageLimit || 100} MB
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Plan Comparison */}
            <div className="plans-card">
              <h3 className="plans-title">Krahasimi i Planeve</h3>
              <div className="plans-grid">
                <div className="plan-card">
                  <div className="plan-header">
                    <h4 className="plan-name">Basic</h4>
                    <div className="plan-price">
                      <span className="price">€29</span>
                      <span className="period">/muaj</span>
                    </div>
                  </div>
                  <ul className="plan-features">
                    <li>✓ 1,000 feedback/muaj</li>
                    <li>✓ 5 përdorues</li>
                    <li>✓ Support bazik</li>
                  </ul>
                  <button className="btn btn-secondary">Zgjidh Planin</button>
                </div>

                <div className="plan-card featured">
                  <div className="plan-badge-top">POPULAR</div>
                  <div className="plan-header">
                    <h4 className="plan-name">Pro</h4>
                    <div className="plan-price">
                      <span className="price">€79</span>
                      <span className="period">/muaj</span>
                    </div>
                  </div>
                  <ul className="plan-features">
                    <li>✓ 10,000 feedback/muaj</li>
                    <li>✓ 25 përdorues</li>
                    <li>✓ Priority support</li>
                    <li>✓ Custom branding</li>
                  </ul>
                  <button className="btn btn-primary" disabled>Plani Aktual</button>
                </div>

                <div className="plan-card">
                  <div className="plan-header">
                    <h4 className="plan-name">Enterprise</h4>
                    <div className="plan-price">
                      <span className="price">Custom</span>
                    </div>
                  </div>
                  <ul className="plan-features">
                    <li>✓ Unlimited feedback</li>
                    <li>✓ Unlimited users</li>
                    <li>✓ Dedicated support</li>
                    <li>✓ Custom integrations</li>
                  </ul>
                  <button className="btn btn-secondary">Kontakto Shitjet</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="tab-content">
            <SettingsPanel apiKey={apiKey} />
          </div>
        )}
      </div>
    </div>
  );
};

const SettingsPanel = ({ apiKey }) => {
  const [settings, setSettings] = useState({
    toxicityThreshold: 80,
    autoReject: true,
    emailNotifications: true,
    brandColor: '#8b5cf6',
    organizationName: 'Organizata Ime'
  });

  const [saved, setSaved] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey || 'sk_demo_1234567890abcdef');
    alert('API Key u kopjua!');
  };

  return (
    <div className="settings-container">
      <div className="settings-card">
        <h3 className="settings-title">Konfigurimet e Përgjithshme</h3>

        <div className="settings-form">
          <div className="form-group">
            <label className="form-label">Emri i Organizatës</label>
            <input
              type="text"
              value={settings.organizationName}
              onChange={(e) => setSettings({...settings, organizationName: e.target.value})}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Pragu i Toksicitetit ({settings.toxicityThreshold}%)
            </label>
            <input
              type="range"
              min="50"
              max="95"
              value={settings.toxicityThreshold}
              onChange={(e) => setSettings({...settings, toxicityThreshold: parseInt(e.target.value)})}
              className="form-range"
            />
            <p className="form-hint">
              Feedback me toksicitet mbi këtë prag do të refuzohet automatikisht
            </p>
          </div>

          <div className="form-group">
            <label className="form-label">Ngjyra Kryesore</label>
            <input
              type="color"
              value={settings.brandColor}
              onChange={(e) => setSettings({...settings, brandColor: e.target.value})}
              className="form-color"
            />
          </div>

          <div className="form-group toggle-group">
            <div className="toggle-info">
              <p className="toggle-label">Refuzim Automatik</p>
              <p className="toggle-hint">Refuzo automatikisht feedback me toksicitet të lartë</p>
            </div>
            <button
              onClick={() => setSettings({...settings, autoReject: !settings.autoReject})}
              className={`toggle-btn ${settings.autoReject ? 'active' : ''}`}
            >
              <span className="toggle-slider"></span>
            </button>
          </div>

          <div className="form-group toggle-group">
            <div className="toggle-info">
              <p className="toggle-label">Njoftimet me Email</p>
              <p className="toggle-hint">Merr email për aktivitete të rëndësishme</p>
            </div>
            <button
              onClick={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})}
              className={`toggle-btn ${settings.emailNotifications ? 'active' : ''}`}
            >
              <span className="toggle-slider"></span>
            </button>
          </div>
        </div>

        <div className="settings-actions">
          <button className="btn btn-secondary">Anulo</button>
          <button className="btn btn-primary" onClick={handleSave}>
            Ruaj Ndryshimet
          </button>
        </div>

        {saved && (
          <div className="save-success">
            ✓ Konfigurimet u ruajtën me sukses!
          </div>
        )}
      </div>

      <div className="api-key-card">
        <h3 className="api-key-title">API Key</h3>
        <div className="api-key-display">
          <code className="api-key-code">
            {showApiKey ? (apiKey || 'sk_demo_1234567890abcdef') : '••••••••••••••••••••••••••••'}
          </code>
          <div className="api-key-actions">
            <button 
              className="icon-btn"
              onClick={() => setShowApiKey(!showApiKey)}
              title={showApiKey ? 'Fsheh' : 'Shfaq'}
            >
              {showApiKey ? '👁️' : '👁️‍🗨️'}
            </button>
            <button 
              className="icon-btn"
              onClick={copyApiKey}
              title="Kopjo"
            >
              📋
            </button>
          </div>
        </div>
        <p className="api-key-warning">
          ⚠️ Mos e ndani API key tuaj me askënd. Përdoreni vetëm në aplikacionin tuaj.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;