import { useState, useEffect } from "react";
import { getSubjects } from "./apiService";
import LessonList from "./LessonList";
import "./Courses.css";

const Courses = ({ user, onSignInClick, onRegisterClick, onLogout, onMyOrdersClick, onOrderCreated }) => {
    const [selectedSubjectId, setSelectedSubjectId] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const { data } = await getSubjects();
            setSubjects(data);
        } catch (err) {
            setError("Nepodařilo se načíst předměty.");
        } finally {
            setLoading(false);
        }
    };

    if (selectedSubjectId) {
        return (
            <LessonList
                subjectId={selectedSubjectId}
                user={user}
                onSignInClick={onSignInClick}
                onRegisterClick={onRegisterClick}
                onLogout={onLogout}
                onMyOrdersClick={onMyOrdersClick}
                onOrderCreated={onOrderCreated}
                onBack={() => setSelectedSubjectId(null)}
            />
        );
    }

    return (
        <div className="courses-page">
            <div className="auth-header">
                <div className="auth-header-left">
                    <h1>Kurzy & Lekce</h1>
                </div>
                <div className="auth-header-right">
                    {user ? (
                        <>
                            <span className="user-name">{user.username || user.fullName}</span>
                            <button className="btn-logout" onClick={onLogout}>
                                Odhlásit se
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="btn-header-signin" onClick={onSignInClick}>Přihlásit se</button>
                            <button className="btn-header-register" onClick={onRegisterClick}>Registrovat se</button>
                        </>
                    )}
                </div>
            </div>

            <div className="courses-container">
                <div className="welcome-container">
                    <h1>Vítejte v aplikaci kurzů</h1>
                    <h2>Objevte vzdělávání, které dává smysl.</h2>
                    <p>
                        Naše platforma Vám umožní jednoduše si vybrat z široké nabídky předmětů a najít kurz,
                        který odpovídá vašemu věku, úrovni i preferované velikosti studijní skupiny.
                    </p>

                    {!user && (
                        <div className="welcome-buttons">
                            <button className="btn-welcome-signin" onClick={onSignInClick}>
                                Přihlásit se
                            </button>
                            <button className="btn-welcome-register" onClick={onRegisterClick}>
                                Registrovat se
                            </button>
                        </div>
                    )}

                    {user && (
                        <button className="btn-my-orders" onClick={onMyOrdersClick}>
                            Moje objednávky
                        </button>
                    )}
                </div>

                <h2 className="section-title">Dostupné předměty</h2>

                <div className="courses-grid">
                    {loading ? (
                        <p>Načítám kurzy...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : subjects.length === 0 ? (
                        <p>Žádné kurzy nejsou k dispozici.</p>
                    ) : (
                        subjects.map((subject) => (
                            <div
                                key={subject.subjectId}
                                className={`course-card course-${subject.subjectId}`}
                            >
                                <h2>{subject.subjectName}</h2>
                                <p>{subject.description}</p>
                                <button
                                    type="button"
                                    className="btn-course"
                                    onClick={() => setSelectedSubjectId(subject.subjectId)}
                                >
                                    Přejít na lekce
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Courses;