import React from 'react';
import useTypingTest from './useState';
import './App.css';

const App = () => {
  const [text, timer, running, stats, inputRef, handleChange, setText, data, error] = useTypingTest();

  const renderTextWithHighlighting = () => {
    if (!data) return null;
    return data.split('').map((char, index) => {
      let className = 'char';
      if (index < text.length) {
        className += data[index] === text[index] ? ' correct' : ' incorrect';
      } else if (index === text.length) {
        className += ' current';
      } else {
        className += ' pending';
      }
      return (
        <span key={index} className={className}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1 className='title'>Speed Typing Test</h1>
        <p className="subtitle">Test your typing speed and accuracy</p>
      </div>

      <div className="timer-container">
        <div className={`timer ${timer <= 10 ? 'warning' : ''} ${timer <= 5 ? 'danger' : ''}`}>
          <span className="timer-label">Time Remaining</span>
          <span className="timer-value">{timer}s</span>
        </div>
      </div>

      <div className='inputholder'>
        <div className='text-display'>
          <div className="text-label">Type the text below:</div>
          <div className='para'>
            {data ? renderTextWithHighlighting() : (
              <div style={{ color: '#a0aec0', textAlign: 'center', padding: '2rem' }}>
                Click "Start Test" to begin your typing test
              </div>
            )}
          </div>
        </div>
        <div className="input-section">
          <div className="text-label">Your typing:</div>
          <textarea 
            ref={inputRef} 
            name='text' 
            value={text} 
            disabled={!running} 
            onChange={(e) => {running && setText(e.target.value)}}
            placeholder={running ? "Start typing..." : "Click Start to begin"}
            className="typing-input"
          />
        </div>
      </div>

      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <button 
          className={`start-button ${running ? 'disabled' : ''}`}
          disabled={running} 
          onClick={handleChange}
        >
          {timer === 60 ? "Start Test" : "Restart Test"}
        </button>
      )}

      {!running && timer !== 60 && (
        <div className='stats-container'>
          <h2 className='stats-title'>Your Results</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Score</div>
              <div className={`stat-value ${stats.score ? `score-${stats.score.toLowerCase().replace(' ', '-')}` : ''}`}>
                {stats.score || 'N/A'}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Accuracy</div>
              <div className="stat-value">{stats.accuracy.toFixed(1)}%</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Words Per Minute</div>
              <div className="stat-value">{stats.wpm} WPM</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;