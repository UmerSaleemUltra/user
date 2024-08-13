import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Views/Firebase'; // Ensure the path to Firebase config is correct
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // To handle and display errors
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/freelancer-dashboard');
    } catch (error) {
      setError(error.message); // Set error message to display it in the UI
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Sign Up</h1>
              {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
              <form onSubmit={handleSignUp}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input 
                    type="password" 
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
              </form>
              <p className="mt-3 text-center">
                Already have an account? <Link to="/">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
