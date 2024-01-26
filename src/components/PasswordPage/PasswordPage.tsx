import { useEffect, useState } from 'react'
import axios from 'axios'
import "./PasswordPage.css"
const PasswordPage = () => {
  const [passage, setPassage] = useState<boolean>(true)
  const [val, setVal] = useState<string>("")
  const [error, setError] = useState<boolean>(true)
  //SECTION - Checks if you're already logged in
  useEffect(()=>{
    if(localStorage.getItem('passageKey')){
      setPassage(true)
    }else{
      setPassage(false)
    }
  },[])
  //SECTION - Cancels Y scroll
  const handleSubmit = (e:any) =>{
    e.preventDefault();  
    axios("https://f2rxponq74tyvswoxcmideouq40fpito.lambda-url.us-east-1.on.aws/?password=" + val).
    then((response)=>{
      setPassage(response.data)
      setError((prev)=>!prev)
      if(response.data) localStorage.setItem('passageKey', JSON.stringify(true));
    })
  }
  //SECTION - Creates blink animation
  useEffect(()=>{
    if(error == true && passage === false)setError((prev)=>!prev)
    if(!passage) window.scrollTo({ top: 0 });
    passage ? document.body.style.overflowY = '' : document.body.style.overflowY = 'hidden'
  }, [passage, error])
  const handleChange = (e: any) =>{
    setVal(e.target.value)
  }
  return (
    <div className={`PasswordPageContainer ${passage ? "disappear" : ""}`} >
      <form onSubmit={handleSubmit}>
        <label>Password for Speech Website</label>
        <input type="text" value={val} onChange={handleChange} className={error===false ? "blink" : ""}/>
        <button>Enter</button>
      </form>
    </div>
  )
}

export default PasswordPage