export const genUrl = (file: File) => {
    const url = new Blob([file])
    return URL.createObjectURL(url)
}