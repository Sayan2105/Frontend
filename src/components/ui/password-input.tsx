import { Eye, EyeClosed } from "lucide-react"
import React from "react"
import { useState } from "react"



const PasswordField = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ ...props }, ref) => {

    const [isView, setView] = useState(false)

    return (
        <div className="flex h-9 w-full rounded-md fill-white border border-input px-3 py-1 focus-within:ring-1 focus-within:ring-ring text-base shadow-sm transition-colors  md:text-sm">
            <input
                {...props}
                ref={ref}
                type={isView ? 'text' : 'password'}
                className="w-full placeholder:text-muted-foreground bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />

            {!isView ?
                (
                    <Eye
                        onClick={() => setView(true)}
                        className="text-gray-700 w-5 dark:text-gray-400 cursor-pointer active:scale-95 transition-all"
                    />
                )
                :
                (
                    <EyeClosed
                        onClick={() => setView(false)}
                        className="text-gray-700 w-5 dark:text-gray-400 cursor-pointer active:scale-95 transition-all"
                    />
                )
            }
        </div>
    )
})

export default PasswordField