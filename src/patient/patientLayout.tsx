import { Outlet } from 'react-router-dom'

const PatientLayout = () => {
  return (
    <main className="px-2.5"><Outlet></Outlet></main>
  )
}

export default PatientLayout