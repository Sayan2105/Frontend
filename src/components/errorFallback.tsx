import { Card } from "./ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

type Props = {
    error: any
    resetError?: () => void
    onGoHome?: () => void
}

const ErrorFallback = ({ error, resetError, onGoHome }: Props) => {
    return (
        <Card className="mb-2 h-full w-full flex flex-col gap-6 justify-center items-center p-8 bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 border-red-200 dark:border-gray-700 shadow-lg">
            {/* Animated Error Icon */}
            <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="relative bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
                    <AlertTriangle className="w-12 h-12 text-red-500" />
                </div>
            </div>

            {/* Error Content */}
            <div className="text-center space-y-3 max-w-md">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                    Oops! Something went wrong
                </h1>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-red-200 dark:border-gray-600 shadow-sm">
                    <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">
                        {error.name}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {error?.response?.data?.message || error.message}
                    </p>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Don't worry, these things happen. Try refreshing the page or go back to safety.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
                {resetError && (
                    <button
                        onClick={resetError}
                        className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </button>
                )}

                {onGoHome && (
                    <button
                        onClick={onGoHome}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <Home className="w-4 h-4" />
                        Go Home
                    </button>
                )}
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-red-300 rounded-full animate-ping"></div>
            <div className="absolute bottom-4 left-4 w-1 h-1 bg-orange-400 rounded-full animate-pulse"></div>
        </Card>
    )
}

export default ErrorFallback