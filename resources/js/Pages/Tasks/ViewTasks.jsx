import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';


const TasksTable = ({ tasks, auth }) => {
  const [filter, setFilter] = useState('');

  const userRole = auth.user.role;
  const canManageTasks = userRole === 'Admin' || userRole === 'Employee';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
    <AuthenticatedLayout auth={auth}>
    <Head title="Tasks" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          {canManageTasks && (
            <PrimaryButton
              onClick={() => router.visit('/tasks/create')}
            >
              Add Task
            </PrimaryButton>
          )}
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className=" divide-gray-200 w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Task Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">End Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Created By</th>
                {canManageTasks && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.map(task => {
                const taskEndDate = new Date(task.end_date);
                taskEndDate.setHours(0, 0, 0, 0);
                const isPastDue = taskEndDate < today;

                return (
                  <tr key={task.id} className={`${isPastDue ? 'bg-red-100' : 'hover:bg-gray-50'}`}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{task.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-normal">{task.description}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full whitespace-nowrap
  ${task.status === 'Completed'
                          ? 'bg-purple-100 text-purple-800'
                          : task.status === 'In Process'
                            ? 'bg-blue-100 text-blue-950'
                            : 'bg-gray-100 text-gray-950'}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{task.project?.name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{task.assigned_to?.name || 'Unassigned'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{formatDate(task.start_date)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{formatDate(task.end_date)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{task.created_by?.name || 'System'}</td>
                    {canManageTasks && (
                      <td className="px-6 py-4 text-sm space-x-2 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <SecondaryButton
                            onClick={() => router.visit(`/tasks/${task.id}/edit`)}
                          >
                            Edit
                          </SecondaryButton>
                          <DangerButton
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this task?')) {
                                router.delete(`/tasks/${task.id}`);
                            }
                          }}
                        >
                          Delete
                        </DangerButton>
                        </div>
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

export default TasksTable;