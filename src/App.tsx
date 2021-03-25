import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
import QuestionCard from './components/QuestionCard';
// Types
import { QuestionState, Difficulty } from './API';
// Styles
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  isCorrect: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;
const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // make API call here
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setQuestionNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (gameOver) {
      return;
    }

    const answer = e.currentTarget.value;
    const currentQuestionObj = questions[questionNumber];
    const {
      question,
      correct_answer: correctAnswer,
    } = currentQuestionObj;

    const isCorrect = answer === correctAnswer;

    if (isCorrect) {
      setScore((previousScore) => previousScore + 1);
    }

    setUserAnswers((previousAnswers) => [
      ...previousAnswers,
      {
        question,
        answer,
        isCorrect,
        correctAnswer,
      },
    ]);
  };

  const nextQuestion = () => {
    const nextQuestionNumber = questionNumber + 1;
    if (nextQuestionNumber === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setQuestionNumber(nextQuestionNumber);
    }
  };

  const showNextQuestion = !gameOver
    && !loading
    && (userAnswers.length === questionNumber + 1)
    && (questionNumber !== TOTAL_QUESTIONS - 1);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Start the Quiz
          </button>
        ) : null}

        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading ? <p>Loading questions ...</p> : null}

        {!loading && !gameOver ? (
          <QuestionCard
            questionNum={questionNumber + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[questionNumber].question}
            answers={questions[questionNumber].answers}
            userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
            callback={checkAnswer}
          />
        ) : null}

        {showNextQuestion ? (
          <button className="next" onClick={nextQuestion}>Next</button>
        ): null}
      </Wrapper>
    </>
  );
}

export default App;
