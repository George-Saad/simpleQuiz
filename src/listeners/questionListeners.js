'use strict';

import { handleAnswer, handleSelectChoice, handleChangeButtonInnerText, handleReinitializeQuiz } from '../handlers/questionHandlers.js';

export const nextQuestion = (e) => {
  handleAnswer();
  handleChangeButtonInnerText(e);
};

export const selectChoice = (e) => {
  handleSelectChoice(e);
  handleChangeButtonInnerText(e);
}

export const reinitializeQuiz = () => {
  handleReinitializeQuiz();
}