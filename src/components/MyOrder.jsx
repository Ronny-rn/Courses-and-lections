import { useState, useEffect } from "react";
import { getOrder, updateOrder, deleteOrder } from "./apiService";
import "./MyOrder.css";

const MyOrder = ({ user, onBack }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingOrderId, setEditingOrderId] = useState(null);
    const [editForm, setEditForm] = useState({ courseIds: [] });
    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        if (user?.orderId) {
            fetchOrder(user.orderId);
        } else {
            // No orderId on user — nothing to load
            setLoading(false);
        }
    }, [user]);

    const fetchOrder = async (orderId) => {
        try {
            const { data } = await getOrder(orderId);
            setOrders([data]); // API returns a single order by ID; wrap in array for list rendering
        } catch (err) {
            if (err.response?.status !== 404) {
                setError("Nepodařilo se načíst objednávky.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateOrder = async (orderId) => {
        setActionLoading(orderId);
        try {
            const { data } = await updateOrder(orderId, user.id, editForm.courseIds);
            setOrders((prev) =>
                prev.map((o) => (o.orderId === orderId ? data : o))
            );
            setEditingOrderId(null);
        } catch (err) {
            alert("Nepodařilo se upravit objednávku.");
        } finally {
            setActionLoading(null);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        if (!window.confirm("Opravdu chcete zrušit tuto objednávku?")) return;
        setActionLoading(orderId);
        try {
            await deleteOrder(orderId);
            setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
        } catch (err) {
            alert("Nepodařilo se zrušit objednávku.");
        } finally {
            setActionLoading(null);
        }
    };

    const startEditing = (order) => {
        setEditingOrderId(order.orderId);
        setEditForm({ courseIds: [...order.courseIds] });
    };

    const cancelEditing = () => {
        setEditingOrderId(null);
        setEditForm({ courseIds: [] });
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
                {loading ? (
                    <p>Načítám objednávky...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : orders.length > 0 ? (
                    <div className="orders-grid">
                        {orders.map((order) => (
                            <div key={order.orderId} className="order-card">
                                {editingOrderId === order.orderId ? (
                                    <div className="order-edit-mode">
                                        <h3>Objednávka #{order.orderNumber?.slice(0, 8)}</h3>
                                        <p className="order-meta-info">
                                            Kurzy (ID): {editForm.courseIds.join(", ")}
                                        </p>
                                        <div className="edit-form">
                                            <div className="form-group">
                                                <label>ID kurzů (čárkou oddělená):</label>
                                                <input
                                                    type="text"
                                                    value={editForm.courseIds.join(",")}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            courseIds: e.target.value
                                                                .split(",")
                                                                .map((v) => parseInt(v.trim()))
                                                                .filter(Boolean),
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="edit-buttons">
                                                <button
                                                    className="btn-save"
                                                    disabled={actionLoading === order.orderId}
                                                    onClick={() => handleUpdateOrder(order.orderId)}
                                                >
                                                    {actionLoading === order.orderId ? "Ukládám..." : "Uložit změny"}
                                                </button>
                                                <button className="btn-cancel-edit" onClick={cancelEditing}>
                                                    Zrušit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="order-header">
                                            <h3>Objednávka #{order.orderNumber?.slice(0, 8)}</h3>
                                        </div>

                                        <div className="order-details">
                                            <p>
                                                <strong>Datum objednávky:</strong>{" "}
                                                {new Date(order.orderDate).toLocaleDateString("cs-CZ")}
                                            </p>
                                            <p>
                                                <strong>Cena celkem:</strong> {order.totalPrice} Kč
                                            </p>
                                            <p>
                                                <strong>Kurzy (ID):</strong> {order.courseIds?.join(", ")}
                                            </p>
                                        </div>

                                        <div className="order-actions">
                                            <button className="btn-edit" onClick={() => startEditing(order)}>
                                                Upravit
                                            </button>
                                            <button
                                                className="btn-delete"
                                                disabled={actionLoading === order.orderId}
                                                onClick={() => handleDeleteOrder(order.orderId)}
                                            >
                                                {actionLoading === order.orderId ? "Ruším..." : "Zrušit"}
                                            </button>
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