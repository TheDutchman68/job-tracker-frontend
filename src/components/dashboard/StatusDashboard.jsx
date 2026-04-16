import StatusCard from "./StatusCard";
import { statusValues } from "../../utils/statusMap";

function StatusDashboard({jobs, selectedStatus, onSelectStatus}){
   const appliedCount = jobs.filter((job) => job.status === statusValues.Applied).length;
   const interviewCount = jobs.filter((job) => job.status === statusValues.Interview).length;
   const rejectedCount = jobs.filter((job) => job.status === statusValues.Rejected).length;
   const offerCount = jobs.filter((job) => job.status === statusValues.Offer).length;
   

    return (
    <section className="status-dashboard">
      <StatusCard
        title="Applied"
        count={appliedCount}
        active={selectedStatus === statusValues.Applied}
        onClick={() => onSelectStatus(statusValues.Applied)}
        disabled={appliedCount === 0}
      />
      <StatusCard
        title="Interview"
        count={interviewCount}
        active={selectedStatus === statusValues.Interview}
        onClick={() => onSelectStatus(statusValues.Interview)}
        disabled={interviewCount === 0}
      />
      <StatusCard
        title="Rejected"
        count={rejectedCount}
        active={selectedStatus === statusValues.Rejected}
        onClick={() => onSelectStatus(statusValues.Rejected)}
        disabled={rejectedCount === 0}
      />
      <StatusCard
        title="Offer"
        count={offerCount}
        active={selectedStatus === statusValues.Offer}
        onClick={() => onSelectStatus(statusValues.Offer)}
        disabled={offerCount === 0}
      />
    </section>
  );

}

export default StatusDashboard;