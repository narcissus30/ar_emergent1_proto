import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Screen Components
import LoginScreen from './screens/LoginScreen';
import WorkflowBuilder from './screens/WorkflowBuilder';
import AIReviewScreen from './screens/AIReviewScreen';
import ApplicationDistribution from './screens/ApplicationDistribution';
import ScholarshipManagement from './screens/ScholarshipManagement';
import AnalyticsDashboard from './screens/AnalyticsDashboard';

// Layout Component
import Layout from './components/Layout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [universityData, setUniversityData] = useState(null);

  const handleLogin = (data) => {
    setIsAuthenticated(true);
    setUniversityData(data);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUniversityData(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? (
                <LoginScreen onLogin={handleLogin} />
              ) : (
                <Navigate to="/workflow-builder" />
              )
            } 
          />
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <Layout universityData={universityData} onLogout={handleLogout}>
                  <Routes>
                    <Route path="/workflow-builder" element={<WorkflowBuilder />} />
                    <Route path="/ai-review" element={<AIReviewScreen />} />
                    <Route path="/application-distribution" element={<ApplicationDistribution />} />
                    <Route path="/scholarship-management" element={<ScholarshipManagement />} />
                    <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
                    <Route path="/" element={<Navigate to="/workflow-builder" />} />
                  </Routes>
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;