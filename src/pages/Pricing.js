import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Pricing.css';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // monthly or yearly

  const plans = [
    {
      name: 'Free',
      icon: '🎯',
      description: 'Perfekt për t\'u filluar dhe për projekte të vogla',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        { text: '1,000 API calls/muaj', included: true },
        { text: 'Analiza bazë e toksicitetit', included: true },
        { text: 'Email support (48h)', included: true },
        { text: 'Dashboard analytics', included: false },
        { text: 'Custom branding', included: false },
        { text: 'Priority support', included: false },
        { text: 'Webhook integrations', included: false },
        { text: 'Custom ML models', included: false }
      ],
      cta: 'Fillo Falas',
      popular: false,
      color: 'gray'
    },
    {
      name: 'Starter',
      icon: '🚀',
      description: 'Për biznese në rritje me kërkesa të moderuara',
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        { text: '10,000 API calls/muaj', included: true },
        { text: 'Analiza e plotë + sentiment', included: true },
        { text: 'Email & chat support (24h)', included: true },
        { text: 'Dashboard analytics', included: true },
        { text: 'Basic custom branding', included: true },
        { text: 'Priority support', included: false },
        { text: 'Webhook integrations', included: false },
        { text: 'Custom ML models', included: false }
      ],
      cta: 'Zgjidh Starter',
      popular: false,
      color: 'blue'
    },
    {
      name: 'Pro',
      icon: '⭐',
      description: 'Për biznese profesionale me trafik të lartë',
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: [
        { text: '50,000 API calls/muaj', included: true },
        { text: 'Analiza e avancuar me AI', included: true },
        { text: 'Priority support 24/7', included: true },
        { text: 'Advanced analytics & reports', included: true },
        { text: 'Full custom branding', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'Webhook integrations', included: true },
        { text: 'Custom ML models', included: false }
      ],
      cta: 'Zgjidh Pro',
      popular: true,
      color: 'purple'
    },
    {
      name: 'Enterprise',
      icon: '🏢',
      description: 'Për organizata të mëdha me nevoja specifike',
      monthlyPrice: null,
      yearlyPrice: null,
      features: [
        { text: 'Unlimited API calls', included: true },
        { text: 'Custom ML models & training', included: true },
        { text: 'Dedicated support team', included: true },
        { text: 'Custom analytics dashboard', included: true },
        { text: 'White-label solution', included: true },
        { text: 'On-premise deployment', included: true },
        { text: 'SLA guarantee 99.99%', included: true },
        { text: 'Custom integrations', included: true }
      ],
      cta: 'Kontakto Shitjet',
      popular: false,
      color: 'gold'
    }
  ];

  const faqs = [
    {
      question: 'Si funksionon periudha e provës falas?',
      answer: 'Plani Free është përgjithmonë falas dhe nuk kërkon kartë krediti. Mund të filloni menjëherë me 1,000 API calls në muaj.'
    },
    {
      question: 'Mund të ndryshoj planin në çdo kohë?',
      answer: 'Po! Mund të përmirësoni ose të ulni planin tuaj në çdo kohë. Ndryshimet hyjnë në fuqi menjëherë dhe faturohet proporcionale.'
    },
    {
      question: 'Çfarë ndodh nëse tejkaloj limitin e API calls?',
      answer: 'Nëse tejkaloni limitin, API-ja do të kthejë një error 429. Mund të përmirësoni planin ose të prisni derisa limiti të rifresohet muajin e ardhshëm.'
    },
    {
      question: 'A ka ulje për pagesa vjetore?',
      answer: 'Po! Pagesa vjetore ju ofron 2 muaj falas (ekuivalent me një zbritje 17%). Për shembull, Pro plan kushton €790/vit në vend të €948.'
    },
    {
      question: 'A janë të dhënat e mia të sigurta?',
      answer: 'Absolutisht! Përdorim enkriptim end-to-end, jemi GDPR compliant, dhe të dhënat tuaja nuk ndahen kurrë me palë të treta.'
    },
    {
      question: 'Cilat metoda pagese pranoni?',
      answer: 'Pranojmë të gjitha kartat kryesore të kreditit/debitit (Visa, Mastercard, Amex), si dhe PayPal dhe transferta bankare për Enterprise plan.'
    },
    {
      question: 'A ka kontratë afatgjatë?',
      answer: 'Jo! Të gjitha planet janë pa kontratë dhe mund të anuloni në çdo kohë. Nuk ka tarifa anulimi.'
    },
    {
      question: 'Çfarë përfshin mbështetja teknike?',
      answer: 'Free plan ka email support me përgjigje brenda 48h. Planet e paguara kanë mbështetje më të shpejtë, dhe Enterprise ka ekip të dedikuar mbështetjeje.'
    }
  ];

  const getPrice = (plan) => {
    if (plan.monthlyPrice === null) return 'Custom';
    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    return `€${price}`;
  };

  const getPeriod = (plan) => {
    if (plan.monthlyPrice === null) return '';
    return billingCycle === 'monthly' ? '/muaj' : '/vit';
  };

  const getSavings = (plan) => {
    if (billingCycle === 'yearly' && plan.monthlyPrice > 0) {
      const monthlyCost = plan.monthlyPrice * 12;
      const yearlyCost = plan.yearlyPrice;
      const savings = monthlyCost - yearlyCost;
      return `Kursen €${savings}/vit`;
    }
    return null;
  };

  return (
    <div className="pricing">
      {/* Header */}
      <div className="pricing-header">
        <div className="pricing-header-content">
          <h1 className="pricing-title">Plane të Thjeshtë dhe Transparente</h1>
          <p className="pricing-subtitle">
            Zgjidh planin që përshtatet më mirë me nevojat e biznesit tënd. Pa tarifa të fshehura, anulo kur të dëshirosh.
          </p>

          {/* Billing Toggle */}
          <div className="billing-toggle">
            <button
              className={`billing-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Mujor
            </button>
            <button
              className={`billing-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('yearly')}
            >
              Vjetor
              <span className="savings-badge">Kursen 17%</span>
            </button>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="pricing-content">
        <div className="plans-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`plan-card plan-${plan.color} ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && (
                <div className="popular-badge">
                  <span className="badge-icon">🔥</span>
                  <span className="badge-text">MË E ZGJEDHURA</span>
                </div>
              )}

              <div className="plan-icon">{plan.icon}</div>
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-description">{plan.description}</p>

              <div className="plan-pricing">
                <span className="plan-price">{getPrice(plan)}</span>
                <span className="plan-period">{getPeriod(plan)}</span>
              </div>

              {getSavings(plan) && (
                <div className="plan-savings">{getSavings(plan)}</div>
              )}

              <button className={`plan-cta btn-${plan.color}`}>
                {plan.cta}
              </button>

              <div className="plan-features">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className={`feature-item ${feature.included ? 'included' : 'not-included'}`}>
                    <span className="feature-icon">
                      {feature.included ? '✓' : '✕'}
                    </span>
                    <span className="feature-text">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="comparison-section">
          <h2 className="comparison-title">Krahasimi i Detajuar i Planeve</h2>
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th className="feature-col">Veçoria</th>
                  <th>Free</th>
                  <th>Starter</th>
                  <th className="popular-col">Pro</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="feature-col">API Calls/muaj</td>
                  <td>1,000</td>
                  <td>10,000</td>
                  <td className="popular-col">50,000</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td className="feature-col">Response Time</td>
                  <td>&lt;200ms</td>
                  <td>&lt;150ms</td>
                  <td className="popular-col">&lt;100ms</td>
                  <td>&lt;50ms</td>
                </tr>
                <tr>
                  <td className="feature-col">Analiza e Toksicitetit</td>
                  <td>✓ Bazik</td>
                  <td>✓ E plotë</td>
                  <td className="popular-col">✓ E avancuar</td>
                  <td>✓ Custom</td>
                </tr>
                <tr>
                  <td className="feature-col">Sentiment Analysis</td>
                  <td>✕</td>
                  <td>✓</td>
                  <td className="popular-col">✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td className="feature-col">Dashboard Analytics</td>
                  <td>✕</td>
                  <td>✓ Bazik</td>
                  <td className="popular-col">✓ E avancuar</td>
                  <td>✓ Custom</td>
                </tr>
                <tr>
                  <td className="feature-col">Custom Branding</td>
                  <td>✕</td>
                  <td>✓ Bazik</td>
                  <td className="popular-col">✓ E plotë</td>
                  <td>✓ White-label</td>
                </tr>
                <tr>
                  <td className="feature-col">Support</td>
                  <td>Email (48h)</td>
                  <td>Email/Chat (24h)</td>
                  <td className="popular-col">24/7 Priority</td>
                  <td>Dedicated Team</td>
                </tr>
                <tr>
                  <td className="feature-col">Webhooks</td>
                  <td>✕</td>
                  <td>✕</td>
                  <td className="popular-col">✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td className="feature-col">SLA Uptime</td>
                  <td>99%</td>
                  <td>99.5%</td>
                  <td className="popular-col">99.9%</td>
                  <td>99.99%</td>
                </tr>
                <tr>
                  <td className="feature-col">Custom ML Models</td>
                  <td>✕</td>
                  <td>✕</td>
                  <td className="popular-col">✕</td>
                  <td>✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2 className="faq-title">Pyetje të Shpeshta</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="pricing-cta">
          <div className="cta-content">
            <h2 className="cta-title">Ende nuk je i sigurt?</h2>
            <p className="cta-text">
              Testo API-në tonë falas pa nevojë për kartë krediti. Nëse ke pyetje, ekipi ynë është këtu për të ndihmuar.
            </p>
            <div className="cta-buttons">
              <Link to="/playground" className="btn btn-primary">
                Testo Falas
              </Link>
              <button className="btn btn-secondary">
                Kontakto Shitjet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <span className="faq-icon">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default Pricing;