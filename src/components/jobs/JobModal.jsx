import { useEffect, useState } from "react";
import { statusValues } from "../../utils/statusMap";

function JobModal({ isOpen, onClose, onSaveJob, editingJob }) {
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    status: statusValues.Applied,
    location: "",
  });

  const [errors, setErrors] = useState({
    position: "",
    company: "",
    location: "",
  });

  useEffect(() => {
    if (editingJob) {
      setFormData({
        position: editingJob.position || "",
        company: editingJob.company || "",
        status: editingJob.status ?? statusValues.Applied,
        location: editingJob.location || "",
      });
    } else {
      setFormData({
        position: "",
        company: "",
        status: statusValues.Applied,
        location: "",
      });
    }

    setErrors({
      position: "",
      company: "",
      location: "",
    });
  }, [editingJob, isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {
      position: "",
      company: "",
      location: "",
    };

    let isValid = true;

    if (!formData.position.trim()) {
      newErrors.position = "Job position is required.";
      isValid = false;
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required.";
      isValid = false;
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "status" ? Number(value) : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSaveJob(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="job-modal" onClick={(e) => e.stopPropagation()}>
        <div className="job-modal-header">
          <h2>{editingJob ? "Edit Job" : "Add Job"}</h2>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="job-modal-form">
          <div className="form-group">
            <label htmlFor="position">Job Position</label>
            <input
              id="position"
              name="position"
              type="text"
              placeholder="Enter job position"
              value={formData.position}
              onChange={handleChange}
              className={errors.position ? "input-error" : ""}
            />
            {errors.position && <p className="field-error">{errors.position}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder="Enter company name"
              value={formData.company}
              onChange={handleChange}
              className={errors.company ? "input-error" : ""}
            />
            {errors.company && <p className="field-error">{errors.company}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value={statusValues.Applied}>Applied</option>
              <option value={statusValues.Interview}>Interview</option>
              <option value={statusValues.Rejected}>Rejected</option>
              <option value={statusValues.Offer}>Offer</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Enter location"
              value={formData.location}
              onChange={handleChange}
              className={errors.location ? "input-error" : ""}
            />
            {errors.location && <p className="field-error">{errors.location}</p>}
          </div>

          <div className="job-modal-actions">
            <button type="button" className="modal-secondary-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-primary-btn">
              {editingJob ? "Save Changes" : "Add Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobModal;