import { motion } from "framer-motion";
import { useState, type ReactNode, useRef } from "react";
import { Link } from "react-router-dom"

export const Home = () => {
  return (
    <div className="h-screen grid place-content-center">
      <nav>
        <SlideTabsVertical />
      </nav>
    </div>
  )
}

const SlideTabsVertical = () => {
  const [position, setPosition] = useState({
    top: 0,
    width: 0,
    height: 0,
    opacity: 0
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition(prev => ({
          ...prev,
          opacity: 0,
        }))
      }}
      className="relative mx-auto flex flex-col items-center rounded-lg p-1"
    >
      <TabVertical href="/" setPosition={setPosition}>Home</TabVertical>
      <TabVertical href="/loco-scrollo" setPosition={setPosition}>loco-scrollo</TabVertical>
      <TabVertical href="/tabs" setPosition={setPosition}>tab controls</TabVertical>
      <TabVertical href="/reveal-links" setPosition={setPosition}>links</TabVertical>
      <TabVertical href="/tabs-with-layout-anim" setPosition={setPosition}>Docs</TabVertical>
      <TabVertical href="/perspective" setPosition={setPosition}>cube perspective</TabVertical>
      <TabVertical href="/my-isometric-scene" setPosition={setPosition}>isometric scene</TabVertical>

      <CursorVertical position={position} />
    </ul>
  )
}

const TabVertical = ({ children, setPosition, href }: { children: ReactNode, setPosition: (payload: { top: number, width: number, height: number, opacity: number }) => void, href: string }) => {
  const ref = useRef<HTMLAnchorElement | null>(null);

  return (
    <Link
      to={href}
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        setPosition({
          width: rect.width,
          height: rect.height,
          opacity: 1,
          top: ref.current.offsetTop,
        })
      }}
      className="relative z-10 block w-fit cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {children}
    </Link>
  )
}

const CursorVertical = ({ position }: { position: { top: number, width: number, height: number, opacity: number } }) => {
  return (
    <motion.li animate={position} className="absolute z-0 inset-y-0.5 rounded-full border-2 border-white"></motion.li>
  )
}