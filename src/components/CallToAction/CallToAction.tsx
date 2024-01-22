import { useContext, useEffect, useState } from 'react'
import {MainContext} from "../../context/MainContext"
import { 
    handleChange, 
    getLocalStorage,
    getTextAreaRefs, resizeTextArea,
    downloadSection, copySection
} from "../MainFunctions/MainFunctions"
import contentArray from './CallToActionContent'
import "./CallToAction.css"

const CallToAction = () => {
    const storageName = "CallToAction"
    const CopySecName = "CopiedCallToAction"
    const [initialRender, setInitialRender] = useState(true);
    // SECTION - values of each text area 
    const {callToAction: [val, setVal]} = useContext(MainContext) || {}
    
    // SECTION - Makes text area resize automatically if they write a lot
    const textAreaRefs = getTextAreaRefs(6)
    // SECTION - Not lose info upon refresh
    useEffect(() => {
        if (initialRender) {
            // Skip the logic during the initial render
            setInitialRender(false);
            return;
        }
        Object.values(textAreaRefs).forEach(resizeTextArea);
        localStorage.setItem(storageName, JSON.stringify(val))
    }, [val]);
    useEffect(()=>{
        const data = getLocalStorage(storageName)
        if (data && Array.isArray(data)) setVal(data as string[])
    }, [])
    if(localStorage.getItem(storageName) == null) localStorage.setItem(storageName, JSON.stringify(val))
    const populatedContent = contentArray.map((content, index)=>{
        return(
            <>
            <div class={"PromptContainer"}>
                <h3>{content.header}</h3>
                <p>{content.paragraph}</p>
                <p>{content.paragraph2}</p>
                <br />
            </div>
            <textarea               
                ref={textAreaRefs[index]}
                name={`${index}`}
                value={val[index]}
                onChange={(e)=>{handleChange(e, setVal)}}>
            </textarea>
            </>
        )
    })
  return (
    <div className={"CallToActionContainer newpage"}>
        <div>
            <h1 className={"CallToActionTitle"}>CALL TO ACTION</h1>
            <a href="" onClick={(e) => { downloadSection(e, CopySecName, setVal) }}>
                <i class="fa-solid fa-download"></i>
            </a>
            <a href="" onClick={(e) => { copySection(e, CopySecName, val) }}>
                <i class="fa-solid fa-copy"></i>
            </a>
        </div>
        {populatedContent}
    </div>
  )
}

export default CallToAction