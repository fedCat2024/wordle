import React, { useState, useEffect, createRef } from 'react';

const Wordle = ({ targetWord, maxTries }) => {
  const wordLength = targetWord.length;

  // 用户输入的猜测，初始化为一个 wordLength x maxTries 的空字符串数组
  const [guesses, setGuesses] = useState(Array(maxTries).fill().map(() => Array(wordLength).fill('')));
  // 每个输入字母的检查结果（状态）：correct、present、absent
  const [guessesStatus, setGuessesStatus] = useState(Array(maxTries).fill().map(() => Array(wordLength).fill('')));
  // 初始化输入框的引用
  const initialRefs = Array(maxTries).fill()
                        .map(() => Array(wordLength).fill()
                          .map(() => createRef()));
  const [inputRefs, setInputRefs] = useState(initialRefs || []);
  const [currentTry, setCurrentTry] = useState(0); // 当前尝试次数

  useEffect(() => {
    if (currentTry < maxTries) {
      inputRefs[currentTry][0].current.focus();
    }
  }, [currentTry, inputRefs]);

  const handleInputChange = (tryIndex, charIndex, event) => {
    const newGuesses = [...guesses];
    const value = event.target.value;
    newGuesses[tryIndex][charIndex] = value.toLowerCase();
    setGuesses(newGuesses);

    if (value && charIndex < wordLength - 1) {
      inputRefs[tryIndex][charIndex + 1].current.focus();
    }
  }

  const handleKeyDown = (tryIndex, charIndex, event) => {
    /**
     * 1. 除了一行最后一个输入框，每输入一个字母，自动定位到下一个输入框【handleInputChange函数已处理】
     * 2. 当前输入框没有输入时，回退按钮定位到上一个输入框
     * 3. 键入回车键，提交一行（不足一行不提交）
     */
    const keyType = event.key;
    if (keyType === 'Backspace' && charIndex > 0 && !guesses[tryIndex][charIndex]) {
      inputRefs[tryIndex][charIndex - 1].current.focus();
    }

    if (keyType === 'Enter' && charIndex === wordLength - 1) {
      checkWord(tryIndex);
      setCurrentTry(prevTry => prevTry + 1);
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
    <div style={{padding: "40px"}}>
      {guesses.map((guess, tryIndex) => (
        <div 
          className="wordle-container" 
          key={tryIndex}
          style={{marginBottom: "5px"}}>
          {guess.map((char, charIndex) => (
            <input 
              className="wordle-item"
              key={charIndex}
              type="text"
              maxLength="1"
              value={char}
              style={{
                textTransform: 'uppercase',
                width: "40px",
                height: '40px',
                marginRight: '5px',
                textAlign: 'center',
                fontSize: '24px',
                border: '1px solid',
                color: 'black',
                backgroundColor: guessesStatus[tryIndex][charIndex] === 'correct' ? 'green'
                              : guessesStatus[tryIndex][charIndex] === 'present' ? 'yellow'
                              : guessesStatus[tryIndex][charIndex] === 'absent' ? 'gray'
                              : 'white'
              }}
              ref={inputRefs[tryIndex][charIndex]}
              disabled={ tryIndex !== currentTry }
              onChange={event => handleInputChange(tryIndex, charIndex, event)}
              onKeyDown={event => handleKeyDown(tryIndex, charIndex, event)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Wordle;