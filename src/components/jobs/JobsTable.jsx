import { Trash2 } from "lucide-react";
import { statusLabels } from "../../utils/statusMap";
function JobsTable({ jobs, onDeleteJob }) {
  return (
    <div className="jobs-table-wrapper">
      <table className="jobs-table">
        <thead>
          <tr>
            <th>Job Position</th>
            <th>Company</th>
            <th>Status</th>
            <th>Location</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.position}</td>
                <td>{job.company}</td>
                <td>{statusLabels[job.status]}</td>
                <td>{job.location}</td>
                <td>
                    <button type="button" className="delete-btn" onClick={() => onDeleteJob(job.id)}>
                      <Trash2 size={18} />
                    </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="empty-table">
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