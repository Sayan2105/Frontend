import { cn } from "@/lib/utils"
import { ReactNode } from "react"

type Props = {
    icon: ReactNode
    iconBg?: `${string}`
    title?: string
    value?: string | number
}

const IconMenu = ({ icon, iconBg, title, value }: Props) => {
    return (
        <div className="flex gap-3 items-center">
            <div className={cn('p-2 rounded-full', iconBg)}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-muted-foreground font-medium">{title}</p>
                <p className="">{value}</p>
            </div>
        </div>
    )
}

export default IconMenu