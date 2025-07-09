import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

export default function ProjectForm({ type, project }) {
  const { clients, employees } = usePage().props; 

  const { data, setData, post, put, processing, errors } = useForm({
    name: project?.name || '',
    description: project?.description || '',
    client_id: project?.client_id || '',
    employee_id: project?.employee_id || '', // Change assigned_employee_id to employee_id
    start_date: project?.start_date || '',
    end_date: project?.end_date || '',
  });

  const isEdit = type === 'edit';

  const handleSubmit = (e) => {
    e.preventDefault();
    type === 'create'
      ? post(route('projects.store'))
      : put(route('projects.update', project?.id));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {isEdit ? 'Edit Project' : 'Add New Project'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
       
        <div>
          <label className="block mb-1 font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
          />
          {errors.name && <div className="text-sm text-red-600 mt-1">{errors.name}</div>}
        </div>

       
        <div>
          <label className="block mb-1 font-medium text-gray-700">Description:</label>
          <textarea
            name="description"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            rows="4"
          />
          {errors.description && <div className="text-sm text-red-600 mt-1">{errors.description}</div>}
        </div>

        
        <div>
          <label className="block mb-1 font-medium text-gray-700">Client:</label>
          <select
            name="client_id"
            value={data.client_id}
            onChange={(e) => setData('client_id', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
          {errors.client_id && <div className="text-sm text-red-600 mt-1">{errors.client_id}</div>}
        </div>

        
        <div>
          <label className="block mb-1 font-medium text-gray-700">Assigned Employee:</label>
          <select
            name="employee_id" // Change name to employee_id
            value={data.employee_id} // Change value to data.employee_id
            onChange={(e) => setData('employee_id', e.target.value)} // Change setData key to employee_id
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
          {errors.employee_id && <div className="text-sm text-red-600 mt-1">{errors.employee_id}</div>} {/* Change errors key to employee_id */}
        </div>

        
        <div>
          <label className="block mb-1 font-medium text-gray-700">Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={data.start_date}
            onChange={(e) => setData('start_date', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
          />
          {errors.start_date && <div className="text-sm text-red-600 mt-1">{errors.start_date}</div>}
        </div>

       
        <div>
          <label className="block mb-1 font-medium text-gray-700">End Date:</label>
          <input
            type="date"
            name="end_date"
            value={data.end_date}
            onChange={(e) => setData('end_date', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
          />
          {errors.end_date && <div className="text-sm text-red-600 mt-1">{errors.end_date}</div>}
        </div>

        
        <div>
          <button
            type="submit"
            disabled={processing}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            {processing ? 'Processing...' : isEdit ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
}
