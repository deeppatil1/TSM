import React, { useState } from 'react';
import { router } from '@inertiajs/react';

const TasksTable = ({ tasks }) => {
  const [filter, setFilter] = useState('');

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(filter.toLowerCase()) ||
    task.description.toLowerCase().includes(filter.toLowerCase()) ||
    task.status.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          onClick={() => router.visit('/tasks/create')}
        >
          Add Task
        </button>
      </div>
      <p>{JSON.stringify(tasks)}</p>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTasks.map(task => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{task.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{task.description}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${task.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : task.status === 'In Progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'}`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{task.project?.name || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{task.assigned_to?.name || 'Unassigned'}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{formatDate(task.start_date)}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{formatDate(task.end_date)}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{task.created_by?.name || 'System'}</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => router.visit(`/tasks/${task.id}/edit`)}
                      className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this task?')) {
                          router.delete(`/tasks/${task.id}`);
                        }
                      }}
                      className="px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded hover:bg-red-200 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksTable;
