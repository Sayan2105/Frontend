import AlertModel from "@/components/alertModel"
import CustomPagination from "@/components/customPagination"
import EmptyList from "@/components/emptyList"
import FormModal from "@/components/form-modals/form-modal"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import ProtectedTable from "@/components/protected-table"
import TableActions from "@/components/table-actions"
import TextMore from "@/components/text-more"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { page_limit } from "@/globalData"
import { FileText, Globe, Plus } from "lucide-react"
import { parseAsInteger, useQueryState } from "nuqs"
import { useEffect } from "react"
import { z } from "zod"
import { newsFormFields } from "./form-fields"
import useLatestNews from "./handlers"


export const newsSchems = z.object({
    title: z.string().nonempty('Title is required'),
    description: z.string().nonempty('Description is required'),
    date: z.string().nonempty('Date is required'),
    url: z.union([z.string().url('Enter valid url'), z.literal('')]).optional(),
    pdf: z.instanceof(File).optional().refine((file) => file === undefined || file.size < 4 * 1024 * 1024, 'File size should be less than 4MB'),
})


const LatestNews = () => {

    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')


    const { news, current, setCurrent, isPending, form, setForm, handleSubmit, getAllNews, onDelete, confirmationProps } = useLatestNews({ page, limit: page_limit, search })


    const onSearch = (value: string) => {
        value ? setSearch(value) : setSearch(null)
        setPage(1)
    }

    console.log('news', current)


    useEffect(() => {
        getAllNews()
    }, [page, search])


    return (

        <section className="flex flex-col pb-16 gap-y-5">

            {/* Action */}
            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Latest News</h1>
                <PermissionProtectedAction action='create' module='News'>
                    <Button size='sm' onClick={() => { setForm(true) }}>
                        <Plus /> Add News
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
                    <ProtectedTable module="News" renderTable={(show, canUpdate, canDelete) => (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead >Description</TableHead>
                                    <TableHead >URL</TableHead>
                                    <TableHead >Doc</TableHead>
                                    <TableHead>Status</TableHead>
                                    {show && <TableHead>Action</TableHead>}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {news.data.map((item) => {
                                    return <TableRow key={item.id}>
                                        <TableCell>{item.date}</TableCell>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell><TextMore text={item.description} /></TableCell>
                                        <TableCell>
                                            {item.url ? (
                                                <div className="bg-blue-100 dark:bg-blue-500/10 p-2 rounded-full w-fit relative active:scale-95 transition-all duration-300">
                                                    <Globe className='text-blue-500 h-4 w-4' />
                                                    <a href={item.url} target='_blank' className='absolute inset-0' />
                                                </div>
                                            ) :
                                                (<span className="text-sm text-yellow-500">N/A</span>)
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {item.pdf ? (
                                                <div
                                                    onClick={() => { window.open(`${import.meta.env.VITE_APP_API_URL}/images/${item.pdf}`) }}
                                                    className="bg-red-100 dark:bg-red-500/10 p-2 rounded-full w-fit cursor-pointer active:scale-95 transition-all duration-300">
                                                    <FileText className='text-red-500 h-4 w-4' />
                                                </div>
                                            ) :
                                                (<span className="text-sm text-yellow-500">N/A</span>)
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {new Date(item.date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0) ? <span className="text-red-500">Expired</span> : <span className="text-green-500">Active</span>}
                                        </TableCell>
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

                    <EmptyList length={news.data.length} message="No News Found" />
                </div>

                {/* Pagination */}

                <CustomPagination
                    total_pages={news.total_pages}
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
                    height="h-[45vh]"
                    title={"Latest News"}
                    schema={newsSchems}
                    fields={newsFormFields}
                    Submit={handleSubmit}
                    isPending={isPending}
                    defaultValues={current ? { ...current, pdf: undefined } : undefined}
                    onClick={() => { setForm(false); setCurrent(null) }}
                />
            }

        </section>
    )
}

export default LatestNews






