import React, { useState } from 'react';
import { Link, useLocation, Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import Dashboard from './Dashboard.jsx';
import TextManager from './TextManager.jsx';
import ImageManager from './ImageManager.jsx';
import BlockManager from './BlockManager.jsx';

const AdminLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { texts, images, blocks } = useAppSelector(state => state.content);

  const menuItems = [
    { path: '/admin', label: 'Дашборд', icon: '📊' },
    { path: '/admin/texts', label: 'Тексты', icon: '📝' },
    { path: '/admin/images', label: 'Изображения', icon: '🖼️' },
    { path: '/admin/blocks', label: 'Блоки', icon: '🧱' },
  ];

  const stats = {
    texts: texts.length,
    images: images.length,
    blocks: blocks.length,
    visibleBlocks: blocks.filter(b => b.visible).length,
  };

  return (
    <div className="admin-layout">
      {/* Сайдбар */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>🔧 Админ-панель</h2>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map(item => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {sidebarOpen && <span className="nav-label">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {sidebarOpen && (
          <div className="sidebar-stats">
            <h3>Статистика</h3>
            <div className="stat-item">
              <span>📝 Тексты:</span>
              <span>{stats.texts}</span>
            </div>
            <div className="stat-item">
              <span>🖼️ Изображения:</span>
              <span>{stats.images}</span>
            </div>
            <div className="stat-item">
              <span>🧱 Блоки:</span>
              <span>{stats.blocks}</span>
            </div>
            <div className="stat-item">
              <span>✅ Активные:</span>
              <span>{stats.visibleBlocks}</span>
            </div>
          </div>
        )}
      </aside>

      {/* Основной контент */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-content">
            <h1>Управление контентом</h1>
            <div className="header-actions">
              <Link to="/" className="view-site-btn">
                🌐 Посмотреть сайт
              </Link>
            </div>
          </div>
        </header>

        <div className="admin-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/texts" element={<TextManager />} />
            <Route path="/images" element={<ImageManager />} />
            <Route path="/blocks" element={<BlockManager />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
