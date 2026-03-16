import { useState, useEffect } from "react";
import { getOrder,  getOrdersByCustomer, updateOrder, deleteOrder, createOrder } from "./apiService";
import "./MyOrder.css";
 
const MyOrder = ({ user, onBack, pendingOrder }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingOrderId, setEditingOrderId] = useState(null);
    const [editForm, setEditForm] = useState({ courseIds: [], extraParticipants: 1 });
    const [actionLoading, setActionLoading] = useState(null);
    const [successMsg, setSuccessMsg] = useState("");
 
    // pokud přijde pendingOrder z App (po kliknutí "Objednat kurz"),
    // načtou se plná data přes API (pendingOrder obsahuje jenm orderId, totalPrice a message)
    useEffect(() => {
        if (!pendingOrder?.orderId) {
            setLoading(false);
            return;
        }
 
        getOrder(pendingOrder.orderId)
            .then(({ data }) => {
                setOrders((prev) => {
                    const exists = prev.find((o) => o.orderId === data.orderId);
                    return exists ? prev : [data, ...prev];
                });
            })
            .catch((err) => {
                if (err.response?.status !== 404)
                    setError("Nepodařilo se načíst objednávku.");
            })
            .finally(() => setLoading(false));
    }, [pendingOrder]);
 
    useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    getOrdersByCustomer(user.id)
        .then(({ data }) => setOrders(data))
        .catch(() => {})
        .finally(() => setLoading(false));
    }, [user]);
    
    /*
    const fetchOrder = async (orderId) => {
        try {
            const { data } = await getOrder(orderId);
            setOrders([data]);
        } catch (err) {
            if (err.response?.status !== 404) {
                setError("Nepodařilo se načíst objednávky.");
            }
        } finally {
            setLoading(false);
        }
    };
    */
 
    const showSuccess = (msg) => {
        setSuccessMsg(msg);
        setTimeout(() => setSuccessMsg(""), 3000);
    };
 
    // UPDATE objednávky
    const handleUpdateOrder = async (orderId) => {
        setActionLoading(orderId);
        try {
            const courseIds = editForm.courseIds.map((id) => parseInt(id)).filter((id) => !isNaN(id));
 
            if (courseIds.length === 0) {
                alert("Zadejte alespoň jedno platné ID kurzu.");
                setActionLoading(null);
                return;
            }
 
            await updateOrder(orderId, parseInt(user.id), courseIds);
            // UpdateOrderResponse nemá orderDate — načti plná data
            const { data } = await getOrder(orderId);
            setOrders((prev) => prev.map((o) => (o.orderId === orderId ? data : o)));
            setEditingOrderId(null);
            showSuccess("Objednávka byla úspěšně upravena!");
        } catch (err) {
            alert("Nepodařilo se upravit objednávku.");
        } finally {
            setActionLoading(null);
        }
    };
 
    // DELETE objednávky
    const handleDeleteOrder = async (orderId) => {
        if (!window.confirm("Opravdu chcete zrušit tuto objednávku?")) return;
        setActionLoading(orderId);
        try {
            await deleteOrder(orderId);
            setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
            showSuccess("Objednávka byla zrušena.");
        } catch (err) {
            alert("Nepodařilo se zrušit objednávku.");
        } finally {
            setActionLoading(null);
        }
    };
 
    // Přidat dalšího účastníka — vytvoří novou objednávku se stejnými kurzy
    const handleAddParticipant = async (order) => {
        setActionLoading("add-" + order.orderId);
        try {
            const { data } = await createOrder(user.id, order.courseIds);
            // data obsahuje: { message, orderId, totalPrice }
            // Načti celou novou objednávku
            const { data: newOrder } = await getOrder(data.orderId);
            setOrders((prev) => [...prev, newOrder]);
            showSuccess("Nová objednávka pro dalšího účastníka byla vytvořena!");
        } catch (err) {
            alert("Nepodařilo se přidat dalšího účastníka: " + (err.response?.data || err.message));
        } finally {
            setActionLoading(null);
        }
    };
 
    const startEditing = (order) => {
        setEditingOrderId(order.orderId);
        setEditForm({ courseIds: [...order.courseIds], extraParticipants: 1 });
    };
 
    const cancelEditing = () => {
        setEditingOrderId(null);
        setEditForm({ courseIds: [], extraParticipants: 1 });
    };
 
    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString("cs-CZ", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
 
    const shortOrderNum = (guid) => guid?.toString().slice(0, 8).toUpperCase() ?? "—";
 
    return (
        <div className="myorders-page">
            {/* HEADER */}
            <div className="myorders-header">
                <button className="btn-back" onClick={onBack}>
                    ← Zpět
                </button>
                <div className="header-titles">
                    <span className="header-eyebrow">Přehled</span>
                    <h1>Moje objednávky</h1>
                </div>
                <div className="header-count">
                    <span>{orders.length}</span>
                    <small>celkem</small>
                </div>
            </div>
 
            {/* SUCCESS TOAST */}
            {successMsg && (
                <div className="toast-success">
                    <span>✓</span> {successMsg}
                </div>
            )}
 
            <div className="myorders-container">
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner" />
                        <p>Načítám objednávky...</p>
                    </div>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : orders.length > 0 ? (
                    <div className="orders-grid">
                        {orders.map((order, idx) => (
                            <div
                                key={order.orderId}
                                className="order-card"
                                style={{ "--delay": `${idx * 0.07}s` }}
                            >
                                {editingOrderId === order.orderId ? (
                                    /* ── EDIT MODE ── */
                                    <div className="order-edit-mode">
                                        <div className="edit-header">
                                            <span className="edit-badge">Úprava</span>
                                            <h3>#{shortOrderNum(order.orderNumber)}</h3>
                                        </div>
 
                                        <div className="edit-form">
                                            <div className="form-group">
                                                <label>ID kurzů (čárkou oddělená)</label>
                                                <input
                                                    type="text"
                                                    value={editForm.courseIds.join(",")}
                                                    onChange={(e) =>
                                                        setEditForm((f) => ({
                                                            ...f,
                                                            courseIds: e.target.value
                                                                .split(",")
                                                                .map((v) => parseInt(v.trim()))
                                                                .filter((v) => !isNaN(v)),
                                                        }))
                                                    }
                                                    placeholder="např. 1,2,3"
                                                />
                                            </div>
 
                                            <div className="form-group">
                                                <label>Počet účastníků</label>
                                                <div className="participant-stepper">
                                                    <button
                                                        className="stepper-btn"
                                                        onClick={() =>
                                                            setEditForm((f) => ({
                                                                ...f,
                                                                extraParticipants: Math.max(1, f.extraParticipants - 1),
                                                            }))
                                                        }
                                                    >
                                                        −
                                                    </button>
                                                    <span className="stepper-value">{editForm.extraParticipants}</span>
                                                    <button
                                                        className="stepper-btn"
                                                        onClick={() =>
                                                            setEditForm((f) => ({
                                                                ...f,
                                                                extraParticipants: f.extraParticipants + 1,
                                                            }))
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <small className="stepper-hint">
                                                    Kurzy budou objednány pro {editForm.extraParticipants}{" "}
                                                    {editForm.extraParticipants === 1 ? "účastníka" : "účastníky/účastníků"}
                                                </small>
                                            </div>
                                        </div>
 
                                        <div className="edit-buttons">
                                            <button
                                                className="btn-save"
                                                disabled={actionLoading === order.orderId}
                                                onClick={() => handleUpdateOrder(order.orderId)}
                                            >
                                                {actionLoading === order.orderId ? (
                                                    <span className="btn-spinner" />
                                                ) : (
                                                    "✓ Uložit"
                                                )}
                                            </button>
                                            <button className="btn-cancel-edit" onClick={cancelEditing}>
                                                Zrušit
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    /* ── VIEW MODE ── */
                                    <>
                                        <div className="card-top">
                                            <div className="order-number-badge">
                                                #{shortOrderNum(order.orderNumber)}
                                            </div>
                                            <span className="status-chip status-active">Aktivní</span>
                                        </div>
 
                                        <div className="order-details">
                                            <div className="detail-row">
                                                <span className="detail-icon">📅</span>
                                                <div>
                                                    <small>Datum objednávky</small>
                                                    <strong>{formatDate(order.orderDate)}</strong>
                                                </div>
                                            </div>
                                            <div className="detail-row">
                                                <span className="detail-icon">💰</span>
                                                <div>
                                                    <small>Cena celkem</small>
                                                    <strong className="price-tag">{order.totalPrice} Kč</strong>
                                                </div>
                                            </div>
                                            <div className="detail-row">
                                                <span className="detail-icon">📚</span>
                                                <div>
                                                    <small>Kurzy (ID)</small>
                                                    <div className="course-chips">
                                                        {order.courseIds?.map((id) => (
                                                            <span key={id} className="course-chip">
                                                                #{id}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
 
                                        <div className="order-actions">
                                            <button className="btn-action btn-edit"onClick={() => startEditing(order)}>Upravit</button>
                                            <button  className="btn-action btn-add-participant" disabled={actionLoading === "add-" + order.orderId} onClick={() => handleAddParticipant(order)} title="Přidat dalšího účastníka se stejnými kurzy">
                                                {actionLoading === "add-" + order.orderId ? (
                                                    <span className="btn-spinner dark" />
                                                ) : ("👤+ Přidat účastníka")}
                                            </button>
                                            <button className="btn-action btn-delete" disabled={actionLoading === order.orderId}onClick={() => handleDeleteOrder(order.orderId)}>
                                                {actionLoading === order.orderId ? (
                                                    <span className="btn-spinner" />
                                                    ) : (" Zrušit")}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">🛒</div>
                        <h2>Žádné objednávky</h2>
                        <p>Prozatím jste si neobjednali žádný kurz.</p>
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