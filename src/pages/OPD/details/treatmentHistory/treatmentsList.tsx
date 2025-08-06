import CustomPagination from "@/components/customPagination"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { page_limit } from "@/globalData"
import OpdApi from "@/services/opd-api"
import { OPDs } from "@/types/opd_section/opd"
import { parseAsInteger, useQueryState } from "nuqs"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useParams } from "react-router-dom"


const TreatmentsList = () => {

  const { opdId } = useParams()


  // query params
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search')

  const [opds, setOpds] = useState<OPDs>({ data: [], total_pages: 0 })


  async function onSearch(date: string) {
    date ? setSearch(date) : setSearch(null)
    setPage(1)
  }

  const getOpds = async () => {
    try {
      const data = await OpdApi.getTreatmentHistory({ page, limit: page_limit, search: search!, opdId })
      setOpds(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  useEffect(() => {
    getOpds()
  }, [page, search])


  return (
    <section className="flex flex-col gap-y-5">

      <div className="flex justify-between">
        <h1 className="text-lg text-gray-800 dark:text-gray-100 font-semibold">Treatment History</h1>
      </div>

      <Separator />

      <div className="sm:w-48 space-y-1">
        <p className="text-sm text-gray-700 dark:text-gray-300">Search by date</p>
        <Input type="date" onChange={(e) => { onSearch(e.target.value) }} />
      </div>

      <div className="flex flex-col space-y-5 min-h-[60vh]">
        <div className="flex-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>OPD ID</TableHead>
                <TableHead>Appointment Date</TableHead>
                <TableHead>Consultant</TableHead>
                <TableHead>Specialist</TableHead>
                <TableHead>Reference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opds?.data.map((opd, i) => {
                return <TableRow key={i}>
                  <TableCell>
                    <Link className="text-blue-500 hover:text-blue-400 font-semibold" to={{ pathname: `../../${opd.id}` }}>{opd.id}</Link>
                  </TableCell>
                  <TableCell>
                    <div className="dark:bg-yellow-900/20 bg-yellow-100 dark:text-yellow-600 text-yellow-600 py-1 px-2 rounded w-fit">
                      {new Date(opd.appointment.date).toLocaleDateString('en-US', { weekday: 'short' })}{", "}
                      {new Date(opd.appointment.date).toLocaleDateString('en-US', { day: 'numeric' })}{", "}
                      {new Date(opd.appointment.date).toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                  </TableCell>
                  <TableCell>{opd.doctor.name}</TableCell>
                  <TableCell>{opd.appointment.specialist.name}</TableCell>
                  <TableCell>{opd.appointment.reference}</TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>

          {/* if error */}

          {opds?.data.length < 1 && <p className="mt-4 text-gray-500">No data found</p>}
        </div>

        <CustomPagination
          currentPage={page}
          total_pages={opds.total_pages}
          previous={(p) => setPage(p)}
          goTo={(p) => setPage(p)}
          next={(p) => setPage(p)}
        />

      </div>

    </section>
  )
}

export default TreatmentsList