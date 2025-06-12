import SetupAnnualCalenders from "@/admin/setup/homepage/annual-calendar/calenders"
import SetupHomeEvents from "@/admin/setup/homepage/event/events"
import SetupHomepageLayout from "@/admin/setup/homepage/layout"
import LatestNews from "@/admin/setup/homepage/news/news"
import { Route } from "react-router-dom"

const SetupHomepageRoutes = () => {
    return (
        <Route path="admin/setup/homepage" element={<SetupHomepageLayout />}>
            <Route path="news" element={<LatestNews />} />
            <Route path="annual-calendar" element={<SetupAnnualCalenders/>} />
            <Route path="events" element={<SetupHomeEvents />} />
        </Route>
    )
}

export default SetupHomepageRoutes