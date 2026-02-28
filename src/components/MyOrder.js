import "./MyOrder.css";
import { useState, useEffect } from "react";

const MyOrder = ({ user, onBack }) => {

    const [orders, setOrders] = useState([]);
    const [editingOrderId, setEditingOrderId] = useState(null);
    const [editForm, setEditForm] = useState({ numberOfPeople: 1, startDate: "" });
    
    useEffect(() => {
        loadOrders();
    }, [user]);

    const loadOrders = () => {

        const savedOrders = localStorage.getItem(`orders_${user?.id}`);
        if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
        }
  };


    const handleUpdateOrder = (orderId) => {
        const updatedOrders = [];
        
        orders.forEach(order => {
            if (order.id === orderId) {
            // Uprav tuto objednávku
            updatedOrders.push({
                ...order,
                numberOfPeople: editForm.numberOfPeople,
                startDate: editForm.startDate,
                updatedAt: new Date().toISOString()
            });
            } else {
            updatedOrders.push(order);
            }
        });
        
        setOrders(updatedOrders);
        localStorage.setItem(`orders_${user?.id}`, JSON.stringify(updatedOrders));
        setEditingOrderId(null);
        alert("Objednávka byla úspěšně upravena!");

    };


    const handleDeleteOrder = (orderId) => {
        if (!window.confirm("Opravdu chcete zrušit tuto objednávku?")) {
            return;
        }

        const updatedOrders = orders.filter(order => order.id !== orderId);
        setOrders(updatedOrders);
        localStorage.setItem(`orders_${user?.id}`, JSON.stringify(updatedOrders));
        
        // TODO: Nahradit APíčkem
        // await fetch(`/api/orders/${orderId}`, { method: 'DELETE' });
        
        alert("Objednávka byla zrušena!");
    };

    const startEditing = (order) => {
        setEditingOrderId(order.id);
        setEditForm({
            numberOfPeople: order.numberOfPeople,
            startDate: order.startDate
        });
    };

    const cancelEditing = () => {
        setEditingOrderId(null);
        setEditForm({ numberOfPeople: 1, startDate: "" });
    };

    return (
        <div className="myorders-page">

        <div className="myorders-header">
            <button className="btn-back" onClick={onBack}>
            ← Zpět na kurzy
            </button>
            <h1>Moje objednávky</h1>
        </div>

        <div className="myorders-container">
            {orders.length > 0 ? (
            <div className="orders-grid">
                {orders.map((order) => (
                <div key={order.id} className="order-card">
                    {editingOrderId === order.id ? (
                    <div className="order-edit-mode">
                        <h3>{order.courseName}</h3>
                        <p className="order-lesson">{order.lessonTitle}</p>

                        <div className="edit-form">
                        <div className="form-group">
                            <label>Počet osob:</label>
                            <input
                            type="number"
                            min="1"
                            max={order.maxCapacity}
                            value={editForm.numberOfPeople}
                            onChange={(e) => setEditForm({...editForm, numberOfPeople: parseInt(e.target.value)})}
                            />
                        </div>

                        <div className="form-group">
                            <label>Datum začátku:</label>
                            <input
                            type="date"
                            value={editForm.startDate}
                            onChange={(e) => setEditForm({...editForm, startDate: e.target.value})}
                            />
                        </div>

                        <div className="edit-buttons">
                            <button  className="btn-save" onClick={() => handleUpdateOrder(order.id)}>Uložit změny</button>
                            <button className="btn-cancel-edit"onClick={cancelEditing}>Zrušit</button>
                        </div>
                        </div>
                    </div>
                    ) : (

                    <>
                        <div className="order-header">
                        <h3>{order.courseName}</h3>
                        <span className={`order-status status-${order.status}`}>
                            {order.status === 'active' ? ' Aktivní' : ' Čeká'}
                        </span>
                        </div>

                        <p className="order-lesson"> {order.lessonTitle}</p>

                        <div className="order-details">
                                        
                            <p><strong>Datum začátku:</strong> {new Date(order.startDate).toLocaleDateString('cs-CZ')}</p>
                            <p><strong>Počet osob:</strong> {order.numberOfPeople}</p>
                            <p><strong>Cena celkem:</strong> {order.totalPrice}</p>
                            <p><strong>Věkové omezení:</strong> {order.ageMin} - {order.ageMax} let</p>
                        </div>

                        <div className="order-meta">
                                        
                        <span className="order-created">
                            Objednáno: {new Date(order.createdAt).toLocaleDateString('cs-CZ')}
                        </span>
                                        
                        {order.updatedAt && (
                            <span className="order-updated"> Upraveno: {new Date(order.updatedAt).toLocaleDateString('cs-CZ')}</span>
                        )}
                        </div>

                        <div className="order-actions">
                                        
                            <button className="btn-edit" onClick={() => startEditing(order)}>Upravit</button>
                            <button className="btn-delete" onClick={() => handleDeleteOrder(order.id)}>Zrušit</button>
                        </div>
                                    
                    </>
                    )}
                </div>
                ))}
            </div>
            ) : (
                <div className="empty-state">
                            
                <h2>Zatím nemáte žádné objednávky</h2>
                <p>Prohlédněte si naše kurzy a objednejte si svou první lekci!</p>
                <button className="btn-browse" onClick={onBack}>
                Procházet kurzy
                </button>
            </div>
            )}
        </div>
        </div>
    );
};

export default MyOrder;