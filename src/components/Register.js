import "./Register.css";
import { useState } from "react";

const Register = ({ onRegisterSuccess, onBackClick }) => {

    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // --------------Validace------------------------
        if (!username || !fullName || !password || !confirmPassword || !age) {
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
            
            const response = await fetch('http://localhost:5059/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                username: username,
                fullName: fullName,
                password: password,
                age: parseInt(age)
                })
            });

            const data = await response.json();

            if (data.success) {
                // Úspěšná registrace
                onRegisterSuccess(data.user);
            } else {
                setError(data.message || "Registrace selhala");
            }

        } catch (err) {

            console.error('Registration error:', err);
            setError("Nelze se připojit k serveru");
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

                    <label htmlFor="fullName">Celé jméno:</label>
                    <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required/>
                </div>
                
                <div className="form-group">

                    <label htmlFor="age">Věk:</label>
                    <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />
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