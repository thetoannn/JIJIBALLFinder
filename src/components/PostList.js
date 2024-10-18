import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import '../styles/screens/PostList.css'; // Add your custom styles

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://bepickleball.vercel.app/api/post/future');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        console.log('Fetched posts:', data);  // Log dữ liệu API để kiểm tra
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Có lỗi xảy ra khi tải dữ liệu.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Hàm xóa bài đăng
  const handleDelete = async (postId) => {
    if (!postId) {
      console.error('Không có postId để xóa');
      return;
    }
    console.log(postId, "---------");
    

    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa bài đăng này?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn cần đăng nhập để thực hiện hành động này.');
      return;
    }

    console.log('Token:', token);

    try {
      const response = await fetch(`https://bepickleball.vercel.app/api/post/delete/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Thêm token vào header
        },
      });
console.log("response", response);

      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== postId));
        alert('Bài đăng đã được xóa thành công');
      } else {
        alert('Xóa bài đăng thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi xóa bài đăng:', error);
      alert('Có lỗi xảy ra khi xóa bài đăng');
    }
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="post-list">
      <h4 style={{ paddingLeft: '10px' }}>Bài đăng</h4>

      <div className="post-items scrollable-list">
        {posts.map((post) => (
          <div key={post._id} className="post-item">
            <img 
              src={post.images[0] || '/assets/images/default-court.png'} 
              alt={post.court_name} 
              className="post-image" 
            />
            <div className="post-details">
              <p style={{ color: '#2D70A1' }}>{post.court_type}</p>
              <h5>{post.court_name}</h5>
              <p style={{ color: '#828282' }}>
                Yêu cầu: {post.players_needed}/{post.total_players} người - Trình độ: {post.skill_level}
              </p>
            </div>
            <div className="post-actions">
              <Button variant="danger" onClick={() => handleDelete(post._id)}>Xóa</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
