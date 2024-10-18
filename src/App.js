import React from 'react';
import useTypingTest from './useState';
import './App.css';

const App = () => {
  const [text, timer, running, stats, inputRef, handleChange, setText, data, error] = useTypingTest();

  return (
    <>
      <h1 className='title'>How fast can you type?</h1>
      <div className='inputholder'>
        <textarea 
          ref={inputRef} 
          name='text' 
          value={text} 
          disabled={!running} 
          onChange={(e) => {running && setText(e.target.value)}}
        />
        <div className='para'>{running && data}</div>
      </div>
      <h2 className='time'>Time Remaining: {timer}</h2>
      {error ? (
        <h2 style={{textAlign: "center",color:"red"}}>{error}</h2>
      ) : (
        <button disabled={running} onClick={handleChange}>
          {timer === 60 ? "Start" : "Restart"}
        </button>
      )}
      {!running && timer !== 60 && (
        <div className='stats'>
          <h2 className='score'>Score: {stats.score}</h2>
          <p>Accuracy: {stats.accuracy.toFixed(2)}%</p>
          <p>WPM: {stats.wpm}</p>
        </div>
      )}
    </>
  );
};

export default App;