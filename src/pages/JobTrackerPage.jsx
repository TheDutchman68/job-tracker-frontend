import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import StatusDashboard from "../components/dashboard/StatusDashboard";
import JobsToolbar from "../components/jobs/JobsToolbar";
import JobsTable from "../components/jobs/JobsTable";
import ProtectedMessage from "../components/common/ProtectedMessage";
import JobModal from "../components/jobs/JobModal";
import { getJobs, createJob, deleteJob } from "../services/jobService";
import "../styles/jobs.css";

function JobTrackerPage() {
  const { isAuthenticated } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
  if (!isAuthenticated) return;

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      console.error("Failed to load jobs", err);
    }
  };

  fetchJobs();
}, [isAuthenticated]);

  const handleDeleteJob = async (id) => {
  try {
    await deleteJob(id);
    setJobs((prev) => prev.filter((job) => job.id !== id));
  } catch (err) {
    console.error("Failed to delete job", err);
  }
};


  const filteredJobs = selectedStatus !== null ? jobs.filter((job) => job.status === selectedStatus) : jobs;

  const handleAddJob = async (newJob) => {
  try {
    const created = await createJob(newJob);
    setJobs((prev) => [created, ...prev]);
  } catch (err) {
    console.error("Failed to create job", err);
  }
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
            setSelectedStatus((prev) => (prev === status ? null : status))
          }
        />

        <JobsToolbar
          isAuthenticated={isAuthenticated}
          onAddJob={handleOpenModal}
        />

        <JobsTable jobs={filteredJobs} onDeleteJob={handleDeleteJob} />

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