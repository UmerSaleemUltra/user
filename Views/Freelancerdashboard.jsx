import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Ensure this path is correct based on your project structure
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const FreelancerDashboard = () => {
  const [jobs, setJobs] = useState([]); // State to store job listings
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Fetch jobs from the 'jobs' collection in Firestore
        const jobsCollection = collection(db, 'jobs');
        const jobsSnapshot = await getDocs(jobsCollection);

        // Map the documents to job objects and set the state
        const jobsData = jobsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setJobs(jobsData);
        console.log('Fetched jobs:', jobsData); // Debugging: log the fetched jobs
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to load jobs. Please try again later.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-5 text-center">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Available Jobs</h1>
      <ul className="list-group">
        {jobs.map(job => (
          <li key={job.id} className="list-group-item mb-3">
            <div className="job-info">
              <h2 className="h5">{job.title || 'No title available'}</h2> {/* Render job title */}
              <p>{job.description || 'No description available'}</p> {/* Render job description */}
              <Link to={`/job-details/${job.id}`} className="btn btn-primary">View Details</Link> {/* Link to job details */}

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FreelancerDashboard;
