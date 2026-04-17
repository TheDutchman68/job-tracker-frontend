function JobsToolbar({ isAuthenticated, onAddJob, searchTerm, onSearchChange, hasJobs }) {
  return (
    <div className="jobs-toolbar">
      <button
        type="button"
        className="add-job-button"
        onClick={onAddJob}
        disabled={!isAuthenticated}
      >
        Add Job
      </button>
        <input
        type="text"
        className="jobs-search-input"
        disabled={!hasJobs}
        title={!hasJobs ? "Add a job first to enable search" : ""}
        placeholder="Search by company or position..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default JobsToolbar;