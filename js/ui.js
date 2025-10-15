export const showLoading = () => {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>Finding wise advice...</p>
    </div>
  `;
};

export const displayAdvice = (advice, user) => {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <div class="advice-card">
      <div class="user-info">
        <img src="${user.avatar}" alt="${user.name}" class="avatar">
        <div class="user-details">
          <strong>${user.name}</strong>
          <span>${user.country}</span>
        </div>
      </div>
      <div class="advice-text">
        "${advice.text}"
      </div>
      <div class="advice-meta">
        <span class="advice-id">Advice #${advice.id}</span>
      </div>
    </div>
  `;
};

export const showError = (message) => {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <div class="error">
      <p>😕 ${message}</p>
      <button onclick="window.loadNewAdvice()">Try Again</button>
    </div>
  `;
};

export const updateButtonTimer = (seconds) => {
  const button = document.getElementById("new-advice-btn");

  if (seconds > 0) {
    button.disabled = true;
    button.innerHTML = `⏳ Wait ${seconds}s`;
  } else {
    button.disabled = false;
    button.innerHTML = "🎲 Get New Advice";
  }
};
