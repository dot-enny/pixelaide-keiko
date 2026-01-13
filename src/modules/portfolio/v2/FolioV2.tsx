import { useState } from 'react';
import { ProjectList } from './ProjectList';
import { FloatingImage } from './FloatingImage';
import { TopBar } from '../../../components/TopBar';

const projects = [
    {
        id: 1,
        title: "POTION",
        client: "NIKE LAB",
        year: "2024",
        category: "Interaction Design",
        description: "A complete overhaul of the digital experience for Nike Lab's experimental division. We focused on brutalist typography and fluid micro-interactions to convey the speed of innovation.",
        img: "/images/placeholder/photo-1.avif"
    },
    {
        id: 2,
        title: "LEXICON",
        client: "SPOTIFY",
        year: "2023",
        category: "Web Development",
        description: "An immersive storytelling platform for Spotify Wrapped. Utilizing WebGL and custom shaders to visualize listening habits as living, breathing 3D artifacts.",
        img: "/images/placeholder/photo-2.avif"
    },
    {
        id: 3,
        title: "VOYAGER",
        client: "NASA JPL",
        year: "2023",
        category: "3D Engineering",
        description: "Real-time telemetry visualization for the next generation of Mars rovers. Built with React Three Fiber to allow engineers to inspect the rover's status in a browser-based 3D environment.",
        img: "/images/placeholder/photo-3.avif"
    },
    {
        id: 4,
        title: "ECLIPSE",
        client: "A24 FILMS",
        year: "2022",
        category: "Brand Identity",
        description: "Digital campaign for A24's latest horror thriller. We used dark patterns and hidden UI elements to create a sense of unease and discovery for the user.",
        img: "/images/placeholder/photo-4.avif"
    }
];

export type Project = typeof projects[0];

export const FolioV2 = () => {
    const [activeProject, setActiveProject] = useState<number | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Lock body scroll when project is open
    // useEffect(() => {
    //     if (selectedProject) {
    //         document.body.style.overflow = 'hidden';
    //     } else {
    //         document.body.style.overflow = 'unset';
    //     }
    // }, [selectedProject]);

    return (
        <div className="relative w-full min-h-screen bg-[#050505] text-[#E5E5E5] overflow-hidden font-sans selection:bg-white selection:text-black">
            <TopBar className="flex justify-between uppercase text-white/50 mx-auto text-xs font-bold tracking-widest mix-blend-difference px-4 md:px-12 fl-py-4/8">
                <div className="">
                    Eniola / Pixelaide<br />
                    Frontend Eng / Creative Dev
                </div>

                <div className="text-right">
                    Based in Nigeria<br />
                    Avail. for select projects
                </div>
            </TopBar>

            {/* BACKGROUND NOISE - Made white and very subtle for texture on black */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            <FloatingImage projects={projects} activeProject={activeProject} selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
            <ProjectList projects={projects} activeProject={activeProject} setActiveProject={setActiveProject} selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
        </div>
    );
}

