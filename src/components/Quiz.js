import React, { useState, useEffect, useRef, useCallback } from 'react';
import Question from './Question';
import Result from './Result';
import questionsData from '../data/questions';
import { shuffleArray } from '../utils/shuffle';

const selectUniqueQuestions = (questions, count) => {
  const shuffledQuestions = shuffleArray([...questions]);
  return shuffledQuestions.slice(0, count);
};

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [timeLeft, setTimeLeft] = useState(7); // Set timer to 7 seconds
  const [quizStarted, setQuizStarted] = useState(false); // Track quiz start

  const correctSoundRef = useRef(null);
  const incorrectSoundRef = useRef(null);

  useEffect(() => {
    const selectedQuestions = selectUniqueQuestions(questionsData, 30); // Select 30 unique questions
    setQuestions(selectedQuestions);
  }, []);

  const handleAnswerOptionClick = useCallback((isCorrect, index) => {
    if (selectedAnswerIndex === null) {
      setSelectedAnswerIndex(index);
      if (isCorrect) {
        setScore(score + 1);
        correctSoundRef.current.play();
      } else {
        incorrectSoundRef.current.play();
      }
      setShowCorrectAnswer(true);
    }
  }, [selectedAnswerIndex, score]);

  useEffect(() => {
    if (showCorrectAnswer) {
      const timer = setTimeout(() => {
        setShowCorrectAnswer(false);
        setSelectedAnswerIndex(null);
        setTimeLeft(7); // Reset the timer to 7 seconds

        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
          setCurrentQuestionIndex(nextQuestionIndex);
        } else {
          setShowResult(true);
        }
      }, 3000); // 3 seconds delay before moving to the next question
      return () => clearTimeout(timer);
    } else if (quizStarted && !showResult) {
      const timer = setTimeout(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          handleAnswerOptionClick(false, null); // Time ran out, mark as incorrect
        }
      }, 1000); // Update timer every second
      return () => clearTimeout(timer);
    }
  }, [showCorrectAnswer, currentQuestionIndex, questions.length, timeLeft, handleAnswerOptionClick, showResult, quizStarted]);

  const handleRestart = () => {
    const selectedQuestions = selectUniqueQuestions(questionsData, 30); // Select 30 unique questions
    setQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowCorrectAnswer(false);
    setSelectedAnswerIndex(null);
    setShowResult(false);
    setTimeLeft(7); // Reset the timer to 7 seconds
    setQuizStarted(false); // Reset quiz start
  };

  const handleStartQuiz = () => {
    setQuizStarted(true); // Start quiz
  };

  if (questions.length === 0) {
    return <div>Loading...</div>; // Display a loading state while questions are being selected
  }

  return (
    <div className='quiz'>
      <audio ref={correctSoundRef} src="/correct.mp3" />
      <audio ref={incorrectSoundRef} src="/incorrect.mp3" />
      {quizStarted && <div className='score'>Score: {score}</div>}
      {!quizStarted ? (
        <button onClick={handleStartQuiz} className="start-button">Start Quiz</button>
      ) : (
        <>
          {!showResult && (
            <div className='timer'>
              <div className='timer-bar' style={{ width: `${timeLeft * 14.2857}%`, transition: timeLeft === 7 ? 'none' : 'width 1s linear', transform: 'scaleX(-1)' }}></div>
              <div className='timer-text'>{timeLeft} seconds left</div>
            </div>
          )}
          {showResult ? (
            <Result score={score} totalQuestions={questions.length} onRestart={handleRestart} />
          ) : (
            <Question 
              question={questions[currentQuestionIndex]} 
              handleAnswerOptionClick={handleAnswerOptionClick} 
              showCorrectAnswer={showCorrectAnswer}
              selectedAnswerIndex={selectedAnswerIndex} 
              isTimeUp={timeLeft === 0}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
