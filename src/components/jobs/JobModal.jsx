import { useState } from "react";
import { X } from 'lucide-react';
import { statusValues } from "../../utils/statusMap";
function JobModal({ isOpen, onClose, onAddJob}){
    const [formData, setFormData] = useState({
        company: "",
        position: "",
        status: "Applied",
        location: "",
    });

    const [errors, setErrors] = useState({
        company: "",
        position: "",
        location: "",
    });

    if (!isOpen) return null;

    const validateForm = () => {
        const newErrors = {
            company: "",
            position: "",
            location: "",
        };

        let isValid = true;

        if (!formData.company.trim()) {
            newErrors.company = "Company is required.";
            isValid = false;
        } 

        if (!formData.position.trim()) {
            newErrors.position = "Job position is required";
            isValid = false;
        }
        if (!formData.location.trim()) {
            newErrors.location = "Location is required.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

      const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({...prev, [name]: value, }));

        setErrors((prev) => ({...prev,[name]: "",}));
    };

     const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

  

        const newJob = {
          position: formData.position,
          company: formData.company,
          status: statusValues[formData.status],
          location: formData.location,
        };

        onAddJob(newJob);

        setFormData({
        position: "",
        company: "",
        status: "Applied",
        location: "",
        });

        setErrors({
        position: "",
        company: "",
        location: "",
        });

        onClose();
    };
      return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="job-modal" onClick={(e) => e.stopPropagation()}>
        <div className="job-modal-header">
          <h2>Add a New Job</h2>
          <button type="button" className="modal-close-btn" onClick={onClose}>
              <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="job-modal-form">
          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input
              id="position"
              name="position"
              type="text"
              placeholder="Job position"
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
              placeholder="Company name"
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
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Location"
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
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobModal;