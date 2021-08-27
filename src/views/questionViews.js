'use strict';

import { NEXT_QUESTION_BUTTON_ID, RADIO_CLASS, OPTION_CLASS, DETAILS_CONTAINER_CLASS, QUESTION_TITLE_CLASS, OPTIONS_CONTAINER_CLASS, RESOURCE_LINK_CLASS, QUESTION_RESOURCES_CLASS, RESULT_CONTAINER_CLASS, RESULT_CONTENT_CONTAINER_CLASS, GRADE_DETAILS_CLASS, RESULT_BUTTON_CLASS, CORRECT_ANSWER_CLASS } from '../constants.js';
import { quizData } from '../data.js';
import { nextQuestion, reinitializeQuiz, selectChoice } from '../listeners/questionListeners.js';
import { createDOMElement, getDOMElement } from '../utils/DOMUtils.js';

/**
 * Create an Answer element
 */
export const createAnswerElement = (answerText, answerNumber) => {
  const answerElement = createDOMElement('span');
  const answerInput = createDOMElement('input', { id: answerNumber, className: RADIO_CLASS });
  answerInput.setAttribute("type", "radio");
  answerInput.setAttribute("name", "option");
  answerInput.setAttribute('value', answerNumber);
  const answerLabel = createDOMElement('label', { className: OPTION_CLASS })
  answerLabel.setAttribute('for', answerNumber);
  answerLabel.innerText = answerText;
  answerLabel.addEventListener('click', selectChoice);

  answerElement.appendChild(answerInput);
  answerElement.appendChild(answerLabel);

  return answerElement;
};

/**
 * Create a full question element
 */
export const createQuestionElement = (question) => {
  const container = createDOMElement('div');
  const title = createDOMElement('h1', { className: QUESTION_TITLE_CLASS });
  title.innerText = question.text;
  container.appendChild(title);

  const answerContainer = createDOMElement('div', { className: OPTIONS_CONTAINER_CLASS });

  for (const answerKey in question.answers) {
    const answer = createAnswerElement(question.answers[answerKey], answerKey);
    answerContainer.appendChild(answer);
  }

  container.appendChild(answerContainer);

  return container;
};

/**
 * Create the quiz details element
 */
 export const createQuizDetailsElement = (currentQuestionIndex, numberOfCorrectAnswer, totalQuestionNumber) => {
  const quizDetailsElement = createDOMElement('div', {className: DETAILS_CONTAINER_CLASS });
  const score = createDOMElement('h1');
  const questionNumber = createDOMElement('h1');

  score.innerText = 'Score: ' + numberOfCorrectAnswer + '/' + totalQuestionNumber;
  questionNumber.innerText = 'Question: ' + (currentQuestionIndex + 1) + '/' + totalQuestionNumber;

  quizDetailsElement.appendChild(score);
  quizDetailsElement.appendChild(questionNumber);

  return quizDetailsElement;
};

/**
 * Create the question resource element
 */
 export const createQuestionResourceElement = (question) => {
  const questionResourceElement = createDOMElement('div', { className: QUESTION_RESOURCES_CLASS });
  const needHelp = createDOMElement('p');
  const firstLink = createDOMElement('a', { className: RESOURCE_LINK_CLASS })
  const secondLink = createDOMElement('a', { className: RESOURCE_LINK_CLASS })
  
  needHelp.innerText = 'Need Help?';
  firstLink.setAttribute('href', question.links[0].href);
  firstLink.innerText = question.links[0].text;

  secondLink.setAttribute('href', question.links[1].href);
  secondLink.innerText = question.links[1].text;

  questionResourceElement.appendChild(needHelp);
  questionResourceElement.appendChild(firstLink);
  questionResourceElement.appendChild(secondLink);

  return questionResourceElement;
};

/**
 * Creates and returns the next questions button
 */
export const createNextQuestionButtonElement = () => {
  const buttonContainer = createDOMElement('div', {
    id: NEXT_QUESTION_BUTTON_ID,
    className: 'next-button-container'
  });
  const buttonElement = createDOMElement('button');
  
  buttonElement.innerText = 'Give Up';
  buttonElement.addEventListener('click', nextQuestion);

  buttonContainer.appendChild(buttonElement);
  
  return buttonContainer;
};

/**
 * Creates and returns the quiz result
 */
export const createQuizResultElement = () => {
  const resultContainer = createDOMElement('div', { className: RESULT_CONTAINER_CLASS });
  
  const resultContentContainer = createDOMElement('div',{ className: RESULT_CONTENT_CONTAINER_CLASS });
  
  const congradulationTitle = createDOMElement('h1');
  congradulationTitle.innerText = 'Congratulations, Quiz Completed.';
  resultContentContainer.appendChild(congradulationTitle);

  const gradeDetails = createDOMElement('div', { className: GRADE_DETAILS_CLASS });
  
  const attempts = createDOMElement('p');
  attempts.innerText = 'Attempts : ' + quizData.questions.length;
  gradeDetails.appendChild(attempts);
  const correctAnswers = createDOMElement('p');
  correctAnswers.innerText = 'Right Answers : ' + quizData.numberOfCorrectAnswer;
  gradeDetails.appendChild(correctAnswers);
  const wrongAnswers = createDOMElement('p');
  wrongAnswers.innerText = 'Wrong Answers : ' + (quizData.questions.length - quizData.numberOfCorrectAnswer);
  gradeDetails.appendChild(wrongAnswers);
  const grade = createDOMElement('p');
  grade.innerText = 'Grade : ' + (quizData.numberOfCorrectAnswer/quizData.questions.length * 100) + '%';
  gradeDetails.appendChild(grade);
  resultContentContainer.appendChild(gradeDetails);

  const tryAgainContainer = createDOMElement('div', { className: RESULT_BUTTON_CLASS });
  const buttonElement = createDOMElement('button');
  buttonElement.innerText = 'Try Again';
  buttonElement.addEventListener('click', reinitializeQuiz);
  tryAgainContainer.appendChild(buttonElement);

  resultContentContainer.appendChild(tryAgainContainer);

  resultContainer.appendChild(resultContentContainer);

  return resultContainer;

}