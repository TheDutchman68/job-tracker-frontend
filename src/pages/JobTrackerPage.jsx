import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import StatusDashboard from "../components/dashboard/StatusDashboard";
import JobsToolbar from "../components/jobs/JobsToolbar";
import JobsTable from "../components/jobs/JobsTable";
import ProtectedMessage from "../components/common/ProtectedMessage";
import JobModal from "../components/jobs/JobModal";
import "../styles/jobs.css";

function JobTrackerPage() {
  const { isAuthenticated } = useAuth();

  const [selectedStatus, setSelectedStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState([
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

  const handleAddJob = (newJob) => {
    setJobs((prev) => [newJob, ...prev]);
  };

  const handleOpenModal = () => {
    if (!isAuthenticated) return;
    setIsModalOpen(true);
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
          onAddJob={handleOpenModal}
        />

        <JobsTable jobs={filteredJobs} />

        <JobModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddJob={handleAddJob}
          />

      </>
      
    )}
    </section>
  );
}

export default JobTrackerPage;