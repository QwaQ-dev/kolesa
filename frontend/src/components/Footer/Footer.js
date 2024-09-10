import './Footer.css';
import phone from './phone.svg';
import mail from './mail.svg';

export default function Footer() {
    return(
        <div className="footer-cont">
            <div className="left-sides">
                <h1 className="logo">WheeloPolis</h1>
                <p className="fot-descr">Купи машину мечты у нас!</p>
            </div>
            <div className="right-sides">
                <p className="help">Нужна помощь?</p>
                <p className="team">Наша команда поможет вам!</p>
                <div className="phone">
                    <img src={phone} alt="" className='phone-img'/>
                    <h2 className='phone-number'>+7 747 856 93 56</h2>
                </div>
                <div className="mail">
                    <img src={mail} alt="" className='mail-img'/>
                    <h2 className='mail-name'>qwaq.dev@gmail.com</h2>
                </div>
            </div>
        </div>
    );
}