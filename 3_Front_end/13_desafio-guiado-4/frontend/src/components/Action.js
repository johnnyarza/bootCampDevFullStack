import React from 'react';

export default function Action({ type, id, onActionClick }) {
  const handleIconClick = () => {
    onActionClick(id, type);
  };
  return (
    <span
      className="material-icons"
      onClick={handleIconClick}
      style={{ cursor: 'pointer' }}
    >
      {type}
    </span>
  );
}
