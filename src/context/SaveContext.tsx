import React, { createContext, useEffect, useState } from 'react';
//SECTION - Typescript function types
type SaveContextType = any;
interface ListSelectedState {
  selected: boolean;
  obj: object,
  switching: boolean
};
interface ListSelectedObj {
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

const SaveContext = createContext<SaveContextType | undefined>(undefined);

const SaveContextProvider: React.FC = ({ children }) => {

  const [listSelectedValues, setListSelectedValues] = useState<any>([[], [], [], [], [], [], [], [], []])//Stores the selected list's values in an array  
  const [listSelected, setListSelected] = useState<ListSelectedState>({ selected: false, obj: {}, switching: false });//checks if it's selected or not and stores the whole selected list object 

  //SECTION - Puts the selected values in
  const stateValue = (inputValues: any) => {
    const [val, setVal] = useState<any>(inputValues);
    return [val, setVal];
  };
  //SECTION - Holds the selected information
  let listSelectedObj: ListSelectedObj = {
    intro: stateValue(listSelectedValues[0]),
    openHeart: stateValue(listSelectedValues[1]) ,
    transactionOfValue: stateValue(listSelectedValues[2]),
    headContent: stateValue(listSelectedValues[3]),
    headContent1: stateValue(listSelectedValues[4]),
    headContent2: stateValue(listSelectedValues[5]),
    headContent3: stateValue(listSelectedValues[6]),
    callToAction: stateValue(listSelectedValues[7]),
    closingHeart: stateValue(listSelectedValues[8]),
    setListSelected
  }

  //SECTION - changes the previous saved value to the newly selected one
  const changeSection = ()=>{
    if(listSelectedValues && listSelectedObj.intro[0] && !(listSelectedValues[0] == undefined)){
      //REVIEW - maybe could be for looped but that's for another time
      let intro = listSelectedObj.intro[1]
      intro(listSelectedValues[0])
      
      let openHeart = listSelectedObj.openHeart[1]
      openHeart(listSelectedValues[1])
      let transactionOfValue = listSelectedObj.transactionOfValue[1]
      transactionOfValue(listSelectedValues[2])

      let headContent = listSelectedObj.headContent[1]
      headContent(listSelectedValues[3])

      let headContent1 = listSelectedObj.headContent1[1]
      headContent1(listSelectedValues[4])

      let headContent2 = listSelectedObj.headContent2[1]
      headContent2(listSelectedValues[5])

      let headContent3 = listSelectedObj.headContent3[1]
      headContent3(listSelectedValues[6])

      let callToAction = listSelectedObj.callToAction[1]
      callToAction(listSelectedValues[7])
      
      let closingHeart = listSelectedObj.closingHeart[1]
      closingHeart(listSelectedValues[8])
    }
  }
    return (
        <SaveContext.Provider value={{
          listSelectedObj, 
          listSelectedValues, setListSelectedValues, 
          listSelected, setListSelected,
          changeSection } }>
          {children}
        </SaveContext.Provider>
      );
};
export { SaveContextProvider, SaveContext };