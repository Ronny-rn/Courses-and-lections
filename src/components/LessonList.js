import "./LessonList.css";
import dataLessons from "../data/DataLessons";

const LessonList = ({ courseId, lessons, onBack }) => {
    
    const course = dataLessons.find(c => c.id === courseId); // Hledá v dataLessons kurz, které má stejné ID jako courseId a vrátí objekt kurzu
    const courseLessons = lessons.filter(lesson => lesson.courseId === courseId); //z pole DataLessons vyfiltruje pouze lekce, které patří ke kurzu 


    let content;
    if (courseLessons.length > 0) {

        content = courseLessons.map((lesson) => (

            <div key={lesson.id} className="lesson-card">

                <p ><strong>Popis:</strong> {lesson.description}</p>
                <p ><strong>Cena:</strong> {lesson.price}</p>

            </div>
        ));
    } else {
        
        content = <p>Žádné lekce nejsou k dispozici.</p>;
    }

    return (
        <div>

            <button type="button" onClick={onBack}>← Zpět na kurzy</button>
            <h1>Lekce pro kurz: {course.title}</h1>  
            <div className="lessons-container">

                {content}

            </div>
        </div>
    );
};

export default LessonList;