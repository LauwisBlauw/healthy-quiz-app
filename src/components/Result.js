// src/components/Result.js
import React from 'react';

const Result = ({ score, totalQuestions, onRestart }) => {
  let compliment;
  let userName;

  if (score === totalQuestions) {
    compliment = "Well, well, look who's a health freak!";
    userName = "Nutrition Nazi";
  } else if (score >= totalQuestions * 0.8) {
    compliment = "Not too shabby, but don't get cocky.";
    userName = "Wannabe Wellness Warrior";
  } else if (score >= totalQuestions * 0.6) {
    compliment = "Seriously? That's the best you could do?";
    userName = "Health Halfwit";
  } else {
    compliment = "Yikes, that's just sad. Do you even care about your health?";
    userName = "Couch Potato";
  }

  return (
    <div className='result-section'>
      <h2>Quiz Complete!</h2>
      <p>You scored {score} out of {totalQuestions}.</p>
      <p>{compliment}</p>
      <p>You are a {userName}!</p>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
};

export default Result;
