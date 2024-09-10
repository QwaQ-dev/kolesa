import "./AnnouncementPage.css";
import React from 'react';
import { useEffect, useState } from "react"; 
import {useParams} from "react-router-dom";

export default function AnnouncementPage() {
    const { id } = useParams();
    const [announcementData, setAnnouncementData] = useState(null);
   
    console.log(id)
    useEffect(() => {
        // Отправьте запрос на сервер для получения информации о машине по её ID
        fetch(`http://localhost:8080/car/${id}`)
            .then(response => response.json())
            .then(data => {
                setAnnouncementData(data);
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
            });
    }, [id]);
    
    if (!announcementData) {
        return <div>Загрузка...</div>;
      }
      
    const { name, typecar, descr, image, price } = announcementData;
    const sendMessage = () => {
        // Замените номер телефона и сообщение своими значениями
        const phoneNumber = '87053245524'; // Замените на номер получателя
        const message = `Здравствуйте, меня интересует ${name} (${typecar}) за ${price} ₸. Пожалуйста, предоставьте более подробную информацию.`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };
    
  return (
    <div className="announcement-cont">
         <div className="left-side">
        <img src={image} alt="" className="main-img"/>
             <div className="announcement-type">
                <p className="type">Тип средства передвижения:</p>
                <p className="typeof"> {typecar}</p>
            </div>
        </div>      
        <div className="right-side">
            <h1 className="announcement-name">Название: {name}</h1>
            <h2 className="announcement-price">Цена: {price} ₸</h2>
            <p className="descr">Описание: {descr}</p>
            <button className="btn" onClick={sendMessage}>Написать</button>
        </div>
    </div>
  );
}
