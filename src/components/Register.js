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

        // Validace
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

        const requestData = {
            username: username,
            fullName: fullName,
            password: password,
            age: parseInt(age)
        };

        console.log('Posilam request:', requestData);
        console.log('URL:', 'https://localhost:7054/api/users/register');

        try {
            console.log('Volam fetch...');
            
            const response = await fetch('https://localhost:7054/api/users/register', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            console.log('Response received:', response);
            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            if (!response.ok) {
                console.error('Response not OK!');
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Data received:', data);

            if (data.success) {
                console.log('Registrace uspesna!');
                onRegisterSuccess(data.user);
            } else {
                console.error('Registrace selhala:', data.message);
                setError(data.message || "Registrace selhala");
            }

        } catch (err) {
            console.error('CHYBA:', err);
            console.error('Typ chyby:', err.name);
            console.error('Message:', err.message);
            console.error('Stack:', err.stack);
            setError("Nelze se pripojit k serveru: " + err.message);
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