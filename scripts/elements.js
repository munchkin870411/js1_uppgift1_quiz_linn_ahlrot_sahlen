export function createAnswerButton(answer, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = answer;
  button.classList.add("answer");
  button.addEventListener("click", () => onClick(answer));
  return button;
}
