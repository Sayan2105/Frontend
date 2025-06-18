import { Loader } from "lucide-react"
import { Card } from "./ui/card"

const InlineLoader = () => {
    return (
        <Card className="h-full mb-2 flex flex-col space-y-4 justify-center items-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 border-green-200 dark:border-gray-700 p-8 min-h-[200px]">
            {/* Animated loader with glow effect */}
            <div className="relative">
                <div className="relative bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg">
                    <Loader className="animate-spin text-green-500 h-8 w-8" />
                </div>
            </div>

            {/* Loading text with dots animation */}
            <div className="text-center space-y-2">
                <p className="text-gray-700 dark:text-gray-300 text-base font-medium">
                    Loading<span className="inline-block animate-pulse">...</span>
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                    Please wait a moment
                </p>
            </div>

            {/* Progress dots */}
            <div className="flex space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
        </Card>
    )
}

export default InlineLoader