import StatusCard from "./StatusCard";

function StatusDashboard({jobs, selectedStatus, onSelectStatus}){
    const appliedCount = jobs.filter((job) => job.status === "Applied").length;
    const interviewCount = jobs.filter((job) => job.status === "Interview").length;
    const rejectedCount = jobs.filter((job) => job.status === "Rejected").length;
    const offerCount = jobs.filter((job) => job.status === "Offer").length;
    

    return (
    <section className="status-dashboard">
      <StatusCard
        title="Applied"
        count={appliedCount}
        active={selectedStatus === "Applied"}
        onClick={() => onSelectStatus("Applied")}
      />
      <StatusCard
        title="Interview"
        count={interviewCount}
        active={selectedStatus === "Interview"}
        onClick={() => onSelectStatus("Interview")}
      />
      <StatusCard
        title="Rejected"
        count={rejectedCount}
        active={selectedStatus === "Rejected"}
        onClick={() => onSelectStatus("Rejected")}
      />
      <StatusCard
        title="Offer"
        count={offerCount}
        active={selectedStatus === "Offer"}
        onClick={() => onSelectStatus("Offer")}
      />
    </section>
  );

}

export default StatusDashboard;