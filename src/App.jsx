import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FreelancerDashboard from '../Views/Freelancerdashboard'
import JobDetails from '../Views/Jobdetails';
import ApplyJob from '../Views/Applyjob';
import MyApplications from '../Views/MyApplications';
import SignUp from '../Views/SignUp';
import Login from '../Views/Login';
import './app.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login />} />


      </Routes>
    </Router>
  );
}

export default App;
