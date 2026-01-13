import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import type { Project } from "./FolioV2";

interface FloatingImageProps {
    projects: Project[];
    activeProject: number | null;
    selectedProject: Project | null;
    setSelectedProject: (project: null) => void
}

export const FloatingImage = ({ projects, activeProject, selectedProject, setSelectedProject }: FloatingImageProps) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const lastImg = useRef(projects[0].img);

    useEffect(() => {
        const handleMouseMove = (e: any) => {
            if (!selectedProject) {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [selectedProject, mouseX, mouseY]);

    useEffect(() => {
        if (selectedProject) {
            // Force to center
            mouseX.set(window.innerWidth / 2);
            mouseY.set(window.innerHeight / 2);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedProject, mouseX, mouseY]);

    useEffect(() => {
        if (activeProject)
            lastImg.current = projects[activeProject].img;
    }, [activeProject])

    const handleClose = (e: any) => {
        e.stopPropagation();
        setSelectedProject(null);
    };

    const isHeroVisible = activeProject !== null || selectedProject !== null;

    return (
        <motion.div
            className="fixed top-0 left-0 overflow-hidden pointer-events-none shadow-2xl"
            style={{
                x: springX,
                y: springY,
                translateX: "-50%",
                translateY: "-50%",
                // FIXED Z-INDEX: 
                // 10 (Behind Text) when hovering. 
                // 50 (Front) when selected.
                zIndex: selectedProject ? 50 : 10
            }}
            initial={{ opacity: 0 }}
            animate={{
                // FIXED OPACITY: Hide the whole box if nothing is active to prevent "Black Box"
                opacity: isHeroVisible ? 1 : 0,
                width: selectedProject ? "90vw" : "400px",
                height: selectedProject ? "80vh" : "225px",
                // borderRadius: selectedProject ? "8px" : "4px"
            }}
            transition={{
                type: "spring",
                stiffness: 120,
                damping: 25,
                mass: 0.5
            }}
        >
            <div className="relative w-full h-full bg-[#111]">
                {/* THE IMAGE */}
                <motion.img
                    src={activeProject !== null ? projects[activeProject].img : (selectedProject ? selectedProject.img : undefined)}
                    alt="Project Preview"
                    className="w-full h-full object-cover block"
                    animate={{
                        scale: selectedProject ? 1 : (activeProject !== null ? 1 : 0.8)
                    }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                />

                {/* --- CINEMA OVERLAY (Only visible when selected) --- */}
                <motion.div
                    className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-16 pointer-events-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: selectedProject ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: selectedProject ? 0.2 : 0 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

                    {selectedProject && (
                        <div className="relative z-20 max-w-4xl">
                            <button
                                onClick={handleClose}
                                className="absolute top-[-50vh] right-0 md:top-auto md:bottom-full md:right-0 md:mb-8 text-xs font-bold uppercase tracking-widest text-white/70 border border-white/20 px-6 py-3 rounded-full backdrop-blur-md transition-all hover:bg-white hover:text-black"
                            >
                                Close Project
                            </button>

                            <motion.div
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                            >
                                <div className="flex items-center gap-4 mb-4 text-white/60 font-mono text-sm">
                                    <span>0{selectedProject.id}</span>
                                    <span className="w-12 h-[1px] bg-white/40"></span>
                                    <span>{selectedProject.year}</span>
                                </div>

                                <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-8 text-white leading-[0.9]">
                                    {selectedProject.title}
                                </h1>

                                <div className="grid md:grid-cols-[2fr_1fr] gap-12">
                                    <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed">
                                        {selectedProject.description}
                                    </p>

                                    <div className="flex flex-col gap-4 text-xs font-bold tracking-widest uppercase text-white/60 border-l border-white/20 pl-8">
                                        <div>
                                            <span className="block opacity-40 mb-1">Client</span>
                                            <span className="text-white">{selectedProject.client}</span>
                                        </div>
                                        <div>
                                            <span className="block opacity-40 mb-1">Role</span>
                                            <span className="text-white">{selectedProject.category}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    )
}