import React, { useState, useEffect } from 'react';
import { shuffleArray } from '../utils/shuffle';

const Question = ({ question, handleAnswerOptionClick, showCorrectAnswer, selectedAnswerIndex, isTimeUp }) => {
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    setShuffledOptions(shuffleArray([...question.options]));
  }, [question]);

  const handleOptionClick = (isCorrect, index) => {
    handleAnswerOptionClick(isCorrect, index);
  };

  return (
    <div className='question-section'>
      <div className='question-text'>{question.questionText}</div>
      <div className='answer-section'>
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option.isCorrect, index)}
            className={
              showCorrectAnswer
                ? option.isCorrect
                  ? 'correct shake'  // Add the 'shake' class to trigger the animation
                  : selectedAnswerIndex === index
                  ? 'incorrect'
                  : ''
                : ''
            }
            disabled={selectedAnswerIndex !== null || isTimeUp}
          >
            {option.answerText}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
