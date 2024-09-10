import "./Selection.css";
import svg1 from "./2.svg";
import svg2 from "./1.svg";
import svg3 from "./3.svg";


export default function Selection(){
    return(
        <div className="sel-cont">
            <div className="block">
                <img src={svg1} alt="#" className="sel-img" />
                <h2 className="sel-name">Найдите транспорт</h2>
                <p className="sel-descr">Выберите категорию и найдите транспорт себе по душе.</p>
            </div>
            <div className="block">
                <img src={svg2} alt="#" className="sel-img" />
                <h2 className="sel-name">Посмотрите подробное описание</h2>
                <p className="sel-descr">Выберите ту модель, характеристики которой подходят вам.</p>
            </div>
            <div className="block">
                <img src={svg3} alt="#" className="sel-img" />
                <h2 className="sel-name">Созвонитесь с продавцом</h2>
                <p className="sel-descr">По нажатии на одну кнопку, вы сможете созвонится с продавцом.</p>
            </div>
        </div>
    );
}