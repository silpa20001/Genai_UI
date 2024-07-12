"use client"
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../app/Landingpage/styles.module.css';
import Navbar from './Landingpage/navbar';
import Sidebar from './Landingpage/sidebar';
import MainContent from './Landingpage/maincontent';

const App = () => {
  const [activeSection, setActiveSection] = useState(null);

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
          <Sidebar onButtonClick={handleSidebarButtonClick} />
          <MainContent activeSection={activeSection} />
        </div>
      </div>
    </>
  );
};

export default App;
