import { FormField } from "@/components/form-modals/form-modal";

export const CreateAmbulanceFields: FormField[] = [
    { name: 'vehicleNumber', type: 'text', label: 'Vehicle Number' },
    { name: 'model', type: 'text', label: 'Model' },
    { name: 'color', type: 'text', label: 'Color' },
    { name: 'yearMade', type: 'number', label: 'Year Made' },
    { name: 'driverName', type: 'text', label: 'Driver Name' },
    { name: 'driverContact', type: 'text', label: 'Driver Contact' },
    { name: 'driverLicenseNumber', type: 'text', label: 'Driver License Number' },
    {
        name: 'vehicleType', type: 'select', label: 'Vehicle Type', selectOptions: [
            { label: 'Owned', value: 'Owned' },
            { label: 'Rented', value: 'Rented' },
            { label: 'Other', value: 'Other' }]
    }]