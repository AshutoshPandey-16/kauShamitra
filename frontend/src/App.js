import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import EmployeeLogin from './components/EmployeeLogin';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';
import Assessment from './components/Assessment';
import Results from './components/Results';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [userId, setUserId] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState('');

  // ✅ Navigation Handlers
  const goToEmployeeLogin = () => setCurrentView('emp-login');
  const goToAdminLogin = () => setCurrentView('admin-login');
  
  // ✅ YE HAI WO HANDLE LOGOUT FUNCTION JO MISSING THA
  const handleLogout = () => {
    setUserId('');
    setUserProfile(null);
    setAssessmentResult(null);
    setSelectedSkill('');
    setCurrentView('landing');
  };

  const handleEmployeeLogin = (id) => {
    setUserId(id);
    setCurrentView('dashboard');
  };

  const handleAdminLogin = (id) => {
    setUserId(id);
    setCurrentView('admin');
  };

  const handleStartAssessment = (skill) => {
    setSelectedSkill(skill);
    setCurrentView('assessment');
  };

  const handleAssessmentComplete = (result) => {
    setAssessmentResult(result);
    setCurrentView('results');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setAssessmentResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Landing Page */}
      {currentView === 'landing' && (
        <LandingPage 
          onSelectRole={(role) => role === 'employee' ? goToEmployeeLogin() : goToAdminLogin()} 
        />
      )}
      
      {/* 2. Login Pages */}
      {currentView === 'emp-login' && <EmployeeLogin onLogin={handleEmployeeLogin} onBack={goToEmployeeLogin} />}
      {currentView === 'admin-login' && <AdminLogin onLogin={handleAdminLogin} onBack={goToAdminLogin} />}
      
      {/* 3. Admin Dashboard */}
      {currentView === 'admin' && <AdminDashboard onLogout={handleLogout} />}
      
      {/* 4. Employee Dashboard (with Logout passed correctly) */}
      {currentView === 'dashboard' && (
        <Dashboard 
          userId={userId} 
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          onStartAssessment={handleStartAssessment}
          onLogout={handleLogout} 
        />
      )}
      
      {/* 5. Assessment & Results */}
      {currentView === 'assessment' && (
        <Assessment 
          userId={userId}
          skill={selectedSkill}
          onComplete={handleAssessmentComplete}
        />
      )}
      {currentView === 'results' && (
        <Results 
          result={assessmentResult}
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
}

export default App;