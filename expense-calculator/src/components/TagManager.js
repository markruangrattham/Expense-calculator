import React, { useState } from 'react';
import './TagManager.css';

const TagManager = ({ tags, handleEditTag, handleDeleteTag, editingTag, setEditingTag }) => {
  const [editValue, setEditValue] = useState('');

  const startEditing = (tag) => {
    setEditingTag(tag.id);
    setEditValue(tag.name);
  };

  const saveEdit = () => {
    if (editValue.trim()) {
      handleEditTag(editingTag, editValue.trim());
    }
  };

  const cancelEdit = () => {
    setEditingTag(null);
    setEditValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  return (
    <div className="tag-manager-section">
      <h3>Manage Tags</h3>
      <div className="tags-list">
        {tags.map((tag) => (
          <div key={tag.id} className="tag-item">
            {editingTag === tag.id ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={saveEdit}
                autoFocus
              />
            ) : (
              <span onClick={() => startEditing(tag)}>{tag.name}</span>
            )}
            <button
              onClick={() => handleDeleteTag(tag.id)}
              className="delete-tag-btn"
              title="Delete tag"
            >
              ×
            </button>
          </div>
        ))}
        {tags.length === 0 && (
          <p style={{ color: '#666', fontStyle: 'italic' }}>
            No tags yet. Create your first tag when adding an expense!
          </p>
        )}
      </div>
    </div>
  );
};

export default TagManager; 