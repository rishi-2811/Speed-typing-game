import { useState, useEffect, useRef } from 'react';

// Text Generation Algorithm - Word Pools
const WORD_POOLS = {
  subjects: [
    'Technology', 'Science', 'Nature', 'Art', 'Music', 'Literature', 'History', 'Culture',
    'Education', 'Innovation', 'Discovery', 'Exploration', 'Creativity', 'Knowledge', 'Wisdom',
    'Experience', 'Adventure', 'Journey', 'Progress', 'Development', 'Growth', 'Achievement',
    'Success', 'Challenge', 'Opportunity', 'Potential', 'Future', 'Present', 'Past'
  ],
  verbs: [
    'transforms', 'enhances', 'inspires', 'creates', 'develops', 'builds', 'shapes', 'influences',
    'connects', 'unites', 'bridges', 'expands', 'enriches', 'improves', 'strengthens', 'empowers',
    'enables', 'facilitates', 'promotes', 'fosters', 'encourages', 'supports', 'nurtures',
    'cultivates', 'generates', 'produces', 'delivers', 'provides', 'offers', 'presents'
  ],
  objects: [
    'our understanding', 'our perspective', 'our world', 'our lives', 'our society', 'our culture',
    'our future', 'our minds', 'our creativity', 'our potential', 'our capabilities', 'our skills',
    'our knowledge', 'our experience', 'our relationships', 'our communities', 'our environment',
    'our planet', 'our universe', 'our existence', 'our journey', 'our path', 'our destiny'
  ],
  adjectives: [
    'remarkable', 'extraordinary', 'incredible', 'fascinating', 'amazing', 'wonderful', 'beautiful',
    'powerful', 'significant', 'important', 'essential', 'crucial', 'vital', 'valuable', 'precious',
    'unique', 'special', 'distinctive', 'notable', 'impressive', 'outstanding', 'exceptional',
    'innovative', 'creative', 'dynamic', 'vibrant', 'diverse', 'rich', 'complex', 'sophisticated'
  ],
  connectors: [
    'Furthermore', 'Moreover', 'Additionally', 'Similarly', 'Likewise', 'However', 'Therefore',
    'Consequently', 'Meanwhile', 'Nevertheless', 'Indeed', 'Certainly', 'Undoubtedly', 'Clearly',
    'Obviously', 'Naturally', 'Ultimately', 'Finally', 'In conclusion', 'In summary'
  ],
  topics: [
    { theme: 'technology', words: ['digital', 'innovation', 'software', 'algorithms', 'data', 'network', 'platform', 'system'] },
    { theme: 'nature', words: ['ecosystem', 'biodiversity', 'wildlife', 'landscape', 'environment', 'climate', 'habitat', 'species'] },
    { theme: 'art', words: ['creativity', 'expression', 'aesthetic', 'masterpiece', 'canvas', 'gallery', 'exhibition', 'artist'] },
    { theme: 'science', words: ['research', 'experiment', 'hypothesis', 'discovery', 'analysis', 'theory', 'method', 'observation'] },
    { theme: 'education', words: ['learning', 'knowledge', 'study', 'curriculum', 'academic', 'scholar', 'student', 'university'] },
    { theme: 'culture', words: ['tradition', 'heritage', 'custom', 'society', 'community', 'civilization', 'history', 'legacy'] }
  ]
};

// Sentence Templates for generating coherent paragraphs
const SENTENCE_TEMPLATES = [
  // Opening sentences
  "{subject} {verb} {object} in {adjective} ways that continue to shape our modern world.",
  "The {adjective} impact of {subject} on {object} cannot be overstated in today's society.",
  "{subject} has always played a {adjective} role in {object} throughout human history.",
  "Through {adjective} {subject}, we gain deeper insights into {object} and their significance.",
  
  // Middle sentences
  "This {adjective} phenomenon {verb} {object} by introducing new perspectives and opportunities.",
  "The relationship between {subject} and {object} {verb} a {adjective} understanding of complex systems.",
  "Many experts believe that {subject} {verb} {object} through innovative approaches and methodologies.",
  "The {adjective} nature of {subject} {verb} {object} in ways we are only beginning to comprehend.",
  "Recent developments in {subject} {verb} {object} by demonstrating practical applications and benefits.",
  "The {adjective} connection between {subject} and {object} {verb} meaningful change across various domains.",
  
  // Closing sentences
  "As we continue to explore {subject}, the {adjective} potential for {object} becomes increasingly evident.",
  "The future of {subject} holds {adjective} promise for {object} and the generations to come.",
  "Understanding {subject} helps us appreciate the {adjective} value of {object} in our daily lives.",
  "Through careful study and application, {subject} {verb} {object} in {adjective} and transformative ways."
];

