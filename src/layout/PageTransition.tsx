import { motion } from "motion/react"

const PageTransition = ({children}:any) => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{duration: 0.75, ease: 'easeOut'}}
            style={{width: '100%'}}
        >
            {children}
        </motion.div>
    )
}

export default PageTransition
