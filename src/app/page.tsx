"use client"
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../app/Landingpage/styles.module.css';
import Navbar from './Landingpage/navbar';
import Sidebar from './Landingpage/sidebar';
import MainContent from './Landingpage/maincontent';
import { Chatwindow } from './Landingpage/chatwindow';

const App = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggleSidebar = () => {
    setIsAnimating(true);
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!isSidebarOpen) {
      const timeout = setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Match this duration to your CSS transition duration
      return () => clearTimeout(timeout);
    }
  }, [isSidebarOpen]);
  const handleSidebarButtonClick = (section: any) => {
    setActiveSection(section);
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
      <div className="wrapper">
        <Navbar />
    
        <div className="content">
          <Sidebar onButtonClick={handleSidebarButtonClick} isAnimating={isAnimating} isSidebarOpen={isSidebarOpen} handleToggleSidebar={handleToggleSidebar} />
          <MainContent activeSection={activeSection} isSidebarOpen={isSidebarOpen} />
          {/* <Chatwindow /> */}
        </div>
      </div>
    </>
  );
};

export default App;
