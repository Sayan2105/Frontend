
import CustomPagination from '@/components/customPagination';
import EmptyList from '@/components/emptyList';
import LoaderModel from '@/components/loader';
import PermissionProtectedAction from '@/components/permission-protected-actions';
import TableActions from '@/components/table-actions';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { page_limit } from '@/globalData';
import { Plus } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useEffect } from 'react';
import ProtectedTable from '@/components/protected-table';
import useOperationHandlers from '@/pages/OPD/details/operation/operation-handlers'
import OperationDetailsModel from '@/pages/OPD/details/operation/operationDetails'
import OperationForm from '@/components/form-modals/operation-form-modal'
import AlertModel from '@/components/alertModel'




const IpdOperations = () => {

    // search params
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

    const { operations, getOperations, current, setCurrent, getDetails, isPending,modalLoading, form, setForm, handleSubmit, onDelete, confirmationProps } = useOperationHandlers({ page, limit: page_limit })


    useEffect(() => {
        getOperations()
    }, [page])


    return (
        <>
            <section className="flex flex-col gap-y-5">
                <div className="flex justify-between">
                    <h1 className="text-lg text-gray-800 dark:text-gray-100 font-semibold">Operations</h1>
                    <PermissionProtectedAction action='create' module='Operation'>
                        <Button size='sm' onClick={() => setForm(true)}>
                            <Plus /> Add Operation
                        </Button>
                    </PermissionProtectedAction>
                </div>

                <Separator />

                {/* with pagination */}

                <div className="flex flex-col min-h-[70vh] mb-20">
                    <div className='flex-1'>
                        <ProtectedTable
                            module='Operation'
                            renderTable={(show, canUpdate, canDelete) => (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Reference No</TableHead>
                                            <TableHead>Operation Date</TableHead>
                                            <TableHead>Operation Name</TableHead>
                                            <TableHead>Operation Category</TableHead>
                                            <TableHead>OT Technician</TableHead>
                                            {show && <TableHead>Action</TableHead>}
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {operations?.data?.map((opertion, i) => {
                                            return <TableRow key={i}>
                                                <TableCell className='cursor-pointer font-semibold text-blue-500 hover:text-blue-400'
                                                    onClick={async () => {
                                                        await getDetails(opertion.id)
                                                    }}
                                                >
                                                    {opertion.id}
                                                </TableCell>
                                                <TableCell>{opertion.date}</TableCell>
                                                <TableCell>{opertion.operationName.name}</TableCell>
                                                <TableCell>{opertion.operationCategory.name}</TableCell>
                                                <TableCell>{opertion.ot_technician}</TableCell>
                                                <TableActions
                                                    show={show}
                                                    canDelete={canDelete}
                                                    canUpdate={canUpdate}
                                                    onEdit={async () => {
                                                        await getDetails(opertion.id)
                                                        setForm(true)
                                                    }}
                                                    onDelete={() => onDelete(opertion.id)}
                                                />
                                            </TableRow>
                                        })}
                                    </TableBody>
                                </Table>
                            )}
                        />


                        {/* error on emply list */}

                        <EmptyList length={operations?.data.length!} message="No operations found" />
                    </div>

                    <section>
                        <CustomPagination
                            total_pages={operations?.total_pages!}
                            currentPage={page}
                            previous={(p) => setPage(p)}
                            goTo={(p) => setPage(p)}
                            next={(p) => setPage(p)}
                        />
                    </section>
                </div>

            </section>


            {/* models */}

            {form && (
                <OperationForm
                    Submit={handleSubmit}
                    isPending={isPending}
                    operationDetails={current}
                    onClick={() => { setForm(false); setCurrent(undefined) }}
                />
            )}


            {/* Alert Model */}

            {confirmationProps.isOpen && <AlertModel
                cancel={() => confirmationProps.onCancel()}
                continue={() => confirmationProps.onConfirm()}
            />}


            {/* Operation details model */}
            {(current && !form) && <OperationDetailsModel operationDetails={current}
                onClick={() => setCurrent(undefined)}
            />}


            {/* loader */}

            {modalLoading && <LoaderModel />}
        </>
    )
}



export default IpdOperations