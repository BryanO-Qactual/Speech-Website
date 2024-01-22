import { useEffect, useRef, useState } from 'react'
import hamburgerIcon from "../../assets/hamburger_Icon.jpg"
import xIcon from "../../assets/x_Icon.png" 
import {motion, AnimatePresence} from "framer-motion"
import "./Sidebar.css"
import SidebarContent from './SidebarContent/SidebarContent'

const Sidebar = () => {
    const [display, setDisplay] = useState(false)
    const sbDivRef = useRef<HTMLDivElement>(null);
    const IconDivRef = useRef<HTMLDivElement>(null);
    // SECTION - Sidebar functionality
    const handleSidebar = () =>{
        setDisplay(prev=>!prev)
    }
    // SECTION - Hide sidebar if clicked outside of div
    useEffect(()=>{
        const handleClickOutside = (event:any) => {
            if (sbDivRef.current && IconDivRef.current && !sbDivRef.current.contains(event.target) && !IconDivRef.current.contains(event.target)) {
              setDisplay(false);
            }
          };
        document.addEventListener('click', handleClickOutside)
    }, [display])
    
  return (
    <>
        <AnimatePresence>
        {display && 
            <motion.div 
            className="SidebarMenu"
            initial={{x: 0}}
            animate={{x: 400}}
            exit={{x:0}}
            transition= {{ duration: 1, ease: "easeInOut" }}
            ref={sbDivRef}
            >
                <div className={"SidebarHeader"}>
                    <h1>MENU</h1>
                    <img src={xIcon}  onClick={handleSidebar}/>
                </div>
                <SidebarContent/>
            </motion.div>}
        </AnimatePresence>
        <div className="SidebarBtnContainer" onClick={handleSidebar} ref={IconDivRef}>
            <motion.img 
            src={hamburgerIcon}
            width={40}
            initial={{opacity: 0}}
            animate={{opacity: 2}}
            transition= {{ duration: 2, ease: "easeIn" }}
            alt="Hamburger Icon"
            />
        </div>

    </> 
)
}

export default Sidebar