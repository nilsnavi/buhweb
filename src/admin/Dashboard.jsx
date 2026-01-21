import React from 'react';
import { useAppSelector } from '../store/store';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { texts, images, blocks } = useAppSelector(state => state.content);

  const stats = {
    totalTexts: texts.length,
    totalImages: images.length,
    totalBlocks: blocks.length,
    visibleBlocks: blocks.filter(b => b.visible).length,
    hiddenBlocks: blocks.filter(b => !b.visible).length,
  };

  const recentTexts = texts.slice(-3);
  const recentImages = images.slice(-3);

  const blocksByType = blocks.reduce((acc, block) => {
    acc[block.type] = (acc[block.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>📊 Обзор</h2>
        <p>Добро пожаловать в админ-панель управления контентом</p>
      </div>

      {/* Статистика */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>{stats.totalTexts}</h3>
            <p>Текстовых элементов</p>
          </div>
          <Link to="/admin/texts" className="stat-link">Управлять →</Link>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🖼️</div>
          <div className="stat-content">
            <h3>{stats.totalImages}</h3>
            <p>Изображений</p>
          </div>
          <Link to="/admin/images" className="stat-link">Управлять →</Link>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🧱</div>
          <div className="stat-content">
            <h3>{stats.totalBlocks}</h3>
            <p>Блоков всего</p>
          </div>
          <Link to="/admin/blocks" className="stat-link">Управлять →</Link>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.visibleBlocks}</h3>
            <p>Активных блоков</p>
          </div>
        </div>
      </div>

      {/* Дополнительная информация */}
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h3>📈 Типы блоков</h3>
          <div className="block-types">
            {Object.entries(blocksByType).map(([type, count]) => (
              <div key={type} className="block-type-item">
                <span className="block-type-name">{type}</span>
                <span className="block-type-count">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h3>📝 Последние тексты</h3>
          <div className="recent-items">
            {recentTexts.map(text => (
              <div key={text.id} className="recent-item">
                <div>
                  <strong>{text.key}</strong>
                  <small> ({text.section})</small>
                </div>
                <div className="recent-preview">
                  {text.value.substring(0, 50)}...
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h3>🖼️ Последние изображения</h3>
          <div className="recent-items">
            {recentImages.map(image => (
              <div key={image.id} className="recent-item">
                <div>
                  <strong>{image.alt}</strong>
                  <small> ({image.section})</small>
                </div>
                <div className="recent-preview">
                  {image.src}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Быстрые действия */}
      <div className="quick-actions">
        <h3>⚡ Быстрые действия</h3>
        <div className="actions-grid">
          <Link to="/admin/texts?action=add" className="action-btn">
            ➕ Добавить текст
          </Link>
          <Link to="/admin/images?action=add" className="action-btn">
            🖼️ Добавить изображение
          </Link>
          <Link to="/admin/blocks?action=add" className="action-btn">
            🧱 Добавить блок
          </Link>
          <Link to="/" target="_blank" className="action-btn">
            🌐 Открыть сайт
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
