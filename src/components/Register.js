import "./Register.css";
import { useState } from "react";

const Register = ({ onRegisterSuccess, onBackClick }) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // --------------Validace------------------------
        if (!username || !email || !password || !confirmPassword) {
        setError("Vyplňte všechna pole");
        return;
        }

        if (password !== confirmPassword) {
        setError("Hesla se neshodují");
        return;
        }

        if (password.length < 6) {
        setError("Heslo musí mít alespoň 6 znaků");
        return;
        }

        try {
            
        // TODO: volání API

      
        // Zatím simulace úspěšné registrace
        const userData = {
            username: username,
            email: email
        };
      
        onRegisterSuccess(userData);
        } catch (err) {
        setError("Registrace selhala. Zkuste to znovu.");
        }
    };

    return (
        <div className="register-container">
            
        <h2>Registrace</h2>
      
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                        
                <label htmlFor="username">Uživatelské jméno:</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                </div>

                <div className="form-group">

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                 </div>

                <div className="form-group">

                    <label htmlFor="password">Heslo:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <div className="form-group">

                    <label htmlFor="confirmPassword">Potvrdit heslo:</label>
                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>

                {error && <p className="error-message">{error}</p>}

                <div className="button-group">

                    <button type="submit" className="btn-submit">Registrovat se</button>
                    <button type="button" className="btn-back" onClick={onBackClick}>Zpět</button>
                </div>
            </form>
        </div>
    );
};

export default Register;