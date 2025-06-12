import { useState } from "react"

const TextMore = ({ text }: { text: string }) => {
    const [maxLength, setMaxLength] = useState(30)
    return (
        <>
            {text.length > maxLength ?
                <span>
                    {text.slice(0, maxLength)}
                    <span
                        className="hover:text-blue-400 text-blue-500 cursor-pointer transition-all duration-100"
                        onClick={() => setMaxLength(text.length)}> ...more</span>
                </span>
                :
                <span className="w-64 inline-block">
                    {text}
                    <span
                        className="text-zinc-400 cursor-pointer transition-all"
                        onClick={() => setMaxLength(30)}> ...show less</span>
                </span>
            }
        </>
    )
}

export default TextMore