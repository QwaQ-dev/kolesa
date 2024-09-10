import React from 'react';
import "./Header.css";
import {ReactComponent as Plus} from "./plus.svg";
import Anket from "./Anket/Anket";

export default function Header({toggleMainCarWindow, toggleMainPlaneWindow, isCarWindowOpen, isPlaneWindowOpen, handleSectionVisibility}){

    const [isAnketOpen, setIsAnketOpen] = React.useState(false);
    const toggleAnket = () => {
        setIsAnketOpen(!isAnketOpen);
    };


    const toggleCarWindow = () => {
        if (isPlaneWindowOpen) {
            toggleMainPlaneWindow(false); // Если окно самолетов открыто, закрываем его
        }
        toggleMainCarWindow(); // Открываем или закрываем окно машин
    };

    const togglePlaneWindow = () => {
        if (isCarWindowOpen) {
            toggleMainCarWindow(false); // Если окно машин открыто, закрываем его
        }
        toggleMainPlaneWindow(); // Открываем или закрываем окно самолетов
    };

    return(
        <div className="header">
            <div className="logo">WheeloPolis</div>
            <div className="header-links">
                <a className={`header-link ${isCarWindowOpen ? 'active' : ''}`} onClick={toggleCarWindow}>Машины</a>
                <a className={`header-link ${isPlaneWindowOpen ? 'active' : ''}`} onClick={togglePlaneWindow}>Самолеты</a>
            </div>
            <div className="header-btn">
                <button className="btn-with-icon" onClick={toggleAnket} > 
                    <Plus/>
                    <span> Подать объявление</span>
                </button>
            </div>
            <Anket isOpen={isAnketOpen} onClose={toggleAnket}/>
        </div>
    );
}