import CardBox from "@/components/card-box"
import CustomTooltip from "@/components/customTooltip"
import Dialog from "@/components/Dialog"
import PermissionProtectedAction from "@/components/permission-protected-actions"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { prescriptionDetail } from "@/types/opd_section/prescription"
import { Pencil, Syringe, Trash2 } from "lucide-react"
import { HTMLAttributes } from "react"



interface PrescriptionDetailsProps extends HTMLAttributes<HTMLDivElement> {
  prescriptionDetails: prescriptionDetail
  Edit: () => void
  Delete: (id: number) => void
}



const PrescriptionDetailsModel = ({ Edit, Delete, prescriptionDetails: details, ...props }: PrescriptionDetailsProps) => {



  return (
    <Dialog pageTitle="Prescription Details" {...props}>
      <ScrollArea className="h-[70vh] sm:h-[65vh]">
        {/* Grid 1 */}
        <section className="grid lg:grid-cols-2 px-2.5 space-y-4">

          {/*G-1 col-1 */}
          <div className="flex items-center gap-2">
            <div className='p-3 bg-red-500 rounded-full'>
              <Syringe className='w-10 h-10 text-white' />
            </div>
            <div>
              <h1 className='font-semibold text-lg'>Prescription</h1>
              <div className="flex items-center space-x-2">
                <p className="text-gray-400">ID : {details.id}</p>
                {/* Edit and Delete */}
                <PermissionProtectedAction action="update" module="Prescription">
                  <CustomTooltip message="Edit Prescription">
                    <Pencil className="w-4 h-4 cursor-pointer text-yellow-500" onClick={Edit} />
                  </CustomTooltip>
                </PermissionProtectedAction>

                <PermissionProtectedAction action="delete" module="Prescription">
                  <CustomTooltip message="Delete Prescription">
                    <Trash2 className="w-4 h-4 cursor-pointer text-red-500"
                      onClick={() => Delete(details.id)}
                    />
                  </CustomTooltip>
                </PermissionProtectedAction>
              </div>
            </div>
          </div>

          {/*G-1 col-2 */}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {/* condition for both OPD and IPD */}
            {details.opdId ? <>
              <CardBox borderType="dashed" title='OPD ID' value={details?.opdId} />
              <CardBox borderType="dashed" title="Patient" value={details?.opd.appointment.patient.name} />
              <CardBox borderType="dashed" title="Cunsultant" value={details?.opd.appointment.doctor.name} />
            </> : <>
              <CardBox borderType="dashed" title='IPD ID' value={details?.ipdId} />
              <CardBox borderType="dashed" title="Patient" value={details?.ipd.patient.name} />
              <CardBox borderType="dashed" title="Doctor" value={details?.ipd.doctor.name} />
            </>}
          </div>
        </section>


        {/* Grid 2 (flex here will not be allow table to scroll) */}

        <section className="grid space-y-8 px-2.5 mt-5 mb-16">
          {/* header note */}
          <div className="space-y-2">
            <h1 className="text-xl font-semibold">Header Note</h1>
            {details?.header_note ?
              (<p className="text-gray-400">{details?.header_note}</p>)
              :
              (<p className="text-gray-400">Header is not provided</p>)
            }
          </div>

          {/* Findings Table */}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Finding Name</TableHead>
                <TableHead>Finding Category</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {details?.prescFindings.map((prescription, i) => (
                <TableRow key={i}>
                  <TableCell>{prescription.findingName.name}</TableCell>
                  <TableCell>{prescription.findingCategory.name}</TableCell>
                  <TableCell>{prescription.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>


          {/* Medicines Table */}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medicine Name</TableHead>
                <TableHead>Medicine Category</TableHead>
                <TableHead>Dose Interval</TableHead>
                <TableHead>Dose Duration</TableHead>
                <TableHead>Instruction</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {details?.prescMedicines.map((medicine, i) => (
                <TableRow key={i}>
                  <TableCell>{medicine.medicine.name}</TableCell>
                  <TableCell>{medicine.category.name}</TableCell>
                  <TableCell>{medicine.doseInterval.interval}</TableCell>
                  <TableCell>{medicine.doseDuration.duration}</TableCell>
                  <TableCell>{medicine.instruction}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </section>
      </ScrollArea>
    </Dialog >
  )
}

export default PrescriptionDetailsModel