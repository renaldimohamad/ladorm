import { motion } from "framer-motion";

const LoaderSpinner = () => {
  return (
    <div className="flex items-center justify-center gap-1.5 h-5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 bg-current rounded-full"
          animate={{
            y: [0, -6, 0],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default LoaderSpinner;
