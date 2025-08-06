import { page_limit } from "@/globalData"
import DutyRosterApi from "@/services/dutyroster-api"
import { RosterDataType, Rosters } from "@/types/dutyRoster/DutyRoster"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { parseAsInteger, useQueryState } from "nuqs"
import { useState } from "react"
import toast from "react-hot-toast"
import { useDebouncedCallback } from "use-debounce"
import { useConfirmation } from "./useConfirmation"
import { AxiosError } from "axios"

interface Props {
    isEnabled?: boolean,
    rosterId?: number,
    isRostersPage?: boolean,
    afterSuccess?: (f: boolean) => void
}

const useRoster = ({ isEnabled = false, rosterId, isRostersPage = false, afterSuccess }: Props) => {

    const { confirm, confirmationProps } = useConfirmation()

    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [search, setSearch] = useQueryState('search')


    const [credential, setCredential] = useQueryState('credential')
    const [date, setDate] = useQueryState('date')
    const [period, setPeriod] = useState({ startDate: '', endDate: '' })

    const queryClient = useQueryClient()


    // To Show available doctors
    const { data: doctors, isLoading: isLoadingDoctors, isError, error } = useQuery({
        queryKey: ['rosterDoctors', page, search],
        queryFn: () => DutyRosterApi.getAllOpdRosterDoctors({ search: search!, page, limit: page_limit }),
        enabled: isEnabled
    })

    // To get the details of the doctor from roster
    const { data: rosterInfo, isLoading: isLoadingRosterInfo, isError: isErrorRosterInfo, error: errorRosterInfo } = useQuery({
        queryKey: ['rosterInfo', rosterId],
        queryFn: () => DutyRosterApi.getDoctorRosterForAppointment(rosterId!),
        enabled: (!isEnabled && !!rosterId),
    })



    // Roster Page Part
    const { data: rosters, isLoading: isLoadingRosters, isError: isErrorRosters, error: errorRosters } = useQuery({
        queryKey: ['Roster', page, credential, date, period],
        queryFn: () => DutyRosterApi.getOpdRosters({ page, limit: page_limit, credentials: credential!, date: date!, period }),
        enabled: isRostersPage
    })

    const { mutate: createRoster, isPending: isPendingCreateRoster } = useMutation({
        mutationFn: (formData: any) => DutyRosterApi.createOpdRoster(formData),
        onSuccess: ({ message, data }: { message: string, data: any }) => {
            queryClient.setQueryData(['Roster', page, credential, date, period], (oldData: Rosters) => {
                return { ...oldData, data: [data, ...oldData.data,] }
            })
            toast.success(message)
            afterSuccess && afterSuccess(false)
        },
        onError: (err: AxiosError<{ message: string }>) => {
            const message = err.response?.data.message || 'Error in creating roster'
            toast.error(message)
        }
    })


    const { mutate: updateRoster, isPending: isPendingUpdateRoster } = useMutation({
        mutationFn: ({ id, formData }: { id: number, formData: any }) => DutyRosterApi.updateRoster(formData, id),
        onSuccess: ({ message, data }: { message: string, data: RosterDataType }) => {
            queryClient.setQueryData(['Roster', page, credential, date, period], (oldData: Rosters) => {
                const index = oldData.data.findIndex((item) => item.id === data.id)
                oldData.data[index] = data
                return { ...oldData }
            })
            toast.success(message)
            afterSuccess && afterSuccess(false)
        },
        onError: (err: AxiosError<{ message: string }>) => {
            const message = err.response?.data.message || 'Error in updating roster'
            toast.error(message)
        }
    })


    const { mutate: deleteRoster } = useMutation({
        mutationFn: (id: number) => DutyRosterApi.deleteOpdRoster(id),
        onSuccess: ({ id, message }: { id: number, message: string }) => {
            queryClient.setQueryData(['Roster', page, credential, date, period], (oldData: Rosters) => {
                const index = oldData.data.findIndex((item) => item.id === id)
                oldData.data.splice(index, 1)
                return { ...oldData }
            })
            toast.success(message)
        },
        onError: (err: AxiosError<{ message: string }>) => {
            const message = err.response?.data.message || 'Error in deleting roster'
            toast.error(message)
        }
    })


    const onDelete = async (id: number) => {
        const isConfirm = await confirm()
        if (!isConfirm) return null
        deleteRoster(id)
    }


    // only for available doctors
    const onSearch = useDebouncedCallback((search: string) => {
        search ? setSearch(search) : setSearch(null)
        setPage(1)
    }, 500)

    return {
        // For Appointment
        doctors,
        isLoadingDoctors,
        isError,
        error,
        page,
        setPage,
        search,
        onSearch,
        rosterInfo,
        isLoadingRosterInfo,
        isErrorRosterInfo,
        errorRosterInfo,

        // Roster Page Part
        rosters,
        isLoadingRosters,
        isErrorRosters,
        errorRosters,
        onDelete,
        createRoster,
        isPendingCreateRoster,
        updateRoster,
        isPendingUpdateRoster,

        // Search
        credential,
        setCredential,
        date,
        setDate,
        period,
        setPeriod,

        confirmationProps
    }
}

export default useRoster