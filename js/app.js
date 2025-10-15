import { getRandomAdvice, getRandomUser } from "./api.js";
import {
  showLoading,
  displayAdvice,
  showError,
  updateButtonTimer,
} from "./ui.js";

let lastRequestTime = 0;
const REQUEST_DELAY = 3000;
let countdownInterval = null;

const startCountdown = () => {
  let secondsLeft = REQUEST_DELAY / 1000;
  updateButtonTimer(secondsLeft);

  if (countdownInterval) clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    secondsLeft--;
    updateButtonTimer(secondsLeft);

    if (secondsLeft <= 0) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  }, 1000);
};

export const loadNewAdvice = async () => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < REQUEST_DELAY) {
    const timeLeft = Math.ceil((REQUEST_DELAY - timeSinceLastRequest) / 1000);
    showError(
      `⏰ Please wait ${timeLeft} more second${timeLeft > 1 ? "s" : ""}`
    );
    return;
  }

  try {
    lastRequestTime = now;
    startCountdown();
    showLoading();

    const [advice, user] = await Promise.all([
      getRandomAdvice(),
      getRandomUser(),
    ]);

    displayAdvice(advice, user);
  } catch (error) {
    showError(error.message);
    lastRequestTime = 0;
    updateButtonTimer(0);
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  }
};

export const init = () => {
  const button = document.getElementById("new-advice-btn");
  button.addEventListener("click", loadNewAdvice);
  loadNewAdvice();
};

window.loadNewAdvice = loadNewAdvice;
document.addEventListener("DOMContentLoaded", init);
