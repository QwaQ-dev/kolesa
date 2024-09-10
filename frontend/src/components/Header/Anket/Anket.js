import React, { useState } from 'react';
import './Anket.css'; 

const Anket = ({ isOpen, onClose, children, handleHideSection }) => {
    const [formData, setFormData] = useState({
        type: 'car',
        subType: '',
        name: '',
        descr: '',
        image: null,
        price: 0
    });

    const handleChange = async (e) => {
        const { name, value } = e.target;
        await setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = async () => {
            const base64Image = reader.result;
            await setFormData(prevState => ({
                ...prevState,
                image: base64Image
            }));
        };
        reader.readAsDataURL(file);
    };
    
    const handleSubmit = () => {
        if (!formData.name || !formData.descr || !formData.image || !formData.price) {
            console.error('Не все обязательные поля заполнены');
            return;
        }
    
        let endpoint = '';
        let dataToSend = {};
    
        if (formData.type === 'car') {
            endpoint = 'http://localhost:8080/';
            dataToSend = {
                name: formData.name,
                typecar: formData.subType,
                descr: formData.descr,
                image: formData.image,
                price: parseInt(formData.price)
            };
            console.log(dataToSend);
        } else if (formData.type === 'plane') {
            endpoint = 'http://localhost:8080/add-plane';
            dataToSend = {
                name: formData.name,
                descr: formData.descr,
                typeplane: formData.subType, 
                image: formData.image,
                price: parseInt(formData.price)
            };
            console.log(dataToSend);
        }
    
        fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(dataToSend)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Успешно отправлено:', data);
            onClose();
            console.log('Отправленный JSON:', JSON.stringify(formData));
        })
        .catch((error) => {
            console.error('Ошибка:', error);
        });

    };
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h1 className="anket-title">Подача объявления</h1>
                <div className="main">
                    <div className="right">
                        <div className="anket-name">
                            <p className="anket-text">Введите название вашего объявления:</p>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-name"/>
                        </div>
                        <div className="anket-category">
                            <p className="anket-text">Выберите категорию вашего транспорта:</p>
                            <select name="type" value={formData.type} onChange={handleChange}>
                                <option value="car">Машины</option>
                                <option value="plane">Самолеты</option>
                            </select>
                        </div>
                        {formData.type === 'car' && (
                            <div className="anket-subcategory">
                                <p className="anket-text">Выберите подкатегорию:</p>
                                <select name="subType" value={formData.subType} onChange={handleChange}>
                                    <option value="sedan">Легковые</option>
                                    <option value="furas">Грузовые</option>
                                    <option value="raw">Внедорожник</option>
                                    <option value="pickup">Пикап</option>
                                </select>
                            </div>
                        )}
                        {formData.type === 'plane' && (
                            <div className="anket-subcategory">
                                <p className="anket-text">Выберите подкатегорию:</p>
                                <select name="subType" value={formData.subType} onChange={handleChange}>
                                    <option value="passenger">Пассажирский</option>
                                    <option value="treasure">Истрибитель</option>
                                    <option value="sport">Спортивный</option>
                                    <option value="train">Тренировочный</option>
                                </select>
                            </div>
                        )}
                        <div className="anket-desc">
                            <p className="anket-text">Добавьте описание:</p>
                            <textarea name="descr" cols="30" rows="10" className="anket-desc-inp" value={formData.descr} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <div className="left">
                        <div className="anket-photo">
                            <p className="anket-text">Добавьте фото:</p>
                            <input type="file" name="image" onChange={handleFileChange} id="photo"/> 
                        </div>
                        <div className="anket-price">
                            <p className="anket-text">Укажите цену:</p>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} id="price" className="input-name"/>
                        </div>
                    </div>
                </div>
                <button onClick={() => { handleSubmit(); onClose()}} className="anket-apply">Опубликовать</button>
            </div>
        </div>
    );
};

export default Anket;