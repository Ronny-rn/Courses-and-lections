import "./Courses.css";
import { useState } from "react";
import dataCourses from "../data/DataCourses";
import lessons from "../data/DataLessons";
import LessonList from "./LessonList";

const Courses = () => {
  const [selectedCourseId, setSelectedCourseId] = useState(null);

    if (selectedCourseId) {
      
        return (
            <LessonList 
                courseId={selectedCourseId} 
                lessons={lessons} onBack={() => setSelectedCourseId(null)}
            />
        );
    }

    return (
        <div className="courses-container">
        <h1>Dostupné kurzy</h1>
        
            <div className="courses-grid">
                {dataCourses.map((course) => (
                
                    <div key={course.id} className={`course-card course-${course.id}`}>
                        
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>
                        <button type="button" className="btn-course" onClick={() => setSelectedCourseId(course.id)}>
                            Přejít na lekce
                        </button>
                    </div>
                ))}
        </div>
        </div>
    );
};

export default Courses;