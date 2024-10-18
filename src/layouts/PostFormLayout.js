import React from 'react';
import Header from '../components/Header';
import PostFormComponent from '../components/PostFormComponent';
import Footer from '../components/Footer';

const PostFormLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <PostFormComponent />
      </main>
      <Footer />
    </div>
  );
};

export default PostFormLayout;
