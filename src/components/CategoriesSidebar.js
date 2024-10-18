import React, { useState } from 'react';
import '../styles/screens/CategoriesSidebar.css'; // Add your custom styles if necessary

const CategoriesSidebar = ({ onCategorySelect }) => {
  const categories = ['Bài giao lưu', 'Huấn luyện viên', 'Xem Huấn luyện viên'];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  return (
    <div className="categories-sidebar">
      <h4 style={{textAlign: 'left', paddingLeft: '10px'}}>Danh mục</h4>
      <p style={{textAlign: 'left', color: '#828282', paddingLeft: '10px'}}>Các mục chính sửa</p>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            className={category === selectedCategory ? 'active' : ''}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesSidebar;
