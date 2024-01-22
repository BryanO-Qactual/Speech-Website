import { useRef } from 'react';
// SECTION - Controls individual input text
export function handleChange(e: any, setVariable: (value: any) => void){
    //NOTE - the index is stored inside the name
    const { name, value } = e.target;
    setVariable((prevArray:any) => {
        const newArray = [...prevArray];
        newArray[name] = value;
        return newArray;
      });
};
// SECTION - Get local storage value
export function getLocalStorage(name: string){
    try {
        const local = localStorage.getItem(name);
        // console.log(local);
        
        if (local !== null) {
            const parsedLocal = JSON.parse(local);
            if (parsedLocal && typeof parsedLocal === 'object') {
                return Object.values(parsedLocal);
            } else {
                throw new Error("The retrieved data is not an object.");
            }
        } else {
            throw new Error(`The item '${name}' doesn't exist in localStorage.`);
        }
    } catch (err: any) {
        console.log(err.message);
    }
}
// SECTION - Get text area ref
export function getTextAreaRefs(numOfBoxes: number){
    return Array.from({ length: numOfBoxes }, (_, i) => i.toString()).reduce<{ [key: string]: React.MutableRefObject<HTMLTextAreaElement | null> }>((acc, key) => {
        acc[key] = useRef<HTMLTextAreaElement | null>(null);
        return acc;
    }, {});
}
// SECTION - resize text area
export function resizeTextArea(textAreaRef: any){
    if (textAreaRef && textAreaRef.current) {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
}

// SECTION - Download section
export function downloadSection(e: any, storageName:string, setVariable: (value: any) => void){
    e.preventDefault()
    try {
        const local = localStorage.getItem(storageName);
        if (local !== null) {
            const parsedLocal = JSON.parse(local);
            if (parsedLocal && typeof parsedLocal === 'object') {
                setVariable(Object.values(parsedLocal));
            } else {
                throw new Error("The retrieved data is not an object.");
            }
        } else {
            throw new Error(`The item '${storageName}' doesn't exist in localStorage.`);
        }
    } catch (err: any) {
        console.log(err.message);
    }
}
// SECTION - Copy section
export function copySection(e:any, name:string, data: any){
    e.preventDefault()
    localStorage.setItem(name, JSON.stringify(data))
}