import React, { useMemo } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';


export default function TaskForm({ type, task }) {
  const { projects, allEmployees, Status } = usePage().props;

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

  const availableEmployees = useMemo(() => {
    if (!data.project_id) {
       if (isEdit && task?.assigned_to) {
           const assignedEmployee = allEmployees.find(emp => emp.id === task.assigned_to);
           return assignedEmployee ? [assignedEmployee] : [];
       }
      return [];
    }

    const selectedProject = projects.find(p => p.id === data.project_id);

    if (!selectedProject || !selectedProject.employees) {
      return [];
    }

    const assignedEmployeeIds = selectedProject.employees.map(emp => emp.id);

    const filtered = allEmployees.filter(employee => assignedEmployeeIds.includes(employee.id));

     if (isEdit && task?.assigned_to && !filtered.some(emp => emp.id === task.assigned_to)) {
         const assignedEmployee = allEmployees.find(emp => emp.id === task.assigned_to);
         if (assignedEmployee) {
             return [...filtered, assignedEmployee];
         }
     }


    return filtered;
  }, [data.project_id, projects, allEmployees, isEdit, task?.assigned_to]);


  return (
    <AuthenticatedLayout>
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {isEdit ? 'Edit Task' : 'Add New Task'}
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

        {isEdit && (
          <div>
            <InputLabel htmlFor="status" value="Status:" />
            <select
              id="status"
              name="status"
              value={data.status}
              onChange={(e) => setData('status', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
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

        {!isEdit && (
          <div>
            <InputLabel htmlFor="project_id" value="Project:" />
            <select
              id="project_id"
              name="project_id"
              value={data.project_id}
              onChange={(e) => {
                  setData('project_id', e.target.value);
                  setData('assigned_to', '');
              }}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
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
        )}


        <div>
          <InputLabel htmlFor="assigned_to" value="Assigned Employee:" />
          <select
            id="assigned_to"
            name="assigned_to"
            value={data.assigned_to}
            onChange={(e) => setData('assigned_to', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            disabled={!data.project_id || availableEmployees.length === 0}
          >
            <option value="">Select Employee</option>
            {availableEmployees.map((employeeOption) => (
              <option key={employeeOption.id} value={employeeOption.id}>
                {employeeOption.name}
              </option>
            ))}
          </select>
           {!data.project_id && <div className="text-sm text-gray-500 mt-1">Select a project to see available employees.</div>}
           {data.project_id && availableEmployees.length === 0 && <div className="text-sm text-gray-500 mt-1">No employees assigned to this project.</div>}
          {errors.assigned_to && <div className="text-sm text-red-600 mt-1">{errors.assigned_to}</div>}
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
            {processing ? 'Processing...' : isEdit ? 'Update Task' : 'Create Task'}
          </PrimaryButton>
        </div>
      </form>
    </div>
    </AuthenticatedLayout>
  );
}


