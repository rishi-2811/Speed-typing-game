import { useState,useEffect,useRef} from 'react'

const getWordCount=(text,data)=>{
    let count=0
    for(let i=0;i<text.length;i++){
      if (text[i]===data[i]){
        count+=1
      }
      else{
        count-=0.25
      }
    }
    return count
  }

 

const useCustom=()=>{
    const [text,setext]=useState('')
    const [timer,setimer]=useState(60)
    const [running,setrunning]=useState(false)
    const [count,setcount]=useState(0)
    const [data,setdata]=useState('')
    const inputRef=useRef(null)
    useEffect(()=>{
      if (timer>0 && running){
        setTimeout(()=>{setimer(timer=>timer-1)},1000)
      }
      else if(timer===0){
        setrunning(false)
        setcount(getWordCount(text,data))
      }
    },[timer,running])
    const handleChange=()=>{
      getData().then(()=>{
        setimer(60)
      setext('')
      setrunning(true)
      inputRef.current.disabled=false
      inputRef.current.focus()
      })
      
    }
    async function getData(){
        const res=await fetch('http://metaphorpsum.com/paragraphs/1/5')
        const data=await res.text()
        setdata(data)
        
    } 
    return [text,timer,running,count,inputRef,handleChange,setext,data]
}

export default useCustom