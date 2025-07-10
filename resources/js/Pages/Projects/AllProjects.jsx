import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Import AuthenticatedLayout


const ProjectsTable = ({ projects }) => {
  const [filter, setFilter] = useState('');

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredProjects = projects
    .filter(project =>
      project.name.toLowerCase().includes(filter.toLowerCase()) ||
      project.description.toLowerCase().includes(filter.toLowerCase())
    );

  return (
  <AuthenticatedLayout>
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          onClick={() => router.visit('/projects/create')}
        >
          Add Project
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProjects.map(project => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{project.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{project.description}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{ project.client ? project.client.name : 'N/A'}</td> {/* Display client name */}
                <td className="px-6 py-4 text-sm text-gray-500">{formatDate(project.start_date)}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{formatDate(project.end_date)}</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button
                    onClick={() => router.visit(`/projects/${project.id}/edit`)}
                    className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded hover:bg-green-200 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this project?')) {
                        router.delete(`/projects/${project.id}`);
                      }
                    }}
                    className="px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded hover:bg-red-200 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </AuthenticatedLayout>
  );
};

export default ProjectsTable;
