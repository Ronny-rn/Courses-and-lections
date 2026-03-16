import { useState, useEffect } from "react";
import { getCoursesBySubject, getSubjectById, createOrder, createCourse, updateCourse, deleteCourse } from "./apiService";
import "./LessonList.css";

const LessonList = ({

    subjectId,
    user,
    onSignInClick,
    onRegisterClick,
    onLogout,
    onMyOrdersClick,
    onBack,
    onOrderCreated,

}) => {

    const [courses, setCourses] = useState([]);
    const [subjectName, setSubjectName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [orderingCourseId, setOrderingCourseId] = useState(null);
    const [orderMessage, setOrderMessage] = useState({ id: null, text: "", type: "" });

    // CRUD states
    const [isCreating, setIsCreating] = useState(false);
    const [editingCourseId, setEditingCourseId] = useState(null);
    const [formData, setFormData] = useState({

        courseName: '',
        description: '',
        capacity: 0,
        startDate: '',
        scheduledBeginTime: '',
        price: 0,
        subjectId: subjectId
    });


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

            const res = await createOrder(user.id, [course.courseId]);
            if (onOrderCreated) onOrderCreated(res.data);
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

    // CRUD HANDLERS
    // CREATE - otevřít formulář
    const handleCreateClick = () => {
        setFormData({
            courseName: '',
            description: '',
            capacity: 0,
            startDate: '',
            scheduledBeginTime: '',
            price: 0,
            subjectId: subjectId
        });
        setIsCreating(true);
    };

    // CREATE - uložit nový kurz
const handleSaveNew = async () => {
    try {
        const formattedData = {
            ...formData,
            scheduledBeginTime: formData.scheduledBeginTime + ":00"
        };
        await createCourse(formattedData);
        setIsCreating(false);
        fetchData();
        alert('Kurz byl úspěšně vytvořen!');
    } catch (err) {
        console.error('CREATE ERROR:', err.response?.data);
        alert('Chyba při vytváření kurzu: ' + (err.response?.data?.message || err.message));
    }
};
    // UPDATE - otevřít editaci
    const handleEditClick = (course) => {
    setEditingCourseId(course.courseId);
    setFormData({
        courseName: course.courseName,
        description: course.description,
        capacity: course.capacity,
        // Zajisti formát YYYY-MM-DD pro <input type="date">
        startDate: course.startDate,
        // Ořízni na HH:mm pro <input type="time">
        scheduledBeginTime: course.scheduledBeginTime?.substring(0, 5),
        price: course.price,
        subjectId: course.subjectId
    });
};

    // UPDATE - uložit změny
const handleSaveEdit = async () => {
    try {
        // Normalizace času — odstranění případné sekundy a přidání :00
        const rawTime = formData.scheduledBeginTime; 
        const normalizedTime = rawTime.length === 5 ? rawTime + ":00" : rawTime;

        const formattedData = {
            ...formData,
            scheduledBeginTime: normalizedTime
        };

        await updateCourse(editingCourseId, formattedData);
        setEditingCourseId(null);
        fetchData();
        alert('Kurz byl úspěšně upraven!');
    } catch (err) {
        alert('Chyba při úpravě kurzu: ' + (err.response?.data?.message || err.message));
    }
};

    // DELETE
const handleDeleteClick = async (courseId) => {
    if (!window.confirm('Opravdu chcete smazat tento kurz?')) {
        return;
    }

    try {
        await deleteCourse(courseId);
        fetchData();
        alert('Kurz byl úspěšně smazán!');
    } catch (err) {
        console.log('DELETE ERROR:', err);
        console.log('Response:', err.response);
        console.log('Data:', err.response?.data);
        
        const errorMsg = err.response?.data || err.message;
        alert('Chyba při mazání: ' + errorMsg);
    }
};

    // Form input handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Zrušit CREATE/UPDATE
    const handleCancel = () => {
        setIsCreating(false);
        setEditingCourseId(null);
    };


    // Render edit form
    const renderEditForm = (isNew = false) => (

        <div className="lesson-card lesson-card-edit">
            <h3>{isNew ? 'Nový kurz' : 'Upravit kurz'}</h3>

            <div className="form-group">

                <label>Název kurzu:</label>
                <input type="text" name="courseName" value={formData.courseName} onChange={handleInputChange} placeholder="Zadejte název kurzu"/>
            </div>

            <div className="form-group"> 

                <label>Popis:</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Zadejte popis kurzu" rows="3"/>
            </div>

            <div className="form-row"> 

                <div className="form-group">
                    <label>Cena (Kč):</label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} min="0" />
                </div>

                <div className="form-group">
                    <label>Kapacita:</label>
                    <input type="number" name="capacity" value={formData.capacity} onChange={handleInputChange} min="1" />
                </div>
            </div>

            <div className="form-row">

                <div className="form-group">
                    <label>Datum zahájení:</label>
                    <input  type="date" name="startDate" value={formData.startDate} onChange={handleInputChange}  />
                </div>

                <div className="form-group">
                    <label>Čas zahájení:</label>
                    <input type="time" name="scheduledBeginTime" value={formData.scheduledBeginTime}onChange={handleInputChange}/>
                </div>
            </div>

            <div className="form-buttons">

                <button className="btn-save" onClick={isNew ? handleSaveNew : handleSaveEdit}>Uložit</button>
                <button className="btn-cancel" onClick={handleCancel}>Zrušit</button>
            </div>
        </div>

    );
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

                                {/* CREATE BUTTON */}
                                <button className="btn-create-course" onClick={handleCreateClick}>+</button>

                                 {/* CREATE FORM */}
                                {isCreating && renderEditForm(true)}
                                
                                {/* COURSES */}
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                editingCourseId === course.courseId ? (
                                    // EDIT MODE
                                    <div key={course.courseId}>
                                        {renderEditForm(false)}
                                    </div>
                                ) : (
                                    // VIEW MODE
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

                                        {/* CRUD BUTTONS */}
                                        <div className="crud-buttons">
                                            <button
                                                className="btn-update"
                                                onClick={() => handleEditClick(course)}
                                            >
                                                Upravit
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDeleteClick(course.courseId)}
                                                title="Smazat kurz"
                                            >
                                                🗑️
                                            </button>
                                        </div>

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
                                )
                            ))
                        ) : !isCreating && (
                            <p>Žádné lekce nejsou k dispozici pro tento předmět.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LessonList;