import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


export default function UserForm({ type, user }) {
  const { roles } = usePage().props;

  const { data, setData, post, put, processing, errors } = useForm({
    name: user?.name || '',
    email: user?.email || '',
    password: user?.password || '',
    role: user?.role || 'Admin',
    client_company: user?.client_company || '',
    company_number: user?.company_number || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    type === 'create'
      ? post(route('users.store'))
      : put(route('users.update', user?.id));
  };

  const isEdit = type === 'edit';

  return (
    <AuthenticatedLayout>
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {isEdit ? 'Edit User' : 'Add New User'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
          />
          {errors.name && <div className="text-sm text-red-600 mt-1">{errors.name}</div>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
          />
          {errors.email && <div className="text-sm text-red-600 mt-1">{errors.email}</div>}
        </div>

        {!isEdit && (
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              required={!isEdit}
            />
            {errors.password && <div className="text-sm text-red-600 mt-1">{errors.password}</div>}
          </div>
        )}

        <div>
          <label className="block mb-1 font-medium text-gray-700">Role:</label>
          <select
            name="role"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            value={data.role}
            onChange={(e) => setData('role', e.target.value)}
          >
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          {errors.role && <div className="text-sm text-red-600 mt-1">{errors.role}</div>}
        </div>

        {data.role === 'Client' && (
          <>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Client Company:</label>
              <input
                type="text"
                name="client_company"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
                value={data.client_company}
                onChange={(e) => setData('client_company', e.target.value)}
              />
              {errors.client_company && (
                <div className="text-sm text-red-600 mt-1">{errors.client_company}</div>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Company Number:</label>
              <input
                type="text"
                name="company_number"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
                value={data.company_number}
                onChange={(e) => setData('company_number', e.target.value)}
              />
              {errors.company_number && (
                <div className="text-sm text-red-600 mt-1">{errors.company_number}</div>
              )}
            </div>
          </>
        )}

        <div>
          <button
            type="submit"
            disabled={processing}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            {processing ? 'Processing...' : (isEdit ? 'Update User' : 'Create User')}
          </button>
        </div>
      </form>
    </div>
    </AuthenticatedLayout>
  );
}