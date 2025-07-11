import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Import AuthenticatedLayout


// Accept the 'auth' prop which contains user information
const TasksTable = ({ tasks, auth }) => {
  const [filter, setFilter] = useState('');

  // Get the user's role from the auth prop
  const userRole = auth.user.role;
  // Check if the user is an Admin or Employee
  const canManageTasks = userRole === 'Admin' || userRole === 'Employee';

  // Get today's date for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight for date-only comparison

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
    <AuthenticatedLayout auth={auth}> {/* Pass auth prop to layout */}
    <Head title="Tasks" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          {/* Conditionally render the Add Task button */}
          {canManageTasks && (
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              onClick={() => router.visit('/tasks/create')}
            >
              Add Task
            </button>
          )}
        </div>
        {/* <p>{JSON.stringify(tasks)}</p> */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className=" divide-gray-200 w-full"> {/* Removed min-w-full */}
            <thead className="bg-gray-50">
              <tr>
                {/* Keep whitespace-nowrap on headers */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Task Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">End Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Created By</th>
                {/* Conditionally render the Actions header */}
                {canManageTasks && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.map(task => {
                // Check if the task end date is before today
                const taskEndDate = new Date(task.end_date);
                taskEndDate.setHours(0, 0, 0, 0); // Set time to midnight
                const isPastDue = taskEndDate < today;

                return (
                  // Apply conditional class based on isPastDue
                  // Apply hover effect only if not past due
                  <tr key={task.id} className={`${isPastDue ? 'bg-red-100' : 'hover:bg-gray-50'}`}>
                    {/* Keep whitespace-nowrap for Task Name */}
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{task.name}</td>
                    {/* Description cell allows wrapping */}
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-normal">{task.description}</td>
                    {/* Keep whitespace-nowrap for Status */}
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full whitespace-nowrap
  ${task.status === 'Completed'
                          ? 'bg-purple-100 text-purple-800' // Changed to purple
                          : task.status === 'In Process'
                            ? 'bg-blue-100 text-blue-950' // Changed to blue
                            : 'bg-gray-100 text-gray-950'}`}>
                        {task.status}
                      </span>
                    </td>
                    {/* Allow wrapping for Project */}
                    <td className="px-6 py-4 text-sm text-gray-500">{task.project?.name || 'N/A'}</td>
                    {/* Allow wrapping for Employee */}
                    <td className="px-6 py-4 text-sm text-gray-500">{task.assigned_to?.name || 'Unassigned'}</td>
                    {/* Keep whitespace-nowrap for Dates */}
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{formatDate(task.start_date)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{formatDate(task.end_date)}</td>
                    {/* Allow wrapping for Created By */}
                    <td className="px-6 py-4 text-sm text-gray-500">{task.created_by?.name || 'System'}</td>
                    {/* Conditionally render the Actions data cell and its buttons */}
                    {canManageTasks && (
                      <td className="px-6 py-4 text-sm space-x-2 whitespace-nowrap"> {/* Add to actions cell */}
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