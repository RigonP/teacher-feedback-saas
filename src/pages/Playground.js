import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Playground.css';

const Playground = () => {
  const { apiKey } = useAuth();
  const [endpoint, setEndpoint] = useState('http://localhost:5000/predict');
  const [method, setMethod] = useState('POST');
  const [requestBody, setRequestBody] = useState(JSON.stringify({
    comment: "Ky është një test komenti për të parë si funksionon API..."
  }, null, 2));
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [customApiKey, setCustomApiKey] = useState(apiKey || '');

  const exampleRequests = {
    positive: {
      text: "Mësuesi shpjegon shumë mirë dhe është i durueshëm me studentët. Urime për punën e shkëlqyer!"
    },
    negative: {
      text: "Ky mësues është i tmerrshëm, nuk di të mësojë fare! Turp!"
    },
    neutral: {
      text: "Mësimi ishte mesatar, ka gjëra që mund të përmirësohen në të ardhmen."
    },
    toxic: {
      text: "Je idiot i madh! Nuk di asgjë dhe je i pafytyrë!"
    }
  };

  const handleTest = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    setStatusCode(null);

    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (customApiKey) {
        headers['X-API-Key'] = customApiKey;
      }

      const startTime = performance.now();
      const res = await fetch(endpoint, {
        method: method,
        headers: headers,
        body: method !== 'GET' ? requestBody : undefined,
      });

      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);

      setStatusCode(res.status);
      
      let data;
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      setResponse({
        data: data,
        time: responseTime,
        headers: Object.fromEntries(res.headers.entries())
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadExample = (type) => {
    setRequestBody(JSON.stringify(exampleRequests[type], null, 2));
  };

  const formatJSON = () => {
    try {
      const formatted = JSON.stringify(JSON.parse(requestBody), null, 2);
      setRequestBody(formatted);
    } catch (e) {
      alert('JSON i pavlefshëm!');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('U kopjua në clipboard!');
  };

  const generateCurlCommand = () => {
    const headers = customApiKey ? `-H "X-API-Key: ${customApiKey}" ` : '';
    const body = method !== 'GET' ? `-d '${requestBody.replace(/\n/g, ' ')}' ` : '';
    return `curl -X ${method} ${headers}-H "Content-Type: application/json" ${body}${endpoint}`;
  };

  const generateCode = (language) => {
    const examples = {
      javascript: `// JavaScript Example
const response = await fetch('${endpoint}', {
  method: '${method}',
  headers: {
    'Content-Type': 'application/json',
    ${customApiKey ? `'X-API-Key': '${customApiKey}'` : ''}
  },
  body: JSON.stringify(${requestBody})
});

const data = await response.json();
console.log(data);`,

      python: `# Python Example
import requests

url = '${endpoint}'
headers = {
    'Content-Type': 'application/json',
    ${customApiKey ? `'X-API-Key': '${customApiKey}'` : ''}
}
data = ${requestBody}

response = requests.${method.toLowerCase()}(url, headers=headers, json=data)
print(response.json())`,

      csharp: `// C# Example
using System.Net.Http;
using System.Text;
using System.Text.Json;

var client = new HttpClient();
${customApiKey ? `client.DefaultRequestHeaders.Add("X-API-Key", "${customApiKey}");` : ''}

var json = @"${requestBody.replace(/"/g, '\\"')}";
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.${method === 'POST' ? 'PostAsync' : 'GetAsync'}("${endpoint}", content);
var result = await response.Content.ReadAsStringAsync();
Console.WriteLine(result);`
    };

    return examples[language] || examples.javascript;
  };

  return (
    <div className="playground">
      <div className="playground-header">
        <div className="playground-header-content">
          <div>
            <h1 className="playground-title">API Playground</h1>
            <p className="playground-subtitle">
              Testo API-në tonë direkt nga shfletuesi. Eksperimento me parametra të ndryshëm dhe shiko përgjigjet në kohë reale.
            </p>
          </div>
          <div className="playground-badge">
            <span className="badge-icon">🧪</span>
            <span className="badge-text">Live Testing</span>
          </div>
        </div>
      </div>

      <div className="playground-content">
        <div className="playground-grid">
          {/* Left Panel - Request */}
          <div className="playground-panel">
            <div className="panel-section">
              <h2 className="panel-title">
                <span className="title-icon">⚙️</span>
                Konfigurimi
              </h2>

              <div className="form-group">
                <label className="form-label">API Key (Opsionale)</label>
                <div className="api-key-input-group">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={customApiKey}
                    onChange={(e) => setCustomApiKey(e.target.value)}
                    className="form-input"
                    placeholder="sk_test_..."
                  />
                  <button
                    className="icon-btn"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? '👁️' : '👁️‍🗨️'}
                  </button>
                  <button
                    className="icon-btn"
                    onClick={() => copyToClipboard(customApiKey)}
                  >
                    📋
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">HTTP Method & Endpoint</label>
                <div className="endpoint-group">
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="method-select"
                  >
                    <option value="POST">POST</option>
                    <option value="GET">GET</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                  <input
                    type="text"
                    value={endpoint}
                    onChange={(e) => setEndpoint(e.target.value)}
                    className="endpoint-input"
                    placeholder="https://api.example.com/endpoint"
                  />
                </div>
              </div>
            </div>

            <div className="panel-section">
              <div className="section-header">
                <h2 className="panel-title">
                  <span className="title-icon">📝</span>
                  Request Body
                </h2>
                <div className="example-buttons">
                  <button onClick={() => loadExample('positive')} className="example-btn positive">
                    😊 Pozitiv
                  </button>
                  <button onClick={() => loadExample('negative')} className="example-btn negative">
                    😡 Negativ
                  </button>
                  <button onClick={() => loadExample('neutral')} className="example-btn neutral">
                    😐 Neutral
                  </button>
                  <button onClick={() => loadExample('toxic')} className="example-btn toxic">
                    ☠️ Toksik
                  </button>
                </div>
              </div>

              <textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                className="request-textarea"
                placeholder="Enter JSON body..."
                spellCheck="false"
              />

              <div className="textarea-actions">
                <button onClick={formatJSON} className="action-btn">
                  <span>✨</span> Format JSON
                </button>
                <button onClick={() => copyToClipboard(requestBody)} className="action-btn">
                  <span>📋</span> Copy
                </button>
                <button 
                  onClick={handleTest}
                  disabled={loading}
                  className="btn btn-primary btn-send"
                >
                  {loading ? (
                    <>
                      <span className="spinner-small"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      🚀 Send Request
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Examples */}
            <div className="panel-section">
              <h2 className="panel-title">
                <span className="title-icon">💻</span>
                Code Examples
              </h2>
              <div className="code-tabs">
                <div className="code-tab-buttons">
                  <button className="code-tab-btn active">JavaScript</button>
                  <button className="code-tab-btn">Python</button>
                  <button className="code-tab-btn">C#</button>
                </div>
                <div className="code-display">
                  <pre className="code-content">{generateCode('javascript')}</pre>
                  <button 
                    className="code-copy-btn"
                    onClick={() => copyToClipboard(generateCode('javascript'))}
                  >
                    📋 Copy
                  </button>
                </div>
              </div>
            </div>

            {/* cURL Command */}
            <div className="panel-section curl-section">
              <h2 className="panel-title">
                <span className="title-icon">⌨️</span>
                cURL Command
              </h2>
              <div className="curl-display">
                <code className="curl-code">{generateCurlCommand()}</code>
                <button 
                  className="curl-copy-btn"
                  onClick={() => copyToClipboard(generateCurlCommand())}
                >
                  📋
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Response */}
          <div className="playground-panel">
            {/* Status */}
            {statusCode && (
              <div className={`status-card ${
                statusCode >= 200 && statusCode < 300 ? 'success' :
                statusCode >= 400 ? 'error' : 'info'
              }`}>
                <div className="status-content">
                  <div className="status-main">
                    <span className="status-label">Status Code</span>
                    <span className="status-value">{statusCode}</span>
                  </div>
                  {response && (
                    <div className="status-time">
                      <span className="time-label">Response Time</span>
                      <span className="time-value">{response.time}ms</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="error-card">
                <div className="error-icon">❌</div>
                <div className="error-content">
                  <h3 className="error-title">Error</h3>
                  <p className="error-message">{error}</p>
                </div>
              </div>
            )}

            {/* Response Body */}
            {response && (
              <>
                <div className="panel-section">
                  <div className="section-header">
                    <h2 className="panel-title">
                      <span className="title-icon">📦</span>
                      Response Body
                    </h2>
                    <button 
                      className="action-btn"
                      onClick={() => copyToClipboard(JSON.stringify(response.data, null, 2))}
                    >
                      <span>📋</span> Copy
                    </button>
                  </div>

                  <div className="response-display">
                    <pre className="response-content">
                      {JSON.stringify(response.data, null, 2)}
                    </pre>
                  </div>

                  {/* Toxicity Visualization */}
                  {response.data?.toxicityScore !== undefined && (
                    <div className="toxicity-visualization">
                      <h4 className="toxicity-title">Toxicity Analysis</h4>
                      <div className="toxicity-bar-container">
                        <div className="toxicity-bar">
                          <div
                            className={`toxicity-fill ${
                              response.data.toxicityScore < 30 ? 'safe' :
                              response.data.toxicityScore < 50 ? 'low' :
                              response.data.toxicityScore < 70 ? 'medium' :
                              response.data.toxicityScore < 80 ? 'high' : 'danger'
                            }`}
                            style={{ width: `${response.data.toxicityScore}%` }}
                          >
                            <span className="toxicity-value">
                              {response.data.toxicityScore.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="toxicity-scale">
                        <span className="scale-point">0%</span>
                        <span className="scale-point">25%</span>
                        <span className="scale-point">50%</span>
                        <span className="scale-point">75%</span>
                        <span className="scale-point">100%</span>
                      </div>
                      <div className="toxicity-legend">
                        <div className="legend-item">
                          <span className="legend-dot safe"></span>
                          <span>Safe (0-30%)</span>
                        </div>
                        <div className="legend-item">
                          <span className="legend-dot low"></span>
                          <span>Low (30-50%)</span>
                        </div>
                        <div className="legend-item">
                          <span className="legend-dot medium"></span>
                          <span>Medium (50-70%)</span>
                        </div>
                        <div className="legend-item">
                          <span className="legend-dot high"></span>
                          <span>High (70-80%)</span>
                        </div>
                        <div className="legend-item">
                          <span className="legend-dot danger"></span>
                          <span>Danger (80-100%)</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Response Headers */}
                <div className="panel-section">
                  <h2 className="panel-title">
                    <span className="title-icon">📋</span>
                    Response Headers
                  </h2>
                  <div className="headers-list">
                    {Object.entries(response.headers).map(([key, value]) => (
                      <div key={key} className="header-item">
                        <span className="header-key">{key}:</span>
                        <span className="header-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Empty State */}
            {!response && !error && !loading && (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <h3 className="empty-title">Asnjë përgjigje ende</h3>
                <p className="empty-text">
                  Kliko "Send Request" për të testuar API-në
                </p>
              </div>
            )}

            {/* Documentation Links */}
            <div className="panel-section docs-section">
              <h3 className="docs-title">
                <span className="title-icon">📚</span>
                Dokumentacioni
              </h3>
              <div className="docs-links">
                <a href="#" className="doc-link">
                  → Getting Started with API
                </a>
                <a href="#" className="doc-link">
                  → Authentication Guide
                </a>
                <a href="#" className="doc-link">
                  → Error Codes Reference
                </a>
                <a href="#" className="doc-link">
                  → Rate Limits & Best Practices
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;