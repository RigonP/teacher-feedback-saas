import React, { useState } from 'react';
import './Documentation.css';

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [copiedCode, setCopiedCode] = useState(null);

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sections = [
    { id: 'getting-started', title: '🚀 Getting Started', icon: '🚀' },
    { id: 'authentication', title: '🔐 Authentication', icon: '🔐' },
    { id: 'endpoints', title: '📡 API Endpoints', icon: '📡' },
    { id: 'request-format', title: '📝 Request Format', icon: '📝' },
    { id: 'response-format', title: '📦 Response Format', icon: '📦' },
    { id: 'error-handling', title: '⚠️ Error Handling', icon: '⚠️' },
    { id: 'rate-limits', title: '⏱️ Rate Limits', icon: '⏱️' },
    { id: 'examples', title: '💻 Code Examples', icon: '💻' },
    { id: 'webhooks', title: '🔔 Webhooks', icon: '🔔' },
    { id: 'best-practices', title: '✨ Best Practices', icon: '✨' }
  ];

  const codeExamples = {
    javascript: `// JavaScript/Node.js Example
const axios = require('axios');

const analyzeFeedback = async (comment) => {
  try {
    const response = await axios.post(
      'https://api.toxicityguard.com/v1/feedback',
      {
        teacherId: 1,
        studentId: 1,
        comment: comment
      },
      {
        headers: {
          'X-API-Key': 'your_api_key_here',
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Toxicity Score:', response.data.toxicityScore);
    console.log('Status:', response.data.status);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
};

// Usage
analyzeFeedback('Mësuesi shpjegon shumë mirë!');`,

    python: `# Python Example
import requests

def analyze_feedback(comment):
    url = 'https://api.toxicityguard.com/v1/feedback'
    headers = {
        'X-API-Key': 'your_api_key_here',
        'Content-Type': 'application/json'
    }
    data = {
        'teacherId': 1,
        'studentId': 1,
        'comment': comment
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        
        result = response.json()
        print(f"Toxicity Score: {result['toxicityScore']}")
        print(f"Status: {result['status']}")
        return result
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

# Usage
analyze_feedback('Mësuesi shpjegon shumë mirë!')`,

    csharp: `// C# Example
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

public class ToxicityGuardClient
{
    private readonly HttpClient _client;
    private readonly string _apiKey;

    public ToxicityGuardClient(string apiKey)
    {
        _apiKey = apiKey;
        _client = new HttpClient();
        _client.DefaultRequestHeaders.Add("X-API-Key", apiKey);
    }

    public async Task<FeedbackResponse> AnalyzeFeedback(string comment)
    {
        var url = "https://api.toxicityguard.com/v1/feedback";
        var data = new
        {
            teacherId = 1,
            studentId = 1,
            comment = comment
        };

        var json = JsonSerializer.Serialize(data);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        try
        {
            var response = await _client.PostAsync(url, content);
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<FeedbackResponse>(result);
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine($"Error: {e.Message}");
            return null;
        }
    }
}

public class FeedbackResponse
{
    public double ToxicityScore { get; set; }
    public string Status { get; set; }
    public DateTime CreatedAt { get; set; }
}

// Usage
var client = new ToxicityGuardClient("your_api_key_here");
var result = await client.AnalyzeFeedback("Mësuesi shpjegon shumë mirë!");`,

    php: `<?php
// PHP Example
function analyzeFeedback($comment, $apiKey) {
    $url = 'https://api.toxicityguard.com/v1/feedback';
    
    $data = [
        'teacherId' => 1,
        'studentId' => 1,
        'comment' => $comment
    ];
    
    $options = [
        'http' => [
            'method' => 'POST',
            'header' => [
                'X-API-Key: ' . $apiKey,
                'Content-Type: application/json'
            ],
            'content' => json_encode($data)
        ]
    ];
    
    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);
    
    if ($response === false) {
        return null;
    }
    
    return json_decode($response, true);
}

// Usage
$result = analyzeFeedback('Mësuesi shpjegon shumë mirë!', 'your_api_key_here');
echo "Toxicity Score: " . $result['toxicityScore'] . "\\n";
echo "Status: " . $result['status'] . "\\n";
?>`
  };

  return (
    <div className="documentation">
      <div className="docs-sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">📚 Documentation</h2>
          <p className="sidebar-version">API Version 1.0</p>
        </div>
        <nav className="sidebar-nav">
          {sections.map(section => (
            <button
              key={section.id}
              className={`sidebar-link ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="link-icon">{section.icon}</span>
              <span className="link-text">{section.title}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="docs-content">
        <div className="content-wrapper">
          
          {/* Getting Started */}
          {activeSection === 'getting-started' && (
            <div className="doc-section">
              <h1 className="section-title">🚀 Getting Started</h1>
              <p className="section-intro">
                Mirë se vini në dokumentacionin e ToxicityGuard API. Ky guide do t'ju ndihmojë të filloni të përdorni API-në tonë për të moderuar përmbajtjen në platformën tuaj.
              </p>

              <div className="info-box">
                <div className="info-icon">💡</div>
                <div className="info-content">
                  <h3>Çfarë është ToxicityGuard?</h3>
                  <p>ToxicityGuard është një API e fuqishme që përdor Machine Learning për të detektuar përmbajtje toksike, ofenduese, ose të papërshtatshme në komente, feedback, dhe përmbajtje të tjera të përdoruesve.</p>
                </div>
              </div>

              <h2 className="subsection-title">Hapat e parë</h2>
              <ol className="steps-list">
                <li>
                  <strong>Krijo një llogari</strong> në platformën tonë
                </li>
                <li>
                  <strong>Merr API Key</strong> nga dashboard-i juaj
                </li>
                <li>
                  <strong>Integro API-në</strong> në aplikacionin tuaj
                </li>
                <li>
                  <strong>Fillo të dërgosh</strong> përmbajtje për analizë
                </li>
              </ol>

              <h2 className="subsection-title">Base URL</h2>
              <div className="code-block">
                <code>https://api.toxicityguard.com/v1</code>
              </div>

              <h2 className="subsection-title">Karakteristikat Kryesore</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <span className="feature-icon">⚡</span>
                  <h3>Shpejtësi e Lartë</h3>
                  <p>Përgjigje në më pak se 100ms</p>
                </div>
                <div className="feature-card">
                  <span className="feature-icon">🎯</span>
                  <h3>Saktësi 95%+</h3>
                  <p>Algoritme të trajnuara me miliona shembuj</p>
                </div>
                <div className="feature-card">
                  <span className="feature-icon">🌍</span>
                  <h3>Multi-language</h3>
                  <p>Mbështetje për 20+ gjuhë</p>
                </div>
                <div className="feature-card">
                  <span className="feature-icon">🔒</span>
                  <h3>Secure & Private</h3>
                  <p>GDPR compliant dhe enkriptuar</p>
                </div>
              </div>
            </div>
          )}

          {/* Authentication */}
          {activeSection === 'authentication' && (
            <div className="doc-section">
              <h1 className="section-title">🔐 Authentication</h1>
              <p className="section-intro">
                ToxicityGuard API përdor API Keys për autentifikim. Çdo request duhet të përfshijë API key-n tuaj në headers.
              </p>

              <h2 className="subsection-title">Si të merrni API Key</h2>
              <ol className="steps-list">
                <li>Logohuni në dashboard-in tuaj</li>
                <li>Shkoni te Settings → API Keys</li>
                <li>Klikoni "Generate New Key"</li>
                <li>Kopjoni dhe ruani key-n në një vend të sigurt</li>
              </ol>

              <div className="warning-box">
                <div className="warning-icon">⚠️</div>
                <div className="warning-content">
                  <h3>Siguria e API Key</h3>
                  <p>Mos e ndani kurrë API key-n tuaj publikisht ose në kod që është i aksesueshëm nga klienti. Përdoreni vetëm në server-side code.</p>
                </div>
              </div>

              <h2 className="subsection-title">Dërgimi i API Key</h2>
              <p>API key duhet dërguar në header të çdo request-i:</p>
              
              <div className="code-block">
                <div className="code-header">
                  <span>HTTP Header</span>
                  <button 
                    className="copy-btn"
                    onClick={() => copyCode('X-API-Key: your_api_key_here', 'auth-header')}
                  >
                    {copiedCode === 'auth-header' ? '✓ Copied' : '📋 Copy'}
                  </button>
                </div>
                <pre><code>X-API-Key: your_api_key_here</code></pre>
              </div>

              <h2 className="subsection-title">Shembull Request</h2>
              <div className="code-block">
                <div className="code-header">
                  <span>cURL</span>
                  <button 
                    className="copy-btn"
                    onClick={() => copyCode(`curl -X POST https://api.toxicityguard.com/v1/feedback \\
  -H "X-API-Key: your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "teacherId": 1,
    "studentId": 1,
    "comment": "Test comment"
  }'`, 'auth-curl')}
                  >
                    {copiedCode === 'auth-curl' ? '✓ Copied' : '📋 Copy'}
                  </button>
                </div>
                <pre><code>{`curl -X POST https://api.toxicityguard.com/v1/feedback \\
  -H "X-API-Key: your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "teacherId": 1,
    "studentId": 1,
    "comment": "Test comment"
  }'`}</code></pre>
              </div>
            </div>
          )}

          {/* Endpoints */}
          {activeSection === 'endpoints' && (
            <div className="doc-section">
              <h1 className="section-title">📡 API Endpoints</h1>
              
              <div className="endpoint-card">
                <div className="endpoint-header">
                  <span className="method post">POST</span>
                  <code className="endpoint-path">/v1/feedback</code>
                </div>
                <p className="endpoint-description">
                  Dërgo feedback për analizë të toksicitetit
                </p>
                
                <h3>Parameters</h3>
                <table className="params-table">
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>Type</th>
                      <th>Required</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>teacherId</code></td>
                      <td>integer</td>
                      <td>Yes</td>
                      <td>ID e mësuesit që merr feedback</td>
                    </tr>
                    <tr>
                      <td><code>studentId</code></td>
                      <td>integer</td>
                      <td>Yes</td>
                      <td>ID e studentit që dërgon feedback</td>
                    </tr>
                    <tr>
                      <td><code>comment</code></td>
                      <td>string</td>
                      <td>Yes</td>
                      <td>Përmbajtja e feedback-ut (max 5000 karaktere)</td>
                    </tr>
                  </tbody>
                </table>

                <h3>Example Request</h3>
                <div className="code-block">
                  <pre><code>{`{
  "teacherId": 1,
  "studentId": 42,
  "comment": "Mësuesi shpjegon shumë mirë konceptet komplekse dhe është i durueshëm me studentët."
}`}</code></pre>
                </div>

                <h3>Example Response</h3>
                <div className="code-block">
                  <pre><code>{`{
  "id": 123,
  "toxicityScore": 12.5,
  "status": "approved",
  "sentiment": "positive",
  "createdAt": "2024-01-15T10:30:00Z"
}`}</code></pre>
                </div>
              </div>

              <div className="endpoint-card">
                <div className="endpoint-header">
                  <span className="method get">GET</span>
                  <code className="endpoint-path">/v1/feedback/:id</code>
                </div>
                <p className="endpoint-description">
                  Merr detajet e një feedback-u specifik
                </p>
              </div>

              <div className="endpoint-card">
                <div className="endpoint-header">
                  <span className="method get">GET</span>
                  <code className="endpoint-path">/v1/feedback</code>
                </div>
                <p className="endpoint-description">
                  Lista e të gjitha feedback-eve (me pagination)
                </p>
              </div>

              <div className="endpoint-card">
                <div className="endpoint-header">
                  <span className="method delete">DELETE</span>
                  <code className="endpoint-path">/v1/feedback/:id</code>
                </div>
                <p className="endpoint-description">
                  Fshi një feedback
                </p>
              </div>
            </div>
          )}

          {/* Request Format */}
          {activeSection === 'request-format' && (
            <div className="doc-section">
              <h1 className="section-title">📝 Request Format</h1>
              
              <h2 className="subsection-title">Headers</h2>
              <table className="params-table">
                <thead>
                  <tr>
                    <th>Header</th>
                    <th>Value</th>
                    <th>Required</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>X-API-Key</code></td>
                    <td>Your API key</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td><code>Content-Type</code></td>
                    <td>application/json</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td><code>Accept</code></td>
                    <td>application/json</td>
                    <td>No</td>
                  </tr>
                </tbody>
              </table>

              <h2 className="subsection-title">Request Body</h2>
              <p>Të gjitha request body duhet të jenë në format JSON.</p>
              
              <h3>Feedback Submission</h3>
              <div className="code-block">
                <pre><code>{`{
  "teacherId": 1,        // Required: integer
  "studentId": 1,        // Required: integer
  "comment": "string"    // Required: max 5000 chars
}`}</code></pre>
              </div>

              <h2 className="subsection-title">Character Encoding</h2>
              <p>API mbështet UTF-8 encoding për të gjitha request dhe response. Kjo do të thotë që mund të përdorni karaktere speciale shqiptare si ë, ç, etj.</p>

              <div className="info-box">
                <div className="info-icon">💡</div>
                <div className="info-content">
                  <h3>Best Practice</h3>
                  <p>Gjithmonë validoni input-in tuaj para se ta dërgoni në API për të shmangur errors dhe për të kursyer API calls.</p>
                </div>
              </div>
            </div>
          )}

          {/* Response Format */}
          {activeSection === 'response-format' && (
            <div className="doc-section">
              <h1 className="section-title">📦 Response Format</h1>
              
              <h2 className="subsection-title">Success Response</h2>
              <p>Një response i suksesshëm do të kthejë status code 200 ose 201 dhe një JSON object:</p>
              
              <div className="code-block">
                <pre><code>{`{
  "id": 123,
  "toxicityScore": 15.3,
  "status": "approved",
  "sentiment": "positive",
  "language": "sq",
  "createdAt": "2024-01-15T10:30:00Z",
  "metadata": {
    "processingTime": 87,
    "modelVersion": "v2.1"
  }
}`}</code></pre>
              </div>

              <h2 className="subsection-title">Response Fields</h2>
              <table className="params-table">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>id</code></td>
                    <td>integer</td>
                    <td>ID unik i feedback-ut</td>
                  </tr>
                  <tr>
                    <td><code>toxicityScore</code></td>
                    <td>float</td>
                    <td>Shkalla e toksicitetit (0-100)</td>
                  </tr>
                  <tr>
                    <td><code>status</code></td>
                    <td>string</td>
                    <td>"approved" ose "rejected"</td>
                  </tr>
                  <tr>
                    <td><code>sentiment</code></td>
                    <td>string</td>
                    <td>"positive", "neutral", ose "negative"</td>
                  </tr>
                  <tr>
                    <td><code>language</code></td>
                    <td>string</td>
                    <td>Kodi i gjuhës (ISO 639-1)</td>
                  </tr>
                  <tr>
                    <td><code>createdAt</code></td>
                    <td>string</td>
                    <td>Timestamp në format ISO 8601</td>
                  </tr>
                </tbody>
              </table>

              <h2 className="subsection-title">Toxicity Score Interpretation</h2>
              <div className="score-guide">
                <div className="score-item safe">
                  <div className="score-range">0-30</div>
                  <div className="score-label">Safe</div>
                  <div className="score-desc">Përmbajtje plotësisht e pranueshme</div>
                </div>
                <div className="score-item low">
                  <div className="score-range">30-50</div>
                  <div className="score-label">Low Risk</div>
                  <div className="score-desc">Kritikë e butë, pa ofendim</div>
                </div>
                <div className="score-item medium">
                  <div className="score-range">50-70</div>
                  <div className="score-label">Medium Risk</div>
                  <div className="score-desc">Përmbajtje negative, duhet shqyrtuar</div>
                </div>
                <div className="score-item high">
                  <div className="score-range">70-80</div>
                  <div className="score-label">High Risk</div>
                  <div className="score-desc">Përmbajtje me elemente ofenduese</div>
                </div>
                <div className="score-item danger">
                  <div className="score-range">80-100</div>
                  <div className="score-label">Toxic</div>
                  <div className="score-desc">Shumë toksike, refuzohet automatikisht</div>
                </div>
              </div>
            </div>
          )}

          {/* Error Handling */}
          {activeSection === 'error-handling' && (
            <div className="doc-section">
              <h1 className="section-title">⚠️ Error Handling</h1>
              
              <h2 className="subsection-title">HTTP Status Codes</h2>
              <table className="params-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Meaning</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>200</code></td>
                    <td>OK</td>
                    <td>Request i suksesshëm</td>
                  </tr>
                  <tr>
                    <td><code>201</code></td>
                    <td>Created</td>
                    <td>Resursi u krijua me sukses</td>
                  </tr>
                  <tr>
                    <td><code>400</code></td>
                    <td>Bad Request</td>
                    <td>Request i pavlefshëm (gabim në format ose parametra)</td>
                  </tr>
                  <tr>
                    <td><code>401</code></td>
                    <td>Unauthorized</td>
                    <td>API key mungon ose është i pavlefshëm</td>
                  </tr>
                  <tr>
                    <td><code>403</code></td>
                    <td>Forbidden</td>
                    <td>S'keni akses për këtë resurs</td>
                  </tr>
                  <tr>
                    <td><code>404</code></td>
                    <td>Not Found</td>
                    <td>Resursi nuk u gjet</td>
                  </tr>
                  <tr>
                    <td><code>429</code></td>
                    <td>Too Many Requests</td>
                    <td>Rate limit i tejkaluar</td>
                  </tr>
                  <tr>
                    <td><code>500</code></td>
                    <td>Internal Server Error</td>
                    <td>Gabim në server</td>
                  </tr>
                  <tr>
                    <td><code>503</code></td>
                    <td>Service Unavailable</td>
                    <td>Serveri nuk është i disponueshëm përkohësisht</td>
                  </tr>
                </tbody>
              </table>

              <h2 className="subsection-title">Error Response Format</h2>
              <div className="code-block">
                <pre><code>{`{
  "error": {
    "code": "invalid_request",
    "message": "Comment field is required",
    "details": {
      "field": "comment",
      "reason": "Field cannot be empty"
    }
  }
}`}</code></pre>
              </div>

              <h2 className="subsection-title">Common Error Codes</h2>
              <div className="error-codes">
                <div className="error-code-item">
                  <code>invalid_api_key</code>
                  <p>API key-i juaj është i pavlefshëm ose ka skaduar</p>
                </div>
                <div className="error-code-item">
                  <code>invalid_request</code>
                  <p>Request body ose parametrat janë të pavlefshme</p>
                </div>
                <div className="error-code-item">
                  <code>rate_limit_exceeded</code>
                  <p>Keni tejkaluar limitin e request-eve</p>
                </div>
                <div className="error-code-item">
                  <code>insufficient_quota</code>
                  <p>Nuk keni quota të mjaftueshme në planin tuaj</p>
                </div>
                <div className="error-code-item">
                  <code>internal_error</code>
                  <p>Gabim i brendshëm në server</p>
                </div>
              </div>

              <div className="info-box">
                <div className="info-icon">💡</div>
                <div className="info-content">
                  <h3>Retry Strategy</h3>
                  <p>Për errors 500 dhe 503, implementoni exponential backoff retry strategy. Për errors 429, respektoni header-in <code>Retry-After</code>.</p>
                </div>
              </div>
            </div>
          )}

          {/* Rate Limits */}
          {activeSection === 'rate-limits' && (
            <div className="doc-section">
              <h1 className="section-title">⏱️ Rate Limits</h1>
              
              <p className="section-intro">
                Për të garantuar cilësi të shërbimit për të gjithë përdoruesit, API jonë ka rate limits bazuar në planin tuaj.
              </p>

              <h2 className="subsection-title">Limitet sipas Planit</h2>
              <table className="params-table">
                <thead>
                  <tr>
                    <th>Plan</th>
                    <th>Requests/Second</th>
                    <th>Requests/Month</th>
                    <th>Burst Limit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Free</td>
                    <td>1</td>
                    <td>1,000</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>Starter</td>
                    <td>5</td>
                    <td>10,000</td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td>Pro</td>
                    <td>20</td>
                    <td>50,000</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <td>Enterprise</td>
                    <td>Custom</td>
                    <td>Unlimited</td>
                    <td>Custom</td>
                  </tr>
                </tbody>
              </table>

              <h2 className="subsection-title">Rate Limit Headers</h2>
              <p>Çdo response përfshin headers që tregojnë statusin e rate limit:</p>
              
              <div className="code-block">
                <pre><code>{`X-RateLimit-Limit: 5
X-RateLimit-Remaining: 3
X-RateLimit-Reset: 1642248000`}</code></pre>
              </div>

              <table className="params-table">
                <thead>
                  <tr>
                    <th>Header</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>X-RateLimit-Limit</code></td>
                    <td>Numri maksimal i requests për periudhën kohore</td>
                  </tr>
                  <tr>
                    <td><code>X-RateLimit-Remaining</code></td>
                    <td>Numri i requests të mbetura</td>
                  </tr>
                  <tr>
                    <td><code>X-RateLimit-Reset</code></td>
                    <td>Timestamp kur limiti do të rifresohet</td>
                  </tr>
                  <tr>
                    <td><code>Retry-After</code></td>
                    <td>Sa sekonda të prisni para se të provoni përsëri (vetëm në 429)</td>
                  </tr>
                </tbody>
              </table>

              <h2 className="subsection-title">Si të menaxhoni Rate Limits</h2>
              <div className="code-block">
                <div className="code-header">
                  <span>JavaScript Example</span>
                  <button 
                    className="copy-btn"
                    onClick={() => copyCode(`async function makeRequestWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      
      // Check rate limit headers
      const remaining = response.headers.get('X-RateLimit-Remaining');
      if (remaining && parseInt(remaining) < 10) {
        console.warn('Approaching rate limit!');
      }
      
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const delay = retryAfter ? parseInt(retryAfter) * 1000 : Math.pow(2, i) * 1000;
        console.log(\`Rate limited. Retrying after \${delay}ms\`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }
}`, 'rate-limit-code')}
                  >
                    {copiedCode === 'rate-limit-code' ? '✓ Copied' : '📋 Copy'}
                  </button>
                </div>
                <pre><code>{`async function makeRequestWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      
      // Check rate limit headers
      const remaining = response.headers.get('X-RateLimit-Remaining');
      if (remaining && parseInt(remaining) < 10) {
        console.warn('Approaching rate limit!');
      }
      
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const delay = retryAfter ? parseInt(retryAfter) * 1000 : Math.pow(2, i) * 1000;
        console.log(\`Rate limited. Retrying after \${delay}ms\`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }
}`}</code></pre>
              </div>

              <div className="warning-box">
                <div className="warning-icon">⚠️</div>
                <div className="warning-content">
                  <h3>Best Practices</h3>
                  <ul>
                    <li>Monitoroni headers për të parë sa requests keni mbetur</li>
                    <li>Implementoni caching për të reduktuar requests</li>
                    <li>Përdorni batch processing kur është e mundur</li>
                    <li>Respektoni header-in Retry-After në 429 errors</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Code Examples */}
          {activeSection === 'examples' && (
            <div className="doc-section">
              <h1 className="section-title">💻 Code Examples</h1>
              
              <div className="language-tabs">
                <button className="lang-tab active">JavaScript</button>
                <button className="lang-tab">Python</button>
                <button className="lang-tab">C#</button>
                <button className="lang-tab">PHP</button>
              </div>

              <div className="code-block">
                <div className="code-header">
                  <span>JavaScript/Node.js</span>
                  <button 
                    className="copy-btn"
                    onClick={() => copyCode(codeExamples.javascript, 'js-example')}
                  >
                    {copiedCode === 'js-example' ? '✓ Copied' : '📋 Copy'}
                  </button>
                </div>
                <pre><code>{codeExamples.javascript}</code></pre>
              </div>

              <div className="code-block">
                <div className="code-header">
                  <span>Python</span>
                  <button 
                    className="copy-btn"
                    onClick={() => copyCode(codeExamples.python, 'py-example')}
                  >
                    {copiedCode === 'py-example' ? '✓ Copied' : '📋 Copy'}
                  </button>
                </div>
                <pre><code>{codeExamples.python}</code></pre>
              </div>

              <div className="code-block">
                <div className="code-header">
                  <span>C#</span>
                  <button 
                    className="copy-btn"
                    onClick={() => copyCode(codeExamples.csharp, 'cs-example')}
                  >
                    {copiedCode === 'cs-example' ? '✓ Copied' : '📋 Copy'}
                  </button>
                </div>
                <pre><code>{codeExamples.csharp}</code></pre>
              </div>

              <div className="code-block">
                <div className="code-header">
                  <span>PHP</span>
                  <button 
                    className="copy-btn"
                    onClick={() => copyCode(codeExamples.php, 'php-example')}
                  >
                    {copiedCode === 'php-example' ? '✓ Copied' : '📋 Copy'}
                  </button>
                </div>
                <pre><code>{codeExamples.php}</code></pre>
              </div>
            </div>
          )}

          {/* Webhooks */}
          {activeSection === 'webhooks' && (
            <div className="doc-section">
              <h1 className="section-title">🔔 Webhooks</h1>
              
              <p className="section-intro">
                Webhooks ju lejojnë të merrni notifikime në kohë reale kur ngjarje specifike ndodhin në ToxicityGuard.
              </p>

              <div className="info-box">
                <div className="info-icon">💡</div>
                <div className="info-content">
                  <h3>Disponueshmëria</h3>
                  <p>Webhooks janë të disponueshme vetëm për Pro dhe Enterprise plans.</p>
                </div>
              </div>

              <h2 className="subsection-title">Eventi të Mbështetur</h2>
              <table className="params-table">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>feedback.created</code></td>
                    <td>Një feedback i ri është krijuar</td>
                  </tr>
                  <tr>
                    <td><code>feedback.approved</code></td>
                    <td>Një feedback është aprovuar (toxicity &lt; threshold)</td>
                  </tr>
                  <tr>
                    <td><code>feedback.rejected</code></td>
                    <td>Një feedback është refuzuar (toxicity &gt; threshold)</td>
                  </tr>
                  <tr>
                    <td><code>quota.warning</code></td>
                    <td>Keni arritur 80% të quota-s suaj</td>
                  </tr>
                  <tr>
                    <td><code>quota.exceeded</code></td>
                    <td>Keni tejkaluar quota-n tuaj</td>
                  </tr>
                </tbody>
              </table>

              <h2 className="subsection-title">Webhook Payload</h2>
              <div className="code-block">
                <pre><code>{`{
  "event": "feedback.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "id": 123,
    "toxicityScore": 45.3,
    "status": "approved",
    "comment": "Feedback text here...",
    "teacherId": 1,
    "studentId": 42
  }
}`}</code></pre>
              </div>

              <h2 className="subsection-title">Konfigurimi i Webhooks</h2>
              <ol className="steps-list">
                <li>Shkoni te Dashboard → Settings → Webhooks</li>
                <li>Klikoni "Add Webhook"</li>
                <li>Vendosni URL-në tuaj dhe zgjidhni events</li>
                <li>Ruani dhe testoni webhook-un</li>
              </ol>

              <h2 className="subsection-title">Verifikimi i Webhook Signatures</h2>
              <p>Çdo webhook request përfshin një signature header për verifikim:</p>
              
              <div className="code-block">
                <pre><code>{`const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Usage in Express
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const isValid = verifyWebhookSignature(
    req.body,
    signature,
    process.env.WEBHOOK_SECRET
  );
  
  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process webhook...
  res.status(200).send('OK');
});`}</code></pre>
              </div>
            </div>
          )}

          {/* Best Practices */}
          {activeSection === 'best-practices' && (
            <div className="doc-section">
              <h1 className="section-title">✨ Best Practices</h1>
              
              <h2 className="subsection-title">🔒 Siguria</h2>
              <div className="best-practice-card">
                <h3>Mbani API Key-n të Sigurt</h3>
                <ul>
                  <li>Mos e hard-code kurrë API key-n në kod</li>
                  <li>Përdorni environment variables</li>
                  <li>Mos e commit kurrë në Git</li>
                  <li>Rotoni keys rregullisht</li>
                  <li>Përdoreni vetëm në server-side</li>
                </ul>
              </div>

              <h2 className="subsection-title">⚡ Performance</h2>
              <div className="best-practice-card">
                <h3>Optimizoni Request-et</h3>
                <ul>
                  <li>Implementoni caching për të reduktuar API calls</li>
                  <li>Batch procesoni kur është e mundur</li>
                  <li>Përdorni compression (gzip) për payloads të mëdha</li>
                  <li>Monitoroni response times dhe optimizoni</li>
                </ul>
              </div>

              <h2 className="subsection-title">🔄 Error Handling</h2>
              <div className="best-practice-card">
                <h3>Menaxhoni Errors Siç Duhet</h3>
                <ul>
                  <li>Implementoni retry logic për errors të përkohshme</li>
                  <li>Përdorni exponential backoff</li>
                  <li>Logjoni të gjitha errors për debugging</li>
                  <li>Tregoni mesazhe user-friendly</li>
                  <li>Monitoroni error rates</li>
                </ul>
              </div>

              <h2 className="subsection-title">📊 Monitoring</h2>
              <div className="best-practice-card">
                <h3>Monitoroni API Usage</h3>
                <ul>
                  <li>Trackoni API calls dhe quota usage</li>
                  <li>Vendosni alerts për rate limits</li>
                  <li>Monitoroni response times</li>
                  <li>Analizoni toxicity trends</li>
                </ul>
              </div>

              <h2 className="subsection-title">🎯 Input Validation</h2>
              <div className="best-practice-card">
                <h3>Validoni Input para Dërgimit</h3>
                <div className="code-block">
                  <pre><code>{`function validateFeedback(data) {
  const errors = [];
  
  // Check required fields
  if (!data.teacherId || !Number.isInteger(data.teacherId)) {
    errors.push('teacherId must be an integer');
  }
  
  if (!data.studentId || !Number.isInteger(data.studentId)) {
    errors.push('studentId must be an integer');
  }
  
  if (!data.comment || typeof data.comment !== 'string') {
    errors.push('comment must be a string');
  }
  
  // Check length
  if (data.comment && data.comment.length > 5000) {
    errors.push('comment cannot exceed 5000 characters');
  }
  
  if (data.comment && data.comment.trim().length === 0) {
    errors.push('comment cannot be empty');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Usage
const validation = validateFeedback(feedbackData);
if (!validation.isValid) {
  console.error('Validation errors:', validation.errors);
  return;
}

// Send to API...`}</code></pre>
                </div>
              </div>

              <h2 className="subsection-title">💾 Data Retention</h2>
              <div className="best-practice-card">
                <h3>Menaxhoni të Dhënat</h3>
                <ul>
                  <li>Mos ruani data sensitive më gjatë se sa nevojitet</li>
                  <li>Implementoni data retention policies</li>
                  <li>Respektoni GDPR dhe privacy regulations</li>
                  <li>Përdorni encryption për data në rest</li>
                </ul>
              </div>

              <div className="info-box">
                <div className="info-icon">💡</div>
                <div className="info-content">
                  <h3>Need Help?</h3>
                  <p>Nëse keni pyetje ose keni nevojë për ndihmë me implementimin, kontaktoni support team-in tonë në support@toxicityguard.com</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Documentation