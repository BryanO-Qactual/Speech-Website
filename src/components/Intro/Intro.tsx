import { useState, useEffect, useContext } from 'react';
import heroImgUrl from "../../assets/introImg.webp"
import {MainContext} from "../../context/MainContext"
import {handleChange, getLocalStorage} from "../MainFunctions/MainFunctions"
import "./Intro.css"
const Intro = () => {
  const storageName = "IntroCard"
  const {intro} = useContext(MainContext) 
  const [val, setVal] = intro 

  const [initialRender, setInitialRender] = useState(true);
  const fields = ["Name", "Title", "CTA", "Date"];
 // SECTION - Not lose info upon refresh
  useEffect(() => {
    if (initialRender) {
      // Skip the logic during the initial render
      setInitialRender(false);
      return;
    }
    localStorage.setItem(storageName, JSON.stringify(val))
  }, [val])
  useEffect(() => {
    const data = getLocalStorage(storageName) 
    if (data && Array.isArray(data)) setVal(data as string[])
  }, [])
  if(localStorage.getItem(storageName) == null) localStorage.setItem(storageName, JSON.stringify(val))
// SECTION - Populate content
  const renderFormFields = fields.map((field, index) => {
    return (
      <label key={index}>
        {field}:
        <input
          type={'text'}
          name={`${index}`}
          value={val[index]}
          onChange={(e)=>{handleChange(e, setVal)}}
        />
      </label>
    )
  });
  ;

  return (
    <div class={"IntroContainer"}>
      <div class={"heroImgNdTitle"}>
        <div>
          <h1>Signature Speech</h1>
        </div>
        <img src={heroImgUrl} />
      </div>
      <div>
        <form>
          {renderFormFields}
        </form>
      </div>
    </div>
  )
}

export default Intro