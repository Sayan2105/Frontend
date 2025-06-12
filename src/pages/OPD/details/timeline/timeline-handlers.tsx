import { timelineFormSchema } from "@/formSchemas/timelineFormSchema"
import { useConfirmation } from "@/hooks/useConfirmation"
import TimelineApi from "@/services/timeline-api"
import { timeline } from "@/types/opd_section/timeline"
import { useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { z } from "zod"




const useTimelineHandlers = () => {

  const { opdId, ipdId } = useParams()
  const { confirm, confirmationProps } = useConfirmation()
  const [isPending, setPending] = useState(false)
  const [form, setForm] = useState(false)
  const [timelines, setTimelines] = useState<timeline[]>([])
  const [current, setCurrent] = useState<timeline | null>(null)


  const handleSubmit = async (formData: z.infer<typeof timelineFormSchema>) => {
    try {
      setPending(true)
      let data;

      current ? (
        data = await TimelineApi.updateTimeine(current.id, formData), setCurrent(null))
        :
        (data = await TimelineApi.createTimeline(formData, { opdId, ipdId }))

      toast.success(data.message)
      getTimelines()
      setForm(false)
    } catch ({ message }: any) {
      toast.error(message)
    } finally { setPending(false) }
  }


  const getTimelines = async () => {
    try {
      const data = await TimelineApi.getTimelines({ opdId, ipdId })
      setTimelines(data)
      console.log({ opdId, data })

    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  const onDelete = async (id: number) => {
    try {
      const isConfirm = await confirm()
      if (!isConfirm) return null
      const data = await TimelineApi.deleteTimeline(id)  // timeline id
      toast.success(data.message)
      getTimelines()
    } catch ({ message }: any) {
      toast.error(message)
    }
  }


  return {
    timelines,
    getTimelines,
    current,
    setCurrent,
    isPending,
    form,
    setForm,
    handleSubmit,
    onDelete,
    confirmationProps
  }
}

export default useTimelineHandlers