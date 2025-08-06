import AboutUs from '@/pages/home/about'
import AnnualCalendar from '@/pages/home/annual-calendar'
import HomepageAvailableDoctors from '@/pages/home/book-appointment/available-doctors'
import DoctorAppointment from '@/pages/home/book-appointment/book-appointment'
import HomepageAppointmentLayout from '@/pages/home/book-appointment/layout'
import HomepagePrintAppointment from '@/pages/home/book-appointment/print-appointment'
import Contact from '@/pages/home/contact'
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
            <Route path='home/available-doctors' element={<HomepageAppointmentLayout />}>
                <Route index element={<HomepageAvailableDoctors />} />
                <Route path="book-appointment/:rosterId" element={<DoctorAppointment />} />
                <Route path="print-appointment" element={<HomepagePrintAppointment />} />
            </Route>
        </Route>
    )
}

export default HomepageRoutes