import { useConfirmation } from "@/hooks/useConfirmation"
import AmbulanceApi from "@/services/ambulance-api"
import { AssignedAmbulanceInfo, PaginatedAssignedAmbulances } from "@/types/ambulance/ambulance"
import { Params } from "@/types/type"
import { useState } from "react"
import toast from "react-hot-toast"

const useAssignAmbulance = (params: Params) => {

  const { confirm, confirmationProps } = useConfirmation()
  const [form, setForm] = useState(false)
  const [isPending, setPending] = useState(false)
  const [assigned, setAssigned] = useState<PaginatedAssignedAmbulances>({ data: [], total_pages: 0 })
  const [current, setCurrent] = useState<AssignedAmbulanceInfo | null>(null)


  const handleSubmit = async (formData: any) => {
    try {
      let data; setPending(true)
      current ? (
        data = await AmbulanceApi.updateAssignedAmbulance(formData, current.id),
        setCurrent(null)
      ) : (data = await AmbulanceApi.createAssignAmbulance(formData))
      getAssignedAmbulances()
      toast.success(data.message)
      setForm(false)
    } catch ({ message }: any) {
      toast.error(message)
    } finally { setPending(false) }
  }


  const getAssignedAmbulances = async () => {
    try {
      const data = await AmbulanceApi.getAssignedAmbulances(params)
      setAssigned(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }

  const onDelete = async (id: string) => {
    try {
      const isConfirm = await confirm()
      if (!isConfirm) return null
      const data = await AmbulanceApi.deleteAssignedAmbulance(id)
      toast.success(data.message)
      getAssignedAmbulances()
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const getAssignedAmbulanceInfo = async (id: string) => {
    try {
      setPending(true)
      const data = await AmbulanceApi.getAssignedAmbulanceInfo(id)
      setCurrent(data)
    } catch ({ message }: any) {
      toast.error(message)
    } finally { setPending(false) }
  }


  const printInvoice = async (id: string) => {
    try {
      const res = await AmbulanceApi.printInvoice(id)
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  return {
    assigned,
    getAssignedAmbulances,
    isPending,
    form,
    setForm,
    handleSubmit,
    onDelete,
    current,
    setCurrent,
    getAssignedAmbulanceInfo,
    confirmationProps,
    printInvoice
  }
}

export default useAssignAmbulance