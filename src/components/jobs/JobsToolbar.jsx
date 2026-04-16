function JobsToolbar({ isAuthenticated, onAddJob }) {
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
    </div>
  );
}

export default JobsToolbar;