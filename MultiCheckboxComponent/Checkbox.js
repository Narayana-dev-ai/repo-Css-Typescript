import React from 'react';

const Checkbox = ({ item, onChange }) => {
  const handleChange = (e) => {
    onChange(item.id, e.target.checked);
  };

  return (
    <div style={{ marginLeft: 20 }}>
      <label>
        <input
          type="checkbox"
          checked={item.checked || false}
          onChange={handleChange}
        />
        {item.label}
      </label>
      {item.children && (
        <div>
          {item.children.map((child) => (
            <Checkbox key={child.id} item={child} onChange={onChange} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Checkbox;