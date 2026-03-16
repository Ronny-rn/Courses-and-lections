import { useState, useEffect } from "react";
import Courses from "./components/Courses";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import MyOrder from "./components/MyOrder";
import { logout, getMe } from "./components/apiService";
import "./components/Shared.css";

function App() {
    const [currentPage, setCurrentPage] = useState("courses");
    const [user, setUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);
    const [pendingOrder, setPendingOrder] = useState(null);

    // Při připojení se zeptá API, jestli máme platný soubor cookie relace
    useEffect(() => {
        getMe()
            .then(({ data }) => setUser(data))
            .catch(() => setUser(null))
            .finally(() => setAuthChecked(true));
    }, []);

    // Nevykreslí se nic, dokud neznáme stav autorizace
    if (!authChecked) return null;

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        setCurrentPage("courses");
    };

    const handleRegisterSuccess = (userData) => {
        setUser(userData);
        setCurrentPage("courses");
    };

    const handleLogout = async () => {
        try { await logout(); } catch (_) { /* cookie cleared regardless */ }
        setUser(null);
        setCurrentPage("courses");
    };

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

    if (currentPage === "myOrders") {
        return (
            <MyOrder
                user={user}
                onBack={() => setCurrentPage("courses")}
                pendingOrder={pendingOrder}
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
            onOrderCreated={(order) => {
                setPendingOrder(order);
                setCurrentPage("myOrders");
            }}
        />
    );
}

export default App;