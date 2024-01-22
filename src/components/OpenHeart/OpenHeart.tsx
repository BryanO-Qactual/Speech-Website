import { useContext, useEffect, useState } from 'react'
import {MainContext} from "../../context/MainContext"
import { 
    handleChange, 
    getLocalStorage,
    getTextAreaRefs, resizeTextArea,
    downloadSection, copySection
} from "../MainFunctions/MainFunctions"
import "./OpenHeart.css"
import contentArray from "./OpenHeartContent"
const OpenHeart = () => {
    // SECTION - values of each text area
    const {openHeart: [val, setVal]} = useContext(MainContext) || {}
    
    const [initialRender, setInitialRender] = useState(true);
    const storageName = "OpenHeart"
    const CopySecName = "CopiedOpenHeart"
    // SECTION - Gets ref for each text box
    const textAreaRefs = getTextAreaRefs(5)
    // SECTION - Not lose info upon refresh
    useEffect(() => {
        if (initialRender) {
            // Skip the logic during the initial render
            setInitialRender(false);
            return;
        }
        Object.values(textAreaRefs).forEach(resizeTextArea); //resizes input box if too much text
        localStorage.setItem(storageName, JSON.stringify(val))
    }, [val]);
    useEffect(() => {
        const data = getLocalStorage(storageName)
        if (data && Array.isArray(data)) setVal(data as string[])
    }, [])
    if(localStorage.getItem(storageName) == null) localStorage.setItem(storageName, JSON.stringify(val))
    // SECTION - populates content
    const populatedContent = contentArray.map((content, index) => {
        return (
            <>
                <div class={"PromptContainer"} >
                    <h3>{content.header}</h3>
                    <p>{content.paragraph}</p>
                    <p>{content.paragraph2}</p>
                    <br />
                </div>
                <textarea
                    ref={textAreaRefs[index]}
                    name={`${index}`}
                    value={val[index]}
                    onChange={(e) => { handleChange(e, setVal) }}>
                </textarea>
            </>
        )
    })
    return (
        <div className={"OpenHeartContainer newpage"}>
            <div>
                <h1 className={"OpenHeartTitle"}>OPEN HEART</h1>
                <a href="" onClick={(e)=>{downloadSection(e, CopySecName, setVal)}}>
                    <i class="fa-solid fa-download"></i>
                </a>
                <a href="" onClick={(e)=>{copySection(e, CopySecName, val)}}>
                    <i class="fa-solid fa-copy"></i>
                </a>
            </div>
            {populatedContent}
        </div>
    )
}

export default OpenHeart