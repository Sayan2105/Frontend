import { address, hospital_contact, hospital_name, hospital_website } from "@/globalData"
import { currencyFormat } from "@/lib/utils"

interface headerProps {
    id: string | number
    title: string,
    date: string,
}

export const PdfHeader = ({ id, title, date }: headerProps) => {
    return (
        <div className="flex justify-between gap-5 mb-4 items-center border-b-2 border-dashed dark:border-gray-500 pb-2">
            <div >
                <div className="flex items-center">
                    <img src="/logo.png" alt="Logo" className="w-20 h-20 object-cover" />
                    <div>
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white">{hospital_name}</h1>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{hospital_website}</p>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h1>
                <p className="text-xs text-gray-600 dark:text-gray-300">#{id}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">Date: {date}</p>
            </div>
        </div>
    )
}



export const From = ({ title }: { title?: string }) => {
    return (
        <div>
            <h2 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">{title || 'From:'}</h2>
            <p className="whitespace-pre-line text-gray-600 dark:text-gray-300">{hospital_name}</p>
            <p className="whitespace-pre-line text-xs text-gray-600 dark:text-gray-300">{address.street}</p>
            <p className="whitespace-pre-line text-xs text-gray-600 dark:text-gray-300">{address.city}</p>
            <p className="whitespace-pre-line text-xs text-gray-600 dark:text-gray-300">{hospital_contact.email}</p>
            <p className="whitespace-pre-line text-xs text-gray-600 dark:text-gray-300">{hospital_contact.phone}</p>
        </div>
    )
}


export const Supplier = ({ name }: { name: string }) => {
    return (
        <div>
            <h2 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">From:</h2>
            <p className="whitespace-pre-line text-gray-600 dark:text-gray-300">{name}</p>
        </div>
    )
}


interface ToProps {
    id: number,
    name: string,
    address: string,
    phone: string,
    email: string,
}


export const To = ({ id, name, address, phone, email }: ToProps) => {
    return (
        <div>
            <h2 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">To:</h2>
            <p className="whitespace-pre-line text-gray-600 dark:text-gray-300">{name} ({id})</p>
            <p className="whitespace-pre-line text-xs text-gray-600 dark:text-gray-300">{address}</p>
            <p className="text-gray-600 text-xs dark:text-gray-300">{email}</p>
            <p className="text-gray-600 text-xs dark:text-gray-300">{phone}</p>
        </div>
    )
}



interface TotalsProps {
    subtotal: number,
    discount: number,
    discount_amount?: number,
    tax_amount?: number,
    tax: number,
    total: number,
}



export const Totals = ({ subtotal, discount, discount_amount, tax, tax_amount, total }: TotalsProps) => {
    return (
        <div className="ml-auto w-[230px]">
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
                    <span className="text-gray-900 dark:text-gray-400">{currencyFormat(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Tax ({tax.toFixed(2)}%):</span>
                    <span className="text-gray-900 dark:text-gray-400">{currencyFormat(tax_amount || (tax / 100) * subtotal)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Discount ({discount.toFixed(2)}%):</span>
                    <span className="text-gray-900 dark:text-gray-400">{currencyFormat(discount_amount || (discount / 100) * subtotal)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold text-gray-800 dark:text-white">Total:</span>
                    <span className="font-semibold text-gray-800 dark:text-white">{currencyFormat(total)}</span>
                </div>
            </div>
        </div>
    )
}




interface footerProps {
    paymentInfo: string,
    notes?: string,
}

export const PdfFooter = ({ paymentInfo, notes }: footerProps) => {
    return (
        <div className="grid grid-cols-2 gap-8">
            <div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Payment Information</h3>
                <p className="whitespace-pre-line text-gray-600 dark:text-gray-400 text-sm">{paymentInfo}</p>
            </div>
            <div>
                <h3 className="text-sm font-semibold dark:text-white text-gray-800 mb-2">Notes</h3>
                <p className="whitespace-pre-line text-gray-600 dark:text-gray-400 text-sm">{`Thanks for your business. \n ${notes}`}</p>
            </div>
        </div>
    )
}