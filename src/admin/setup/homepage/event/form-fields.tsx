import { FormField } from "@/components/form-modals/form-modal";

export const HomeEventFormFields: FormField[] = [
    { name: 'title', type: 'text', requiredLabel: 'Title' },
    { name: 'description', type: 'text', requiredLabel: 'Description' },
    { name: 'date', type: 'date', requiredLabel: 'Date' },
]