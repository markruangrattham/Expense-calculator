import React from 'react';
import './TagCreatorModal.css';

const TagCreatorModal = ({ 
  showTagCreator, 
  setShowTagCreator, 
  newTag, 
  setNewTag, 
  handleAddTag 
}) => {
  if (!showTagCreator) return null;

  return (
    <div className="tag-creator-popup-overlay">
      <div className="tag-creator-popup">
        <div className="tag-creator-header">
          <h4>Create New Tag</h4>
          <button 
            className="close-tag-creator-btn"
            onClick={() => setShowTagCreator(false)}
          >
            ×
          </button>
        </div>
        <form onSubmit={handleAddTag} className="tag-creator-form">
          <input
            type="text"
            placeholder="Enter new tag name"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            required
            autoFocus
          />
          <div className="tag-creator-buttons">
            <button type="submit" className="create-tag-btn">
              Create Tag
            </button>
            <button 
              type="button" 
              className="cancel-tag-btn"
              onClick={() => setShowTagCreator(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TagCreatorModal; 