// Text Generation Algorithm
const generateRandomText = () => {
  // Select a random topic theme
  const topic = WORD_POOLS.topics[Math.floor(Math.random() * WORD_POOLS.topics.length)];
  
  // Helper function to get random element from array
  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  // Helper function to capitalize first letter
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  
  // Generate 3-4 sentences to form a paragraph (target: 50-60 words)
  const sentenceCount = 3 + Math.floor(Math.random() * 2); // 3 or 4 sentences
  const sentences = [];
  let totalWords = 0;
  const targetWords = 50 + Math.floor(Math.random() * 15); // 50-65 words
  
  for (let i = 0; i < sentenceCount && totalWords < targetWords; i++) {
    let template = random(SENTENCE_TEMPLATES);
    
    // Replace placeholders with random words
    let sentence = template
      .replace(/{subject}/g, () => {
        // Sometimes use topic-specific words
        if (Math.random() > 0.5) {
          return capitalize(random(topic.words));
        }
        return random(WORD_POOLS.subjects);
      })
      .replace(/{verb}/g, () => random(WORD_POOLS.verbs))
      .replace(/{object}/g, () => random(WORD_POOLS.objects))
      .replace(/{adjective}/g, () => random(WORD_POOLS.adjectives));
    
    // Add connector for middle sentences
    if (i > 0 && i < sentenceCount - 1 && Math.random() > 0.6) {
      sentence = random(WORD_POOLS.connectors) + ', ' + sentence.toLowerCase();
    }
    
    // Capitalize first letter
    sentence = capitalize(sentence);
    
    const wordCount = sentence.split(/\s+/).length;
    if (totalWords + wordCount <= targetWords + 10) { // Allow some overflow
      sentences.push(sentence);
      totalWords += wordCount;
    }
  }
  
  // Join sentences into a paragraph
  let paragraph = sentences.join(' ');
  
  // Ensure paragraph ends with a period
  if (!paragraph.endsWith('.')) {
    paragraph += '.';
  }
  
  // Ensure minimum length (at least 40 words)
  if (totalWords < 40) {
    // Add another sentence if too short
    let extraTemplate = random(SENTENCE_TEMPLATES);
    let extraSentence = extraTemplate
      .replace(/{subject}/g, () => {
        if (Math.random() > 0.5) {
          return capitalize(random(topic.words));
        }
        return random(WORD_POOLS.subjects);
      })
      .replace(/{verb}/g, () => random(WORD_POOLS.verbs))
      .replace(/{object}/g, () => random(WORD_POOLS.objects))
      .replace(/{adjective}/g, () => random(WORD_POOLS.adjectives));
    extraSentence = capitalize(extraSentence);
    paragraph += ' ' + extraSentence;
  }
  
  return paragraph.trim();
};

const calculateAccuracy = (typed, original) => {
  if (!original) return 0;
  let correct = 0;
  const minLength = Math.min(typed.length, original.length);
  for (let i = 0; i < minLength; i++) {
    if (typed[i] === original[i]) correct++;
  }
  return (correct / original.length) * 100;
};

const calculateWPM = (typedWords, timeInSeconds) => {
  if (timeInSeconds === 60 || typedWords === 0) return 0;
  const timeInMinutes = (60 - timeInSeconds) / 60;
  if (timeInMinutes === 0) return 0;
  return Math.round(typedWords / timeInMinutes);
};

const getScore = (accuracy, wpm) => {
  if (accuracy < 50 || wpm < 20) return "Needs Improvement";
  if (accuracy < 80 || wpm < 40) return "Average";
  if (accuracy < 95 || wpm < 50) return "Good";
  return "Excellent";
};

const useTypingTest = () => {
  const [text, setText] = useState('');
  const [timer, setTimer] = useState(60);
  const [running, setRunning] = useState(false);
  const [stats, setStats] = useState({ accuracy: 0, wpm: 0, score: '' });
  const [data, setData] = useState('');
  const inputRef = useRef(null);
  const [error, setError] = useState('');
  const startTimeRef = useRef(null);

  // Timer effect - only depends on timer and running state
  useEffect(() => {
    let interval;
    if (timer > 0 && running) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            setRunning(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [running]);

  // Calculate stats when timer reaches 0
  useEffect(() => {
    if (timer === 0 && !running && data) {
      const accuracy = calculateAccuracy(text, data);
      const typedWords = text.trim().split(/\s+/).filter(word => word.length > 0).length;
      const wpm = calculateWPM(typedWords, 0);
      const score = getScore(accuracy, wpm);
      setStats({ accuracy, wpm, score });
    }
  }, [timer, running, text, data]);

  const getData = () => {
    try {
      // Generate random meaningful text using the algorithm
      const generatedText = generateRandomText();
      setData(generatedText);
      setError('');
      return Promise.resolve();
    } catch (error) {
      setError("Error generating text. Please try again.");
      setRunning(false);
      return Promise.reject(error);
    }
  };

  const handleChange = () => {
    getData().then(() => {
      setTimer(60);
      setText('');
      setRunning(true);
      setStats({ accuracy: 0, wpm: 0, score: '' });
      startTimeRef.current = Date.now();
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.disabled = false;
          inputRef.current.focus();
        }
      }, 100);
    });
  };

  return [text, timer, running, stats, inputRef, handleChange, setText, data, error];
};

export default useTypingTest;