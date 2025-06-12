import AlertModel from "@/components/alertModel";
import EmptyList from "@/components/emptyList";
import LoaderModel from "@/components/loader";
import PermissionProtectedAction from "@/components/permission-protected-actions";
import ProtectedTable from "@/components/protected-table";
import TableActions from "@/components/table-actions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { Fragment, useEffect } from "react";
import { z } from "zod";
import CreateBedModal, { FormField } from "../../../../components/form-modals/form-modal";
import useFloorHandlers from "../floor/floor-handlers";
import useBedGroupHandlers from "./bed-group-handlers";

export interface FloorType {
  id: number;
  name: string;
  description: string;
}

export const SetupBedGroupsSchema = z.object({
  name: z.string().nonempty("Floor name is required"),
  floorId: z.coerce.number().min(1, "Floor is required").default(0),
  description: z.string(),
});





const SetupBedGroups = () => {

  const { floors, fetchFloors } = useFloorHandlers();
  const { bedGroups, bedGroupDet, setBedGroupDet, isPending, loaderModal, form, handleSubmit, getBedGroups, getBedGroupDetails, setForm, onDelete, confirmationProps, } = useBedGroupHandlers()

  const Fields: FormField[] = [
    { name: "name", type: "text", label: "Name" },
    { name: "floorId", type: "select", label: "Floor", selectOptions: floors.map((floor) => ({ value: floor.id, label: floor.name })) },
    { name: "description", type: "textarea", label: "Description" },
  ];


  useEffect(() => {
    fetchFloors();
    getBedGroups();
  }, []);


  return (
    <section className="flex flex-col pb-16 gap-y-5">
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">Groups</h1>
        <PermissionProtectedAction action="create" module="Bed Group">
          <Button size="sm" onClick={() => { setForm(true) }} >
            <Plus /> Add Group
          </Button>
        </PermissionProtectedAction>
      </div>

      <Separator />

      <ProtectedTable module="Bed Group" renderTable={(show, canUpdate, canDelete) => (
        <Table>
          <TableHeader>
            <TableRow>
              {["Name", "Floor", "Description", "Action"].map((item, index) => (
                <Fragment key={index}>
                  {item === "Action" ? (show && <TableHead>{item}</TableHead>) : <TableHead>{item}</TableHead>}
                </Fragment>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {bedGroups.map((group) => {
              return (
                <TableRow key={group.id}>
                  <TableCell>{group.name}</TableCell>
                  <TableCell>{group.floor.name}</TableCell>
                  <TableCell>{group.description}</TableCell>
                  <TableActions
                    show={show}
                    canUpdate={canUpdate}
                    canDelete={canDelete}
                    onDelete={() => onDelete(group.id)}
                    onEdit={async () => {
                      await getBedGroupDetails(group.id);
                      setForm(true);
                    }}
                  />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )} />

      {/* Models */}

      {<EmptyList length={bedGroups.length} message="No Floors Found" />}

      {/* form model */}
      {
        form && (
          <CreateBedModal
            title="Add Floor"
            isPending={isPending}
            Submit={handleSubmit}
            schema={SetupBedGroupsSchema}
            fields={Fields}
            defaultValues={bedGroupDet!}
            onClick={() => (setForm(false), setBedGroupDet(null))}
          />
        )
      }

      {/* Alert model */}
      {
        confirmationProps.isOpen && (
          <AlertModel
            cancel={() => confirmationProps.onCancel()}
            continue={() => confirmationProps.onConfirm()}
          />
        )
      }


      {loaderModal && <LoaderModel />}
    </section >
  );
};

export default SetupBedGroups;




