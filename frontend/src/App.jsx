import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import NavigationBar from './components/NavigationBar';
import Summary from './pages/summary/summaryPage';
import Dashboard from './pages/dashboard/dashboard';
import Transaction from './pages/transaction/transactions';
import Reports from './pages/reports/reportpage'
import ProtectedRoute from './pages/auth/protectedRoutes';
import { AuthProvider } from './context/authContext';
import Register from './pages/auth/register';
import Login from './pages/auth/login';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <Router> 
      <AuthProvider>
        <NavigationBar />
        {/* <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
        <Link to='/dashboard'>Dashboard</Link> */}
      
        <Routes>
         
          <Route path="/" element={<Navigate to="/login" />} />
          
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              
              </ProtectedRoute>
            }
          />
          <Route
            path="/transaction" 
            element={
              <ProtectedRoute>
                <Transaction/>
              </ProtectedRoute>
            }
          />
           <Route
            path="/summary" 
            element={
              <ProtectedRoute>
                <Summary/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/report" 
            element={
              <ProtectedRoute>
                <Reports/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}