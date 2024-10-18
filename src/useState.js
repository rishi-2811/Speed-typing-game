import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const calculateAccuracy = (typed, original) => {
  let correct = 0;
  const minLength = Math.min(typed.length, original.length);
  for (let i = 0; i < minLength; i++) {
    if (typed[i] === original[i]) correct++;
  }
  return (correct / original.length) * 100;
};

const calculateWPM = (typedWords, timeInMinutes) => {
  return Math.round(typedWords / timeInMinutes);
};

const getScore = (accuracy, wpm) => {
  if (accuracy < 50 || wpm < 20) return "Needs Improvement";
  if (accuracy < 80 || wpm < 40) return "Average";
  if (accuracy < 95 || wpm < 60) return "Good";
  return "Excellent";
};

const useTypingTest = () => {
  const genAI = new GoogleGenerativeAI('AIzaSyB1fPL4wDzFcea6ITvmwn3_s1PFtTB3730');
  const [text, setText] = useState('');
  const [timer, setTimer] = useState(60);
  const [running, setRunning] = useState(false);
  const [stats, setStats] = useState({ accuracy: 0, wpm: 0, score: '' });
  const [data, setData] = useState('');
  const inputRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let interval;
    if (timer > 0 && running) {
      interval = setInterval(() => setTimer(timer => timer - 1), 1000);
    } else if (timer === 0) {
      setRunning(false);
      calculateStats();
    }
    return () => clearInterval(interval);
  }, [timer, running]);

  const calculateStats = () => {
    const accuracy = calculateAccuracy(text, data);
    const wpm = calculateWPM(text.split(' ').length, 1);
    const score = getScore(accuracy, wpm);
    setStats({ accuracy, wpm, score });
  };

  const handleChange = () => {
    getData().then(() => {
      setTimer(60);
      setText('');
      setRunning(true);
      setStats({ accuracy: 0, wpm: 0, score: '' });
      if (inputRef.current) {
        inputRef.current.disabled = false;
        inputRef.current.focus();
      }
    });
  };

  const getData = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(
        "Generate a short, meaningful, and unique paragraph (about 55 words) with a mix of simple and moderately complex words. The content should be suitable for a typing test, covering a general topic of interest."
      );
      const response = await result.response;
      const text = response.text();
      setData(text);
      setError('');
    } catch (error) {
      setError("Error fetching text. Please try again.");
      setRunning(false)
    }
  };

  return [text, timer, running, stats, inputRef, handleChange, setText, data, error];
};

export default useTypingTest;