import { AlertTriangle, Ambulance, Baby, BriefcaseMedical, Building, Calendar1, Clock2, PhoneCall, Pill, ShieldCheck, Slice } from "lucide-react";

export const features = [
    {
        title: '24 hours Service',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores cumque omnis labore vel animi illum delectus unde. Officiis, minima omnis?',
        icon: <Clock2 />,
    },
    {
        title: 'Quality Care',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores cumque omnis labore vel animi illum delectus unde. Officiis, minima omnis?',
        icon: <ShieldCheck />,
    },
    {
        title: 'Qualified Doctors',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores cumque omnis labore vel animi illum delectus unde. Officiis, minima omnis?',
        icon: <BriefcaseMedical />
    },
    {
        title: 'Opening Hours',
        description: <>
            <div className="flex justify-between">
                <p>Monday - Friday</p>
                <p>9:00AM - 5:00PM</p>
            </div>
            <div className="flex justify-between">
                <p>Saturday</p>
                <p>9:00AM - 3:00PM</p>
            </div>
            <div className="flex justify-between">
                <p>Sunday</p>
                <p>Closed</p>
            </div>
        </>,
        icon: <Clock2 />,
    },
]




export const services = [
    {
        title: 'Medical Treatment',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At voluptatibus dolor fuga! Aperiam est eum iste nulla laborum quidem exercitationem!',
        icon: <Pill className="w-8 h-8 text-rose-500" />
    },
    {
        title: 'Emergency Help',
        description: 'Our emergency services are available 24/7 with state-of-the-art facilities and expert care.',
        icon: <Ambulance className="w-8 h-8 text-rose-500" />
    },
    {
        title: 'Pediatric Care',
        description: 'Compassionate care for children with a focus on comfort and development.',
        icon: <Baby className="w-8 h-8 text-rose-500" />
    },
    {
        title: 'Surgery',
        description: 'Advanced surgical techniques and a team of experienced surgeons ensuring your safety.',
        icon: <Slice className="w-8 h-8 text-rose-500" />
    },

]



export const EmergencyContacts = [
    {
        title: "Emergency Department",
        phone: "+91-911-2345-6789",
        description: "24/7 Emergency Care",
        icon: AlertTriangle,
        color: "text-red-500",
        border: "border-red-100 dark:border-red-800/20",
        bg: "bg-red-50 dark:bg-red-900/20",
    },
    {
        title: "Ambulance Service",
        phone: "+91-108",
        description: "Emergency Transport",
        icon: PhoneCall,
        color: "text-orange-500",
        border: "border-orange-100 dark:border-orange-800/10",
        bg: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
        title: "Appointments",
        phone: "+91-911-2345-6789",
        description: "Quickly book your appointment",
        icon: Calendar1,
        color: "text-blue-500",
        border: "border-blue-100 dark:border-blue-800/20",
        bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
        title: "Main Reception",
        phone: "+91-123-4568-9012",
        description: "Quaries and consultations",
        icon: Building,
        color: "text-pink-500",
        border: "border-pink-100 dark:border-pink-800/10",
        bg: "bg-pink-50 dark:bg-pink-900/20",
    }
];

