// src/App.tsx
import React from 'react';
import FeedbackForm from './components/FeedbackForm';
import './App.css';

function App() {
  // Këto do të vijnë nga authentication system në realitet
  const currentStudentId = 123; // ID e studentit të loguar
  const selectedTeacherId = 456; // ID e mësuesit për të cilin jepet feedback
  const selectedTeacherName = "Prof. John Doe"; // Emri i mësuesit

  return (
    <div className="App">
      <FeedbackForm 
        teacherId={selectedTeacherId}
        teacherName={selectedTeacherName}
        studentId={currentStudentId}
      />
    </div>
  );
}

export default App;