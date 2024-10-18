import React, { useState, useEffect } from 'react';
import CategoriesSidebar from '../components/CategoriesSidebar';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import CoachList from '../components/CoachList';

const DashboardLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState('Bài giao lưu');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // To show loading indicator
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    // Fetch posts from the API
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://bepickleball.vercel.app/api/post/future', {
          method: 'GET',
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
  
        const data = await response.json();
  
        // Handle missing or null fields in the API data
        const transformedPosts = data.map(post => ({
        //   name: post.user_id?.username || 'Unknown User', // Check if user_id or username is null/undefined
          description: post.court_type === 'covered' ? 'Sân có mái che' : 'Sân không có mái che',
          location: post.court_address || 'No address provided', // Handle missing location
          level: post.skill_level || 'Unknown level', // Handle missing skill level
          image: post.images && post.images.length > 0 ? post.images[0] : '/assets/images/default-court.png', // Fallback to a default image
          playerNeeded: post.players_needed || 0,
        //   totalPlayers: post.total_players || 8,
        }));
  
        setPosts(transformedPosts);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, []); // Empty array ensures the effect only runs once (when the component mounts)

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard-layout d-flex justify-content-center align-items-center">
      {/* Categories Sidebar */}
      <div className="sidebar">
        <CategoriesSidebar onCategorySelect={setSelectedCategory} />
      </div>

      {/* Post List or Post Form based on the category */}
      <div className="content">
        {selectedCategory === 'Bài giao lưu' ? (
          <PostList posts={posts} />
        ) : selectedCategory === 'Xem Huấn luyện viên' ? (
          <CoachList /> // Hiển thị danh sách huấn luyện viên
        ) : (
          <PostForm />
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
