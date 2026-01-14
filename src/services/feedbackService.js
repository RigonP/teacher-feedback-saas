// src/services/feedbackService.js
import axios from 'axios';

// Konfiguro base URL për .NET API
const API_BASE_URL = 'https://localhost:7258/api';

export const submitFeedback = async (feedbackData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/feedback`,
      feedbackData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      // Serveri u përgjigj me një status error
      const errorData = error.response.data;
      
      // Krijon një error objekt që përmban të gjitha detajet
      const customError = new Error(
        errorData.message || 'Dështoi dërgimi i feedback-ut'
      );
      
      // Shto toxicity score në error nëse ekziston
      customError.response = {
        data: {
          toxicityScore: errorData.toxicityScore,
          details: errorData.details
        }
      };
      
      throw customError;
    } else if (error.request) {
      // Request u bë por nuk erdhi përgjigje
      throw new Error('Nuk mund të lidhet me serverin. Ju lutem kontrolloni lidhjen.');
    }
    throw new Error('Ndodhi një gabim i papritur');
  }
};

export const checkApiHealth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/feedback/health`);
    return response.data.status === 'healthy';
  } catch {
    return false;
  }
};

// Shtoj një funksion helper për të kontrolluar vetëm toksicitetin pa e ruajtur
export const checkToxicity = async (text) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/predict',
      { text },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error checking toxicity:', error);
    throw new Error('Nuk mund të kontrollohet toksiciteti');
  }
};