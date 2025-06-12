import AlertModel from "@/components/alertModel"
import EmptyList from "@/components/emptyList"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import ProtectedTable from "@/components/protected-table"
import TableActions from "@/components/table-actions"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useConfirmation } from "@/hooks/useConfirmation"
import { PathCategoryType } from "@/types/setupTypes/pathology"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"
import { createPathologytCategory, deletePathologyCategory, getPathologyCategories } from "../service"
import CreatePathCategory, { CreatePathCategorySchema } from "./create-path-category"




const SetupPathCategories = () => {

    // custom hooks
    const { confirm, confirmationProps } = useConfirmation()

    // Loaders
    const [isPending, setPending] = useState<boolean>(false)


    // model states
    const [isCategoryForm, setCategoryFrom] = useState(false)


    //  api states
    const [categories, setCategories] = useState<PathCategoryType[]>([])



    const handleSubmit = async (formData: z.infer<typeof CreatePathCategorySchema>) => {
        try {
            setPending(true)
            const data = await createPathologytCategory(formData)
            toast.success(data.message)
            setPending(false)
            setCategoryFrom(false)
            fetchCategories()
        } catch ({ message }: any) {
            toast.error(message)
            setPending(false)
        }
    }


    const fetchCategories = async () => {
        try {
            const data = await getPathologyCategories()
            setCategories(data)
        } catch ({ message }: any) {
            toast.error(message)
            setPending(false)
        }
    }


    const onDelete = async (id: number) => {
        try {
            const isConfirmed = await confirm()
            if (!isConfirmed) return null
            const data = await deletePathologyCategory(id)
            toast.success(data.message)
            fetchCategories()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    useEffect(() => {
        fetchCategories()
    }, [])


    return (
        <section className="flex flex-col pb-16 gap-y-5">

            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Categories</h1>
                <PermissionProtectedAction action="create" module="Pathology Category">
                    <Button size='sm' onClick={() => { setCategoryFrom(true) }}>
                        <Plus /> Add Category
                    </Button>
                </PermissionProtectedAction>
            </div>

            <Separator />

            <ProtectedTable module='Pathology Category' renderTable={(show, canUpdate, canDelete) => (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            {show && <TableHead>Action</TableHead>}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {categories.map((category) => {
                            return <TableRow key={category.id}>
                                <TableCell>{category.id}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableActions
                                    show={show}
                                    canUpdate={canUpdate}
                                    canDelete={canDelete}
                                    onDelete={() => onDelete(category.id)}
                                    exclude={{ edit: true }}
                                />
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            )} />

            <EmptyList length={categories.length} message="No categories found" />

            {/* Form Model */}

            {isCategoryForm && (
                <CreatePathCategory
                    Submit={handleSubmit}
                    isPending={isPending}
                    onClick={() => { setCategoryFrom(false) }}
                />
            )}


            {/* Alert Model */}
            {confirmationProps.isOpen && (
                <AlertModel
                    cancel={() => confirmationProps.onCancel()}
                    continue={() => confirmationProps.onConfirm()}
                />
            )}



        </section>
    )
}






export default SetupPathCategories