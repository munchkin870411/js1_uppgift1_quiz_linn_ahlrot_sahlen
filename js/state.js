export const state = {
  playerName: null,
  nameError: "",
  currentIndex: 0,
  score: 0,
  selectedAnswer: null,
  wrongAnswers: []
};

export function resetState() {
  state.currentIndex = 0;
  state.score = 0;
  state.selectedAnswer = null;
  state.wrongAnswers = [];
}
