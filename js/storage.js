const KEY = "quizLastResult";

export function saveResult(name, score, total) {
  localStorage.setItem(KEY, JSON.stringify({ name, score, total }));
}

export function loadResult() {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}
