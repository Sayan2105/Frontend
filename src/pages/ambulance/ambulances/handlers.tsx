import { createAmbulanceSchema } from '@/formSchemas/ambulance'
import { useConfirmation } from '@/hooks/useConfirmation'
import AmbulanceApi from '@/services/ambulance-api'
import { PagintedAmbulance } from '@/types/ambulance/ambulance'
import { Params } from '@/types/type'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { z } from 'zod'



const useAmbulances = (params: Params) => {

  const { confirm, confirmationProps } = useConfirmation()
  const [form, setForm] = useState(false)
  const [ambulances, setAmbulances] = useState<PagintedAmbulance>({ data: [], total_pages: 0 })
  const [current, setCurrent] = useState<PagintedAmbulance['data'][0] | null>(null)
  const [isPending, setPending] = useState(false)



  const handleSubmit = async (formData: z.infer<typeof createAmbulanceSchema>) => {
    try {
      let data; setPending(true)
      current ? (
        data = await AmbulanceApi.updateAmbulance(formData, current.id),
        setCurrent(null)
      ) : (
        data = await AmbulanceApi.createAmbulance(formData)
      )
      setForm(false)
      getAmbulances()
      setPending(false)
      toast.success(data.message)
    } catch ({ message }: any) {
      toast.error(message)
    } finally { setPending(false) }
  }


  const onDelete = async (id: number) => {
    try {
      const isConfirm = await confirm()
      if (!isConfirm) return null
      const data = await AmbulanceApi.deleteAmbulance(id)
      toast.success(data.message)
      getAmbulances()
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const getAmbulances = async () => {
    try {
      const data = await AmbulanceApi.getAmbulances(params)
      setAmbulances(data)
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  return {
    ambulances,
    getAmbulances,
    isPending,
    form,
    handleSubmit,
    setForm,
    onDelete,
    current,
    setCurrent,
    confirmationProps
  }


}

export default useAmbulances