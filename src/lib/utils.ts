import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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




