import IpdApi from '@/services/ipd-api'
import { IpdPatLabInvestigation, IpdRadLabInvestigation } from '@/types/IPD/ipd'
import React from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'




const useLabInvestigation = (search?: string) => {

    const { ipdId, opdId } = useParams()

    const [radiologies, setRadiologies] = React.useState<IpdRadLabInvestigation>([{ RadiologyBillItems: [] }])
    const [pathologies, setPathologies] = React.useState<IpdPatLabInvestigation>([{ PathologyBillItems: [] }])


    const getRadiologies = async () => {
        try {
            const data = await IpdApi.getIpdRadInvestigation((ipdId! || opdId!), { search })
            setRadiologies(data)
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    const getPathologies = async () => {
        try {
            const data = await IpdApi.getIpdPatInvestigation((ipdId! || opdId!), { search }) // ipdId or opdId
            setPathologies(data)
            console.log(data);
        } catch ({ message }: any) {
            toast.error(message)
        }
    }


    return {
        radiologies,
        pathologies,
        getRadiologies,
        getPathologies
    }
}





export default useLabInvestigation