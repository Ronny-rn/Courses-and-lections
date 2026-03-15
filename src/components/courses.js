import "./Courses.css";
import { useState, useEffect } from "react";
import LessonList from "./LessonList";

const Courses = ({ user, onSignInClick, onRegisterClick, onLogout, onMyOrdersClick }) => {
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {

        try {
            const response = await fetch('https://localhost:7054/api/subjects');
            const data = await response.json();
             console.log('Nactene subjects:', data); // DEBUG
            setSubjects(data);
            setLoading(false);

        } catch (error) {
            console.error('Chyba při načítání předmětů:', error);
            setLoading(false);
        }
    };


  // Pokud je vybraný kurz, zobrazí se lekce
  if (selectedCourseId) {
    return (
      <LessonList 
            courseId={selectedCourseId}
            user={user}
            onSignInClick={onSignInClick}
            onRegisterClick={onRegisterClick}
            onLogout={onLogout}
            onMyOrdersClick={onMyOrdersClick}
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
                                    
                            <button className="btn-welcome-signin" onClick={onSignInClick}>Přihlásit se</button>
                                    
                            <button className="btn-welcome-register" onClick={onRegisterClick}> Registrovat se </button>
                                    
                        </div>
                    )}
                </div>

                <h1>Dostupné kurzy</h1>


                <div className="courses-grid">
                    
           {loading ? (
                <p>Nacitam kurzy...</p>
                      
            ) : subjects.length === 0 ? (
                <p>Zadne kurzy nejsou k dispozici.</p>
            ) : (
                    <div className="courses-grid">
                                  
                        {subjects.map((subject) => (
                            
                            <div key={subject.subjectId} className={`course-card course-${subject.subjectId}`}>
                                <h2>{subject.subjectName}</h2>
                                <p>{subject.description}</p>
                                <button type="button" className="btn-course" onClick={() => setSelectedCourseId(subject.subjectId)}>Prejit na lekce</button>
                            </div>
                        ))}
                </div>
            )}
                  
            </div>
        </div>
    </div>
  );
    
};

export default Courses;