import Backdrop from '@/components/backdrop';
import { From, PdfFooter, PdfHeader, To, Totals } from '@/components/pdf';
import { Separator } from '@/components/ui/separator';
import { currencySymbol } from '@/helpers/currencySymbol';
import { currencyFormat } from '@/lib/utils';
import { AssignedAmbulanceInfo } from '@/types/ambulance/ambulance';
import html2pdf from "html2pdf.js";
import { Ambulance } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface Props {
  ambulanceInfo: AssignedAmbulanceInfo
  afterGenerate: () => void
}

export default function GenerateAmbulanceInvoice({ ambulanceInfo, afterGenerate }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  const generate = () => {
    const options = {
      filename: `invoice-${ambulanceInfo.id}.pdf`,
      image: { type: "png", quality: 1 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: "in", format: "A4", orientation: "portrait" }
    };
    html2pdf()
      .from(contentRef.current!)
      .set(options)
      .outputPdf('blob')
      .then((pdfBlob: any) => {
        const url = URL.createObjectURL(pdfBlob);
        window.open(url);
        afterGenerate()
      });
  }



  const headers = [
    'Vehicle No.',
    'Model',
    'Charge Name',
    `STD/PKM Charge (${currencySymbol()})`,
    'KM',
    `Total (${currencySymbol()})`,
  ];


  useEffect(() => {
    generate()
  }, [])

  return (
    <Backdrop onClick={afterGenerate}>
      <div className="scale-50 lg:scale-90 max-w-5xl mx-auto bg-white ">
        <div ref={contentRef} className="p-4 lg:4 space-y-8">
          <PdfHeader id={ambulanceInfo.id!} title="Ambulance Invoice" date={new Date().toLocaleDateString()} />

          {/* Company & Client */}
          <div className="grid grid-cols-2 gap-8">
            <From />
            <To
              id={ambulanceInfo?.patientId!}
              name={ambulanceInfo?.patient?.name!}
              address={ambulanceInfo?.patient?.address!}
              phone={ambulanceInfo?.patient?.phone!}
              email={ambulanceInfo?.patient?.email!}
            />
          </div>

          {/* Service Details */}
          <div className="flex flex-col border border-gray-200 rounded-lg">
            <div className="py-3 px-6 flex gap-2 items-center bg-gray-50 border-b border-gray-200">
              <Ambulance className="w-5 h-5 text-red-500" />
              <h3 className="flex text-lg font-semibold text-gray-900 items-center gap-2">
                Ambulance Service Details
              </h3>
            </div>
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((item, i) => (
                    <th key={i} className="py-4 px-6 text-left font-semibold text-gray-700 uppercase">{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className=" hover:bg-gray-50">
                  <td className="p-6 text-gray-700"><span className='text-red-500'>● </span> {ambulanceInfo?.ambulance?.vehicleNumber}</td>
                  <td className="p-6 text-gray-700">{ambulanceInfo?.ambulance?.model}</td>
                  <td className="p-6 font-mono text-gray-900 min-w-[100px]">
                    <span className="px-2 inline-block text-red-500 text-sm font-medium bg-red-100 rounded">
                      {ambulanceInfo?.chargeName.name}
                    </span>
                  </td>
                  <td className="p-6 text-gray-700 font-mono">{currencyFormat(ambulanceInfo?.standard_charge)}</td>
                  <td className="p-6 font-mono text-gray-900 min-w-[100px]">
                    <span className="px-2 inline-block font-mono text-yellow-500 text-sm font-medium bg-yellow-100 rounded">
                      {ambulanceInfo?.kilometers} km
                    </span>
                  </td>
                  <td className="p-6 text-gray-700 font-mono text-lg font-semibold">  {currencyFormat(ambulanceInfo?.total!)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <Totals
            subtotal={ambulanceInfo?.total!}
            discount={ambulanceInfo?.discount!}
            discount_amount={ambulanceInfo?.discount_amount!}
            tax={ambulanceInfo?.tax!}
            tax_amount={ambulanceInfo?.tax_amount!}
            total={ambulanceInfo?.net_amount!}
          />

          <Separator className='bg-gray-200' />

          {/* Footer */}
          <div className=" pt-6">
            <PdfFooter
              paymentInfo={`${ambulanceInfo?.payment_mode} \n ${ambulanceInfo?.payment_info}`}
              notes="Thank you for choosing our ambulance service!"
            />
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-center">
            <p className="text-red-800 text-sm font-medium">
              🚨 For Emergency Services: Call 108 | 24/7 Available
            </p>
          </div>
        </div>
      </div>
    </Backdrop>
  );
}
