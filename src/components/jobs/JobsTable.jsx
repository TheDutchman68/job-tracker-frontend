function JobsTable({ jobs }) {
  return (
    <div className="jobs-table-wrapper">
      <table className="jobs-table">
        <thead>
          <tr>
            <th>Job Position</th>
            <th>Company</th>
            <th>Status</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.position}</td>
                <td>{job.company}</td>
                <td>{job.status}</td>
                <td>{job.location}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="empty-table">
                No jobs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default JobsTable;