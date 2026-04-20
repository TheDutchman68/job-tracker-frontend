import { Trash2, Pencil } from "lucide-react";
import { statusValues } from "../../utils/statusMap";

function JobsTable({ jobs, updatingJobId, onDeleteJob, onEditJob, onStatusChange, deletingJobId}) {
  return (
    <div className="jobs-table-wrapper">
      <table className="jobs-table">
        <thead>
          <tr>
            <th>Job Position</th>
            <th>Company</th>
            <th>Status</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.position}</td>
                <td>{job.company}</td>
                <td>
                  <div className="status-wrapper">
                    <select
                      className="status-select"
                      value={job.status}
                      disabled={updatingJobId === job.id || deletingJobId === job.id}
                      onChange={(e) =>
                        onStatusChange(job.id, Number(e.target.value))
                      }
                    >
                      <option value={statusValues.Applied}>Applied</option>
                      <option value={statusValues.Interview}>Interview</option>
                      <option value={statusValues.Rejected}>Rejected</option>
                      <option value={statusValues.Offer}>Offer</option>
                    </select>

                    {updatingJobId === job.id && (
                      <span className="mini-spinner"></span>
                    )}
                  </div>
                </td>
                <td>{job.location}</td>
                <td>
                  <div className="actions-cell">
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => onEditJob(job)}
                    >
                      <Pencil size={18} />
                    </button>

                    {deletingJobId === job.id ? (
                      <>
                  <span className="red-spinner"></span>
                </>) 
                : (<button
                      type="button"
                      className="delete-btn"
                      onClick={() => onDeleteJob(job.id)}
                    >
                      <Trash2 size={18} />
                    </button> )}

                  </div>
                </td>
              </tr>
            ))
          ) : (
              <tr>
                <td colSpan="5">
                  <div className="empty-table">
                    You have no jobs. Add your first Job!
                  </div>
                </td>
              </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default JobsTable;