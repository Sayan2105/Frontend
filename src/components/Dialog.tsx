import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { AnimatePresence, motion } from 'motion/react'
import React, { HTMLAttributes } from "react"
import Backdrop from "./backdrop"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

interface DialogProps extends HTMLAttributes<HTMLDivElement> {
    pageTitle: string
    className?: string
    children: React.ReactNode
}

const Dialog = ({ children, pageTitle, className, ...props }: DialogProps) => {
    return (
        <AnimatePresence>
            <Backdrop {...props}>
                <motion.div
                    className="flex-1"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                >
                    {/* Prevents modal from closing when clicking inside */}
                    <div
                        className={cn('px-3 mx-auto max-w-screen-lg', className)}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={cn(
                            'rounded-2xl pb-2 overflow-hidden',
                            'bg-white dark:bg-gray-900',
                            'border border-gray-200 dark:border-gray-700',
                            'shadow-2xl shadow-black/5 dark:shadow-black/20'
                        )}>
                            {/* Enhanced header */}
                            <div className='relative overflow-hidden bg-gradient-to-r from-blue-500/10 to-amber-400/10 dark:from-blue-600/20  dark:to-amber-500/20'>
                                {/* Subtle background overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent" />

                                <div className='relative flex justify-between items-center p-4 border-b border-gray-200/60 dark:border-gray-700/60'>
                                    {/* Decorative element */}
                                    <div className="absolute -bottom-3 left-4 h-8 w-8 bg-gradient-to-br from-violet-400/20 to-rose-400/20 dark:from-violet-600/30 dark:to-rose-600/30 rounded-full" />

                                    <h1 className='relative z-10 text-sm sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 py-1 rounded-xl'>
                                        {pageTitle}
                                    </h1>

                                    <div className='relative z-10'>
                                        <div {...props} className="cursor-pointer group">
                                            <TooltipProvider delayDuration={200}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div className="p-2.5 bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-600/15 dark:to-rose-700/20 rounded-xl border border-rose-200/40 dark:border-rose-600/20 hover:shadow-sm hover:shadow-rose-500/10 dark:hover:shadow-rose-600/20 transition-all duration-200">
                                                            <X className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="z-[200]">
                                                        Close dialog
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content area */}
                            <div className="pt-3 ">
                                {children}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Backdrop>
        </AnimatePresence>
    )
}

export default Dialog