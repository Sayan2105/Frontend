import { CloudUpload, X } from 'lucide-react'
import { ReactNode, useState, useId, useEffect } from 'react'

interface Props {
    onChange: (e: File) => void
    title?: string | ReactNode
    message?: string
    required?: boolean
}

const ImageInput = ({ onChange, title, message, required }: Props) => {
    const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);  // dont assign null here
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const uniqueId = useId(); // This generates a unique ID

    const handleImageChange = (image: File) => {
        const imageUrl = URL.createObjectURL(image); // No need for new Blob here
        setPreviewImage(imageUrl);
        setSelectedImage(image)
    }

    const handleCancel = () => {
        setSelectedImage(undefined)
        setPreviewImage(null)
    }

    useEffect(() => {
        onChange(selectedImage!)
    }, [selectedImage])

    return (
        <div className='flex gap-3 items-center ring-1 ring-border p-2.5 rounded-lg'>
            {/* Image preview */}
            {previewImage ? (
                <div className='relative h-[40px] w-[40px] flex items-center'>
                    <img
                        src={previewImage}
                        alt="profile"
                        className='object-cover rounded-md'
                    />
                </div>
            ) :
                <div className='bg-zinc-100 dark:bg-zinc-900 p-3 rounded-md'>
                    <CloudUpload className='h-6 w-6 dark:text-gray-300 text-gray-500' />
                </div>
            }

            {/* Title and message */}
            <div className='flex-1'>
                <div>
                    <p className='text-sm font-medium'>{title} {required && <span className='text-red-500'>*</span>}</p>
                    <p className='text-xs text-gray-500'>{message}</p>
                </div>
            </div>

            {/* Button */}
            <div>
                <input
                    id={`image-${uniqueId}`} // Unique ID for each input
                    type='file'
                    accept='image/*'
                    onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                            handleImageChange(file)
                        }
                    }}
                    className='hidden'
                />

                {selectedImage ?
                    <div className='p-2 rounded-full cursor-pointer' onClick={handleCancel}>
                        <X className='h-5 w-5' />
                    </div>
                    :
                    <label
                        htmlFor={`image-${uniqueId}`} // Matches the unique input ID
                        className='relative cursor-pointer py-1 px-2 bg-gradient-to-r from-violet-500 to-pink-600 rounded-md text-white'>
                        Browse
                    </label>
                }
            </div>
        </div>
    )
}

export default ImageInput