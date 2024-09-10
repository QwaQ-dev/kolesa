import "./Auto-moped.css"
import React from 'react';

export default function AutoMoped(){
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
                <a href="#" className="mark">Yamaha</a>
                <a href="#" className="mark">Nexus</a>
                <a href="#" className="mark">Vespa</a>
                <a href="#" className="mark">Gilera</a>
                <a href="#" className="mark">Lifan</a>
                <a href="#">еще:</a>
            </div>
            <div className="auto-quality">
                <button>Все</button>
                <button>Новый</button>
                <button>С пробегом</button>
            </div>
        </div>
    );
}