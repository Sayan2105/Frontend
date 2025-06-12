export type PatientDetails = {
    id: number,
    name: string,
    role: string,
    guardian_name: string,
    gender: string,
    dob: string,
    age: string,
    blood_group: string,
    marital_status: string,
    image: string,
    phone: string,
    email: string,
    alergies: string,
    aadhar: string,
    address: string,
    createdAt: string,
    updateAt: string,
}




// export type CommulativeReport = {
//     "name": "Nitish Yadav",
//     "image": null,
//     "gender": "male",
//     "blood_group": "O+",
//     "phone": "7412589632",
//     "email": "nitish@gmail.com",
//     "OPD": [
//         {
//             "medications": [
//                 {
//                     "id": 11,
//                     "opdId": "OPDN83497",
//                     "categoryId": 4,
//                     "medicineId": 8,
//                     "date": "2025-03-01",
//                     "time": "12:39",
//                     "dose": "1BD",
//                     "note": "Take medicine timely"
//                 },
//                 {
//                     "id": 12,
//                     "opdId": "OPDN83497",
//                     "categoryId": 4,
//                     "medicineId": 9,
//                     "date": "2025-03-01",
//                     "time": "12:40",
//                     "dose": "1CT",
//                     "note": "Take medicine timely"
//                 }
//             ],
//             "Operations": [
//                 {
//                     "id": "OPRN34258",
//                     "patientId": 2,
//                     "opdId": "OPDN83497",
//                     "categoryId": 1,
//                     "oprNameId": 2,
//                     "date": "2025-03-01T12:40",
//                     "doctorId": 1,
//                     "assistant_1": "Mark",
//                     "assistant_2": "David",
//                     "anesthetist": "Anesthetist A",
//                     "anesthesia_type": "r5eredr",
//                     "ot_technician": "Zukerberg",
//                     "ot_assistant": "Assistant A",
//                     "note": "it was quite critical case",
//                     "result": "Operation was successfull",
//                     "createdAt": "2025-03-01T07:10:45.799Z",
//                     "updatedAt": "2025-03-01T07:10:45.799Z"
//                 },
//                 {
//                     "id": "OPRN61274",
//                     "patientId": 2,
//                     "opdId": "OPDN83497",
//                     "categoryId": 2,
//                     "oprNameId": 7,
//                     "date": "2025-03-01T12:40",
//                     "doctorId": 3,
//                     "assistant_1": "Mark",
//                     "assistant_2": "David",
//                     "anesthetist": "fdd",
//                     "anesthesia_type": "B",
//                     "ot_technician": "Zukerberg",
//                     "ot_assistant": "Assistant A",
//                     "note": "50",
//                     "result": "Operation got failed",
//                     "createdAt": "2025-03-01T07:11:14.414Z",
//                     "updatedAt": "2025-03-01T07:11:14.414Z"
//                 }
//             ],
//             "Vitals": [
//                 {
//                     "id": 11,
//                     "patientId": 2,
//                     "opdId": "OPDN83497",
//                     "value": "96",
//                     "date": "2025-03-14",
//                     "setup_VitalId": 6
//                 },
//                 {
//                     "id": 12,
//                     "patientId": 2,
//                     "opdId": "OPDN83497",
//                     "value": "85",
//                     "date": "2025-03-06",
//                     "setup_VitalId": 5
//                 }
//             ],
//             "timelines": [
//                 {
//                     "id": 6,
//                     "opdId": "OPDN83497",
//                     "patientId": 2,
//                     "title": "Paracitamoll",
//                     "date": "2025-03-06T12:59",
//                     "description": "Take this after dinner\n"
//                 },
//                 {
//                     "id": 7,
//                     "opdId": "OPDN83497",
//                     "patientId": 2,
//                     "title": "Dolo",
//                     "date": "2025-03-07T13:00",
//                     "description": "Take if you are getting pain"
//                 }
//             ],
//             "charges": [
//                 {
//                     "id": 10,
//                     "opdId": "OPDN83497",
//                     "chargeTypeId": 3,
//                     "categoryId": 2,
//                     "chargeNameId": 3,
//                     "standard_charge": 1000,
//                     "tpa": 100,
//                     "date": "2025-03-01",
//                     "total": 1100,
//                     "tax": 20,
//                     "discount": 0,
//                     "net_amount": 1320
//                 },
//                 {
//                     "id": 11,
//                     "opdId": "OPDN83497",
//                     "chargeTypeId": 6,
//                     "categoryId": 1,
//                     "chargeNameId": 2,
//                     "standard_charge": 50000,
//                     "tpa": 2000,
//                     "date": "2025-03-02",
//                     "total": 52000,
//                     "tax": 18,
//                     "discount": 0,
//                     "net_amount": 61360
//                 }
//             ],
//             "Payments": [
//                 {
//                     "id": "TRANID10686",
//                     "opdId": "OPDN83497",
//                     "date": "2025-08-02",
//                     "amount": 50000,
//                     "payment_mode": "Cash",
//                     "note": "Pacemaker implementation",
//                     "createdAt": "2025-03-01T07:17:54.479Z"
//                 },
//                 {
//                     "id": "TRANID24853",
//                     "opdId": "OPDN83497",
//                     "date": "2025-03-01",
//                     "amount": 40000,
//                     "payment_mode": "UPI",
//                     "note": "For operation services",
//                     "createdAt": "2025-03-01T07:12:27.242Z"
//                 }
//             ],
//             "prescriptions": {
//                 "id": 19,
//                 "header_note": "Following all steps is neccessary",
//                 "opdId": "OPDN83497"
//             }
//         }
//     ]
// }