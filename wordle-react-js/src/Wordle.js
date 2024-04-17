import React, { createRef, useEffect, useState } from 'react';

const Wordle = ({ targetWord, maxTries }) => {
  const wordLength = targetWord.length;
  const [guesses, setGuesses] = useState(Array(maxTries).fill().map(() => Array(wordLength).fill('')));
  // correct、present、absent
  const [guessesStatus, setGuessesStatus] = useState(Array(maxTries).fill().map(() => Array(wordLength).fill('')));
  const initialRefs = Array(maxTries).fill()
                        .map(() => Array(wordLength).fill()
                          .map(() => createRef()));
  const [inputRefs, setInputRefs] = useState(initialRefs);
  const [currentTry, setCurrentTry] = useState(0); // 当前尝试次数

  useEffect(() => {
    if (currentTry < maxTries) {
      inputRefs[currentTry][0].current.focus();
    }
  }, [inputRefs, currentTry]);

  const handleInputChange = (tryIndex, charIndex, value) => {
    const newGuesses = [...guesses];
    newGuesses[tryIndex][charIndex] = value.toLowerCase();
    setGuesses(newGuesses);

    if (value && charIndex < wordLength - 1) {
      inputRefs[tryIndex][charIndex + 1].current.focus();
    }
  }

  const handleKeyDown = (tryIndex, charIndex, key) => {
    if (key === 'Enter' && charIndex === wordLength - 1) {
      checkWord(tryIndex);
      setCurrentTry(prevTry => prevTry + 1);
    }

    if (key === 'Backspace' && charIndex > 0 && !guesses[tryIndex][charIndex]) {
      inputRefs[tryIndex][charIndex - 1].current.focus();
    }
  }

  const checkWord = (tryIndex) => {
    const theLineNewGuessesStatus = guesses[tryIndex].map((char, index) => {
      if (!char) return '';
      if (targetWord[index] === char) return 'correct';
      if (targetWord.includes(char)) return 'present';
      return 'absent';
    });
    const newGuessesStatus = [...guessesStatus];
    newGuessesStatus[tryIndex] = theLineNewGuessesStatus;
    setGuessesStatus(newGuessesStatus);
  }

  return (
    <div style={{padding: '40px'}}>
      {guesses.map((guess, tryIndex) => (
        <div key={tryIndex}>
          {guess.map((char, charIndex) => (
            <input
              key={charIndex}
              type='text'
              maxLength='1'
              value={char}
              style={{
                textTransform: 'uppercase',
                width: '40px',
                height: '40px',
                fontSize: '24px',
                margin: '5px',
                textAlign: 'center',
                color: 'black',
                border: '1px solid',
                background: guessesStatus[tryIndex][charIndex] === 'correct' ? 'green'
                          : guessesStatus[tryIndex][charIndex] === 'present' ? 'yellow'
                          : guessesStatus[tryIndex][charIndex] === 'absent' ? 'gray'
                          : 'white'
              }}
              ref={inputRefs[tryIndex][charIndex]}
              disabled={tryIndex !== currentTry}
              onChange={(e) => handleInputChange(tryIndex, charIndex, e.target.value)}
              onKeyDown={(e) => handleKeyDown(tryIndex, charIndex, e.key)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Wordle;