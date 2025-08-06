export const Module = [
    { name: 'Appointment', create: true, view: true, update: true, delete: true },
    { name: 'Appointment Status', create: false, view: false, update: true, delete: false },
    { name: 'Opd', create: true, view: true, update: false, delete: false },
    { name: 'Ipd', create: true, view: true, update: true, delete: true },
    { name: 'Prescription', create: true, view: true, update: true, delete: true },
    { name: 'Medication', create: true, view: true, update: true, delete: true },
    { name: 'Operation', create: true, view: true, update: true, delete: true },
    { name: 'Charges', create: true, view: true, update: true, delete: true },
    { name: 'Payments', create: true, view: true, update: true, delete: true },
    { name: 'Vitals', create: true, view: true, update: false, delete: true },
    { name: 'Timeline', create: true, view: true, update: true, delete: true },
    { name: 'Treatment History', create: false, view: true, update: false, delete: false },
    { name: 'Lab Investigation', create: false, view: true, update: false, delete: false },
    { name: 'Move To Ipd', create: true, view: false, update: false, delete: false },
    { name: 'Consultant Reg', create: true, view: true, update: true, delete: true },
    { name: 'Discharge Patient', create: true, view: true, update: true, delete: true },
    { name: 'Pharmacy Bill', create: true, view: true, update: false, delete: true },
    { name: 'Medicines', create: true, view: true, update: true, delete: true },
    { name: 'Purchase Medicine', create: true, view: true, update: false, delete: true },
    { name: 'Radiology Bill', create: true, view: true, update: true, delete: true },
    { name: 'Radiology Report', create: true, view: true, update: true, delete: true },
    { name: 'Pathology Bill', create: true, view: true, update: true, delete: true },
    { name: 'Pathology Report', create: true, view: true, update: true, delete: true },
    { name: 'Sample Collection', create: true, view: true, update: true, delete: true },
    { name: 'Human Resource', create: true, view: true, update: false, delete: false },
    { name: 'Duty Roster', create: true, view: true, update: true, delete: true },
    { name: 'Ambulance', create: true, view: true, update: true, delete: true },
    { name: 'Assign Ambulance', create: true, view: true, update: true, delete: true },
    { name: 'Issue Blood', create: true, view: true, update: true, delete: true },
    { name: 'Issue Blood Component', create: true, view: true, update: false, delete: true },
    { name: 'Blood Donors', create: true, view: true, update: true, delete: true },
    { name: 'Blood Donation', create: true, view: true, update: true, delete: true },
    { name: 'Blood Component', create: true, view: true, update: false, delete: true },
];





export const setupPermissions = [
    { name: 'Setup', create: false, view: true, update: false, delete: false }, // this is only for front end
    { name: 'Setup Hospital Charges', create: true, view: true, update: true, delete: true },
    { name: 'Charge Unit', create: true, view: true, update: false, delete: true },
    { name: 'Charge Category', create: true, view: true, update: true, delete: true },
    { name: 'Charge Type', create: true, view: true, update: false, delete: true },
    { name: 'Charge Tax', create: true, view: true, update: true, delete: true },

    { name: 'Setup Operation', create: true, view: true, update: true, delete: true },
    { name: 'Operation Category', create: true, view: true, update: true, delete: true },

    { name: 'Setup Finding', create: true, view: true, update: true, delete: true },
    { name: 'Finding Category', create: true, view: true, update: true, delete: true },

    { name: 'Setup Pharmacy', create: false, view: true, update: false, delete: false },
    { name: 'Medicine Group', create: true, view: true, update: false, delete: true },
    { name: 'Medicine Company', create: true, view: true, update: false, delete: true },
    { name: 'Medicine Unit', create: true, view: true, update: false, delete: true },
    { name: 'Dose Duration', create: true, view: true, update: false, delete: true },
    { name: 'Dose Interval', create: true, view: true, update: false, delete: true },
    { name: 'Medicine Category', create: true, view: true, update: false, delete: true },

    { name: 'Setup Vital', create: true, view: true, update: true, delete: true },

    { name: 'Setup Patient', create: false, view: true, update: false, delete: false },

    { name: 'Setup Radiology', create: true, view: true, update: true, delete: true },
    { name: 'Radiology Category', create: true, view: true, update: false, delete: true },
    { name: 'Radiology Parameter', create: true, view: true, update: true, delete: true },
    { name: 'Radiology Unit', create: true, view: true, update: false, delete: true },

    { name: 'Setup Pathology', create: true, view: true, update: true, delete: true },
    { name: 'Pathology Category', create: true, view: true, update: false, delete: true },
    { name: 'Pathology Parameter', create: true, view: true, update: true, delete: true },
    { name: 'Pathology Unit', create: true, view: true, update: false, delete: true },

    { name: 'Setup Bed', create: true, view: true, update: true, delete: true },
    { name: 'Bed Group', create: true, view: true, update: true, delete: true },
    { name: 'Bed Floor', create: true, view: true, update: false, delete: true },

    { name: 'Setup Homepage', create: true, view: true, update: true, delete: true }
];




export const dashboardPermissions = [
    'Opd Income',
    'Ipd Income',
    'Pharmacy Income',
    'Radiology Income',
    'Pathology Income',
    'Ambulance Income',
    'Blood Bank Income',
    'Opds',
    'Ipds',
    'Appointments',
    'Appmnt Income',
    'Medicines',
    'Income Expenses',
    'Medicine Purchases',
    'Pharmacy Expenses',
    'Expenses',
    'Visitors'
];

