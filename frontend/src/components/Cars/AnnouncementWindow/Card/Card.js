import React from 'react';
import "./Card.css";
import { Link } from 'react-router-dom';

export default function Card({ name, typecar, descr, image, price, id  }) {
    console.log(name, price, descr, image, typecar, id )
    return (
        <div className="card">
            <div className="main-part">
                <img src={image} alt="" className="card-img" />
                <h1 className="card-name">{name}</h1>
                <p className = "card-price">{price} ₸</p>
            </div>  
            <Link to={{ pathname: `/announcements/page/${id}`, state: { name, typecar, descr, image, price, id   } }}>
                <button className="card-show">Посмотреть объявление</button> 
            </Link>
        </div>
    );
}