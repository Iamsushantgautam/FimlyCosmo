import React, { useState } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function RegisterForm({ onRegister }) {
  const [name, setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/auth/register`, { name, email, password });
      onRegister(res.data.token, res.data.user);
    } catch (err) {
      alert(err.response?.data?.msg || 'Register failed');
    }
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
      <br />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <br />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <br/>
      <button type="submit">Register</button>
    </form>
  );
}
