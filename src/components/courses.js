import "./courses.css";
import { useState } from "react";
import dataCourses from "../data/DataCourses";
import lessons from "../data/DataLessons";
import LessonList from "./LessonList";

const Courses = () => {
    const [selectedCourseId, setSelectedCourseId] = useState(null);

   

    //const [title, setTitle] = useState();

    if (selectedCourseId) {
        return <LessonList courseId={selectedCourseId} lessons={lessons} onBack={() => setSelectedCourseId(null)} />;
    }

    return (
        <nav>
            {dataCourses.map((course) => (

                <div key={course.id} className={`courses${course.id}`}>

                    <h2>{course.title}</h2>
                    <p>{course.description}</p>
                    <button type="button" id={`btn${course.id}`} onClick={() => setSelectedCourseId(course.id)}>přejít na lekce</button>
                
                </div>
            ))}

        </nav>
    )
}

export default Courses;