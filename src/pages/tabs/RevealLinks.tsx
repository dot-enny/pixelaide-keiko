import { motion } from "framer-motion"

export const RevealLinks = () => {
    return (
        <main className="h-screen grid place-content-center bg-pink-300 text-black">
            <FlipLink href="https://x.com/pixelaide_">Twitter</FlipLink>
            <FlipLink href="https://linkedin.com/in/pixelaide">Linkedin</FlipLink>
            <FlipLink href="https://github.com/dot-enny">Github</FlipLink>
            <FlipLink href="mailto:olaniyaneniola007@gmail.com">Email</FlipLink>
        </main>
    )
}

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href }: { children: string, href: string }) => {
    return (
        <motion.a
            initial="initial"
            whileHover="hover"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative bg-whit block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl"
            style={{ lineHeight: 0.85 }}
        >
            <div>
                {children.split('').map((l, i) => (
                    <motion.span
                        key={i}
                        className="inline-block"
                        variants={{
                            initial: { y: 0 },
                            hover: { y: '-100%' },
                        }}
                        transition={{ 
                            duration: DURATION,
                            delay: STAGGER * i,
                            ease: 'easeInOut',
                        }}
                    >
                        {l}
                    </motion.span>
                ))}
            </div>
            <div className="absolute inset-0">
                {children.split('').map((l, i) => (
                    <motion.span
                        key={i}
                        className="inline-block"
                        variants={{
                            initial: { y: '100%' },
                            hover: { y: 0 },
                        }}
                        transition={{ 
                            duration: DURATION,
                            delay: STAGGER * i,
                            ease: 'easeInOut',
                        }}
                    >
                        {l}
                    </motion.span>
                ))}
            </div>
        </motion.a>
    )
}