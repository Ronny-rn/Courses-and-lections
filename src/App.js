import { useState, useEffect } from "react";
//useEffect - umožňuje provádět vedlejší efekty v komponentách. U mě ukládání do localStorage
import Courses from "./components/Courses";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import MyOrder from "./components/MyOrder";


function App() {
  const [currentPage, setCurrentPage] = useState("courses");
  //currentPage - jaká stránka se zobrazuje ("courses", "signIn", "register")
  //setCurrentPage - fce pro změnu aktuální stránky

  // Načtení uživ. z localStorage 
  const [user, setUser] = useState(() => {

    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;

  });


  // Uložení uživ. do localStorage 

  useEffect(() => { // Spustí se pokaždé, když se změní "user"

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));

    } else {
      localStorage.removeItem('user');
    }

  }, [user]);


  const handleLoginSuccess = (userData) => { //co se stane po úspěšném přihlášení

    setUser(userData);
    setCurrentPage("courses");
  };

  const handleRegisterSuccess = (userData) => {

    setUser(userData);
    setCurrentPage("courses");
  };

  const handleLogout = () => {

    setUser(null);
    setCurrentPage("courses");
  };

  // Render podle aktuální stránky
  if (currentPage === "signIn") {

    return (

      <SignIn 
        onLoginSuccess={handleLoginSuccess}
        onBackClick={() => setCurrentPage("courses")}
      />
    );
  }

  if (currentPage === "register") {

    return (

      <Register 
        onRegisterSuccess={handleRegisterSuccess}
        onBackClick={() => setCurrentPage("courses")}
      />
    );
  }

  if (currentPage === "myOrder") {
    return (
      <MyOrder 
        user={user || { id: "guest"}}
        onBack={() => setCurrentPage("courses")}
      />  
    );
  }

  return (
   
    <Courses 
      user={user}
      onSignInClick={() => setCurrentPage("signIn")}
      onRegisterClick={() => setCurrentPage("register")}
      onMyOrdersClick={() => setCurrentPage("myOrders")}
      onLogout={handleLogout}
    />
  );
}



export default App;