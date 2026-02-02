import { useState } from "react";
import HomeList from "./components/HomeList";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Courses from "./components/Courses";

function App() {
  const [currentPage, setCurrentPage] = useState("home"); 
  const [user, setUser] = useState(null); // přihlášený uživatel


  const handleLoginSuccess = (userData) => {

    setUser(userData);
    setCurrentPage("courses");
  };


  const handleRegisterSuccess = (userData) => {

    setUser(userData);
    setCurrentPage("courses");
  };


  const handleLogout = () => {

    setUser(null);
    setCurrentPage("home");
  };

  // Render podle aktuální stránky
  if (currentPage === "home") {

    return (

      <HomeList onSignInClick={() => setCurrentPage("signIn")} onRegisterClick={() => setCurrentPage("register")}/>
    );
  }

  if (currentPage === "signIn") {

    return (

      <SignIn onLoginSuccess={handleLoginSuccess} onBackClick={() => setCurrentPage("home")}/>
    );
  }

  if (currentPage === "register") {

    return (

      <Register onRegisterSuccess={handleRegisterSuccess} onBackClick={() => setCurrentPage("home")}/>
    );
  }

  if (currentPage === "courses" && user) {

    return (

      <div>

        <div className="user-info">

          <span>Přihlášen: {user.username || user.email}</span>
          <button onClick={handleLogout} className="btn-logout" >
            Odhlásit se
          </button>

        </div>
        <Courses />
      </div>
    );
  }

  return null;
}

export default App;