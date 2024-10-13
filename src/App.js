import useCustom from './useState'
import './App.css'

const App=()=>{
  const [text,timer,running,count,inputRef,handleChange,setext,data]=useCustom()
  return (
    <>
     <h1 className='title'>How fast can you type?</h1>
     <div className='inputholder'>
     <textarea ref={inputRef} name='text' value={text} disabled={!running} onChange={(e)=>{running && setext(e.target.value)}}/>
      <div className='para'>{running && data}</div>
     </div>
     <h2 className='time'>Time Remaining:{timer}</h2>
     <button disabled={running} onClick={handleChange}>Start</button>
     <h1 className='wordcount'>Score:{count}</h1>
    </>
  )
}


export default App