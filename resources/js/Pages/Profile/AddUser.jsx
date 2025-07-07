import React from 'react';
import { useForm } from '@inertiajs/react';

export default function CreateUser() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    role: 'Admin',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('users.store')); // Inertia will send POST to Laravel route
  };

  return (
    <div>
      <h1>Add New User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
          />
          {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        </div>

        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
          />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </div>

        <div>
          <label>Password:</label><br />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
          />
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        </div>

        <div>
          <label>Role:</label><br />
          <select
            name="role"
            value={data.role}
            onChange={(e) => setData('role', e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="Client">Client</option>
            <option value="Employee">Employee</option>
          </select>
          {errors.role && <div style={{ color: 'red' }}>{errors.role}</div>}
        </div>

        <br />
        <button type="submit" disabled={processing}>Submit</button>
      </form>
    </div>
  );
}
