import { Outlet } from 'react-router-dom'

const BookAppointmentLayout = () => {
    return (
        <div className="h-full">
            <Outlet />
        </div>
    )
}

export default BookAppointmentLayout