import { motion } from "framer-motion";
import type { Project } from "./FolioV2"

interface ProjectListProps { 
    projects: Project[], 
    activeProject: number | null, 
    setActiveProject: (project: number | null) => void, 
    selectedProject: Project | null, 
    setSelectedProject: (project: Project) => void 
}

export const ProjectList = ({ projects, activeProject, setActiveProject, selectedProject, setSelectedProject }: ProjectListProps) => {
    return (
        <motion.main
            className="relative z-20 w-full min-h-screen flex flex-col justify-center px-4 md:px-12 py-20 origin-center"
            animate={{
                scale: selectedProject ? 0.92 : 1,
                opacity: selectedProject ? 0.1 : 1,
                filter: selectedProject ? "blur(10px)" : "blur(0px)"
            }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
            <div className="max-w-7xl mx-auto w-full mix-blend-difference text-white">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        onMouseEnter={() => {
                            if (!selectedProject) setActiveProject(index);
                        }}
                        onMouseLeave={() => {
                            if (!selectedProject) setActiveProject(null);
                        }}
                        onClick={() => {
                            setActiveProject(index);
                            setSelectedProject(project);
                        }}
                        className="group relative border-b border-white/20 py-8 md:py-16 cursor-pointer flex flex-col md:flex-row md:items-baseline justify-between transition-all duration-300"
                        style={{
                            opacity: activeProject !== null && activeProject !== index ? 0.2 : 1
                        }}
                    >
                        <div className="flex items-baseline gap-4 md:gap-8">
                            <span className="text-xs md:text-sm font-mono text-white/50">0{index + 1}</span>
                            <h2 className="text-5xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter leading-[0.9] group-hover:translate-x-2 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
                                {project.title}
                            </h2>
                        </div>

                        <div className="flex justify-between w-full md:w-auto mt-4 md:mt-0 gap-8 md:gap-16 opacity-0 md:opacity-100 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                            <span className="text-xs font-bold uppercase tracking-widest">{project.client}</span>
                            <span className="text-xs font-mono text-white/50">{project.category}</span>
                        </div>
                    </div>
                ))}
            </div>
        </motion.main>
    )
}