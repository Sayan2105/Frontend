import AlertModel from "@/components/alertModel";
import CustomPagination from "@/components/customPagination";
import EmptyList from "@/components/emptyList";
import PermissionProtectedAction from "@/components/permission-protected-actions";
import ProtectedTable from "@/components/protected-table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { page_limit } from "@/globalData";
import { Plus } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";
import CreateBedModal, { FormField } from "../../../../components/form-modals/form-modal";
import useBedGroupHandlers from "../group/bed-group-handlers";
import useBedHandlers from "./bed-handlers";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableActions from "@/components/table-actions";
import toast from "react-hot-toast";
import bedApi from "../../services/bed";



export const SetupBedSchema = z.object({
    name: z.string().nonempty("Floor name is required"),
    groupId: z.coerce.number().min(1, "Bed group is required").default(0),
});





const SetupBed = () => {

    const { bedGroups, getBedGroups } = useBedGroupHandlers();
    const { getBeds, beds, isPending, form, handleSubmit, setForm, onDelete, current, setCurrent, confirmationProps } = useBedHandlers();
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
    const [search, setSearch] = useQueryState('search')


    const Fields: FormField[] = [
        { name: "name", type: "text", label: "Name" },
        {
            name: "groupId", type: "select", label: "Bed Group",
            selectOptions: bedGroups.map((group) => ({ value: group.id, label: group.name }))
        },
    ];


    const onSearch = useDebouncedCallback((value: string) => {
        value ? setSearch(value) : setSearch(null)
        setPage(1)
    }, 400);



    useEffect(() => {
        getBeds({ page, limit: page_limit, search })
    }, [page, search]);


    useEffect(() => {
        getBedGroups();
    }, []);


    return (
        <section className="flex flex-col pb-16 gap-y-5">
            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Beds</h1>
                <PermissionProtectedAction action="create" module="Setup Bed">
                    <Button size="sm" onClick={() => { setForm(true); }} > <Plus /> Add Bed </Button>
                </PermissionProtectedAction>
            </div>

            <Separator />

            <div className="sm:w-48 space-y-1">
                <p className="text-sm text-gray-400">Search</p>
                <Input type="text" defaultValue={search!} onChange={(e) => { onSearch(e.target.value) }} placeholder="name , floor , status" />
            </div>

            <Separator />

            <div className="flex flex-col gap-y-10 min-h-[60vh]">
                <div className="flex-1">
                    <ProtectedTable
                        module="Setup Bed"
                        renderTable={(show, canUpdate, canDelete) => (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Group</TableHead>
                                        <TableHead>Floor</TableHead>
                                        <TableHead>Status</TableHead>
                                        {show && <TableHead>Action</TableHead>}
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {beds.data.map((item, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.group.name}</TableCell>
                                            <TableCell>{item.group.floor.name}</TableCell>
                                            <TableCell>
                                                <UpdateStatus status={item.status} click={async (v) => {
                                                    await bedApi.updateBed(item.id, { status: v }).then(async () => {
                                                        toast.success('Status updated successfully')
                                                        await getBeds({ page: 1, limit: page_limit, search: search })
                                                    }).catch(({ message }: any) => { toast.error(message) })
                                                }} />
                                            </TableCell>
                                            <TableActions
                                                show={show}
                                                canUpdate={canUpdate}
                                                canDelete={canDelete}
                                                onEdit={() => { setCurrent(item); setForm(true) }}
                                                onDelete={() => onDelete(item.id)}
                                            />
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    />

                    {<EmptyList length={beds.data.length} message="No Beds Found" />}
                </div>

                {/* Pagination */}

                <CustomPagination
                    currentPage={page}
                    total_pages={beds?.total_pages}
                    next={setPage}
                    goTo={setPage}
                    previous={setPage}
                />
            </div>


            {/* form model */}
            {
                form && (
                    <CreateBedModal
                        title="Add Bed"
                        isPending={isPending}
                        Submit={handleSubmit}
                        schema={SetupBedSchema}
                        fields={Fields}
                        defaultValues={current!}
                        onClick={() => (setForm(false), setCurrent(null))}
                    />
                )
            }


            {/* Alert model */}
            {
                confirmationProps.isOpen && (
                    <AlertModel
                        cancel={() => confirmationProps.onCancel()}
                        continue={() => confirmationProps.onConfirm()}
                    />
                )
            }

        </section >
    );
};








export default SetupBed



export const UpdateStatus = ({ status, click }: { status: string, click: (p: string) => void }) => {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button variant='outline' className='active:scale-95 transition-all' size='sm'>
                    {status}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='p-0.5 dark:border-gray-800 z-[200]'>
                {['Active', 'Deactivated'].map((item, i) => (
                    <DropdownMenuItem key={i}>
                        <button type='button' onClick={() => click(item)} className='relative flex items-center w-full space-x-2 h-5 hover:text-gray-600 dark:hover:text-gray-400'>
                            {item}
                        </button>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}