import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/store';
import { updateImage, addImage, deleteImage } from '../store/contentSlice';

const ImageManager = () => {
  const dispatch = useAppDispatch();
  const { images } = useAppSelector(state => state.content);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSection, setFilterSection] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newImage, setNewImage] = useState({
    src: '',
    alt: '',
    section: '',
    order: 1,
  });

  const sections = [...new Set(images.map(image => image.section))];
  
  const filteredImages = images.filter(image => {
    const matchesSearch = image.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.src.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = filterSection === 'all' || image.section === filterSection;
    return matchesSearch && matchesSection;
  });

  const handleUpdate = (id, field, value) => {
    const updates = {};
    updates[field] = field === 'order' ? parseInt(value) : value;
    dispatch(updateImage({ id, updates }));
  };

  const handleAdd = () => {
    if (newImage.src && newImage.alt && newImage.section) {
      dispatch(addImage(newImage));
      setNewImage({ src: '', alt: '', section: '', order: 1 });
      setShowAddForm(false);
    }
  };

  const handleDelete = (id) => {
    if (globalThis.confirm('Вы уверены, что хотите удалить это изображение?')) {
      dispatch(deleteImage(id));
    }
  };

  return (
    <div className="image-manager">
      <div className="manager-header">
        <h2>🖼️ Управление изображениями</h2>
        <button 
          className="add-btn"
          onClick={() => setShowAddForm(true)}
        >
          ➕ Добавить изображение
        </button>
      </div>

      {/* Фильтры и поиск */}
      <div className="manager-filters">
        <input
          type="text"
          placeholder="🔍 Поиск по названию или пути..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <select
          value={filterSection}
          onChange={(e) => setFilterSection(e.target.value)}
          className="filter-select"
        >
          <option value="all">Все разделы</option>
          {sections.map(section => (
            <option key={section} value={section}>{section}</option>
          ))}
        </select>
      </div>

      {/* Форма добавления */}
      {showAddForm && (
        <div className="add-form">
          <h3>➕ Добавить новое изображение</h3>
          <div className="form-group">
            <label htmlFor="img-src">Путь к изображению:</label>
            <input
              id="img-src"
              type="text"
              value={newImage.src}
              onChange={(e) => setNewImage({...newImage, src: e.target.value})}
              placeholder="/assets/images/example.jpg"
            />
          </div>
          <div className="form-group">
            <label htmlFor="img-alt">Описание (alt):</label>
            <input
              id="img-alt"
              type="text"
              value={newImage.alt}
              onChange={(e) => setNewImage({...newImage, alt: e.target.value})}
              placeholder="Описание изображения"
            />
          </div>
          <div className="form-group">
            <label htmlFor="img-section">Раздел:</label>
            <input
              id="img-section"
              type="text"
              value={newImage.section}
              onChange={(e) => setNewImage({...newImage, section: e.target.value})}
              placeholder="Например: hero"
            />
          </div>
          <div className="form-group">
            <label htmlFor="img-order">Порядок:</label>
            <input
              id="img-order"
              type="number"
              value={newImage.order}
              onChange={(e) => setNewImage({...newImage, order: parseInt(e.target.value)})}
              min="1"
            />
          </div>
          <div className="form-actions">
            <button onClick={handleAdd} className="save-btn">💾 Сохранить</button>
            <button onClick={() => setShowAddForm(false)} className="cancel-btn">❌ Отмена</button>
          </div>
        </div>
      )}

      {/* Галерея изображений */}
      <div className="images-grid">
        {filteredImages.map(image => (
          <div key={image.id} className="image-card">
            <div className="image-preview">
              {image.src ? (
                <img 
                  src={image.src} 
                  alt={image.alt}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+5L2c5Li65LiN5a2Y5LymPC90ZXh0Pjwvc3ZnPg==';
                  }}
                />
              ) : (
                <div className="no-image">🖼️ Нет изображения</div>
              )}
            </div>
            
            <div className="image-info">
              {editingId === image.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={image.alt}
                    onChange={(e) => handleUpdate(image.id, 'alt', e.target.value)}
                    placeholder="Описание"
                    className="edit-input"
                  />
                  <input
                    type="text"
                    value={image.src}
                    onChange={(e) => handleUpdate(image.id, 'src', e.target.value)}
                    placeholder="Путь"
                    className="edit-input"
                  />
                  <input
                    type="text"
                    value={image.section}
                    onChange={(e) => handleUpdate(image.id, 'section', e.target.value)}
                    placeholder="Раздел"
                    className="edit-input"
                  />
                  <input
                    type="number"
                    value={image.order}
                    onChange={(e) => handleUpdate(image.id, 'order', e.target.value)}
                    min="1"
                    className="edit-input small"
                  />
                </div>
              ) : (
                <div className="image-details">
                  <div className="image-title">{image.alt}</div>
                  <div className="image-meta">
                    <span className="section-badge">{image.section}</span>
                    <span className="order-badge">#{image.order}</span>
                  </div>
                  <div className="image-path">{image.src}</div>
                </div>
              )}
            </div>
            
            <div className="image-actions">
              {editingId === image.id ? (
                <button 
                  onClick={() => setEditingId(null)}
                  className="save-btn"
                >
                  ✅ Сохранить
                </button>
              ) : (
                <button 
                  onClick={() => setEditingId(image.id)}
                  className="edit-btn"
                >
                  ✏️ Редактировать
                </button>
              )}
              
              <button 
                onClick={() => handleDelete(image.id)}
                className="delete-btn"
              >
                🗑️ Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="empty-state">
          <p>🖼️ Изображения не найдены</p>
        </div>
      )}
    </div>
  );
};

export default ImageManager;
