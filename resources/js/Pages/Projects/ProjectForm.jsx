import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput'; 
import PrimaryButton from '@/Components/PrimaryButton';


export default function ProjectForm({ type, project }) {
  const { clients, employees } = usePage().props; 

  const { data, setData, post, put, processing, errors } = useForm({
    name: project?.name || '',
    description: project?.description || '',
    client_id: project?.client_id || '',  
    employee_id: Array.isArray(project?.employee_id) ? project.employee_id : (project?.employee_id ? [project.employee_id] : []),
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

  const handleEmployeeCheckboxChange = (employeeId, isChecked) => {
    let currentAssignedEmployees = [...data.employee_id]; 
    if (isChecked) {
     
      if (!currentAssignedEmployees.includes(employeeId)) {
        currentAssignedEmployees.push(employeeId);
      }
    } else {     
      currentAssignedEmployees = currentAssignedEmployees.filter(id => id !== employeeId);
    }
    setData('employee_id', currentAssignedEmployees);
  };

  return (

  <AuthenticatedLayout>

    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {isEdit ? 'Edit Project' : 'Add New Project'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
       
        <div>
          <InputLabel htmlFor="name" value="Name:" />
          <TextInput 
            id="name"
            type="text"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            onChange={(e) => setData('name', e.target.value)}
          />
          {errors.name && <div className="text-sm text-red-600 mt-1">{errors.name}</div>}
        </div>
       
        <div>
          <InputLabel htmlFor="description" value="Description:" />
          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            rows="4"
          />
          {errors.description && <div className="text-sm text-red-600 mt-1">{errors.description}</div>}
        </div>
        
        <div>
          <InputLabel htmlFor="client_id" value="Client:" />
          <select
            id="client_id"
            name="client_id"
            value={data.client_id}
            onChange={(e) => setData('client_id', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
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
          <InputLabel value="Assigned Employees:" />
          <div className="max-h-20 overflow-y-auto border border-gray-300 rounded-md p-2">
            <div className="space-y-1">
              {employees.map((employee) => (
                <div key={employee.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`employee-${employee.id}`}
                    value={employee.id}
                    checked={data.employee_id.includes(employee.id)} 
                    onChange={(e) => handleEmployeeCheckboxChange(employee.id, e.target.checked)}
                    className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`employee-${employee.id}`} className="text-gray-700">{employee.name}</label>
                </div>
              ))}
            </div>
          </div>
          {errors.employee_id && <div className="text-sm text-red-600 mt-1">{errors.employee_id}</div>}
        </div>

        <div>
          <InputLabel htmlFor="start_date" value="Start Date:" />
          <TextInput 
            id="start_date"
            type="date"
            name="start_date"
            value={data.start_date}
            className="mt-1 block w-full"
            onChange={(e) => setData('start_date', e.target.value)}
          />
          {errors.start_date && <div className="text-sm text-red-600 mt-1">{errors.start_date}</div>}
        </div>

        <div>
          <InputLabel htmlFor="end_date" value="End Date:" />
          <TextInput 
            id="end_date"
            type="date"
            name="end_date"
            value={data.end_date}
            className="mt-1 block w-full"
            onChange={(e) => setData('end_date', e.target.value)}
          />
          {errors.end_date && <div className="text-sm text-red-600 mt-1">{errors.end_date}</div>}
        </div>

        <div>
          <PrimaryButton disabled={processing}>
            {processing ? 'Processing...' : isEdit ? 'Update Project' : 'Create Project'}
          </PrimaryButton>
        </div>
      </form>
    </div>

  </AuthenticatedLayout>

  );
}
