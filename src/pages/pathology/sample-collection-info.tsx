import IconMenu from "@/components/icon-menu"
import SampleCollectionForm from "@/components/sample-collection-form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Hospital, Pencil, Trash, User } from "lucide-react"
import { useEffect } from "react"
import usePathology from "./handlers"
import PermissionProtectedAction from "@/components/permission-protected-actions"

type Props = {
    ID: number
    isOpen: boolean
    onDelete?: (id: number) => void
    onClose: (v: boolean) => void
    excludeActions?: boolean
}

const PathSampleCollectionInfo = ({ excludeActions = false, isOpen, onClose, onDelete, ID }: Props) => {

    const { collectionForm, setCollectionForm, onCollectionSubmit, collectionDetails, getCollectionById } = usePathology()

    useEffect(() => {
        if (ID) getCollectionById(ID)
    }, [isOpen, ID])

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="z-[200]">
                    <DialogHeader>
                        <DialogTitle className="flex justify-between">
                            <p>Collector Details</p>
                            {!excludeActions && <div className="flex gap-2 mr-10">
                                <PermissionProtectedAction action='update' module='Sample Collection'>
                                    <div className="relative p-2 bg-yellow-100 dark:bg-yellow-500/10 rounded-full">
                                        <Pencil className="w-4 h-4 text-yellow-500" />
                                        <span className="absolute inset-0 cursor-pointer" onClick={() => { setCollectionForm(true), onClose(false) }} />
                                    </div>
                                </PermissionProtectedAction>
                                <PermissionProtectedAction action='delete' module='Sample Collection'>
                                    <div className="relative p-2 bg-red-100 dark:bg-red-500/10 rounded-full">
                                        <Trash className="w-4 h-4 cursor-pointer text-red-500" />
                                        <span className="absolute inset-0 cursor-pointer" onClick={() => { onDelete && onDelete(ID), onClose(false) }} />
                                    </div>
                                </PermissionProtectedAction>
                            </div>}
                        </DialogTitle>
                        <DialogDescription>This is the sample collection details</DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <div>
                        <div className="flex flex-col gap-4">
                            <IconMenu
                                iconBg="bg-blue-100 dark:bg-blue-500/10"
                                icon={<User className="w-6 h-6 text-blue-500" />}
                                title="Collector Name"
                                value={collectionDetails?.staff.name}
                            />
                            <IconMenu
                                iconBg="bg-green-100 dark:bg-green-500/10"
                                icon={<CalendarDays className="w-6 h-6 text-green-500" />}
                                title="Collection Date"
                                value={new Date(collectionDetails?.date!).toDateString()}
                            />
                            <IconMenu
                                iconBg="bg-rose-100 dark:bg-rose-500/10"
                                icon={<Hospital className="w-6 h-6 text-rose-500" />}
                                title="Center"
                                value={collectionDetails?.center}
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {collectionForm && <SampleCollectionForm
                Role="pathologist"
                editDetails={collectionDetails!}
                isPending={false}
                Submit={(formData) => onCollectionSubmit(formData)}
                onClick={() => setCollectionForm(false)}
            />}

        </>
    )
}




export default PathSampleCollectionInfo