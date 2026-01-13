import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { useState, type ReactNode } from "react";

export const TopBar = ({ children, className }: { children: ReactNode, className?: string }) => {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest: number) => {
        const previous = scrollY.getPrevious() as unknown as number;
        if (latest > previous && latest > 100) {
            setHidden(true);
        } else {
            setHidden(false)
        };
    })
    
    return (
        <motion.header
            variants={{
                visible: { opacity: 1 },
                hidden: { opacity: 0 }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className={`z-10 fixed top-0 inset-x-0 ${className}`}
        >
           {children}
        </motion.header>
    )
}
