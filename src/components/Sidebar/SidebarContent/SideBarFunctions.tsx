import axios from "axios"
const proxy = import.meta.env.VITE_API_BASE_URL as string
// import {MainContext} from "../../../context/MainContext"

// const {openHeart: [val, setVal]} = useContext(MainContext)  || {}



export async function getList(){
    const info = axios.get(proxy + "/getSpeechList")
        .then((list: any) => {
            return list.data
        })
        .catch((error: any) => {
            console.error('Error fetching data:', error);

        });
    return info

}

export async function createSpeech(name:string,  contentObj:any){
    if(name && name === ""){
        alert("You have not assigned a name")
        return
    }
    let formattedName = await name.replace(/ /g, '_');
    formattedName = formattedName.replace(/^_+|_+$/g, '');
    try {
        const result = await axios.post(proxy + `/createSpeech/${formattedName}`, {
            content: contentObj
        }); 
        return result.data.success
    } catch (error) {
        console.error('Error making POST request:', error);
    }
}

export function toBeConfirmed(message:string, e:any){
    const fileName = e.target.previousSibling.innerText
    const formattedFileName = fileName.replace(/ /g, '_');

    const confirmation = prompt(message);
    if (confirmation && confirmation === 'confirm') {
        alert('Confirmed');
        deleteSpeech(formattedFileName)
        return true
    } else {
        alert('Confirmation canceled.');
        return false
    }
}
export async function findSpeech(fileName:string) {
    // const formattedFileName = title.replace(/ /g, '_');
    try{
        const result = await axios.get(proxy+`/speech/getSpeech/${fileName}`)
        return result.data
    }catch(err){

    }
}

export async function updateSpeech(fileName:string, content:object){
    await deleteSpeech(fileName)
    const success = await createSpeech(fileName, content)
    return success
}

function deleteSpeech(fileName:string){
    try{
        axios.delete(proxy + `/deleteSpeech/${fileName}`)
    }catch(err){
        console.log(err)
    }
}