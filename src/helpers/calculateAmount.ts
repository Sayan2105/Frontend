export const calculateAmount = (total: number, Tax: number, Discount: number) => {

    const discount = (Discount / 100) * total

    const DiscountedAmount = total - discount

    const taxAmount = (Tax / 100) * DiscountedAmount

    const net_amount = DiscountedAmount + taxAmount;

    return { total, net_amount, taxAmount, dicountAmount: discount }

}