import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/store';
import { updateText, addText, deleteText } from '../store/contentSlice';

const TextManager = () => {
  const dispatch = useAppDispatch();
  const { texts, loading } = useAppSelector(state => state.content);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSection, setFilterSection] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newText, setNewText] = useState({
    key: '',
    value: '',
    section: '',
  });

  const sections = [...new Set(texts.map(text => text.section))];
  
  const filteredTexts = texts.filter(text => {
    const matchesSearch = text.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         text.value.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = filterSection === 'all' || text.section === filterSection;
    return matchesSearch && matchesSection;
  });

  const handleUpdate = (id, field, value) => {
    if (field === 'value') {
      dispatch(updateText({ id, value }));
    } else {
      // Для других полей нужно будет обновить весь объект
      const text = texts.find(t => t.id === id);
      if (text) {
        dispatch(updateText({ id, value: text.value }));
      }
    }
  };

  const handleAdd = () => {
    if (newText.key && newText.value && newText.section) {
      dispatch(addText(newText));
      setNewText({ key: '', value: '', section: '' });
      setShowAddForm(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот текст?')) {
      dispatch(deleteText(id));
    }
  };

  return (
    <div className="text-manager">
      <div className="manager-header">
        <h2>📝 Управление текстами</h2>
        <button 
          className="add-btn"
          onClick={() => setShowAddForm(true)}
        >
          ➕ Добавить текст
        </button>
      </div>

      {/* Фильтры и поиск */}
      <div className="manager-filters">
        <input
          type="text"
          placeholder="🔍 Поиск по ключу или тексту..."
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
          <h3>➕ Добавить новый текст</h3>
          <div className="form-group">
            <label>Ключ:</label>
            <input
              type="text"
              value={newText.key}
              onChange={(e) => setNewText({...newText, key: e.target.value})}
              placeholder="Например: hero_title"
            />
          </div>
          <div className="form-group">
            <label>Раздел:</label>
            <input
              type="text"
              value={newText.section}
              onChange={(e) => setNewText({...newText, section: e.target.value})}
              placeholder="Например: hero"
            />
          </div>
          <div className="form-group">
            <label>Текст:</label>
            <textarea
              value={newText.value}
              onChange={(e) => setNewText({...newText, value: e.target.value})}
              placeholder="Введите текст..."
              rows={4}
            />
          </div>
          <div className="form-actions">
            <button onClick={handleAdd} className="save-btn">💾 Сохранить</button>
            <button onClick={() => setShowAddForm(false)} className="cancel-btn">❌ Отмена</button>
          </div>
        </div>
      )}

      {/* Таблица текстов */}
      <div className="texts-table">
        <div className="table-header">
          <div>Ключ</div>
          <div>Раздел</div>
          <div>Текст</div>
          <div>Действия</div>
        </div>
        
        <div className="table-body">
          {filteredTexts.map(text => (
            <div key={text.id} className="table-row">
              <div className="cell">
                {editingId === text.id ? (
                  <input
                    type="text"
                    value={text.key}
                    onChange={(e) => handleUpdate(text.id, 'key', e.target.value)}
                    className="edit-input"
                  />
                ) : (
                  <span className="text-key">{text.key}</span>
                )}
              </div>
              
              <div className="cell">
                <span className="section-badge">{text.section}</span>
              </div>
              
              <div className="cell">
                {editingId === text.id ? (
                  <textarea
                    value={text.value}
                    onChange={(e) => handleUpdate(text.id, 'value', e.target.value)}
                    className="edit-textarea"
                    rows={3}
                  />
                ) : (
                  <span className="text-value">{text.value}</span>
                )}
              </div>
              
              <div className="cell actions">
                {editingId === text.id ? (
                  <button 
                    onClick={() => setEditingId(null)}
                    className="save-btn"
                  >
                    ✅
                  </button>
                ) : (
                  <button 
                    onClick={() => setEditingId(text.id)}
                    className="edit-btn"
                  >
                    ✏️
                  </button>
                )}
                
                <button 
                  onClick={() => handleDelete(text.id)}
                  className="delete-btn"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredTexts.length === 0 && (
        <div className="empty-state">
          <p>📝 Тексты не найдены</p>
        </div>
      )}
    </div>
  );
};

export default TextManager;
