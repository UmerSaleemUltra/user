import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { getAuth } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coverLetter, setCoverLetter] = useState('');
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    setCurrentUser(auth.currentUser);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentUser) {
      try {
        await setDoc(doc(db, 'applications', `${currentUser.uid}_${id}`), {
          jobId: id,
          userId: currentUser.uid,
          email: currentUser.email,  // Store user's email
          name: currentUser.displayName || 'Anonymous',  // Store user's name or default to 'Anonymous'
          coverLetter,
          appliedAt: new Date(),
        });
        navigate('/my-applications');
      } catch (error) {
        setError('Failed to submit the application. Please try again.');
        console.error("Error submitting application:", error);
      }
    } else {
      setError('You must be logged in to apply for a job.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Apply for Job</h1>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="coverLetter">Cover Letter</label>
                  <textarea
                    id="coverLetter"
                    className="form-control"
                    placeholder="Write a cover letter"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows="5"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={!currentUser}>
                  {currentUser ? 'Apply' : 'Please log in to apply'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
