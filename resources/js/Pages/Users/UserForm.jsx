import React from 'react';
import { useForm, usePage, Head } from '@inertiajs/react'; 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput'; 
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';


export default function UserForm({ type, user, auth }) {
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
    <AuthenticatedLayout auth={auth}> {/* Pass auth prop to layout */}
    <Head title={isEdit ? 'Edit User' : 'Create User'} /> {/* Add Head component */}
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {isEdit ? 'Edit User' : 'Add New User'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          
          <InputLabel htmlFor="name" value="Name:" />
         
          <TextInput
            id="name"
            type="text"
            name="name"
            className="mt-1 block w-full"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            required
            isFocused
          />
          
          <InputError message={errors.name} className="mt-2" />
        </div>

        <div>
          
          <InputLabel htmlFor="email" value="Email:" />
         
          <TextInput
            id="email"
            type="email"
            name="email"
            className="mt-1 block w-full"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            //disabled={isEdit} 
            required
          />
          
          <InputError message={errors.email} className="mt-2" />
        </div>

        {!isEdit && (
          <div>
            
            <InputLabel htmlFor="password" value="Password:" />
            
            <TextInput
              id="password"
              type="password"
              name="password"
              className="mt-1 block w-full"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              required={!isEdit}
            />
            
            <InputError message={errors.password} className="mt-2" />
          </div>
        )}

        <div>
          
          <InputLabel htmlFor="role" value="Role:" />
          <select
            id="role"
            name="role"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            value={data.role}
            onChange={(e) => setData('role', e.target.value)}
          >
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
         
          <InputError message={errors.role} className="mt-2" />
        </div>

        {data.role === 'Client' && (
          <>
            <div>
              
              <InputLabel htmlFor="client_company" value="Client Company:" />
             
              <TextInput
                id="client_company"
                type="text"
                name="client_company"
                className="mt-1 block w-full"
                value={data.client_company}
                onChange={(e) => setData('client_company', e.target.value)}
              />
              
              <InputError message={errors.client_company} className="mt-2" />
            </div>

            <div>
              
              <InputLabel htmlFor="company_number" value="Company Number:" />
              
              <TextInput
                id="company_number"
                type="text"
                name="company_number"
                className="mt-1 block w-full"
                value={data.company_number}
                onChange={(e) => setData('company_number', e.target.value)}
              />
              
              <InputError message={errors.company_number} className="mt-2" />
            </div>
          </>
        )}

        <div className="flex items-center justify-end mt-4">
          
          <PrimaryButton disabled={processing}>
            {isEdit ? 'Update User' : 'Create User'}
          </PrimaryButton>
        </div>
      </form>
    </div>
    </AuthenticatedLayout>
  );
}

