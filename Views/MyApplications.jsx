import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { getAuth } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    setCurrentUser(user);

    if (user) {
      const fetchApplications = async () => {
        try {
          const applicationsQuery = query(
            collection(db, 'applications'),
            where('userId', '==', user.uid)
          );
          const applicationsSnapshot = await getDocs(applicationsQuery);
          const applicationsData = applicationsSnapshot.docs.map(doc => doc.data());

          // Fetch job titles
          const applicationsWithTitles = await Promise.all(
            applicationsData.map(async (application) => {
              const jobDoc = doc(db, 'jobs', application.jobId);
              const jobData = await getDoc(jobDoc);
              return {
                ...application,
                jobTitle: jobData.exists() ? jobData.data().title : 'Job title not found',
              };
            })
          );

          setApplications(applicationsWithTitles);
        } catch (error) {
          setError('Failed to fetch applications.');
          console.error("Error fetching applications:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchApplications();
    } else {
      setError('You must be logged in to view your applications.');
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="text-center my-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;

  if (error) return <div className="alert alert-danger text-center my-5">{error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">My Applications</h1>
      <ul className="list-group">
        {applications.map((application, index) => (
          <li key={index} className="list-group-item">
            <p><strong>Job Title:</strong> {application.jobTitle}</p>
            <p><strong>Cover Letter:</strong> {application.coverLetter}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyApplications;
