import "./LessonList.css";
import { useState, useEffect } from "react";

const LessonList = ({
  courseId,
  user,
  onSignInClick,
  onRegisterClick,
  onLogout,
  onMyOrdersClick,
  onBack
}) => {

  const [showAuthMessage, setShowAuthMessage] = useState(false);
  const [courses, setCourses] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
    fetchSubjectName();
  }, [courseId]);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`https://localhost:7054/api/courses/${courseId}`);
      const data = await response.json();
      setCourses(data);
      setLoading(false);
    } catch (error) {
      console.error('Chyba pri nacteni kurzu:', error);
      setLoading(false);
    }
  };

  const fetchSubjectName = async () => {
    try {
      const response = await fetch(`https://localhost:7054/api/subjects/${courseId}`);
      const data = await response.json();
      setSubjectName(data.subjectName);
    } catch (error) {
      console.error('Chyba pri nacteni subject name:', error);
    }
  };
 const handleOrderClick = (course) => {

  // použijeme buď přihlášeného usera,
  // nebo testovacího
    const testUserId = user?.id || "guest";

const newOrder = {
        id: Date.now(),
        courseName: subjectName,
        lessonTitle: course.courseName,
        startDate: course.startDate,
        numberOfPeople: 1,
        totalPrice: `${course.price} Kč`,
        ageMin: 0,
        ageMax: 99,
        maxCapacity: course.capacity,
        status: "active",
        createdAt: new Date().toISOString()
    };

    const existingOrders = JSON.parse(
        localStorage.getItem(`orders_${testUserId}`) || "[]"
    );

    const updatedOrders = [...existingOrders, newOrder];

    localStorage.setItem(
        `orders_${testUserId}`,
        JSON.stringify(updatedOrders)
    );

    // přepnutí na objednávky
    onMyOrdersClick();
};

  return (
    <div className="lesson-page">

      <div className="auth-header">
        <div className="auth-header-left">
          <h3>Kurzy & Lekce</h3>
        </div>
        <div className="auth-header-right">
        </div>
      </div>

      <div className="lesson-container">

        <button type="button" className="btn-back" onClick={onBack}> ← Zpět na kurzy</button>

       <h1>Lekce pro kurz: {subjectName || `#${courseId}`}</h1>

        {showAuthMessage && !user && (

          <div className="auth-message">

            <p>Pro objednání kurzu se musíte nejdříve přihlásit nebo zaregistrovat.</p>
            <div className="auth-message-buttons">

              <button className="btn-message-signin" onClick={onSignInClick} >Přihlásit se</button>

              <button className="btn-message-register" onClick={onRegisterClick}>Registrovat se</button>
            </div>
          </div>
        )}

        {loading ? (
          <p>Načítám lekce...</p>
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
 
                    <span className="lesson-capacity">
                      {course.capacity} míst
                    </span>
                  </div>
 
                  <button
                    className="btn-order"
                    onClick={() => handleOrderClick(course)}
                  >
                    {user ? "Objednat kurz" : "Přihlásit se a objednat"}
                  </button>
                </div>
              ))
            ) : (
              <p>Žádné lekce nejsou k dispozici pro tento kurz.</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default LessonList;