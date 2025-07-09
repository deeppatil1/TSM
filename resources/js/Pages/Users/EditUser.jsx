import React from 'react';
// Removed AuthenticatedLayout import
import { Head, useForm } from '@inertiajs/react';

export default function EditUser({ auth, user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('users.update', user.id)); // Assuming you have a named route 'users.update'
    };

    return (
        // Removed AuthenticatedLayout wrapper
        <>
            <Head title="Edit User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                                    <select
                                        id="role"
                                        name="role"
                                        value={data.role}
                                        onChange={(e) => setData('role', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Client">Client</option>
                                        <option value="Employee">Employee</option>
                                    </select>
                                    {errors.role && <div className="text-red-600 text-sm mt-1">{errors.role}</div>}
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                                        disabled={processing}
                                    >
                                        Update User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
        // Removed AuthenticatedLayout wrapper
    );
}

