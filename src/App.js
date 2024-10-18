import React from 'react';
import Register from './components/Register';
import ForgotPasswordPhone from './components/ForgotPasswordPhone';
import ForgotPasswordOTP from './components/ForgotPasswordOTP';
import ChangePassword from './components/ChangePassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import HomeComponent from './components/HomeComponent';
import CourtComponent from './components/CourtComponent';
import BookingComponent from './components/BookingComponent';
import CoachComponent from './components/CoachComponent';
import CoachListComponent from './components/CoachListComponent';
import CourtDetailComponent from './components/CourtDetailComponent';
import CourtListComponent from './components/CourtListComponent';
import DetailedFilterComponent from './components/DetailedFilterComponent';
import ParticipationComponent from './components/ParticipationComponent';
import PostFormComponent from './components/PostFormComponent';
import RelatedPostsComponent from './components/RelatedPostsComponent';
import SearchFilterComponent from './components/SearchFilterComponent';
import HomeLayout from './layouts/HomeLayout';
import NewDetailComponent from './components/NewDetailComponent';
import CourtLayout from './layouts/CourtLayout';
import CourtDetailLayout from './layouts/CourtDetailLayout';
import PostFormLayout from './layouts/PostFormLayout';
import CoachLayout from './layouts/CoachLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Admin from './layouts/Admin';
import CourtRegistrationList from './components/CourtRegistrationList';
import { NotificationProvider } from './components/NotificationContext';
import CoachDetailComponent from './components/CoachDetailComponent';
import CoachDetailLayout from './layouts/CoachDetailLayout';
import CourtRegistrationLayout from './layouts/CourtRegistrationLayout';
import Profile from './components/Profile';


function App() {
  return (
    <div className='App'>
      <NotificationProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
          <Route path="/forgot-password" element={<AuthLayout><ForgotPasswordPhone /></AuthLayout>} />
          <Route path="/forgot-password/otp" element={<AuthLayout><ForgotPasswordOTP /></AuthLayout>} />
          <Route path="/change-password" element={<AuthLayout><ChangePassword /></AuthLayout>} />
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
          <Route path="/news/:id" element={<NewDetailComponent />} />
          {/* <Route path="/" element={<MainLayout></MainLayout>} /> */}
          <Route path="/court" element={<CourtLayout></CourtLayout>} />
          <Route path="/court/court-detail" element={<CourtDetailLayout />} />
          <Route path="/post-form" element={<PostFormLayout />} />
          <Route path="/coach" element={<CoachLayout />} />
          <Route path="/coach/coach-detail" element={<CoachDetailLayout />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/court-registration-list" element={<CourtRegistrationLayout />} />
          <Route path="/" element={<HomeLayout></HomeLayout>} />
        </Routes>
      </Router>
      </NotificationProvider>

      {/* <HomeComponent />
      <CourtComponent name="Sân 286 Nguyễn Xiên" price="100.000" slots="6" location="Hà Nội" />
      <BookingComponent />
      <CoachComponent name="Minh Trí" price="100.000" level="5.5" contact="Facebook" phone="0123456789"/>
      <CoachListComponent />
      <CourtDetailComponent court={{ name: "Sân 286 Nguyễn Xiên", price: "100.000", slots: "6", location: "Hà Nội" }} />
      <CourtListComponent />
      <DetailedFilterComponent />
      <ParticipationComponent />  {/*đang phát triển */}
      {/*
      <PostFormComponent />
      <RelatedPostsComponent />
      <SearchFilterComponent /> */}
    </div>

  );
}

export default App;