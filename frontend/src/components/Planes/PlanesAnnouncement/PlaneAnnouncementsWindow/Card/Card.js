import React from 'react';
import "./Card.css";
import { Link } from 'react-router-dom';

export default function Card({ id, name, descr, typeplane, image, price }) {
    return (
        <div className="card">
            <div className="main-part">
                <img src={image} alt="" className="card-img" />
                <h1 className="card-name">{name}</h1>
                <p className = "card-price">{price} ₸</p>
            </div>  
            <Link to={{ pathname: `/plane/id/${id}`, state: { id, name, descr, typeplane, image, price  } }}>
                <button className="card-show">Посмотреть объявление</button> 
            </Link>
        </div>
    );
}