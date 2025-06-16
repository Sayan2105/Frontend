import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";

export const footerContacts = [
    {
        icon: Mail,
        content: (
            <a
                href="mailto:contact@hospital.com"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 hover:underline"
            >
                contact@hospital.com
            </a>
        ),
        bgColor: 'bg-blue-50 dark:bg-blue-500/40'
    },
    {
        icon: Phone,
        content: (
            <a
                href="tel:+919876543210"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
                +91 98765 43210
            </a>
        ),
        bgColor: 'bg-green-50 dark:bg-green-500/40'
    },
    {
        icon: MapPin,
        content: (
            <span className="text-gray-700 dark:text-gray-300">
                Tulsipur, Balrampur<br />
                Uttar Pradesh, India
            </span>
        ),
        bgColor: 'bg-red-50 dark:bg-red-500/40'
    }
]



export const footerSocilalMedia = [
    {
        icon: Facebook,
        name: 'Facebook',
        url: 'https://www.facebook.com',
        hoverColor: 'group-hover:bg-blue-600 group-hover:text-white',
        bgColor: 'bg-blue-50 dark:bg-blue-500/30'
    },
    {
        icon: Instagram,
        name: 'Instagram',
        url: 'https://www.instagram.com',
        hoverColor: 'group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white',
        bgColor: 'bg-pink-50 dark:bg-pink-500/30'
    },
    {
        icon: Twitter,
        name: 'X (Twitter)',
        url: 'https://www.x.com',
        hoverColor: 'group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black',
        bgColor: 'bg-gray-50 dark:bg-gray-500'
    },
    {
        icon: Youtube,
        name: 'YouTube',
        url: 'https://www.youtube.com',
        hoverColor: 'group-hover:bg-red-600 group-hover:text-white',
        bgColor: 'bg-red-50 dark:bg-red-500/30'
    }
]



export const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'Annual Calendar', path: '/home/annual-calendar' },
    { name: 'Appointment', path: '/home/book-appointment' },
    { name: 'Find A Doctor', path: '/home/doctors' },
    { name: 'Contact', path: '/home/contact' },
    { name: 'Events', path: '/home/event' },
    { name: 'About Us', path: '/home/about' },
]