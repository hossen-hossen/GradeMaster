// ** Logo
import logoImg from '../assets/img/logo.png';
import loaderImg from '../assets/img/preloader.gif';

const FullScreenLoader = () => {
    return (
        <div className="fallback-spinner app-loader">
            <img className="fallback-logo" src={logoImg} alt="logo" />
            <div className="icon-ani">
                <img src={loaderImg} alt="Preloader" style={{ width: '150px' }} />
            </div>
        </div>
    );
};

export default FullScreenLoader;
