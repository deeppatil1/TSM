import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import Checkbox from '@/Components/Checkbox';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import Dropdown from '@/Components/Dropdown'; // Example of a more complex component

export default function TestComponents() {
    // Example state for interactive components
    const [textInputValue, setTextInputValue] = React.useState('');
    const [isChecked, setIsChecked] = React.useState(false);

    return (
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10 space-y-8">
                <h1 className="text-2xl font-bold text-gray-800">Component Showcase</h1>

                {/* Example: PrimaryButton */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Primary Button</h2>
                    <PrimaryButton>Click Me</PrimaryButton>
                </div>

                {/* Example: SecondaryButton */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Secondary Button</h2>
                    <SecondaryButton>Cancel</SecondaryButton>
                </div>

                 {/* Example: DangerButton */}
                 <div>
                    <h2 className="text-xl font-semibold mb-2">Danger Button</h2>
                    <DangerButton>Delete</DangerButton>
                </div>

                {/* Example: TextInput */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Text Input</h2>
                    <InputLabel htmlFor="testInput" value="Example Label" />
                    <TextInput
                        id="testInput"
                        type="text"
                        className="mt-1 block w-full"
                        value={textInputValue}
                        onChange={(e) => setTextInputValue(e.target.value)}
                        placeholder="Type something..."
                    />
                    <InputError message="Example error message" className="mt-2" />
                </div>

                {/* Example: Checkbox */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Checkbox</h2>
                    <label className="flex items-center">
                        <Checkbox
                            name="testCheckbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-600">Check this box</span>
                    </label>
                </div>

                {/* Example: Dropdown (requires more setup, showing basic structure) */}
                {/* NOTE: Dropdown component usage varies greatly. This is a placeholder. */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Dropdown (Example)</h2>
                    {/* You would typically render a Dropdown trigger and content here */}
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button type="button" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
                                    Dropdown Trigger
                                    <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </span>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Link href="#">Link 1</Dropdown.Link>
                            <Dropdown.Link href="#">Link 2</Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                    {/* <p className="text-sm text-gray-500">
                        Render your actual Dropdown component here.
                    </p> */}
                </div>

                {/* Add more components as needed */}
                {/* <div>
                    <h2 className="text-xl font-semibold mb-2">Another Component</h2>
                    <AnotherComponent prop1="value" />
                </div> */}

            </div>
        </AuthenticatedLayout>
    );
}
