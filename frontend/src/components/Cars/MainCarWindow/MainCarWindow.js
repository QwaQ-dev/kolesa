import React from 'react';
import FindCar from './FindCar/FindCar';
import Apply from './Apply/Apply';
import {useState} from "react";

const MainCarWindow = ({ show }) => {
  const [typecar, setTypeCar] = useState('');

  const handleTypeCar = (typecar) => {
      setTypeCar(typecar);
  };
  return (
    <div className={show ? 'main-car-window show' : 'main-car-window'}>
        <FindCar onTypeCar={handleTypeCar}/>
        <Apply typecar = {typecar}/>
    </div>
  );
};

export default MainCarWindow;
