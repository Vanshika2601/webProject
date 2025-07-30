const quotes = [
    "Typing is a fundamental skill that improves with practice and focus.",
    "Consistency and dedication lead to mastery of any skill.",
    "Speed and accuracy are the hallmarks of a great typist.",
    "Practice every day to sharpen your typing speed and precision."
  ];
  
  const quoteDisplay = document.getElementById("quoteDisplay");
  const quoteInput = document.getElementById("quoteInput");
  const startBtn = document.getElementById("startBtn");
  const timeLeftEl = document.getElementById("timeLeft");
  const wpmEl = document.getElementById("wpm");
  const accuracyEl = document.getElementById("accuracy");
  
  let timer;
  let timeLeft = 60;
  let totalTyped = 0;
  let correctChars = 0;
  let quote = "";
  
  startBtn.addEventListener("click", startTest);
  
  function startTest() {
    resetTest();
  
    quote = quotes[Math.floor(Math.random() * quotes.length)];
    renderQuote(quote);
  
    quoteInput.disabled = false;
    quoteInput.focus();
    startBtn.disabled = true;
  
    timer = setInterval(updateTimer, 1000);
  }
  
  function resetTest() {
    clearInterval(timer);
    timeLeft = 60;
    totalTyped = 0;
    correctChars = 0;
    quoteInput.value = "";
    timeLeftEl.textContent = timeLeft;
    wpmEl.textContent = "0";
    accuracyEl.textContent = "0";
    startBtn.disabled = false;
  }
  
  function renderQuote(text) {
    quoteDisplay.innerHTML = "";
    text.split("").forEach(char => {
      const span = document.createElement("span");
      span.innerText = char;
      quoteDisplay.appendChild(span);
    });
  }
  
  quoteInput.addEventListener("input", () => {
    const input = quoteInput.value.split("");
    const quoteSpans = quoteDisplay.querySelectorAll("span");
    let correct = true;
  
    totalTyped++;
  
    quoteSpans.forEach((charSpan, index) => {
      const typedChar = input[index];
  
      if (typedChar == null) {
        charSpan.classList.remove("correct", "incorrect");
        correct = false;
      } else if (typedChar === charSpan.innerText) {
        charSpan.classList.add("correct");
        charSpan.classList.remove("incorrect");
        correctChars++;
      } else {
        charSpan.classList.add("incorrect");
        charSpan.classList.remove("correct");
        correct = false;
      }
    });
  
    updateStats();
  });
  
  function updateStats() {
    const words = quoteInput.value.trim().split(/\s+/).length;
    const timeSpent = 60 - timeLeft;
    const wpm = timeSpent > 0 ? Math.round((words / timeSpent) * 60) : 0;
  
    const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 0;
  
    wpmEl.textContent = wpm;
    accuracyEl.textContent = accuracy;
  }
  
  function updateTimer() {
    if (timeLeft > 0) {
      timeLeft--;
      timeLeftEl.textContent = timeLeft;
    } else {
      clearInterval(timer);
      quoteInput.disabled = true;
      startBtn.disabled = false;
      quoteDisplay.innerHTML += "<br><strong>⏰ Time's up!</strong>";
    }
  }
  