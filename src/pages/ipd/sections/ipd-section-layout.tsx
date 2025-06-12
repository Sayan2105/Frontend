import PermissionProtectedAction from "@/components/permission-protected-actions"
import { buttonVariants } from "@/components/ui/button"
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area"
import { Menu, BriefcaseMedical, PocketKnife, HeartPulse, Clock, SquareStack, ReceiptText, Banknote, BookCheck, FlaskConical, ClipboardPlus } from "lucide-react"
import { Link, Outlet } from "react-router-dom"


const IpdSectionsLayout = () => {
    return (
        <div className='space-y-4 pt-4 pb-10'>

            <div className="w-full h-12 ring-1 ring-gray-200 dark:ring-gray-800 rounded px-2">
                <ScrollArea className='h-full w-full'>
                    <div className="flex h-12 gap-x-3 items-center">

                        {/* we provide relative path like this */}

                        <PermissionProtectedAction action='view' module='Ipd'>
                            <Link to={``} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <Menu /> Overview
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Medication'>
                            <Link to={`medication`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <BriefcaseMedical /> Medication
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Operation'>
                            <Link to={`operation`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <PocketKnife /> Operation
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Vitals'>
                            <Link to={`vital`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <HeartPulse /> Vital
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Timeline'>
                            <Link to={`timeline`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <Clock /> Timeline
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Consultant Reg'>
                            <Link to={`consultant-register`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <BookCheck /> Consultant Reg
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Lab Investigation'>
                            <Link to={`lab`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <FlaskConical /> Lab Investigation
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Prescription'>
                            <Link to={`prescription`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <ClipboardPlus /> Prescription
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Treatment History'>
                            <Link to={`treatmenthistory`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <SquareStack /> Treatment History
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Charges'>
                            <Link to={`charges`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <ReceiptText /> Charges
                            </Link>
                        </PermissionProtectedAction>

                        <PermissionProtectedAction action='view' module='Payments'>
                            <Link to={`payment`} className={buttonVariants({
                                variant: 'outline'
                            })}>
                                <Banknote /> Payment
                            </Link>
                        </PermissionProtectedAction>

                    </div>

                    <ScrollBar orientation='horizontal' />
                </ScrollArea>
            </div>

            <Outlet></Outlet>
        </div>
    )
}

export default IpdSectionsLayout