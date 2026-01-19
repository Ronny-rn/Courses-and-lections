import "./LessonList.css";
import dataCourses from "../data/DataCourses";

const LessonList = ({ courseId, lessons, onBack }) => {
    
    const course = dataCourses.find(c => c.id === courseId); // Hledá v dataCourses kurz, které má stejné ID jako courseId a vrátí objekt kurzu
    const courseLessons = lessons.filter(lesson => lesson.courseId === courseId); //z pole DataLessons vyfiltruje pouze lekce, které patří ke kurzu 


    let content;
    if (courseLessons.length > 0) {
        content = courseLessons.map((lesson) => (
            <div key={lesson.id} className="lesson-card">
                <p><strong>Popis:</strong> {lesson.description}</p>
                <p><strong>Cena:</strong> {lesson.price}</p>
            </div>
        ));
    } else {
        content = <p>Žádné lekce nejsou k dispozici.</p>;
    }

    return (
        <div>
            <button type="button" onClick={onBack}>← Zpět na kurzy</button>
            <h1>Lekce pro kurz: {course.title}</h1>  // Zobrazuje název kurzu podle jeho ID
            <div className="lessons-container">
                {content}
            </div>
        </div>
    );
};

export default LessonList;