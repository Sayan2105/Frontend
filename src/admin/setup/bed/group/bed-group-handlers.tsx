import { useConfirmation } from "@/hooks/useConfirmation";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import bedApi from "../../services/bed";
import { FloorType } from "../floor/floor-handlers";
import { SetupBedGroupsSchema } from "./bed-groups";

export interface BedGroupType {
  id: number;
  name: string;
  description: string;
  floor: FloorType;
}

const useBedGroupHandlers = () => {
  const { confirm, confirmationProps } = useConfirmation();

  const [bedGroups, setBedGroups] = useState<BedGroupType[]>([]);
  const [bedGroupDet, setBedGroupDet] = useState<BedGroupType | null>(null);

  const [isPending, setPending] = useState(false);
  const [loaderModal, setLoaderModal] = useState(false);
  const [form, setForm] = useState(false);


  // performing upsert
  const handleSubmit = async <T extends z.infer<typeof SetupBedGroupsSchema>>(
    formData: T
  ) => {
    try {
      setPending(true);
      let data;
      bedGroupDet ? (
        data = await bedApi.updateGroup(bedGroupDet.id, formData),
        setBedGroupDet(null)
      ) : (
        data = await bedApi.createGroup(formData)
      );
      toast.success(data.message);
      setForm(false);
      fetchBedGroups();
    } catch ({ message }: any) {
      toast.error(message);
    } finally {
      setPending(false);
    }
  };



  const fetchBedGroups = async () => {
    try {
      const data = await bedApi.getGroups();
      setBedGroups(data);
    } catch ({ message }: any) {
      toast.error(message);
    }
  };

  const fetchBedGroupDetails = async (id: number) => {
    try {
      setLoaderModal(true);
      const data = await bedApi.getGroupDetails(id);
      setBedGroupDet(data);
    } catch ({ message }: any) {
      toast.error(message);
    } finally {
      setLoaderModal(false);
    }
  };

  const onDelete = async (id: number) => {
    try {
      const isConfirm = await confirm();
      if (!isConfirm) return null;
      const data = await bedApi.deleteGroup(id);
      toast.success(data.message);
      fetchBedGroups();
    } catch ({ message }: any) {
      toast.error(message);
    }
  };


  return {
    bedGroupDet,
    setBedGroupDet,
    getBedGroups: fetchBedGroups,
    getBedGroupDetails: fetchBedGroupDetails,
    bedGroups,
    isPending,
    loaderModal,
    form,
    handleSubmit,
    setForm,
    onDelete,
    confirmationProps,
  };
};

export default useBedGroupHandlers;
