// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './components/common/Loader';
import ErrorBoundary from './components/common/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GaragePage from './pages/GaragePage';
import GearListPage from './pages/GearListPage';
import ListsDashboard from './pages/ListsDashboard';
import Sidebar from './components/Layout/Sidebar';

function App() {
  const isAuthenticated = useSelector((state) => !!state.auth.token);
  const listsLoading = useSelector((state) => state.lists.loading);
  const garageLoading = useSelector((state) => state.garage.loading);
  const isSaving = listsLoading || garageLoading;

  return (
    <>
      {isSaving && <Loader />}
test
      <div className="app-container flex min-h-screen">
        {isAuthenticated && (
          <aside className="w-64 bg-gray-100">
            <Sidebar />
          </aside>
        )}

        <main className="flex-1 p-4">
          <ErrorBoundary>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route
                path="/garage"
                element={
                  isAuthenticated ? <GaragePage /> : <Navigate to="/login" replace />
                }
              />

              <Route
                path="/lists"
                element={
                  isAuthenticated ? <ListsDashboard /> : <Navigate to="/login" replace />
                }
              />

              <Route
                path="/lists/:id"
                element={
                  isAuthenticated ? <GearListPage /> : <Navigate to="/login" replace />
                }
              />

              <Route
                path="*"
                element={
                  <Navigate to={isAuthenticated ? '/garage' : '/login'} replace />
                }
              />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar pauseOnHover />
    </>
  );
}

export default App;
