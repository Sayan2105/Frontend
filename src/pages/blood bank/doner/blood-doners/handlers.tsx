import { bloodDonorSchema } from "@/formSchemas/blood-bank"
import { useConfirmation } from "@/hooks/useConfirmation"
import bloodBankApi from "@/services/blood-bank-api"
import { PaginatedDonors } from "@/types/blood-bank/blood-bank"
import { Params } from "@/types/type"
import { useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"


const useBloodDonor = (params: Params) => {

  const { confirm, confirmationProps } = useConfirmation()
  const [donors, setDonors] = useState<PaginatedDonors>({ data: [], total_pages: 0 })
  const [current, setCurrent] = useState<PaginatedDonors['data'][0] | null>(null)
  const [isPending, setPending] = useState<boolean>(false)
  const [form, setForm] = useState(false)


  const handleSubmit = async (formData: z.infer<typeof bloodDonorSchema>) => {
    try {
      let data; setPending(true)

      current ?
        (data = await bloodBankApi.updateBloodDonor(current.id, formData),
          setCurrent(null))
        : (data = await bloodBankApi.createBloodDonor(formData))

      setForm(false)
      getBloodDonors()
      toast.success(data?.message)
    } catch ({ message }: any) {
      toast.error(message)
    } finally { setPending(false) }
  }


  const getBloodDonors = async () => {
    try {
      const data = await bloodBankApi.getBloodDonors(params)
      setDonors(data)
    } catch ({ message }: any) { toast.error(message) }
  }


  const onDelete = async (id: number) => {
    try {
      const isConfirm = await confirm()
      if (!isConfirm) return null
      const data = await bloodBankApi.deleteBloodDonor(id)
      toast.success(data.message)
      getBloodDonors()
    } catch ({ message }: any) {
      toast.error(message)
    }
  }

  return {
    donors,
    getBloodDonors,
    current,
    setCurrent,
    form,
    setForm,
    handleSubmit,
    isPending,
    onDelete,
    confirmationProps
  }
}

export default useBloodDonor