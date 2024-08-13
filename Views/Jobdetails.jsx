import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobDoc = doc(db, 'jobs', id);
        const jobData = await getDoc(jobDoc);
        if (jobData.exists()) {
          setJob(jobData.data());
        } else {
          setError("Job not found");
        }
      } catch (err) {
        setError("Failed to fetch job details");
        console.error("Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <div className="text-center my-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;

  if (error) return <div className="alert alert-danger text-center my-5">{error}</div>;

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">{job.title}</h1>
          <p className="card-text">{job.description}</p>
          {job.location && (
            <p className="card-text"><strong>Location:</strong> {job.location}</p>
          )}
          {job.salary && (
            <p className="card-text"><strong>Salary:</strong> {job.salary}</p>
          )}
          <Link to={`/apply-job/${id}`} className="btn btn-primary">
            Apply
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
