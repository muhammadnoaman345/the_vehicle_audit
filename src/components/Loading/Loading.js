import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-16 px-6 xl:mt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }} // Fade-in effect
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="w-12 h-12 text-primary" />
      </motion.div>
    </motion.div>
  );
}
