import { FormField } from "@/components/form-modals/form-modal";

export const newsFormFields: FormField[] = [
    {
        name: 'title',
        requiredLabel: 'Title',
        type: 'text',
        placeholder: 'Enter title',
    },
    {
        name: 'description',
        requiredLabel: 'Description',
        type: 'textarea',
        placeholder: 'Enter description',
    },
    {
        name: 'date',
        requiredLabel: 'Date',
        type: 'date',
        placeholder: 'Enter date',

    },
    {
        name: 'pdf',
        label: 'Pdf',
        type: 'file',
        accecpt: 'application/pdf',
        placeholder: 'Select pdf',
    },
    {
        name: 'url',
        label: 'Url',
        type: 'text',
        placeholder: 'Enter url',
    },

]