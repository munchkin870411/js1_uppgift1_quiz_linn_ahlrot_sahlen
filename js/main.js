import { questions } from "./questions.js";
import { state, resetState } from "./state.js";
import { saveResult, loadResult } from "./storage.js";
import { createAnswerButton } from "./elements.js";

const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const nameForm = document.querySelector("#name-form");
const nameInput = document.querySelector("#name-input");
const nameError = document.querySelector("#name-error");
const lastResult = document.querySelector("#last-result");
const playerInfo = document.querySelector("#player-info");
const progress = document.querySelector("#progress");
const questionText = document.querySelector("#question");
const answers = document.querySelector("#answers");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const result = document.querySelector("#result");
const wrongAnswers = document.querySelector("#wrong-answers");
const wrongAnswersList = document.querySelector("#wrong-answers-list");
const restartButton = document.querySelector("#restart-button");

function handleStart(event) {
  event.preventDefault();
  const trimmed = nameInput.value.trim();
  if (trimmed.length < 2) {
    state.nameError = "Namnet måste vara minst 2 tecken.";
  } else {
    state.nameError = "";
    state.playerName = trimmed;
  }
  render();
}

function handleAnswer(answer) {
  if (state.selectedAnswer !== null) {
    return;
  }
  state.selectedAnswer = answer;
  const question = questions[state.currentIndex];
  if (answer === question.correct) {
    state.score++;
  } else {
    state.wrongAnswers.push({ question, chosen: answer });
  }
  render();
}

function handleNext() {
  state.currentIndex++;
  state.selectedAnswer = null;
  if (state.currentIndex >= questions.length) {
    saveResult(state.playerName, state.score, questions.length);
  }
  render();
}

function handleRestart() {
  resetState();
  render();
}

function renderStart() {
  nameError.textContent = state.nameError;
  nameInput.setAttribute("aria-invalid", state.nameError ? "true" : "false");
  const last = loadResult();
  lastResult.hidden = !last;
  lastResult.textContent = last
    ? `Senaste resultat: ${last.name} fick ${last.score} av ${last.total} rätt`
    : "";
  nameInput.focus();
}

function renderQuestion() {
  const question = questions[state.currentIndex];
  const answered = state.selectedAnswer !== null;

  playerInfo.textContent = `${state.playerName} – ${state.score} rätt`;
  progress.textContent = `Fråga ${state.currentIndex + 1} av ${questions.length}`;
  questionText.textContent = question.text;
  answers.replaceChildren();

  question.answers.forEach((answer) => {
    const button = createAnswerButton(answer, handleAnswer);
    if (answered) {
      button.disabled = true;
      if (answer === question.correct) {
        button.classList.add("correct");
      } else if (answer === state.selectedAnswer) {
        button.classList.add("wrong");
      }
    }
    answers.append(button);
  });

  const isCorrect = state.selectedAnswer === question.correct;
  feedback.textContent = answered
    ? (isCorrect ? "Rätt!" : `Fel! Rätt svar är: ${question.correct}`)
    : "";
  feedback.classList.toggle("feedback-correct", answered && isCorrect);
  feedback.classList.toggle("feedback-wrong", answered && !isCorrect);
  nextButton.hidden = !answered;
  nextButton.textContent = state.currentIndex === questions.length - 1
    ? "Visa resultat"
    : "Nästa";

  if (answered) {
    nextButton.focus();
  } else {
    answers.querySelector("button")?.focus();
  }
}

function renderResult() {
  result.textContent = `${state.playerName}: ${state.score} av ${questions.length} rätt`;
  wrongAnswers.hidden = state.wrongAnswers.length === 0;
  wrongAnswersList.replaceChildren();
  state.wrongAnswers.forEach(({ question, chosen }) => {
    const item = document.createElement("li");
    item.classList.add("wrong-item");
    item.textContent = `${question.text} Du svarade: ${chosen}. Rätt svar: ${question.correct}`;
    wrongAnswersList.append(item);
  });
  restartButton.focus();
}

function render() {
  const isStart = state.playerName === null;
  const isResult = !isStart && state.currentIndex >= questions.length;
  startScreen.hidden = !isStart;
  quizScreen.hidden = isStart || isResult;
  resultScreen.hidden = !isResult;

  if (isStart) {
    renderStart();
  } else if (isResult) {
    renderResult();
  } else {
    renderQuestion();
  }
}

nameForm.addEventListener("submit", handleStart);
nextButton.addEventListener("click", handleNext);
restartButton.addEventListener("click", handleRestart);

render();
