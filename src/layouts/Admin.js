import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DashboardLayout from "./DashboardLayout";

const Admin = () => {
    return (
        <div style={{backgroundColor: "#F0F0F0"}}>
            <Header />
            <div style={{margin : "20px"}}>
            <DashboardLayout />
            </div>
            <Footer />
        </div>
    );
};

export default Admin;