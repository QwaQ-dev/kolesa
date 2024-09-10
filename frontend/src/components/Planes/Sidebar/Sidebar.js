import React from 'react';
import AutoLight from './content/Auto-light/Auto-light';
import AutoMoped from './content/Auto-moped/Auto-moped';
import AutoBycicle from './content/Auto-bycicle/Auto-bycicle';
import AutoHeavy from './content/Auto-heavy/Auto-heavy';


import './Sidebar.css';

const Sidebar = ({ isOpen, activeTab, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {activeTab === 'tab1' && <AutoLight/>}
        {activeTab === 'tab2' && <AutoHeavy/>}
        {activeTab === 'tab3' && <AutoMoped/>}
        {activeTab === 'tab4' && <AutoBycicle/>}
      </div>
    </div>
  );
};

export default Sidebar;