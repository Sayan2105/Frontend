import CardBox from "@/components/card-box"
import Dialog from "@/components/Dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { currencySymbol } from "@/helpers/currencySymbol"
import { currencyFormat } from "@/lib/utils"
import { pharmacyBillDetail } from "@/types/pharmacy/pharmacy"
import { CalendarDays } from "lucide-react"
import { HTMLAttributes } from "react"

interface PharmacyDetailsProps extends HTMLAttributes<HTMLDivElement> {
  details: pharmacyBillDetail
}

const PharmacyBillDetailsModal = ({ details, ...props }: PharmacyDetailsProps) => {

  return (
    <Dialog pageTitle="Bill Details" {...props}>
      <ScrollArea className={'relative h-[60vh] w-full'}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 px-2.5">

          <div className="flex items-center gap-2 sm:col-span-2 mb-4">
            <div className='p-3 bg-yellow-500 rounded-full'>
              <CalendarDays className='w-10 h-10 text-white' />
            </div>
            <div className=''>
              <p className='font-semibold text-lg text-gray-900 dark:text-gray-100'>{details?.date}</p>
              <p className='text-sm text-gray-400'>Invoice Date</p>
            </div>
          </div>

          <div className="sm:col-span-2 grid grid-cols-2 gap-2">
            <CardBox borderType='dashed' title="Invoice No" value={details?.id} />
            <CardBox borderType='dashed' title="Patient Name" value={details?.patient.name} />
          </div>

          <CardBox borderType='solid' title="OPD ID" value={details?.opdId} />
          <CardBox borderType='solid' title="Doctor" value={details?.doctor} />
          <CardBox borderType='solid' title="Discount %" value={details?.discount} />
          <CardBox borderType='solid' title="Net Amount" value={currencyFormat(Number(details?.net_amount))} />
          <CardBox borderType='solid' title="Note" value={details?.note} />

        </div>

        {/* second grid */}

        <div className="grid pb-10 pt-5 px-2.5 font-medium">
          <h1 className="text-lg text-gray-800 dark:text-gray-100">Medicines</h1>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medicine Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Qty.</TableHead>
                <TableHead>Batch No.</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Sale Price {currencySymbol()}</TableHead>
                <TableHead>Tax %</TableHead>
                <TableHead>Amount {currencySymbol()}</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {details?.items?.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.medicine.name}</TableCell>
                  <TableCell>{item.category.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.batch.purchaseMedicine.batch_no}</TableCell>
                  <TableCell>{item.medicine.unit.name}</TableCell>
                  <TableCell>{item.salePrice}</TableCell>
                  <TableCell className="text-nowrap">{item.tax} %</TableCell>
                  <TableCell>{currencyFormat(item.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </div>
      </ScrollArea>
    </Dialog>
  )
}

export default PharmacyBillDetailsModal