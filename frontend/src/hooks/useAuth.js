import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const register = async (email, password, name) => {
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
        name
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/login');
        return { success: true };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Registration failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
        return { success: true };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    login,
    loading,
    error
  };
};

export default useAuth;

