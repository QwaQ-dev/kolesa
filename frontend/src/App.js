// App.js
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header'
import MainCarWindow from './components/Cars/MainCarWindow/MainCarWindow';
import AnnouncementWindow from './components/Cars/AnnouncementWindow/AnnouncementWindow';
import AnnouncementPage from './components/Cars/AnnoncementPage/AnnouncementPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPlaneWindow from "./components/Planes/MainPlaneWindow"
import AnnouncementPagePlane from './components/Planes/PlanesAnnouncement/AnnoncementPagePlane/AnnouncementPagePlane';
import AnnouncementWindowPlane from './components/Planes/PlanesAnnouncement/PlaneAnnouncementsWindow/AnnouncementWindowPlane';
import Bio from './components/Bio/Bio';
import Selection from './components/Selection/Selection';
import Footer from './components/Footer/Footer';

function App() {
  const [isCarWindowOpen, setIsCarWindowOpen] = useState(false);
  const [isPlaneWindowOpen, setIsPlaneWindowOpen] = useState(false);
  const [isSelectionVisible, setIsSelectionVisible] = useState(true);


  const handleSectionVisibility = (isVisible) => {
    setIsSelectionVisible(isVisible);
  };

  const toggleMainCarWindow = () => {
    setIsCarWindowOpen(prevState => !prevState);
  };

  const toggleMainPlaneWindow = () => {
    setIsPlaneWindowOpen(prevState => !prevState);
  };

  return (
    <BrowserRouter>
      <div className="container">
        <Header
          toggleMainCarWindow={toggleMainCarWindow}
          toggleMainPlaneWindow={toggleMainPlaneWindow}
          isCarWindowOpen={isCarWindowOpen}
          isPlaneWindowOpen={isPlaneWindowOpen}
          setIsSelectionVisible={handleSectionVisibility}
        />
        <Bio/>
        {isCarWindowOpen && <MainCarWindow />}
        {isPlaneWindowOpen && <MainPlaneWindow toggleMainPlaneWindow={toggleMainPlaneWindow} />}
        <Routes>
          <Route path="/announcements" element={<AnnouncementWindow/>} />
          <Route path="/announcements/page/:id" element={<AnnouncementPage />} />
          <Route path="/announcements/car/:typecar" element={<AnnouncementWindow />} />
          <Route path="/planes" element={<AnnouncementWindowPlane />} />
          <Route path="/plane/id/:id" element={<AnnouncementPagePlane />} />
          {/* Pass selectedCategory prop to AnnouncementWindowPlane */}
          <Route path="/plane/:typeplane" element={<AnnouncementWindowPlane />} />
        </Routes>
        <Selection />
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
