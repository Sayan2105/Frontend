import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface Props {
    url: string
    name?: string | ReactNode
    gender: string
    imageClass?: string
    textClass?: string
    width?: `${string}`
}

const UserImage = ({ url, name, gender, imageClass, textClass, width }: Props) => {
    return (
        <div className={cn("w-40", width)}>
            <div className="flex items-center gap-2">
                <img
                    src={url ? `${import.meta.env.VITE_APP_API_URL}/images/${url}` : gender === 'male' ? '/user.png' : '/female_user.png'}
                    alt="user"
                    className={cn("object-cover w-9 h-9 rounded-full border-2 dark:border-border", imageClass)}
                />
                <p className={textClass}>{name}</p>
            </div>
        </div>
    )
}

export default UserImage