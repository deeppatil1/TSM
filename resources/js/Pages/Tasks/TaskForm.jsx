import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

export default function TaskForm({ type, task }) {
  const { projects, employees, Status } = usePage().props;

  const { data, setData, post, put, processing, errors } = useForm({
    name: task?.name || '',
    description: task?.description || '',
    status: task?.status || '',
    project_id: task?.project_id || '',
    assigned_to: task?.assigned_to || '',
    start_date: task?.start_date || '',
    end_date: task?.end_date || '',
  });

  const isEdit = type === 'edit';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      put(route('tasks.update', task?.id));
    } else {
      post(route('tasks.store'));
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {isEdit ? 'Edit Task' : 'Add New Task'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block mb-1 font-medium text-gray-700" htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
          />
          {errors.name && <div className="text-sm text-red-600 mt-1">{errors.name}</div>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700" htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            rows="4"
          />
          {errors.description && <div className="text-sm text-red-600 mt-1">{errors.description}</div>}
        </div>

        {isEdit && (
          <div>
            <label className="block mb-1 font-medium text-gray-700" htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={data.status}
              onChange={(e) => setData('status', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            >
              <option value="">Select Status</option>
              {Status && Status.map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                  {statusOption}
                </option>
              ))}
            </select>
            {errors.status && <div className="text-sm text-red-600 mt-1">{errors.status}</div>}
          </div>
        )}

        <div>
          <label className="block mb-1 font-medium text-gray-700" htmlFor="project_id">Project:</label>
          <select
            id="project_id"
            name="project_id"
            value={data.project_id}
            onChange={(e) => setData('project_id', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">Select Project</option>
            {projects && projects.map((projectOption) => (
              <option key={projectOption.id} value={projectOption.id}>
                {projectOption.name}
              </option>
            ))}
          </select>
          {errors.project_id && <div className="text-sm text-red-600 mt-1">{errors.project_id}</div>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700" htmlFor="assigned_to">Assigned Employee:</label>
          <select
            id="assigned_to"
            name="assigned_to"
            value={data.assigned_to}
            onChange={(e) => setData('assigned_to', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">Select Employee</option>
            {employees && employees.map((employeeOption) => (
              <option key={employeeOption.id} value={employeeOption.id}>
                {employeeOption.name}
              </option>
            ))}
          </select>
          {errors.assigned_to && <div className="text-sm text-red-600 mt-1">{errors.assigned_to}</div>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700" htmlFor="start_date">Start Date:</label>
          <input
            id="start_date"
            type="date"
            name="start_date"
            value={data.start_date}
            onChange={(e) => setData('start_date', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
          />
          {errors.start_date && <div className="text-sm text-red-600 mt-1">{errors.start_date}</div>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700" htmlFor="end_date">End Date:</label>
          <input
            id="end_date"
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
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? 'Processing...' : isEdit ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
}
 

