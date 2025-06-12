import { FormField } from "@/components/form-modals/form-modal";
import { bloodGroups } from "@/helpers/formSelectOptions";

const donorFormFields: FormField[] = [
    { name: 'name', type: 'text', label: 'Name', placeholder: 'Enter Name' },
    { name: 'dob', type: 'date', label: 'DOB', placeholder: 'Enter dob' },
    { name: 'blood_group', type: 'select', label: 'Blood Group', selectOptions: bloodGroups },
    {
        name: 'gender', type: 'select', label: 'Gender', selectOptions: [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Other', value: 'Other' },
        ]
    },
    { name: 'father_name', type: 'text', label: 'Father Name', placeholder: 'Enter Father Name' },
    { name: 'contact', type: 'text', label: 'Contact', placeholder: 'Enter Contact' },
]


export default donorFormFields