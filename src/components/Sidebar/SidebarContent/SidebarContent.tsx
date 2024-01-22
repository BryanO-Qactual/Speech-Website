import { useContext, useEffect, useState } from 'react'
import {getList, toBeConfirmed, createSpeech, findSpeech, updateSpeech} from "./SideBarFunctions.tsx"
import {MainContext} from "../../../context/MainContext"
import "./SidebarContent.css"
const SidebarContent = () => {
    const contentObj = useContext(MainContext)  || {}
    const {setListSelected} = useContext(MainContext)  || {}
    const [inputValue, setInputValue] = useState("")
    const [repopulateList, setRepopulateList] = useState(true)
    const [speechList, setSpeechList] = useState()
    const [currentSelect, setCurrentSelect] = useState<{ [key: string]: boolean }>({})
    const confirmationPrompt = `Are you sure you want to delete? Type "confirm" to permanently delete` //Confirmation prompt if they press delete
    const doesSelectExist = JSON.parse(localStorage.getItem("SelectedList") || "null") //checks if a selected option currently exists in local storage
    // SECTION - renders list
    // REVIEW - Currently it's a infinite loop but could be changed (needs further testing)
    useEffect(()=>{
        const fetchData = async () => {
            const newSpeeches = await getList();
            setSpeechList(newSpeeches);
        };
        fetchData();
    }, [repopulateList,speechList])
    useEffect(()=>{
        const fetchData = async () => {
            const newSpeeches = await getList();            
            if(doesSelectExist){
                setCurrentSelect(doesSelectExist)
            }else{
                let newSpeechObj: { [key: string]: boolean } = {} 
                // Turning an array into obj format
                for(let i=0; i<newSpeeches.length; i++){ 
                    newSpeechObj[newSpeeches[i]] = false
                }
                setCurrentSelect(newSpeechObj);
            }
        };
        fetchData();
    },[])
    //SECTION - Keeps the selected one even upon refreshing of the page
    useEffect(()=>{
        if(currentSelect)localStorage.setItem('SelectedList', JSON.stringify(currentSelect))
    },[currentSelect])
    // SECTION - Handles different parts of the sidebar
    const handleText = (e: Event) =>{
        const target = e.target as HTMLInputElement;
        setInputValue(target.value);
    }
    const handleCreateSpeech = () =>{
        createSpeech(inputValue, contentObj).then((success)=>{
            if(success){
                setInputValue("")
                setRepopulateList((prev)=> !prev)
            }
        })
    }
    const handleDeleteSpeech = (e:any)=> {
        const success = toBeConfirmed(confirmationPrompt, e)
        if(success){
            setRepopulateList((prev)=> !prev)
        }
    }
    const handleListSelect = (e:any)=>{
        const selectedFileName = e.target.parentElement.classList[1]
        const switchingSelect = Object.values(currentSelect).includes(true);
        const isCurrentlySelected = currentSelect[selectedFileName]
        if(isCurrentlySelected){
            setCurrentSelect((prev: { [key: string]: boolean }) => ({...prev, [selectedFileName]: false}))
            setListSelected({selected: false, obj: {}, switching: false})
        }else if(switchingSelect){
            setCurrentSelect((prev: { [key: string]: boolean }) => {
                const updatedSelection: { [key: string]: boolean } = Object.fromEntries(
                  Object.keys(prev).map((key) => [key, false])
                );
                updatedSelection[selectedFileName] = true;
                return updatedSelection;
            });
            findSpeech(selectedFileName).then((speech:object)=>{
                setListSelected({selected: true, obj: speech, switching: true })
            })
        }else{ // New select
            //REVIEW - Could synchronize both new select and switch (needs further testing) 
            setCurrentSelect((prev: { [key: string]: boolean }) => {
                const updatedSelection: { [key: string]: boolean } = Object.fromEntries(
                  Object.keys(prev).map((key) => [key, false])
                );
                updatedSelection[selectedFileName] = true;
                return updatedSelection;
            });
            findSpeech(selectedFileName).then((speech:object)=>{ 
                setListSelected({selected: true, obj: speech, switching: false })
            })
        }
    }
    const handleSave = () =>{
        for (let key in currentSelect) {
            if (currentSelect[key] === true) {         
                updateSpeech(key, contentObj)
                break;
            }
        }
    }

    // SECTION - Populates list
    const populatedList = (speechList || []).map((item:string, index)=>{
        
        const title = item.replace(/_/g, ' ');
            return(
                <div className={`IndList ${item}`} key={index}>
                    <p onClick={(e)=>{handleListSelect(e)}} style={currentSelect[item] ? { backgroundColor: "rgb(128, 128, 128)" } : {}}>{title}</p>
                    <a onClick={(e)=>{handleDeleteSpeech(e)}}>Delete</a>
                </div>
            )
        })
  return (
    <div className={"SidebarListContainer"}>
        <h2 onClick={handleSave}>Save Current</h2>
        <div className={"CreateSpeechContainer"}>
            <p onClick={handleCreateSpeech}>Save as New</p>
            <input type="text" value={inputValue} onChange={handleText} placeholder={"title ex:School speech"}/>
        </div>
        {populatedList}
    </div>
  )
}

export default SidebarContent