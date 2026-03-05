import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { AnalyticsProvider } from './components/Analytics.jsx';
import FloatingButtons from './components/FloatingButtons.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import { DynamicBlocksList } from './components/DynamicBlock.jsx';
import { NotificationProvider } from './components/NotificationSystem.jsx';
import PWAInstaller from './components/PWAInstaller.jsx';
import SEO from './components/SEO.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import { useTheme } from './hooks/useTheme.js';
import { store } from './store/store';

import './styles/admin.css';
import './styles/business.css';
import './styles/components-business.css';
import './styles/theme.css';

// Lazy loading для админ-панели
const AdminLayout = lazy(() => import(/* webpackChunkName: "admin" */ './admin/AdminLayout.jsx'));
const Dashboard = lazy(() => import(/* webpackChunkName: "admin" */ './admin/Dashboard.jsx'));
const TextManager = lazy(() => import(/* webpackChunkName: "admin" */ './admin/TextManager.jsx'));
const ImageManager = lazy(() => import(/* webpackChunkName: "admin" */ './admin/ImageManager.jsx'));
const BlockManager = lazy(() => import(/* webpackChunkName: "admin" */ './admin/BlockManager.jsx'));

// Компонент загрузки
const LoadingSpinner = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px',
      fontSize: '1.5rem',
    }}
  >
    <div className="animate-pulse">⏳ Загрузка...</div>
  </div>
);

const App = () => {
  const { initializeTheme } = useTheme();

  // Инициализация темы при монтировании
  React.useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <HelmetProvider>
      <Provider store={store}>
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Админ-панель */}
              <Route
                path="/admin"
                element={<AdminLayout />}
              >
                <Route
                  index
                  element={<Dashboard />}
                />
                <Route
                  path="texts"
                  element={<TextManager />}
                />
                <Route
                  path="images"
                  element={<ImageManager />}
                />
                <Route
                  path="blocks"
                  element={<BlockManager />}
                />
              </Route>

              {/* Основной сайт */}
              <Route
                path="/*"
                element={
                  <AnalyticsProvider>
                    <NotificationProvider>
                      <SEO />
                      <div className="App">
                        <Header />
                        <div className="controls-container">
                          <ThemeToggle />
                        </div>
                        <main>
                          <DynamicBlocksList />
                        </main>
                        <Footer />
                        <PWAInstaller />
                        <FloatingButtons />
                      </div>
                    </NotificationProvider>
                  </AnalyticsProvider>
                }
              />
            </Routes>
          </Suspense>
        </Router>
      </Provider>
    </HelmetProvider>
  );
};

export default App;
