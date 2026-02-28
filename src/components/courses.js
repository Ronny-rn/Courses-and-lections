import "./Courses.css";
import { useState } from "react";
import dataCourses from "../data/DataCourses";
import dataLessons from "../data/DataLessons";
import LessonList from "./LessonList";

const Courses = ({ user, onSignInClick, onRegisterClick, onMyOrdersClick, onLogout }) => {
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  // Pokud je vybraný kurz, zobraz lekce
  if (selectedCourseId) {
    return (
      <LessonList 
            courseId={selectedCourseId}
            lessons={dataLessons}
            user={user}
            onSignInClick={onSignInClick}
            onRegisterClick={onRegisterClick}
            onLogout={onLogout}
            onBack={() => setSelectedCourseId(null)}
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
                  
                <span className="user-name">{user?.username || user?.fullName || ""}</span>
                <button className="btn-logout" onClick={onLogout}>Odhlásit se</button>
            </div>
                
        </div>


        <div className="courses-container">
                <div className="welcome-container">
                    
                    <h1>Vítejte v aplikaci kurzů</h1>
                    <h2>Objevte vzdělávání, které dává smysl.</h2>
                    <h2>Naše platforma Vám umožní jednoduše si vybrat z široké nabídky předmětů a najít kurz,</h2>
                    <h2>který odpovídá vašemu věku, úrovni i preferované velikosti studijní skupiny</h2>
            
            
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
                </div>

                <h1>Dostupné kurzy</h1>


                <div className="courses-grid">
                    
                {dataCourses.map((course) => (
                    <div key={course.id} className={`course-card course-${course.id}`}>
                    <h2>{course.title}</h2>
                    <p>{course.description}</p>
                    <button type="button" className="btn-course" onClick={() => setSelectedCourseId(course.id)}>Přejít na lekce</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
    
};

export default Courses;