import { useState, useEffect } from "react";
import { getCoursesBySubject, getSubjectById, createOrder } from "./apiService";
import "./LessonList.css";

const LessonList = ({
                        subjectId,
                        user,
                        onSignInClick,
                        onRegisterClick,
                        onLogout,
                        onMyOrdersClick,
                        onBack,
                    }) => {
    const [courses, setCourses] = useState([]);
    const [subjectName, setSubjectName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [orderingCourseId, setOrderingCourseId] = useState(null);
    const [orderMessage, setOrderMessage] = useState({ id: null, text: "", type: "" });

    useEffect(() => {
        fetchData();
    }, [subjectId]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [coursesRes, subjectRes] = await Promise.all([
                getCoursesBySubject(subjectId),
                getSubjectById(subjectId),
            ]);
            setCourses(coursesRes.data);
            setSubjectName(subjectRes.data.subjectName);
        } catch (err) {
            setError("Nepodařilo se načíst lekce.");
        } finally {
            setLoading(false);
        }
    };

    const handleOrderClick = async (course) => {
        if (!user) {
            onSignInClick();
            return;
        }

        setOrderingCourseId(course.courseId);
        try {
            await createOrder(user.id, [course.courseId]);
            setOrderMessage({ id: course.courseId, text: "Kurz byl úspěšně objednán!", type: "success" });
            setTimeout(() => setOrderMessage({ id: null, text: "", type: "" }), 3000);
        } catch (err) {
            const msg = err.response?.data || "Objednávku se nepodařilo vytvořit.";
            setOrderMessage({
                id: course.courseId,
                text: typeof msg === "string" ? msg : "Objednávku se nepodařilo vytvořit.",
                type: "error",
            });
            setTimeout(() => setOrderMessage({ id: null, text: "", type: "" }), 3000);
        } finally {
            setOrderingCourseId(null);
        }
    };

    return (
        <div className="lesson-page">
            <div className="auth-header">
                <div className="auth-header-left">
                    <h3>Kurzy & Lekce</h3>
                </div>
                <div className="auth-header-right">
                    {user && (
                        <>
                            <span className="user-name">{user.username || user.fullName}</span>
                            <button className="btn-logout" onClick={onLogout}>Odhlásit se</button>
                            <button className="btn-my-orders" onClick={onMyOrdersClick}>Moje objednávky</button>
                        </>
                    )}
                </div>
            </div>

            <div className="lesson-container">
                <button type="button" className="btn-back" onClick={onBack}>
                    ← Zpět na kurzy
                </button>

                <h1>Lekce pro předmět: {subjectName || `#${subjectId}`}</h1>

                {loading ? (
                    <p>Načítám lekce...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <div className="lessons-container">
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <div key={course.courseId} className="lesson-card">
                                    <h3>{course.courseName}</h3>
                                    <p><strong>Popis:</strong> {course.description}</p>
                                    <p><strong>Cena:</strong> {course.price} Kč</p>
                                    <p><strong>Kapacita:</strong> {course.capacity} míst</p>

                                    <div className="lesson-info">
                    <span className="lesson-date">
                      {new Date(course.startDate).toLocaleDateString("cs-CZ")}
                    </span>
                                        <span className="lesson-capacity">{course.capacity} míst</span>
                                    </div>

                                    {orderMessage.id === course.courseId && (
                                        <p className={`order-feedback ${orderMessage.type}`}>
                                            {orderMessage.text}
                                        </p>
                                    )}

                                    <button
                                        className="btn-order"
                                        disabled={orderingCourseId === course.courseId}
                                        onClick={() => handleOrderClick(course)}
                                    >
                                        {orderingCourseId === course.courseId
                                            ? "Zpracovávám..."
                                            : user
                                                ? "Objednat kurz"
                                                : "Přihlásit se a objednat"}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>Žádné lekce nejsou k dispozici pro tento předmět.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LessonList;