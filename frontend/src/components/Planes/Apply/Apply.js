import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";

const Apply = ({ selectedCategory }) => {
  const [announcementCount, setAnnouncementCount] = useState(0);

  console.log(selectedCategory)
  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost:8080/count-plane/${selectedCategory}`)
        .then(response => response.json())
        .then(data => {
          setAnnouncementCount(data.count);
        })
        .catch(error => {
          console.error('Ошибка при получении данных:', error);
        });
    }
  }, [selectedCategory]);

  return (
    <div className="apply-menu">
        <Link to={`/plane/${selectedCategory}`} className="apply">
          <span className="amount">{announcementCount} </span>
          Всего объявлений
        </Link>
    </div>
  );
}

export default Apply;