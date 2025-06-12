import { Outlet } from "react-router-dom"

const BloodBankLayout = () => {
    return (
           <main className="px-2.5"><Outlet></Outlet></main>
    )
}

export default BloodBankLayout