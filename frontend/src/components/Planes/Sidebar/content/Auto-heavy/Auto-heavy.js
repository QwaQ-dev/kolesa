import "./Auto-heavy.css"
import React from 'react';

export default function AutoHeavy(){
    return(
        <div className="left-side">
            <div className="where-to-find">
                <a href="#" className="city">Где искать</a>
                <a href="#" className="city">Актобе</a>
                <a href="#" className="city">Кызылорда</a>
                <a href="#" className="city">Астана</a>
                <a href="#" className="city">Алмата</a>
                <a href="#" className="city">Хромтау</a>
                <a href="#" className="city">Абай</a>
                <a href="">еще:</a>                               
            </div>
            <div className="auto-brand">
                <a href="#" className="mark">Марка</a>
                <a href="#" className="mark">MAN</a>
                <a href="#" className="mark">Iveco</a>
                <a href="#" className="mark">Renault</a>
                <a href="#" className="mark">Toyota</a>
                <a href="#" className="mark">Mercedes Benz</a>
                <a href="#">еще:</a>
            </div>
            <div className="auto-quality">
                <button>Все</button>
                <button>Новая</button>
                <button>С пробегом</button>
            </div>
        </div>
    );
}