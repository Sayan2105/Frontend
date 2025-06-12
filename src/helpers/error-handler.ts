export const errorHandler = <T>(error: T) => {
    console.log(error)
    if (error instanceof Error) {
        return error.message as string
    } else {
        return "An unexpected error occurred"
    }
}