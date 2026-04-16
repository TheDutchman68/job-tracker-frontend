import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import StatusDashboard from "../components/dashboard/StatusDashboard";
import JobsToolbar from "../components/jobs/JobsToolbar";
import JobsTable from "../components/jobs/JobsTable";
import ProtectedMessage from "../components/common/ProtectedMessage";
import "../styles/jobs.css";

function JobTrackerPage() {
  const { isAuthenticated } = useAuth();

  const [selectedStatus, setSelectedStatus] = useState("");
  const [jobs] = useState([
    {
      id: 1,
      position: "Frontend Developer",
      company: "Google",
      status: "Applied",
      location: "Remote",
    },
    {
      id: 2,
      position: "React Developer",
      company: "Meta",
      status: "Interview",
      location: "Amsterdam",
    },
    {
      id: 3,
      position: "UI Engineer",
      company: "Spotify",
      status: "Rejected",
      location: "Remote",
    },
    {
      id: 4,
      position: "Software Engineer",
      company: "Booking",
      status: "Offer",
      location: "Amsterdam",
    },
  ]);

  const filteredJobs = selectedStatus ? jobs.filter((job) => job.status === selectedStatus) : jobs;

  const handleAddJob = () => {
    if (!isAuthenticated) return;

    console.log("Open add job modal");
  };

  return (
    <section className="jobtracker-page">
      <div className="jobtracker-header">
        <h1>Job Pilot</h1>
        <p>Manage your applications and track their status.</p>
      </div>

     {!isAuthenticated ? (
      <ProtectedMessage />
    ) : (
      <>
        <StatusDashboard
          jobs={jobs}
          selectedStatus={selectedStatus}
          onSelectStatus={(status) =>
            setSelectedStatus((prev) => (prev === status ? "" : status))
          }
        />

        <JobsToolbar
          isAuthenticated={isAuthenticated}
          onAddJob={handleAddJob}
        />

        <JobsTable jobs={filteredJobs} />
      </>
    )}
    </section>
  );
}

export default JobTrackerPage;