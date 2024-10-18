import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Image } from 'react-bootstrap';
import { MdModeEdit } from "react-icons/md";
import AvatarBlank from '../assets/avt-blank.jpg';
import '../styles/screens/Profile.css';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setError('Token không hợp lệ, vui lòng đăng nhập lại');
          navigate('/login');
          return;
        }

        const response = await fetch('https://bepickleball.vercel.app/api/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data.profile);
          setLoading(false);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Có lỗi xảy ra khi tải thông tin hồ sơ');
        }
      } catch (error) {
        setError('Lỗi kết nối tới máy chủ');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedProfile({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
        const formData = new FormData();

        // Thêm thông tin hồ sơ vào FormData
        formData.append('name', updatedProfile.name);
        formData.append('skill_level', updatedProfile.skill_level);
        formData.append('bio', updatedProfile.bio);
        formData.append('phone_number', updatedProfile.phone_number);
        formData.append('facebook_link', updatedProfile.facebook_link);

        // Thêm file ảnh nếu có
        if (updatedProfile.avatar) {
            formData.append('avatar', updatedProfile.avatar); // `files` là tên field trong backend
        }

        const response = await fetch('https://bepickleball.vercel.app/api/auth/profile/update', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'application/json', // Không cần thêm header này khi dùng FormData
            },
            body: formData, // Gửi FormData
        });

        if (response.ok) {
            const data = await response.json();
            alert('Cập nhật hồ sơ thành công!');
            setProfileData(prevData => ({
                ...prevData,
                profile: {
                    ...prevData.profile,
                    ...updatedProfile,
                }
            }));
            setIsEditing(false);
            setUpdatedProfile({});
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Có lỗi xảy ra khi cập nhật hồ sơ');
        }
    } catch (error) {
        alert('Lỗi kết nối tới máy chủ');
    }
};


  const handleChangePassword = async (e) => {
    navigate('/change-password');
  }

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profileData) {
    return <p>Không có dữ liệu hồ sơ</p>;
  }

  return (
    <div className="profile-container">
      <h1>Thông tin cá nhân</h1>
      <div className="profile-card">
        {isEditing ? (
          <>
            <Form onSubmit={handleSubmit}>
              <div className="profile-header">
                {/* <Image src={profileData?.profile?.avatar || AvatarBlank} alt="Avatar" className="profile-avatar" roundedCircle /> */}
                {/* <h2>{profileData?.profile?.name || 'Tên chưa cập nhật'}</h2> */}
                <Image src={profileData?.profile?.avatar || AvatarBlank} alt="Avatar" className="profile-avatar" roundedCircle />
                <Form.Group controlId="profile-avatar">
                  <Form.Label>Ảnh đại diện</Form.Label>
                  <Form.Control
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  </Form.Group>
                <Form.Group controlId="profile-name">
                  <Form.Label>Họ Và Tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={updatedProfile.name || profileData?.profile?.name || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
                <p className="profile-role">{profileData?.role?.toUpperCase() || 'Vai trò chưa cập nhật'}</p>
              </div>
              <div className="profile-body">
                <div className="profile-info">
                  <label>Tài khoản:</label>
                  <p>{profileData?.username || 'Chưa cập nhật'}</p>
                </div>
                <div className="profile-info">
                  <label>Email:</label>
                  <p>{profileData?.email || 'Chưa cập nhật'}</p>
                </div>
                <div className="profile-info">
                  <label>Số điện thoại:</label>
                  <p>{profileData?.phone || 'Chưa cập nhật'}</p>
                </div>

                <Form.Group controlId="skillLevel">
                  <Form.Label>Cấp độ kỹ năng</Form.Label>
                  <Form.Control
                    type="text"
                    name="skill_level"
                    value={updatedProfile.skill_level || profileData?.profile?.skill_level || ''}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="bio">
                  <Form.Label>Tiểu sử</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="bio"
                    value={updatedProfile.bio || profileData?.profile?.bio || ''}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="phoneNumber">
                  <Form.Label>Liên hệ khác</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone_number"
                    value={updatedProfile.phone_number || profileData?.profile?.phone_number || ''}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="facebookLink">
                  <Form.Label>Facebook</Form.Label>
                  <Form.Control
                    type="text"
                    name="facebook_link"
                    value={updatedProfile.facebook_link || profileData?.profile?.facebook_link || ''}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button type="submit" variant="primary">Lưu</Button>
                <Button variant="secondary" onClick={handleCancel} style={{ marginLeft: '10px' }}>Hủy</Button>

              </div>
            </Form>
          </>

        ) : (
          <>
            <div className="profile-header">
              <Image src={profileData?.profile?.avatar || AvatarBlank} alt="Avatar" className="profile-avatar" roundedCircle />
              <h2>{profileData?.profile?.name || 'Tên chưa cập nhật'}</h2>
              <p className="profile-role">{profileData?.role?.toUpperCase() || 'Vai trò chưa cập nhật'}</p>
            </div>
            <div className="profile-body">
              <div className="profile-info">
                <label>Tài khoản:</label>
                <p>{profileData?.username || 'Chưa cập nhật'}</p>
              </div>
              <div className="profile-info">
                <label>Email:</label>
                <p>{profileData?.email || 'Chưa cập nhật'}</p>
              </div>
              <div className="profile-info">
                <label>Số điện thoại:</label>
                <p>{profileData?.phone || 'Chưa cập nhật'}</p>
              </div>
              <div className="profile-info">
                <label>Cấp độ kỹ năng:</label>
                <p>{profileData?.profile?.skill_level || 'Chưa cập nhật'}</p>
              </div>
              <div className="profile-info">
                <label>Tiểu sử:</label>
                <p>{profileData?.profile?.bio || 'Chưa cập nhật tiểu sử'}</p>
              </div>
              <div className="profile-info">
                <label>Liên hệ khác:</label>
                <p>{profileData?.profile?.phone_number || 'Chưa có số liên hệ'}</p>
              </div>
              <div className="profile-info">
                <label>Facebook:</label>
                <p>
                  {profileData?.profile?.facebook_link ? (
                    <a href={profileData.profile.facebook_link} target="_blank" rel="noopener noreferrer">
                      Facebook cá nhân
                    </a>
                  ) : (
                    'Chưa cập nhật'
                  )}
                </p>
              </div>
            </div>
          </>
        )}

      </div>
      {!isEditing && (
        <>
          <Button variant="primary" onClick={handleEdit}>
            <MdModeEdit /> Chỉnh sửa
          </Button>
          &nbsp;
          <Button variant="primary" onClick={handleChangePassword}>
            <MdModeEdit /> Đổi mật khẩu
          </Button>
        </>
      )}
    </div>
  );
};

export default Profile;
