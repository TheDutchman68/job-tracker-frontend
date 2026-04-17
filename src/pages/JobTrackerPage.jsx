import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import StatusDashboard from "../components/dashboard/StatusDashboard";
import JobsToolbar from "../components/jobs/JobsToolbar";
import JobsTable from "../components/jobs/JobsTable";
import ProtectedMessage from "../components/common/ProtectedMessage";
import JobModal from "../components/jobs/JobModal";
import { getJobs, createJob, deleteJob, updateJob } from "../services/jobService";
import "../styles/jobs.css";

function JobTrackerPage() {
  const { isAuthenticated } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

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

  const handleSaveJob = async (jobData) => {
  try {
    if (editingJob) {
      const updated = await updateJob(editingJob.id, jobData);

      setJobs((prev) =>
        prev.map((job) => (job.id === editingJob.id ? updated : job))
      );
    } else {
      const created = await createJob(jobData);
      setJobs((prev) => [created, ...prev]);
    }

    setIsModalOpen(false);
    setEditingJob(null);
  } catch (err) {
    console.error("Failed to save job", err);
  }
};
const handleStatusChange = async (id, newStatus) => {
  const currentJob = jobs.find((job) => job.id === id);
  if (!currentJob) return;

  try {
    const updated = await updateJob(id, {
      position: currentJob.position,
      company: currentJob.company,
      status: newStatus,
      location: currentJob.location,
    });

    setJobs((prev) =>
      prev.map((job) => (job.id === id ? updated : job))
    );
  } catch (err) {
    console.error("Failed to update status", err);
  }
};

  const handleOpenModal = () => {
    if (!isAuthenticated) return;
    setEditingJob(null);
    setIsModalOpen(true);
  };

  const handleEditJob = (job) => {
  setEditingJob(job);
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

        <JobsTable jobs={filteredJobs} onDeleteJob={handleDeleteJob} onEditJob={handleEditJob} 
        onStatusChange={handleStatusChange}/>

        <JobModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingJob(null);
        }}
        onSaveJob={handleSaveJob}
        editingJob={editingJob}
      />

      </>
      
    )}
    </section>
  );
}

export default JobTrackerPage;