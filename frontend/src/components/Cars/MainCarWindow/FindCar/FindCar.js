import "./FindCar.css";
import PropTypes from "prop-types";

function FindCar({onTypeCar}){

     return(
        <div className="header-menu">
            <div className="car-class">
                <a className="car-link" onClick={() => onTypeCar("sedan")}>Легковые</a>
                <a className="car-link" onClick={() => onTypeCar("furas")}>Грузовые</a>
                <a className="car-link" onClick={() => onTypeCar("raw")}>Внедорожники</a>
                <a className="car-link" onClick={() => onTypeCar("pickup")}>Пикапы</a>
            </div>
        </div>
    );
}
FindCar.propTypes = {
    onTypeCar: PropTypes.func.isRequired,
};

export default FindCar