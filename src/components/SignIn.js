import "./SignIn.css";
import { useState } from "react";


const SignIn = ({ onLoginSuccess, onBackClick }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validace
    if (!username || !password) {
      setError("Vyplňte všechna pole");
      return;
        }

    try {
      const response = await fetch('http://localhost:5059/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: username,
          password: password 
        })
      });
      
      // Zatím simulace úspěšného přihlášení
      const data = await response.json();
      
      if (data.success) {
        onLoginSuccess(data.user);

      }else {
        setError("Neplatné přihlašovací údaje");
      }
      
        
    } catch (err) {

      setError("Přihlášení selhalo. Zkuste to znovu. (nelze se připojit k serveru)");
    }
  };

  return (
    <div className="signin-container">
      <h2>Přihlášení</h2>
      
        <form onSubmit={handleSubmit}>
              
            <div className="form-group">
                  
                <label htmlFor="username">Uživatelské jméno:</label> 
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            
            </div>

            <div className="form-group">
                  
                <label htmlFor="password">Heslo:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="button-group">
                  
                <button type="submit" className="btn-submit">Přihlásit se</button>  
                <button type="button" className="btn-back" onClick={onBackClick}>Zpět</button>
                  
            </div>
              
        </form>
          
    </div>
  );
};

export default SignIn;