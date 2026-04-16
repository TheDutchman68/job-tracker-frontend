function StatusCard({ title, count, onClick, active}){
    return (
        <button type="button" className={`status-card ${active ? "active" : ""}`} onClick={onClick}>
            <h3>{title}</h3>
            <p>{count}</p>
        </button>
    );
}

export default StatusCard;