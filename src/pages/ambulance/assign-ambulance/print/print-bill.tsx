import { From, PdfFooter, PdfHeader, To, Totals } from '@/components/pdf';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { currencySymbol } from '@/helpers/currencySymbol';
import { currencyFormat } from '@/lib/utils';
import AmbulanceApi from '@/services/ambulance-api';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';



export default function PrintAmbulanceInvoice() {
  const { invoiceId } = useParams()
  const contentRef = useRef<HTMLDivElement>(null);


  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `Ambulance_Invoice_${invoiceId}`,
  });


  const ambulanceInfo = useQuery({
    queryKey: ['ambulanceInfo', invoiceId],
    queryFn: () => AmbulanceApi.getAssignedAmbulanceInfo(invoiceId!),
  })


  const headers = [
    'Vehicle No.',
    'Model',
    'Charge Name',
    `STD/PKM Charge (${currencySymbol()})`,
    'KM',
    `Total (${currencySymbol()})`,
  ];


  return (
    <div className="relative bg-gray-100 dark:bg-gray-900 py-10">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">

        <div ref={contentRef} className="p-4 lg:4 space-y-8">

          <PdfHeader id={invoiceId!} title="Ambulance Invoice" date={new Date().toLocaleDateString()} />

          {/* Company & Client */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <From />
            <To
              id={ambulanceInfo?.data?.patientId!}
              name={ambulanceInfo?.data?.patient?.name!}
              address={ambulanceInfo?.data?.patient?.address!}
              phone={ambulanceInfo?.data?.patient?.phone!}
              email={ambulanceInfo?.data?.patient?.email!}
            />
          </div>

          {/* Service Details */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 1a1 1 0 00-1 1v4a1 1 0 002 0v-1.586l1.293 1.293a1 1 0 001.414-1.414L12.414 10l2.293-2.293a1 1 0 00-1.414-1.414L12 7.586V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Ambulance Service Details
              </h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-700">
                  {headers.map((item, i) => (
                    <TableHead key={i} className="font-semibold text-gray-700 dark:text-gray-300 py-4 px-6 text-sm uppercase">
                      {item}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <TableCell className="py-6 px-6 font-medium text-gray-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      {ambulanceInfo?.data?.ambulance?.vehicleNumber}
                    </div>
                  </TableCell>
                  <TableCell className="py-6 px-6 text-gray-700 dark:text-gray-300">{ambulanceInfo?.data?.ambulance?.model}</TableCell>
                  <TableCell className="py-6 px-6 text-gray-700 dark:text-gray-300">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
                      {ambulanceInfo?.data?.chargeName.name}
                    </span>
                  </TableCell>
                  <TableCell className="py-6 px-6 font-mono text-gray-900 dark:text-white">{currencyFormat(ambulanceInfo?.data?.standard_charge!)}</TableCell>
                  <TableCell className="py-6 px-6 font-mono text-gray-900 dark:text-white">
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded text-sm font-medium">
                      {ambulanceInfo?.data?.kilometers} km
                    </span>
                  </TableCell>
                  <TableCell className="py-6 px-6 font-mono font-semibold text-lg text-gray-900 dark:text-white">
                    {currencyFormat(ambulanceInfo?.data?.total!)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Totals */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6 rounded-lg">
            <Totals
              subtotal={ambulanceInfo?.data?.total!}
              discount={ambulanceInfo?.data?.discount!}
              discount_amount={ambulanceInfo?.data?.discount_amount!}
              tax={ambulanceInfo?.data?.tax!}
              tax_amount={ambulanceInfo?.data?.tax_amount!}
              total={ambulanceInfo?.data?.net_amount!}
            />
          </div>


          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
            <PdfFooter
              paymentInfo={`${ambulanceInfo?.data?.payment_mode} \n ${ambulanceInfo?.data?.payment_info}`}
              notes="Thank you for choosing our ambulance service!"
            />
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg text-center">
            <p className="text-red-800 dark:text-red-300 text-sm font-medium">
              🚨 For Emergency Services: Call 108 | 24/7 Available
            </p>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <div className="fixed bottom-4 right-4">
        <button onClick={() => handlePrint()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Print
        </button>
      </div>
    </div >
  );
}
