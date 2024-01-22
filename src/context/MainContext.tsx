import React, { createContext, useContext, useEffect, useState } from 'react';
import {SaveContext} from "./SaveContext"
// Define a type for the context value
type MainContextType = {
    intro: any,
    openHeart: any,
    transactionOfValue: any,
    headContent: any,
    headContent1: any,
    headContent2: any,
    headContent3: any,
    callToAction: any,
    closingHeart: any,
    setListSelected: any
};

const MainContext = createContext<any>(undefined);

const MainContextProvider: React.FC = ({ children }) => {
  //SECTION - Function, and objects passed from "SaveContext"
  const {
    setListSelectedValues,listSelectedValues,
    listSelectedObj,
    listSelected, setListSelected,
    changeSection 
  }  = useContext(SaveContext)
  //SECTION - Puts the selected values in
  const stateValue = (count:number) => {
    let content = Array.from({ length: count }, () => "")
    const [val, setVal] = useState<any>(content);
    return [val, setVal];
  };
  
  // SECTION - Checks if a list has been selected and takes just the values
  if(listSelected.selected && !listSelectedValues[0]){
    let selectedObj = listSelected.obj as any
    let index = 0
    if(listSelectedValues.length === 0){
      for (const property in selectedObj) { 
        setListSelectedValues((prev:any)=>[...prev, selectedObj[property][0]])
        index++
      }
    } 
  }
  //SECTION - Refreshes the selected values to zero
  //REVIEW - Could be not needed (requires further testing) 
  useEffect(()=>{
    if(!listSelected.selected || listSelected.switching){
      listSelectedValues.length === 0 ? null : setListSelectedValues([])
    } 
  }, [listSelected])
  // SECTION - changes value when the selection array isn't empty
  useEffect(()=>{
    if(!(listSelectedValues[0] == undefined)){
      changeSection()
    }
  },[listSelectedValues])
  //SECTION - Holds the original information
  //NOTE - Make sure the number passed is equal to the number of input boxes in each section
  let sectionObj: MainContextType = {
      intro: stateValue(4),
      openHeart: stateValue(5) ,
      transactionOfValue: stateValue(5),
      headContent: stateValue(8),
      headContent1: stateValue(6),
      headContent2: stateValue(6),
      headContent3: stateValue(6),
      callToAction: stateValue(6),
      closingHeart: stateValue(4),
      setListSelected
  }
  return (
    <MainContext.Provider value={listSelected.selected ? listSelectedObj : sectionObj}>
      {children}
    </MainContext.Provider>
  );
};

export { MainContextProvider, MainContext };