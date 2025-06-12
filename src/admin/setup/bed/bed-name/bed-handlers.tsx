import { useConfirmation } from '@/hooks/useConfirmation';
import { BedType, PaginatedBedType } from '@/types/setupTypes/bedTypes';
import { Params } from '@/types/type';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';
import bedApi from '../../services/bed';
import { SetupBedSchema } from './bed';




const useBedHandlers = () => {
    const { confirm, confirmationProps } = useConfirmation();

    const [beds, setBeds] = useState<PaginatedBedType>({ data: [], total_pages: 0 });

    const [current, setCurrent] = useState<BedType | null>(null);

    const [isPending, setPending] = useState(false);
    const [form, setForm] = useState(false);



    const handleSubmit = async <T extends z.infer<typeof SetupBedSchema>>(
        formData: T
    ) => {
        try {
            setPending(true);
            let data;
            current ? (
                data = await bedApi.updateBed(current.id, formData),
                setCurrent(null)
            ) : (
                data = await bedApi.createBed(formData)
            );
            toast.success(data.message);
            setForm(false);
            fetchBeds()
        } catch ({ message }: any) {
            toast.error(message);
        } finally {
            setPending(false);
        }
    };



    const onDelete = async (id: number) => {
        try {
            const isConfirm = await confirm();
            if (!isConfirm) return null;
            const data = await bedApi.deleteBed(id);
            toast.success(data.message);
        } catch ({ message }: any) {
            toast.error(message);
        }
    };



    const fetchBeds = async (params?: Params) => {
        try {
            const data = await bedApi.getBeds(params);
            setBeds(data);
        } catch ({ message }: any) {
            toast.error(message);
        }
    };




    return {
        isPending,
        form,
        handleSubmit,
        setForm,
        onDelete,
        beds,
        current,
        setCurrent,
        getBeds: fetchBeds,
        confirmationProps,
    }
}

export default useBedHandlers