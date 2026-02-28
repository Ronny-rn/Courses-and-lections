import "./LessonList.css";
import { useState } from "react";
import dataCourses from "../data/DataCourses";
import dataLessons from "../data/DataLessons";
import MyOrder from "./MyOrder";

const LessonList = ({ courseId, lessons, user, onSignInClick, onRegisterClick, onLogout, onMyOrdersClick, onBack }) => {

  const [showAuthMessage, setShowAuthMessage] = useState(false);

  const course = dataCourses.find(c => c.id === courseId);
  
  const courseLessons = lessons.filter(lesson => lesson.courseId === courseId);

    const handleOrderClick = (lesson) => {
      
    if (!user) {
        setShowAuthMessage(true);

    } else {
        alert(`Objednávka kurzu ${course?.title} byla úspěšná!`);
        // TODO: zavolání APíčka
    }   
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
              
        <button type="button" className="btn-back" onClick={onBack}>
          ← Zpět na kurzy
        </button>

        <h1>Lekce pro kurz: {course?.title || `#${courseId}`}</h1>

        
        {showAuthMessage && !user && (
            <div className="auth-message">
                      
                <p>⚠️ Pro objednání kurzu se musíte nejdříve přihlásit nebo zaregistrovat.</p>
                <div className="auth-message-buttons">
                          
                    <button className="btn-message-signin" onClick={onSignInClick}>
                        Přihlásit se
                    </button>
                          
                    <button className="btn-message-register" onClick={onRegisterClick}>
                        Registrovat se
                    </button>
                </div>
            </div>
        )}


        <div className="lessons-container">
                {courseLessons.length > 0 ? (
                      
                    courseLessons.map((lesson) => (
                
                        <div key={lesson.id} className="lesson-card">
                                <h3>{lesson.title}</h3>
                                
                            <p><strong>Popis:</strong> {lesson.description}</p>
                            <p><strong>Cena:</strong> {lesson.price}</p>
                                <p><strong>Doba trvání:</strong> {lesson.duration}</p>
                                
                            <p className="lesson-age">
                                Věk: {lesson.ageMin} - {lesson.ageMax} let
                            </p>
                            <div className="lesson-info">
                                    
                                <span className="lesson-date">
                                    {new Date(lesson.startDate).toLocaleDateString('cs-CZ')}
                                </span>
                                        
                                <span className="lesson-capacity">
                                    {lesson.capacity} míst
                                </span>
                            </div>
                            <div>
                                {courseLessons.length > 0 && (
                                    <button className="btn-order" onClick={handleOrderClick}>
                                    {user ? "Objednat kurz" : "Přihlásit se a objednat"}
                        </button>
                        )}
                            </div>
                        </div>

                        
                    ))
                    ) : (
                    <p>Žádné lekce nejsou k dispozici pro tento kurz.</p>
                )}
        </div>


        {courseLessons.length > 0 && (
          <button className="btn-order" onClick={onMyOrdersClick}>
            {user ? "Objednat kurz" : "Přihlásit se a objednat"}
          </button>
        )}
      </div>
    </div>
  );
};

export default LessonList;