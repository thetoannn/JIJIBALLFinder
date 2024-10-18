import React from 'react';
import NewListComponent from './NewListComponent';
import '../styles/screens/NewsComponent.css'; // Add CSS styles as needed

const NewsComponent = () => {
  return (
    <div className="news-section">
      <h2 className="news-title" style={{fontWeight: "600"}}>Tin tức mới</h2>
      <NewListComponent />
    </div>
  );
};

export default NewsComponent;