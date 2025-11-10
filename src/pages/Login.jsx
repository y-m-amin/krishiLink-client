import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router';

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await signInUser(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Login to Your Account</h2>
      <form onSubmit={handleLogin}>
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      <button onClick={handleGoogle}>Login with Google</button>
      <p>No account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;
