import axios from "axios"
const proxy = import.meta.env.VITE_API_BASE_URL as string
// import {MainContext} from "../../../context/MainContext"

// const {openHeart: [val, setVal]} = useContext(MainContext)  || {}



export async function getList(){
    const info = axios.get("https://2eszsrtrxhy66yrndnzrocn2rq0xeema.lambda-url.us-east-1.on.aws/")
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
        const result = await axios.post(`https://xuefpu6mhvnaibt2ec3i4yznea0nkoei.lambda-url.us-east-1.on.aws/?fileName=${formattedName}`, {
            content: contentObj
        }); 
        console.log(result);
        
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
    try{
        const result = await axios.get(`https://sbd2nitusi2nukkud5mxclxi6a0bwvhy.lambda-url.us-east-1.on.aws/?fileName=${fileName}`)
        const data = JSON.parse(result.data)
        return data
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
        axios.delete(`https://dgobxsp34lv2ysfdw6lrfb6bci0atvza.lambda-url.us-east-1.on.aws/?fileName=${fileName}`)
    }catch(err){
        console.log(err)
    }
}