import React, { useState } from "react";
import FindPlane from "./FindPlane/FindPlane";
import Apply from "./Apply/Apply";

const MainPlaneWindow = ({ show, toggleMainCarWindow, toggleMainPlaneWindow }) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    return(
        <div className={show ? "main-plane-window show" : "main-plane-window"}>
            <FindPlane onCategorySelect={handleCategorySelect} />
            <Apply selectedCategory={selectedCategory} />
        </div>
    );
}

export default MainPlaneWindow;