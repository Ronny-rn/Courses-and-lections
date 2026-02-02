import "./HomeList.css";

const HomeList = ({ onSignInClick, onRegisterClick }) => {

    return (
      
        <div className="home-container">
            <h1>Vítejte v aplikaci kurzů</h1>
      
            <div className="button-container">
              
                <button type="button" className="btn-signin" onClick={onSignInClick}>Přihlásit se</button>
                <button type="button" className="btn-register" onClick={onRegisterClick}>Registrovat se</button>
      
            </div>
        </div>
    );
};

export default HomeList;