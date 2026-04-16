function StatusCard({ title, count, onClick, active, disabled }) {
  return (
    <button
      type="button"
      className={`status-card ${active ? "active" : ""} ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <h3>{title}</h3>
      <p>{count}</p>
    </button>
  );
}

export default StatusCard;