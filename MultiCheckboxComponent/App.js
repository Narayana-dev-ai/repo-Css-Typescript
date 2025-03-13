import React, { useState } from 'react';
import Checkbox from './Checkbox';

const App = () => {
  const initialData = [
    {
      id: 1,
      label: 'Item 1',
      children: [
        { id: 2, label: 'Item 1.1' },
        { id: 3, label: 'Item 1.2' },
      ],
    },
    {
      id: 4,
      label: 'Item 2',
      children: [
        { id: 5, label: 'Item 2.1' },
        {
          id: 6,
          label: 'Item 2.2',
          children: [
            { id: 7, label: 'Item 2.2.1' },
            { id: 8, label: 'Item 2.2.2' },
          ],
        },
      ],
    },
  ];

  const [data, setData] = useState(initialData);
console.log(data);
  const handleCheckboxChange = (id, checked) => {
    setData((prevData) => {
      return prevData.map((item) => updateCheckboxState(item, id, checked));
    });
  };

  const updateCheckboxState = (item, id, checked) => {
    if (item.id === id) {
      return { ...item, checked, children: updateChildrenState(item.children, checked) };
    }
    if (item.children) {
      const updatedChildren = item.children.map((child) =>
        updateCheckboxState(child, id, checked)
      );
      const allChildrenChecked = updatedChildren.every((child) => child.checked);
      return {
        ...item,
        children: updatedChildren,
        checked: allChildrenChecked,
      };
    }
    return item;
  };

  const updateChildrenState = (children, checked) => {
    if (!children) return null;
    return children.map((child) => ({
      ...child,
      checked,
      children: updateChildrenState(child.children, checked),
    }));
  };

  return (
    <div>
      <h1>Nested Checkbox Component</h1>
      {data.map((item) => (
        <Checkbox
          key={item.id}
          item={item}
          onChange={handleCheckboxChange}
        />
      ))}
    </div>
  );
};

export default App;