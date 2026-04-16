import api from "./api";

export async function getJobs() {
  const response = await api.get("/jobs");
  return response.data;
}

export async function createJob(jobData) {
  const response = await api.post("/jobs", jobData);
  return response.data;
}

export async function deleteJob(id) {
  await api.delete(`/jobs/${id}`);
}