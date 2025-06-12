import AlertModel from "@/components/alertModel"
import EmptyList from "@/components/emptyList"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import ProtectedTable from "@/components/protected-table"
import TableActions from "@/components/table-actions"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useConfirmation } from "@/hooks/useConfirmation"
import { RadioCategoryType } from "@/types/setupTypes/radiology"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"
import { createRadiologytCategory, deleteRadiologyCategory, getRadiologyCategories } from "../service"
import CreateRadioCategory, { CreateRadioCategorySchema } from "./createRadioCategory"



const RadioCategories = () => {

    // custom hooks
    const { confirm, confirmationProps } = useConfirmation()

    // Loaders
    const [isPending, setPending] = useState<boolean>(false)


    // model states
    const [isCategoryForm, setCategoryFrom] = useState(false)


    //  api states
    const [categories, setCategories] = useState<RadioCategoryType[]>([])



    const handleSubmit = async (formData: z.infer<typeof CreateRadioCategorySchema>) => {
        try {
            setPending(true)
            const data = await createRadiologytCategory(formData)
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
            const data = await getRadiologyCategories()
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
            const data = await deleteRadiologyCategory(id)
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
                <PermissionProtectedAction action="create" module="Radiology Category">
                    <Button size='sm' onClick={() => { setCategoryFrom(true) }}>
                        <Plus /> Add Category
                    </Button>
                </PermissionProtectedAction>
            </div>

            <Separator />

            <ProtectedTable module='Radiology Category' renderTable={(show, canUpdate, canDelete) => (
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
                <CreateRadioCategory
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





export default RadioCategories