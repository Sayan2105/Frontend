import { Anchor } from 'lucide-react'
import { motion } from 'motion/react'


const Xmarquee = () => {
  return (
    <div className='relative max-w-4xl py-8 overflow-hidden'>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="flex space-x-10">
        {[...Array(25)].map((_, i) => (
          <span key={i}><Anchor /></span>
        ))}
      </motion.div>
      <div className='absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-dark' />
      <div className='absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-dark' />
    </div>
  )
}

export default Xmarquee