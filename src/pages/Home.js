import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Detection',
      description: 'Algoritme të avancuara Machine Learning për detektimin e përmbajtjes toksike me saktësi të lartë.',
      color: 'purple'
    },
    {
      icon: '⚡',
      title: 'Real-time Analysis',
      description: 'Analizë në kohë reale me përgjigje brenda 100ms. Integrim i lehtë në çdo platformë.',
      color: 'blue'
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'Të dhënat tuaja janë të sigurta. GDPR compliant dhe enkriptim end-to-end.',
      color: 'green'
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Dashboard i plotë me analitikë dhe raporte për të monitoruar moderimin.',
      color: 'orange'
    },
    {
      icon: '🌍',
      title: 'Multi-language',
      description: 'Mbështetje për mbi 20 gjuhë duke përfshirë shqipen, anglez, gjerman, etj.',
      color: 'pink'
    },
    {
      icon: '🔧',
      title: 'Easy Integration',
      description: 'REST API i thjeshtë, SDK për gjuhë të ndryshme dhe dokumentacion i plotë.',
      color: 'indigo'
    }
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime' },
    { value: '10M+', label: 'API Calls/Month' },
    { value: '<100ms', label: 'Response Time' },
    { value: '500+', label: 'Happy Customers' }
  ];

  const testimonials = [
    {
      name: 'John Smith',
      role: 'CTO at TechCorp',
      image: '👨‍💼',
      text: 'ToxicityGuard ka ndryshuar plotësisht mënyrën se si moderojmë përmbajtjen. API-ja është e shpejtë dhe e saktë!'
    },
    {
      name: 'Sarah Johnson',
      role: 'Product Manager at SocialApp',
      image: '👩‍💼',
      text: 'Integrimi ishte shumë i lehtë dhe mbështetja është fantastike. E rekomandoj pa hezitim!'
    },
    {
      name: 'Michael Chen',
      role: 'Developer at StartupXYZ',
      image: '👨‍💻',
      text: 'Dokumentacioni është i shkëlqyer dhe API-ja funksionon pa probleme. 5 yje!'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">🚀</span>
              <span className="badge-text">Powered by UBT</span>
            </div>
            <h1 className="hero-title">
              Mbro Platformën Tënde nga{' '}
              <span className="gradient-text">Përmbajtja Toksike</span>
            </h1>
            <p className="hero-description">
              API e fuqishme për moderimin automatik të komenteve, feedback-eve dhe 
              përmbajtjes së përdoruesve me teknologji Machine Learning.
            </p>
            <div className="hero-buttons">
              <Link to="/playground" className="btn btn-primary">
                Provo Falas - 1000 API Calls
              </Link>
              <Link to="/docs" className="btn btn-secondary">
                Shiko Dokumentacionin →
              </Link>
            </div>
            <div className="hero-features">
              <div className="hero-feature">
                <span className="feature-check">✓</span>
                <span>99.9% Uptime</span>
              </div>
              <div className="hero-feature">
                <span className="feature-check">✓</span>
                <span>GDPR Compliant</span>
              </div>
              <div className="hero-feature">
                <span className="feature-check">✓</span>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="code-example">
              <div className="code-header">
                <span className="code-dot red"></span>
                <span className="code-dot yellow"></span>
                <span className="code-dot green"></span>
                <span className="code-title">API Request</span>
              </div>
              <div className="code-body">
                <div className="code-line">
                  <span className="code-method">POST</span>
                  <span className="code-url">/api/feedback</span>
                </div>
                <div className="code-line code-json">
                  <span className="code-bracket">{'{'}</span>
                </div>
                <div className="code-line code-json code-indent">
                  <span className="code-key">"comment"</span>
                  <span>: </span>
                  <span className="code-string">"Ky është një test..."</span>
                </div>
                <div className="code-line code-json">
                  <span className="code-bracket">{'}'}</span>
                </div>
                <div className="code-divider"></div>
                <div className="code-line">
                  <span className="code-comment">// Response</span>
                </div>
                <div className="code-line code-json">
                  <span className="code-bracket">{'{'}</span>
                </div>
                <div className="code-line code-json code-indent">
                  <span className="code-key">"toxicityScore"</span>
                  <span>: </span>
                  <span className="code-number">15.3</span>
                  <span>,</span>
                </div>
                <div className="code-line code-json code-indent">
                  <span className="code-key">"status"</span>
                  <span>: </span>
                  <span className="code-string">"approved"</span>
                </div>
                <div className="code-line code-json">
                  <span className="code-bracket">{'}'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Çfarë Ofrojmë</h2>
            <p className="section-subtitle">Zgjidhje të plota për moderimin e përmbajtjes</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className={`feature-card feature-${feature.color}`}>
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Si Funksionon</h2>
            <p className="section-subtitle">Integrim i thjeshtë në 3 hapa</p>
          </div>
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3 className="step-title">Regjistrohu dhe Merr API Key</h3>
                <p className="step-description">
                  Krijo një llogari falas dhe merr API key-n tënde në pak sekonda.
                </p>
              </div>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3 className="step-title">Integro API-në</h3>
                <p className="step-description">
                  Përdor dokumentacionin tonë të detajuar për të integruar API-në në aplikacionin tënd.
                </p>
              </div>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3 className="step-title">Fillo Moderimin</h3>
                <p className="step-description">
                  Dërgo përmbajtjen për analizim dhe merr rezultate në kohë reale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Çfarë Thonë Klientët</h2>
            <p className="section-subtitle">Besuar nga kompani në të gjithë botën</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="author-image">{testimonial.image}</div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Gati për të filluar?</h2>
          <p className="cta-description">
            Integroje API-në tonë në më pak se 5 minuta dhe fillo të moderosh përmbajtjen automatikisht
          </p>
          <div className="cta-buttons">
            <Link to="/playground" className="btn btn-outline">
              Testo API-në Falas
            </Link>
            <Link to="/pricing" className="btn btn-outline">
              Shiko Çmimet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;