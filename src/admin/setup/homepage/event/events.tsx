import AlertModel from "@/components/alertModel"
import CustomPagination from "@/components/customPagination"
import EmptyList from "@/components/emptyList"
import FormModal from "@/components/form-modals/form-modal"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import ProtectedTable from "@/components/protected-table"
import TableActions from "@/components/table-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { page_limit } from "@/globalData"
import { Plus } from "lucide-react"
import { parseAsInteger, useQueryState } from "nuqs"
import { useEffect } from "react"
import { z } from "zod"
import { HomeEventFormFields } from "./form-fields"
import useHomeEvent from "./handlers"
import TextMore from "@/components/text-more"


export const homeEventSchema = z.object({
    title: z.string().nonempty('Title is required'),
    description: z.string().nonempty('Description is required').max(500),
    date: z.string().nonempty('Date is required'),
})


const SetupHomeEvents = () => {

    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')

    const { events, current, setCurrent, isPending, form, setForm, handleSubmit, getAllEvents, onDelete, confirmationProps } = useHomeEvent({ page, limit: page_limit, search })

    const onSearch = (value: string) => {
        value ? setSearch(value) : setSearch(null)
        setPage(1)
    }


    useEffect(() => {
        getAllEvents()
    }, [page, search])


    return (

        <section className="flex flex-col pb-16 gap-y-5">

            {/* Action */}
            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Events</h1>
                <PermissionProtectedAction action='create' module='Setup Homepage'>
                    <Button size='sm' onClick={() => { setForm(true) }}>
                        <Plus /> Add Event
                    </Button>
                </PermissionProtectedAction>
            </div>

            <Separator />

            {/* Search */}
            <div className="sm:w-48 space-y-1">
                <p className="text-sm dark:text-gray-300 text-gray-800">Search</p>
                <Input type="date" onChange={(e) => { onSearch(e.target.value) }} defaultValue={search!} />
            </div>

            <Separator />

            {/* Paginated Table */}
            <div className="flex flex-col pb-16 min-h-[65vh] space-y-10">
                <div className="flex-1">
                    <ProtectedTable module='Setup Homepage' renderTable={(show, canUpdate, canDelete) => (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Description</TableHead>
                                    {show && <TableHead>Action</TableHead>}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {events.data.map((item) => {
                                    return <TableRow key={item.id}>
                                        <TableCell>{item.date}</TableCell>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell><TextMore text={item.description} /></TableCell>
                                        <TableActions
                                            show={show}
                                            canUpdate={canUpdate}
                                            canDelete={canDelete}
                                            onEdit={() => {
                                                setCurrent(item)
                                                setForm(true)
                                            }}
                                            onDelete={() => onDelete(item.id)}
                                        />
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    )} />

                    <EmptyList length={events.data.length} message="No News Found" />
                </div>

                {/* Pagination */}

                <CustomPagination
                    total_pages={events.total_pages}
                    currentPage={page}
                    next={setPage}
                    previous={setPage}
                    goTo={setPage}
                />
            </div>


            {/* Alert model */}
            {confirmationProps.isOpen && (
                <AlertModel
                    cancel={() => confirmationProps.onCancel()}
                    continue={() => confirmationProps.onConfirm()} />
            )}

            {/* From */}
            {form &&
                <FormModal
                    title={current ? "Update Event" : "Add Event"}
                    schema={homeEventSchema}
                    fields={HomeEventFormFields}
                    Submit={handleSubmit}
                    isPending={isPending}
                    defaultValues={current!}
                    onClick={() => { setForm(false); setCurrent(null) }}
                />
            }

        </section>
    )
}





export default SetupHomeEvents