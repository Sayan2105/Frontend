
export interface staffsData {
    name: string,
    id: number,
    role: { id: number, name: string },
    phone: string,
    image: string,
    gender: string,
    specialist: Array<{
        id: number,
        name: string
    }>
}



export interface staffs {
    data: staffsData[],
    total_pages: number
}


export interface StaffProfile {
    id: number;
    name: string;
    roleId: number,
    role: { name: string };
    designation: string;
    department: string;
    specialist: Array<{
        id: number,
        name: string
    }>;
    emergency_fees: number;
    normal_fees: number;
    salary: number;
    father_name: string;
    mother_name: string;
    gender: string;
    marital_status: string;
    blood_group: string;
    dob: string; // Date of birth in YYYY-MM-DD format
    date_of_joining: string; // Joining date in YYYY-MM-DD format
    phone: string;
    emergency_contact: string;
    email: string;
    image: string | undefined; // URL to image or null if not provided
    current_address: string;
    permanent_address: string;
    qualification: string;
    work_experience: string;
    note: string;
    PAN: string;
    national_identification_number: string;
    local_identification_number: string;
    license_number: string;

    // Bank Account
    nominee_name: string;
    relation: string;
    account_holder: string;
    account_number: string;
    bank_name: string;
    branch: string;
    ifsc_code: string;

    // documents
    aadhar_image: string,
    pan_image: string,
    diploma_image: string,
    graduation_image: string,
    masters_image: string,
    license_image: string,
}