'use strict';

import { CORRECT_ANSWER_CLASS, GIVE_UP, NEXT_QUESTION, NEXT_QUESTION_BUTTON_ID, QUESTION_CONTAINER_ID, QUIZ_CONTAINER_ID, WRONG_ANSWER_CLASS } from '../constants.js';
import { createQuestionElement, createQuestionResourceElement, createQuizDetailsElement, createQuizResultElement } from '../views/questionViews.js';
import { clearDOMElement, getDOMElement } from '../utils/DOMUtils.js';
import { quizData } from '../data.js';
import { initializeQuiz } from '../init/initializeQuiz.js';

export const showCurrentQuestion = () => {
  
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const detailsDOM = createQuizDetailsElement(
    quizData.currentQuestionIndex, quizData.numberOfCorrectAnswer, quizData.questions.length
    );
  const questionDOM = createQuestionElement(currentQuestion);
  const resourceDOM = createQuestionResourceElement(currentQuestion);
  const questionContainer = getDOMElement(QUESTION_CONTAINER_ID);
  
  clearDOMElement(questionContainer);
  questionContainer.appendChild(detailsDOM);
  questionContainer.appendChild(questionDOM);
  questionContainer.appendChild(resourceDOM);
};

export const handleNextQuestion = () => {

  if(quizData.currentQuestionIndex == quizData.questions.length - 1){
    handleQuizResult();
  }

  else {
    quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
    getDOMElement(NEXT_QUESTION_BUTTON_ID).firstChild.disabled = false;
    showCurrentQuestion();
  }
  
};

export const handleAnswer = () => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const correctChoice = getDOMElement(currentQuestion.correct);

  if(currentQuestion.selected == null) {
    correctChoice.nextElementSibling.classList.add(CORRECT_ANSWER_CLASS);
  }

  else if(currentQuestion.correct == currentQuestion.selected) {
    correctChoice.nextElementSibling.classList.add(CORRECT_ANSWER_CLASS);
    quizData.numberOfCorrectAnswer++;
  } 
    
  else {
    const answer = getDOMElement(currentQuestion.selected);
    answer.nextElementSibling.classList.add(WRONG_ANSWER_CLASS);
    correctChoice.nextElementSibling.classList.add(CORRECT_ANSWER_CLASS);
  }

  getDOMElement(NEXT_QUESTION_BUTTON_ID).firstChild.disabled = true;
  setTimeout(handleNextQuestion, 1500);

}

export const handleSelectChoice = (e) => {
  const selectedElement = e.currentTarget;
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  currentQuestion.selected = selectedElement.getAttribute('for');
}

export const handleReplaceGiveUpByNextQuestion = () => {
  const buttonElement = getDOMElement(NEXT_QUESTION_BUTTON_ID).firstChild;
  buttonElement.innerHTML = 'Next Question';
}

export const handleReplaceNextQuestionByGiveUp = () => {
  const buttonElement = getDOMElement(NEXT_QUESTION_BUTTON_ID).firstChild;
  buttonElement.innerHTML = 'Give Up';
}

export const handleChangeButtonInnerText = (e) => {
  const buttonElement = getDOMElement(NEXT_QUESTION_BUTTON_ID).firstChild;
  if(e.currentTarget.tagName.toLowerCase() == 'button')  
    buttonElement.innerHTML = GIVE_UP;
  else
    buttonElement.innerHTML = NEXT_QUESTION;

}

export const handleQuizResult = () => {
  const container = getDOMElement(QUIZ_CONTAINER_ID);
  clearDOMElement(container);

  const resultContainer = createQuizResultElement();
  container.appendChild(resultContainer);

}

export const handleReinitializeQuiz = () => {
  const bodyElement = getDOMElement(QUIZ_CONTAINER_ID).parentElement;
  clearDOMElement(bodyElement);
  initializeQuiz();
}