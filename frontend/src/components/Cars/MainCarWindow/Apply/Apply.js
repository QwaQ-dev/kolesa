import "./Apply.css";
import { Link} from 'react-router-dom';
import React from 'react';
import { useEffect, useState } from "react";

const Apply = ({typecar}) => {
  const [announcementCount, setAnnouncementCount] = useState(0);

  useEffect(() => {
    if (typecar) {
      fetch(`http://localhost:8080/count-elements/${typecar}`)
        .then(response => response.json())
        .then(data => {
          setAnnouncementCount(data.count);
          console.log("awdawdawd:", typecar)
          console.log("how much:  ", data.count)
        })
        .catch(error => {
          console.error('Ошибка при получении данных:', error);
        });
    }
  }, [typecar]);

  return (
    <div className="apply-menu"> {/* Оборачиваем компонент Link в Router */}
        <Link to={`/announcements/car/${typecar}`} className="apply">
          <span className="amount">{announcementCount} </span>
          Всего объявлений
        </Link>
    </div>
  );
}

export default Apply;
