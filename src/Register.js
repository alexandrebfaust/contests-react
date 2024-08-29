import React, { useState } from 'react';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'insomnia/9.3.3',
        },
        body: JSON.stringify({ fullName, email, password, contact }),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Armazena o token no localStorage
      setMessage(`Registration successful! User ID: ${data.userId}`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container mx-auto mt-5 px-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contact</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          Register
        </button>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
