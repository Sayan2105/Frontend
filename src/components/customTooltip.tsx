import { HTMLAttributes, ReactNode } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

interface CustomTooltipProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    message: string
    delay?: 300 | 400 | 500 | 700 | 900 | 1100
}

const CustomTooltip = ({ children, message, delay }: CustomTooltipProps) => {
    return (
        <TooltipProvider delayDuration={delay || 200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent className="z-[1000]">
                    {message}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default CustomTooltip