// src/components/FeedbackForm.js
import { useState } from 'react';
import { submitFeedback } from '../services/feedbackService';
import './FeedbackForm.css';

const FeedbackForm = ({ teacherId, teacherName, studentId }) => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [toxicityScore, setToxicityScore] = useState(null);
  const [showToxicityDetails, setShowToxicityDetails] = useState(false);

  const getToxicityLevel = (score) => {
    if (score < 30) return { label: 'Shumë i Ulët', color: 'success', icon: '😊' };
    if (score < 50) return { label: 'i Ulët', color: 'info', icon: '🙂' };
    if (score < 70) return { label: 'Mesatar', color: 'warning', icon: '😐' };
    if (score < 80) return { label: 'i Lartë', color: 'orange', icon: '😟' };
    return { label: 'Shumë i Lartë', color: 'danger', icon: '😡' };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (comment.trim().length < 10) {
      setError('Komenti duhet të jetë së paku 10 karaktere');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);
    setToxicityScore(null);
    setShowToxicityDetails(false);

    try {
      const response = await submitFeedback({
        teacherId,
        studentId,
        comment: comment.trim()
      });
      
      setSuccess(true);
      setToxicityScore(response.toxicityScore);
      setShowToxicityDetails(true);
      setComment('');
      
      setTimeout(() => {
        setSuccess(false);
        setShowToxicityDetails(false);
      }, 8000);
      
    } catch (err) {
      // Nxjerr toxicity score edhe në rast gabimi (kur është refuzuar)
      const errorMessage = err.message || 'Ndodhi një gabim gjatë dërgimit';
      setError(errorMessage);
      
      // Kontrollo nëse ka toxicity score në përgjigjeje
      if (err.response?.data?.toxicityScore) {
        setToxicityScore(err.response.data.toxicityScore);
        setShowToxicityDetails(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    if (error) {
      setError(null);
      setShowToxicityDetails(false);
    }
  };

  const renderToxicityIndicator = () => {
    if (toxicityScore === null) return null;

    const level = getToxicityLevel(toxicityScore);
    
    return (
      <div className={`toxicity-indicator toxicity-${level.color}`}>
        <div className="toxicity-header">
          <span className="toxicity-icon">{level.icon}</span>
          <div className="toxicity-info">
            <h4>Analiza e Toksicitetit</h4>
            <p className="toxicity-level">Nivel: {level.label}</p>
          </div>
        </div>
        
        <div className="toxicity-bar-container">
          <div className="toxicity-bar-background">
            <div 
              className={`toxicity-bar toxicity-bar-${level.color}`}
              style={{ width: `${toxicityScore}%` }}
            >
              <span className="toxicity-percentage">{toxicityScore.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="toxicity-scale">
          <span className="scale-marker" style={{left: '30%'}}>30%</span>
          <span className="scale-marker" style={{left: '50%'}}>50%</span>
          <span className="scale-marker" style={{left: '70%'}}>70%</span>
          <span className="scale-marker scale-danger" style={{left: '80%'}}>80%</span>
        </div>

        {toxicityScore >= 80 && (
          <div className="toxicity-warning">
            <svg className="warning-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p>
              <strong>Kujdes!</strong> Komenti juaj ka nivel të lartë toksiciteti (mbi 80%).
              Ju lutem rishikoni dhe hiqni gjuhën ofenduese ose sulmuese.
            </p>
          </div>
        )}

        {toxicityScore < 80 && toxicityScore >= 50 && (
          <div className="toxicity-info-box">
            <p>💡 Komenti juaj ka disa elemente që mund të perceptohen negativisht. Konsideroni ta bëni më konstruktiv.</p>
          </div>
        )}

        {toxicityScore < 50 && (
          <div className="toxicity-info-box toxicity-positive">
            <p>✅ Komenti juaj është konstruktiv dhe i respektuar. Faleminderit!</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="feedback-form-container">
      <div className="feedback-form-card">
        <div className="form-header">
          <h2 className="form-title">Jep Feedback për {teacherName}</h2>
          <p className="form-subtitle">Opinioni juaj na ndihmon të përmirësojmë cilësinë e mësimdhënies</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <svg className="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="alert-content">
              <strong>Gabim!</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <svg className="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="alert-content">
              <strong>Sukses!</strong>
              <p>Feedback-u u dërgua me sukses!</p>
            </div>
          </div>
        )}

        {showToxicityDetails && renderToxicityIndicator()}

        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="comment" className="form-label">
              Komenti Juaj <span className="required">*</span>
            </label>
            <textarea
              id="comment"
              className="form-textarea"
              rows={6}
              value={comment}
              onChange={handleCommentChange}
              placeholder="Shkruani mendimet tuaja rreth mësuesit... (minimum 10 karaktere)"
              required
              disabled={loading}
              maxLength={1000}
            />
            <div className="character-count">
              <span className={comment.length < 10 ? 'count-warning' : ''}>
                {comment.length}
              </span> / 1000 karaktere
              {comment.length < 10 && comment.length > 0 && (
                <span className="count-message"> (minimum 10)</span>
              )}
            </div>
          </div>

          <div className="form-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setComment('');
                setError(null);
                setShowToxicityDetails(false);
              }}
              disabled={loading || !comment}
            >
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Pastro
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || comment.trim().length < 10}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Duke kontrolluar...
                </>
              ) : (
                <>
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Dërgo Feedback-un
                </>
              )}
            </button>
          </div>
        </form>

        <div className="form-info">
          <div className="info-icon">ℹ️</div>
          <div>
            <p className="info-title">Rreth kontrollit automatik</p>
            <p className="info-text">
              Sistemi analizon përmbajtjen për të identifikuar gjuhë të papërshtatshme.
              Feedback me nivel toksiciteti mbi 80% refuzohet automatikisht.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;