import { ReactNode } from "react"

type Props = {
    title: string,
    icon: ReactNode,
}

const TextLabel = ({ title, icon }: Props) => {
    return (
        <div className="col-span-full mb-2">
            <div className="group relative w-56 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-slate-700 dark:to-slate-600 py-1 px-2 rounded-r-full shadow-md dark:shadow-black/60 hover:shadow-lg transition-all duration-300 cursor-pointer border border-blue-400/20 dark:border-slate-500/30">

                {/* Subtle overlay */}
                <div className="absolute inset-0 rounded-r-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="relative mt-0.5 flex items-center">
                    {/* Simple icon */}
                    <div className="flex-shrink-0 mr-2 p-1 text-white bg-white/20 rounded-full">
                        {icon}
                    </div>

                    {/* Clean text */}
                    <p className="text-white dark:text-slate-100 text-sm font-medium">
                        {title}
                    </p>
                </div>

                {/* Top shine */}
                <div className="absolute top-0.5 left-2 right-8 h-px bg-white/30"></div>
            </div>
        </div>
    )
}

export default TextLabel