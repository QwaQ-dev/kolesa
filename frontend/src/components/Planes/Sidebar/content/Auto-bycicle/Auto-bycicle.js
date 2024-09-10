import "./Auto-bycicle.css"
import React from 'react';

export default function AutoBycicle(){
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
                <a href="#" className="mark">Вид</a>
                <a href="#" className="mark">Горный</a>
                <a href="#" className="mark">BMX</a>
                <a href="#" className="mark">Дорожный</a>
                <a href="#" className="mark">Туринговый</a>
                <a href="#" className="mark">Гибрид</a>
                <a href="#">еще:</a>
            </div>
            <div className="auto-quality">
                <button>Все</button>
                <button>Новая</button>
                <button>Б/У</button>
            </div>
        </div>
    );
}