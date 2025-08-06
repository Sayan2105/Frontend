import { FormField } from "@/components/form-modals/form-modal";

export const registerPatientFormFields: FormField[] = [
    { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter your name' },
    { label: 'Gender', name: 'gender', type: 'select', placeholder: 'Select your gender', selectOptions: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] },
    { label: 'Date of Birth', name: 'dob', type: 'date', placeholder: 'Enter your date of birth' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email' },
    { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password' },
    { label: 'Confirm Password', name: 'confirm_password', type: 'password', placeholder: 'Enter your password' },
]