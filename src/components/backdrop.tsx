import { motion } from 'motion/react'
import { HTMLAttributes, ReactNode, useEffect } from 'react'

interface BackdropProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}


const Backdrop = ({ children, ...Props }: BackdropProps) => {

    const body = document.body.style

    useEffect(() => {
        body.overflow = 'hidden'
        return () => {
            body.overflow = 'auto'
        }
    }, [])

    return (
        <div {...Props}>
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 0 }}
                className='fixed inset-0 flex items-center justify-center h-screen w-screen transition-all z-[120] bg-black/80'
            >
                {children}
            </motion.section>
        </div>
    )
}

export default Backdrop