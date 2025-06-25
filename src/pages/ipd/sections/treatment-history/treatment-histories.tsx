import CustomPagination from "@/components/customPagination"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PaginatedIpdTreatmentHisInfo } from "@/types/IPD/ipd"
import { parseAsInteger, useQueryState } from "nuqs"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useParams } from "react-router-dom"
import EmptyList from "@/components/emptyList"
import IpdApi from "@/services/ipd-api"


const IpdTreatmentHistories = () => {

    const { ipdId } = useParams()


    // query params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')

    const [ipds, setIpds] = useState<PaginatedIpdTreatmentHisInfo>({ data: [], total_pages: 0 })


    async function onSearch(date: string) {
        date ? setSearch(date) : setSearch(null)
        setPage(1)
    }

    const fetchIpds = async () => {
        try {
            const data = await IpdApi.getIpdTreatmentHistory({ page, limit: 10, search: search!, ipdId })
            setIpds(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchIpds()
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
                                <TableHead>IPD ID</TableHead>
                                <TableHead>Admission Date</TableHead>
                                <TableHead>Consultant</TableHead>
                                <TableHead>Bed Group</TableHead>
                                <TableHead>Bed No.</TableHead>
                                <TableHead>Symptom Type</TableHead>
                                <TableHead>Casualty</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ipds?.data.map((ipd, i) => {
                                return <TableRow key={i}>
                                    <TableCell>
                                        <Link className="text-blue-500 hover:text-blue-400 font-semibold" to={{ pathname: `/ipd/${ipd.id}` }}>{ipd.id}</Link>
                                    </TableCell>
                                    <TableCell>{ipd.date}</TableCell>
                                    <TableCell>{ipd.doctor.name}</TableCell>
                                    <TableCell>{ipd.bedGroup.name}</TableCell>
                                    <TableCell>{ipd.bed.name}</TableCell>
                                    <TableCell>{ipd.symptom_type}</TableCell>
                                    <TableCell>{ipd.casualty}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>

                    {/* if error */}

                    <EmptyList length={ipds?.data.length} message="No history found" />
                </div>

                <CustomPagination
                    currentPage={page}
                    total_pages={ipds.total_pages}
                    previous={(p) => setPage(p)}
                    goTo={(p) => setPage(p)}
                    next={(p) => setPage(p)}
                />

            </div>

        </section>
    )
}





export default IpdTreatmentHistories