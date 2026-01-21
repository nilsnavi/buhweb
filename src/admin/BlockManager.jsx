import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/store';
import { updateBlock, addBlock, deleteBlock, reorderBlocks } from '../store/contentSlice';

const BlockManager = () => {
  const dispatch = useAppDispatch();
  const { blocks } = useAppSelector(state => state.content);
  const [editingId, setEditingId] = useState(null);
  const [filterSection, setFilterSection] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [draggedBlock, setDraggedBlock] = useState(null);
  const [newBlock, setNewBlock] = useState({
    type: 'text',
    section: '',
    order: blocks.length + 1,
    visible: true,
    content: {},
  });

  const blockTypes = ['text', 'image', 'hero', 'services', 'features', 'calculator', 'pricing', 'reviews', 'faq', 'contact'];
  const sections = [...new Set(blocks.map(block => block.section))];
  
  const filteredBlocks = blocks.filter(block => {
    const matchesSection = filterSection === 'all' || block.section === filterSection;
    const matchesType = filterType === 'all' || block.type === filterType;
    return matchesSection && matchesType;
  }).sort((a, b) => a.order - b.order);

  const handleUpdate = (id, field, value) => {
    const updates = {};
    if (field === 'order') {
      updates[field] = Number.parseInt(value);
    } else if (field === 'visible') {
      updates[field] = value;
    } else {
      updates[field] = value;
    }
    dispatch(updateBlock({ id, updates }));
  };

  const handleAdd = () => {
    if (newBlock.type && newBlock.section) {
      dispatch(addBlock(newBlock));
      setNewBlock({
        type: 'text',
        section: '',
        order: blocks.length + 1,
        visible: true,
        content: {},
      });
      setShowAddForm(false);
    }
  };

  const handleDelete = (id) => {
    if (globalThis.confirm('Вы уверены, что хотите удалить этот блок?')) {
      dispatch(deleteBlock(id));
    }
  };

  const handleDragStart = (block) => {
    setDraggedBlock(block);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetBlock) => {
    if (draggedBlock && draggedBlock.id !== targetBlock.id) {
      const newOrder = [...filteredBlocks];
      const draggedIndex = newOrder.findIndex(b => b.id === draggedBlock.id);
      const targetIndex = newOrder.findIndex(b => b.id === targetBlock.id);
      
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedBlock);
      
      const blockIds = newOrder.map(b => b.id);
      dispatch(reorderBlocks({ blockIds }));
    }
    setDraggedBlock(null);
  };

  const toggleVisibility = (id) => {
    const block = blocks.find(b => b.id === id);
    if (block) {
      dispatch(updateBlock({ id, updates: { visible: !block.visible } }));
    }
  };

  return (
    <div className="block-manager">
      <div className="manager-header">
        <h2>🧱 Управление блоками</h2>
        <button 
          className="add-btn"
          onClick={() => setShowAddForm(true)}
        >
          ➕ Добавить блок
        </button>
      </div>

      {/* Фильтры */}
      <div className="manager-filters">
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
        
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="filter-select"
        >
          <option value="all">Все типы</option>
          {blockTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Форма добавления */}
      {showAddForm && (
        <div className="add-form">
          <h3>➕ Добавить новый блок</h3>
          <div className="form-group">
            <label htmlFor="block-type">Тип блока:</label>
            <select
              id="block-type"
              value={newBlock.type}
              onChange={(e) => setNewBlock({...newBlock, type: e.target.value})}
            >
              {blockTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="block-section">Раздел:</label>
            <input
              id="block-section"
              type="text"
              value={newBlock.section}
              onChange={(e) => setNewBlock({...newBlock, section: e.target.value})}
              placeholder="Например: main"
            />
          </div>
          <div className="form-group">
            <label htmlFor="block-order">Порядок:</label>
            <input
              id="block-order"
              type="number"
              value={newBlock.order}
              onChange={(e) => setNewBlock({...newBlock, order: Number.parseInt(e.target.value)})}
              min="1"
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={newBlock.visible}
                onChange={(e) => setNewBlock({...newBlock, visible: e.target.checked})}
              />
              Видимый
            </label>
          </div>
          <div className="form-actions">
            <button onClick={handleAdd} className="save-btn">💾 Сохранить</button>
            <button onClick={() => setShowAddForm(false)} className="cancel-btn">❌ Отмена</button>
          </div>
        </div>
      )}

      {/* Список блоков */}
      <div className="blocks-list">
        {filteredBlocks.map((block, index) => (
          <div 
            key={block.id} 
            className={`block-item ${!block.visible ? 'hidden' : ''} ${draggedBlock?.id === block.id ? 'dragging' : ''}`}
            draggable
            onDragStart={() => handleDragStart(block)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(block)}
          >
            <div className="block-header">
              <div className="block-drag">⋮⋮</div>
              <div className="block-info">
                <h4>{block.type}</h4>
                <div className="block-meta">
                  <span className="section-badge">{block.section}</span>
                  <span className="order-badge">#{block.order}</span>
                  <span className={`visibility-badge ${block.visible ? 'visible' : 'hidden'}`}>
                    {block.visible ? '👁️ Видимый' : '👁️‍🗨️ Скрытый'}
                  </span>
                </div>
              </div>
              <div className="block-actions">
                <button 
                  onClick={() => toggleVisibility(block.id)}
                  className={`visibility-btn ${block.visible ? 'hide' : 'show'}`}
                >
                  {block.visible ? '👁️‍🗨️' : '👁️'}
                </button>
                <button 
                  onClick={() => setEditingId(editingId === block.id ? null : block.id)}
                  className="edit-btn"
                >
                  ✏️
                </button>
                <button 
                  onClick={() => handleDelete(block.id)}
                  className="delete-btn"
                >
                  🗑️
                </button>
              </div>
            </div>
            
            {editingId === block.id && (
              <div className="block-edit">
                <div className="edit-form">
                  <div className="form-row">
                    <label>Раздел:</label>
                    <input
                      type="text"
                      value={block.section}
                      onChange={(e) => handleUpdate(block.id, 'section', e.target.value)}
                    />
                  </div>
                  <div className="form-row">
                    <label>Порядок:</label>
                    <input
                      type="number"
                      value={block.order}
                      onChange={(e) => handleUpdate(block.id, 'order', e.target.value)}
                      min="1"
                    />
                  </div>
                  <div className="form-row">
                    <label>
                      <input
                        type="checkbox"
                        checked={block.visible}
                        onChange={(e) => handleUpdate(block.id, 'visible', e.target.checked)}
                      />
                      Видимый
                    </label>
                  </div>
                  <div className="form-actions">
                    <button 
                      onClick={() => setEditingId(null)}
                      className="save-btn"
                    >
                      ✅ Сохранить
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredBlocks.length === 0 && (
        <div className="empty-state">
          <p>🧱 Блоки не найдены</p>
        </div>
      )}

      <div className="help-text">
        <p>💡 Совет: Перетаскивайте блоки для изменения порядка отображения</p>
      </div>
    </div>
  );
};

export default BlockManager;
