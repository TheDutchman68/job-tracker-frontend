import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import StatusDashboard from "../components/dashboard/StatusDashboard";
import JobsToolbar from "../components/jobs/JobsToolbar";
import JobsTable from "../components/jobs/JobsTable";
import ProtectedMessage from "../components/common/ProtectedMessage";
import JobModal from "../components/jobs/JobModal";
import {getJobs, createJob, deleteJob, updateJob} from "../services/jobService";
import "../styles/jobs.css";

function JobTrackerPage() {
  const { isAuthenticated } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [editingJob, setEditingJob] = useState(null);
  const [isSavingJob, setIsSavingJob] = useState(false);
  const [deletingJobId, setDeletingJobId] = useState(null);
  const [updatingJobId, setUpdatingJobId] = useState(null);


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchJobs = useCallback(async () => {
    if (!isAuthenticated) return;

    try {

      const filters = {};

      if (selectedStatus !== null) {
        filters.status = selectedStatus;
      }

      if (debouncedSearchTerm.trim()) {
        filters.search = debouncedSearchTerm.trim();
      }

      const [filteredData, allData] = await Promise.all([
        getJobs(filters),
        getJobs(),
      ]);

      setJobs(filteredData);
      setAllJobs(allData);
    } catch (err) {
      console.error("Failed to load jobs", err.response?.data || err.message);
  
    }
  }, [isAuthenticated, selectedStatus, debouncedSearchTerm]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleDeleteJob = async (id) => {
    try {
      setDeletingJobId(id);
      await deleteJob(id);
      await fetchJobs();
    } catch (err) {
      console.error("Failed to delete job", err.response?.data || err.message);
    } finally{
      setDeletingJobId(null);
    }
  };

  useEffect(() => {
  if (selectedStatus === null) return;

  const hasSelectedStatusJobs = allJobs.some(
    (job) => job.status === selectedStatus
  );

  if (!hasSelectedStatusJobs) {
    setSelectedStatus(null);
  }
}, [allJobs, selectedStatus]);

  const handleSaveJob = async (jobData) => {
    try {
      setIsSavingJob(true);

      if (editingJob) {
        await updateJob(editingJob.id, jobData);
      } else {
        await createJob(jobData);
      }

      setIsModalOpen(false);
      setEditingJob(null);
      await fetchJobs();
    } catch (err) {
      console.error("Failed to save job", err.response?.data || err.message);
    } finally {
      setIsSavingJob(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const currentJob = allJobs.find((job) => job.id === id);
    if (!currentJob) return;

    const payload = {
      position: currentJob.position,
      company: currentJob.company,
      status: newStatus,
      location: currentJob.location,
    };

    try {
      setUpdatingJobId(id);
      await updateJob(id, payload);
      await fetchJobs();
    } catch (err) {
      console.error(
        "Failed to update status",
        err.response?.data || err.message
      );
    } finally{
      setUpdatingJobId(null);
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
            jobs={allJobs}
            selectedStatus={selectedStatus}
            onSelectStatus={(status) =>
              setSelectedStatus((prev) => (prev === status ? null : status))
            }
          />

          <JobsToolbar
            isAuthenticated={isAuthenticated}
            onAddJob={handleOpenModal}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            hasJobs={allJobs.length > 0}
          />

          <JobsTable
            jobs={jobs}
            updatingJobId={updatingJobId}
            onDeleteJob={handleDeleteJob}
            onEditJob={handleEditJob}
            onStatusChange={handleStatusChange}
            deletingJobId={deletingJobId}
          />

          <JobModal
            isOpen={isModalOpen}
            onClose={() => {
            if (isSavingJob) return;
            setIsModalOpen(false);
            setEditingJob(null);
            }}
            onSaveJob={handleSaveJob}
            editingJob={editingJob}
            isSaving={isSavingJob}
          />
        </>
      )}
    </section>
  );
}

export default JobTrackerPage;