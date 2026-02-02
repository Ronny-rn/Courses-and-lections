import "./SignIn.css";
import { useState } from "react";


const SignIn = ({ onLoginSuccess, onBackClick }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validace
    if (!email || !password) {
      setError("Vyplňte všechna pole");
      return;
        }

    try {
      // TODO: Zde zavolej API tvého kolegy pro přihlášení
      // Příklad:
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await response.json();
      
      // Zatím simulace úspěšného přihlášení
        const userData = {
          
            email: email,
            username: email.split('@')[0] 
        };
      
        onLoginSuccess(userData);

    } catch (err) {

        setError("Přihlášení selhalo. Zkuste to znovu.");
    }
  };

  return (
    <div className="signin-container">
      <h2>Přihlášení</h2>
      
        <form onSubmit={handleSubmit}>
              
            <div className="form-group">
                  
                <label htmlFor="email">Email:</label> 
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            
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