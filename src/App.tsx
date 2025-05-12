import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Chat from './pages/Chat';
import Auth from './pages/Auth';
import Navigation from './components/Navigation';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    console.log('Login attempt'); // Добавим для отладки
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 w-full flex flex-col items-center">
        <div className="w-full max-w-7xl mx-auto px-4">
          <Routes>
            <Route
              path="/auth"
              element={
                isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : (
                  <Auth onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <div className="pb-16">
                    <Feed />
                    <Navigation />
                  </div>
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
            <Route
              path="/search"
              element={
                isAuthenticated ? (
                  <div className="pb-16">
                    <Search />
                    <Navigation />
                  </div>
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
            <Route
              path="/chat"
              element={
                isAuthenticated ? (
                  <div className="pb-16">
                    <Chat />
                    <Navigation />
                  </div>
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ? (
                  <div className="pb-16">
                    <Profile />
                    <Navigation />
                  </div>
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
