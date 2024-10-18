import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

const newsList = [
  // Same list as used in NewListComponent
  {
    id: 1,
    title: "Review sân Pickleball tại đường 123 Nguyễn Xiển xem thực hư...",
    date: "03 tháng 08 năm 2024",
    imageUrl: process.env.PUBLIC_URL + '/assets/images/new1.png', // replace with actual image paths
    description: "Sân chơi Pickleball Nguyễn Xiển...."
  },
  {
    id: 2,
    title: "Review sân Pickleball tại đường 286 Nguyễn Xiển xem thực hư...",
    date: "03 tháng 08 năm 2024",
    imageUrl: process.env.PUBLIC_URL + '/assets/images/new2.png',
    description: "Sân chơi Pickleball Nguyễn Xiển...."
  },
  {
    id: 3,
    title: "Review sân Pickleball tại đường 365 Nguyễn Xiển xem thực hư...",
    date: "03 tháng 08 năm 2024",
    imageUrl: process.env.PUBLIC_URL + '/assets/images/new3.png',
    description: "Sân chơi Pickleball Nguyễn Xiển...."
  },
  {
    id: 4,
    title: "Review sân Pickleball tại đường 987 Nguyễn Xiển xem thực hư...",
    date: "03 tháng 08 năm 2024",
    imageUrl: process.env.PUBLIC_URL + '/assets/images/new2.png',
    description: "Sân chơi Pickleball Nguyễn Xiển...."
  },
  {
    id: 5,
    title: "Review sân Pickleball tại đường 135 Nguyễn Xiển xem thực hư...",
    date: "03 tháng 08 năm 2024",
    imageUrl: process.env.PUBLIC_URL + '/assets/images/new1.png',
    description: "Sân chơi Pickleball Nguyễn Xiển...."
  }
];

const NewDetailComponent = () => {
  const { id } = useParams();
  const newsItem = newsList.find(news => news.id === parseInt(id));

  if (!newsItem) {
    return <div>News not found</div>;
  }

  return (
    
    <div className="">
      <Header />
      <div className="news-detail">
      <img src={newsItem.imageUrl} alt={newsItem.title} className="news-detail-image" />
      <h2>{newsItem.title}</h2>
      <p>{`Ngày đăng: ${newsItem.date}`}</p>
      <p>{newsItem.description}</p>
      </div>
    </div>
  );
};

export default NewDetailComponent;
