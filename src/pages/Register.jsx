import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router';
import { API_BASE_URL } from '../config';

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    const passValid = /(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password);
    if (!passValid) {
      return setError('Password must contain uppercase, lowercase and be at least 6 characters long');
    }

    try {
      await createUser(email, password);
      await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, photo }),
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const newUser = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL || '',
      };

      await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Create Your Account</h2>
      <form onSubmit={handleRegister}>
        <input name="name" placeholder="Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="photo" placeholder="Photo URL" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
      <button onClick={handleGoogleRegister}>Register with Google</button>
      <p>Already registered? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
