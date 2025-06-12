import AboutUs from '@/pages/home/about'
import AnnualCalendar from '@/pages/home/annual-calendar'
import BookAppointment from '@/pages/home/book-appointment'
import Contact from '@/pages/home/contact'
import DoctorAppointment from '@/pages/home/doctor-appointment'
import Doctors from '@/pages/home/doctors'
import HomePageEvents from '@/pages/home/events'
import HomePage from '@/pages/home/HomePage'
import HomeLayout from '@/pages/home/layout'
import { Route } from 'react-router-dom'

const HomepageRoutes = () => {
    return (
        <Route path="/" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path="home/annual-calendar" element={<AnnualCalendar />} />
            <Route path="home/event" element={<HomePageEvents />} />
            <Route path="home/about" element={<AboutUs />} />
            <Route path="home/contact" element={<Contact />} />
            <Route path="home/doctors" element={<Doctors />} />
            <Route path="home/book-appointment" element={<BookAppointment />} />
            <Route path="home/doctor-appointment" element={<DoctorAppointment />} />
        </Route>
    )
}

export default HomepageRoutes