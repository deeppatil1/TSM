import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';



const ProjectsTable = ({ projects, auth }) => {
  const [filter, setFilter] = useState('');


  const userRole = auth.user.role;
  const isAdmin = userRole === 'Admin';

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
    
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <AuthenticatedLayout auth={auth}> 
      <Head title="Projects" /> 
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          
          {isAdmin && (
            <PrimaryButton 
              onClick={() => router.visit('/projects/create')}
            >
              Add Project
            </PrimaryButton>
          )}
          
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
                
                {isAdmin && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProjects.map(project => {

                const projectEndDate = new Date(project.end_date);
                projectEndDate.setHours(0, 0, 0, 0); 
                const isPastDue = projectEndDate < today;

                return (
                  
                  <tr key={project.id} className={`${isPastDue ? 'bg-red-100' : 'hover:bg-gray-50'}`}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{project.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{project.description}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{project.client ? project.client.name : 'N/A'}</td> {/* Display client name */}
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(project.start_date)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(project.end_date)}</td>
                   
                    {isAdmin && (
                      <td className="px-6 py-4 text-sm space-x-2">
                        <SecondaryButton 
                          onClick={() => router.visit(`/projects/${project.id}/edit`)}
                        >
                          Edit
                        </SecondaryButton>
                        <DangerButton 
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this project?')) {
                              router.delete(`/projects/${project.id}`);
                            }
                          }}
                        >
                          Delete
                        </DangerButton>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default ProjectsTable;
