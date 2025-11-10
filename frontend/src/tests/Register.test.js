import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../pages/Register';
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe('Register Component', () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  it('should render register form', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('should fill email and password and submit', async () => {
    axios.post.mockResolvedValueOnce({
      data: { message: 'User created successfully', token: 'test-token' }
    });

    const { container } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/api/auth/register',
        {
          email: 'test@example.com',
          password: 'password123'
        }
      );
    });
  });

  it('should show error if email already exists', async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        status: 400,
        data: { error: 'Email already exists' }
      }
    });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(emailInput, { target: { value: 'existing@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
    });
  });
});

