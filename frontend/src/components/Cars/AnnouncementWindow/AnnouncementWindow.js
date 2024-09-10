import React, { useEffect, useState } from 'react';
import Card from './Card/Card'; // Предполагается, что у вас есть компонент карточки
import './AnnouncementWindow.css';
import {useParams} from "react-router-dom"

export default function AnnouncementWindow() {
  const { typecar } = useParams();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCards = async () => {
    try {
      const response = await fetch(`http://localhost:8080/car/typecar/${typecar}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log("FETCHED", data);
      
      // Если данные - это объект, а не массив, преобразуем его в массив
      const dataArray = Array.isArray(data) ? data : [data];
      
      setCards(dataArray);
    } catch (error) {
      console.error('Ошибка при получении объявлений:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [typecar]);

  useEffect(() => {
    // Если cards пустой, повторно запросим данные
    if (cards.length === 0) {
      fetchCards();
    }
  }, [cards]);

  useEffect(() => {
    // При изменении typeplane сбрасываем данные
    setCards([]);
    setLoading(true);
    setError(null);
  }, [typecar]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="cards-container">
      {cards.map((card) => (
  card && card.id && <Card key={card.id} {...card} />
))}

    </div>
  );
}