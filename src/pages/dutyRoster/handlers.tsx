import { AssignRosterSchema } from '@/formSchemas/assignRosterFormSchema'
import { useConfirmation } from '@/hooks/useConfirmation'
import DutyRosterApi, { RosterParams } from '@/services/dutyroster-api'
import { RosterDataType, Rosters } from '@/types/dutyRoster/DutyRoster'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'





const useDutyRoster = (params: RosterParams) => {


    const { confirm, confirmationProps } = useConfirmation()
    const [isPending, setPending] = useState(false)
    const [form, setForm] = useState(false)
    const [rosters, setRosters] = useState<Rosters>({ data: [], total_pages: 0 })
    const [current, setCurrent] = useState<RosterDataType | null>(null)


    // Performing both upsert

    const handleSubmit = async (formData: z.infer<typeof AssignRosterSchema>) => {
        try {
            let data;
            setPending(true)
            current ? (
                data = await DutyRosterApi.updateRoster(formData, current.id),
                setCurrent(null)
            ) :
                (data = await DutyRosterApi.createRoster(formData))
            toast.success(data.message)
            getRosters()
            setForm(false)
        } catch ({ message }: any) {
            toast.error(message)
        } finally { setPending(false) }
    }


    const getRosters = async () => {
        try {
            const data = await DutyRosterApi.getRosters(params)
            setRosters(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    // for deleting rosters

    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm()
            if (!isConfirm) return null
            const data = await DutyRosterApi.deleteRoster(id)
            toast.success(data.message)
            getRosters()
        } catch ({ message }: any) {
            toast.error(message)
        }
    }



    return {
        rosters,
        getRosters,
        current,
        setCurrent,
        form,
        setForm,
        handleSubmit,
        onDelete,
        confirmationProps,
        isPending,
    }
}

export default useDutyRoster