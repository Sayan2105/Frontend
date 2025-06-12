import { BadgeAlert, Loader } from "lucide-react"
import { Button } from "./ui/button"
import { HTMLAttributes } from "react";
import Backdrop from "./backdrop";
import { AnimatePresence, motion } from "motion/react";


interface alertModelProps extends HTMLAttributes<HTMLDivElement> {
  cancel: () => void;
  continue: () => void;
  isPending?: boolean
}


const AlertModel = ({ isPending, cancel, continue: continueAction }: alertModelProps) => {


  return (
    <AnimatePresence>
      <Backdrop onClick={cancel}>
        <motion.div
          initial={{ scale: 0.50, y: -400 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0 }}
          onClick={(e)=>e.stopPropagation()}
        >
          <div className="flex flex-col gap-2 rounded-md ring-1 p-2.5 ring-gray-200 shadow-lg w-[300px] bg-white dark:bg-background dark:ring-border">
            <div className="flex justify-center mt-3">
              <div className="h-16 w-16 bg-red-500 flex items-center rounded-full">
                <BadgeAlert className="h-12 w-12 text-white mx-auto" />
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-neutral-300">Alert</h1>
            </div>

            <div className="text-center">
              <p className="text-gray-600 dark:text-white">Do you really want to perform the certain action?</p>
            </div>


            <div className="mt-2 space-y-2">
              <Button type="button" variant={'destructive'} size={'sm'} className="w-full" onClick={continueAction} >{isPending ? <Loader className="animate-spin" /> : 'Continue'}</Button>
              <Button type="button" variant={'outline'} size={'sm'} className="w-full" onClick={cancel}>Cancel</Button>
            </div>
          </div>
        </motion.div>
      </Backdrop>
    </AnimatePresence>
  )
}

export default AlertModel