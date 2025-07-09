import React, { useState } from 'react';
import { router } from '@inertiajs/react';

const UsersTable = ({ users }) => {
  const [filter, setFilter] = useState('');
  const [orderBy, setOrderBy] = useState('created_at');
  const [order, setOrder] = useState('desc');

  const getCreatorName = (id) => {
    if (!id) return 'System';
    const creator = users.find(user => user.id === id);
    return creator ? creator.name : 'Unknown';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredUsers = users
    .filter(user =>
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase()) ||
      user.role.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      const isAsc = order === 'asc';
      if (orderBy === 'created_at') {
        return isAsc
          ? new Date(a.created_at) - new Date(b.created_at)
          : new Date(b.created_at) - new Date(a.created_at);
      } else {
        return isAsc
          ? a[orderBy]?.toString().localeCompare(b[orderBy]?.toString())
          : b[orderBy]?.toString().localeCompare(a[orderBy]?.toString());
      }
    });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          onClick={() => router.visit('/users/create')}
        >
          Add User
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th onClick={() => handleSort('name')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                <div className="flex items-center">
                  Name {orderBy === 'name' && <span className="ml-1">{order === 'asc' ? '↑' : '↓'}</span>}
                </div>
              </th>
              <th onClick={() => handleSort('email')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                <div className="flex items-center">
                  Email {orderBy === 'email' && <span className="ml-1">{order === 'asc' ? '↑' : '↓'}</span>}
                </div>
              </th>
              <th onClick={() => handleSort('role')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                <div className="flex items-center">
                  Role {orderBy === 'role' && <span className="ml-1">{order === 'asc' ? '↑' : '↓'}</span>}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created By
              </th>
              <th onClick={() => handleSort('created_at')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                <div className="flex items-center">
                  Created At {orderBy === 'created_at' && <span className="ml-1">{order === 'asc' ? '↑' : '↓'}</span>}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'Admin'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                    }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {getCreatorName(user.created_by)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(user.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button
                    onClick={() => router.visit(`/users/${user.id}/edit`)}
                    className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded hover:bg-blue-200 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this user?')) {
                        router.delete(`/users/${user.id}`);
                      }
                    }}
                    className="inline-flex items-center px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded hover:bg-red-200 transition"
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
  );
};

export default UsersTable;
