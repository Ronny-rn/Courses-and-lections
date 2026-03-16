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

    // On mount: ask the API if we have a valid session cookie
    useEffect(() => {
        getMe()
            .then(({ data }) => setUser(data))
            .catch(() => setUser(null))
            .finally(() => setAuthChecked(true));
    }, []);

    // Don't render anything until we know the auth state
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