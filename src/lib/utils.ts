import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createTransform } from 'redux-persist';
import CryptoJS from 'crypto-js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const currencyFormat = (price: number) => {
  const currency = Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  })

  return currency.format(price)
}




export const encryptTransform = createTransform(
  (inboundState: any) => {
    const stringified = JSON.stringify(inboundState);
    const encrypted = CryptoJS.AES.encrypt(stringified, import.meta.env.VITE_APP_PERSIST_SECRET).toString();
    return encrypted;
  },
  (outboundState: any) => {
    const bytes = CryptoJS.AES.decrypt(outboundState, import.meta.env.VITE_APP_PERSIST_SECRET);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  }
);
